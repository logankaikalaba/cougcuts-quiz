import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { generateRoutine } from '@/lib/routine-generator';
import { sendRoutineEmail } from '@/lib/email';
import { generateRoutinePDF, uploadPDF } from '@/lib/pdf-generator';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { sessionId, email, name, answers } = body;

    // Validate input
    if (!email || !answers || !answers.hair_type) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check if email already exists
    const existingLead = await prisma.lead.findUnique({
      where: { email }
    });

    if (existingLead) {
      return NextResponse.json(
        { error: 'Email already registered', leadId: existingLead.id },
        { status: 409 }
      );
    }

    // Extract hair goals from answers
    const hairGoals = Array.isArray(answers.hair_goals)
      ? answers.hair_goals
      : [];

    // Generate personalized routine
    const routine = generateRoutine({
      hairType: answers.hair_type,
      hairGoals,
      quizAnswers: answers,
      budget: answers.budget || 'mid'
    });

    // Create lead in database
    const lead = await prisma.lead.create({
      data: {
        email,
        name,
        hairType: answers.hair_type,
        hairGoals,
        quizAnswers: answers,
        profileId: routine.profileId,
        budgetTier: answers.budget || 'mid',
        routineGenerated: true,
        routineText: JSON.stringify(routine),
      }
    });

    // Update quiz session
    if (sessionId) {
      await prisma.quizSession.upsert({
        where: { sessionId },
        update: {
          completed: true,
          completedAt: new Date(),
          answers: answers,
        },
        create: {
          sessionId,
          completed: true,
          completedAt: new Date(),
          answers: answers,
          lastQuestionViewed: 0,
          timeOnQuestions: {}
        }
      });
    }

    // Generate and upload PDF (async - don't wait)
    let pdfUrl: string | undefined;
    try {
      const pdfBuffer = await generateRoutinePDF(lead, routine);
      pdfUrl = await uploadPDF(lead.id, pdfBuffer);

      // Update lead with PDF URL
      await prisma.lead.update({
        where: { id: lead.id },
        data: { routinePdfUrl: pdfUrl }
      });
    } catch (pdfError) {
      console.error('PDF generation error:', pdfError);
      // Continue without PDF - it's not critical
    }

    // Send email with routine
    try {
      await sendRoutineEmail(lead, routine, pdfUrl);

      // Update lead to mark email sent
      await prisma.lead.update({
        where: { id: lead.id },
        data: {
          emailSequenceStarted: true,
          lastEmailSent: new Date()
        }
      });

      // Track email sent
      await prisma.emailEvent.create({
        data: {
          leadId: lead.id,
          eventType: 'sent',
          emailType: 'routine_delivery',
          metadata: { pdfUrl }
        }
      });
    } catch (emailError) {
      console.error('Email send error:', emailError);
      // Continue - lead is saved, email can be retried
    }

    return NextResponse.json({
      success: true,
      leadId: lead.id,
      routine: routine
    });

  } catch (error: any) {
    console.error('Quiz submission error:', error);
    return NextResponse.json(
      { error: 'Failed to process submission', details: error.message },
      { status: 500 }
    );
  }
}
