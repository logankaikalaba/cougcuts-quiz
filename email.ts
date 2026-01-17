import { Resend } from 'resend';
import type { GeneratedRoutine } from './routine-generator';

const resend = new Resend(process.env.RESEND_API_KEY);

interface Lead {
  id: string;
  email: string;
  name: string | null;
  hairType: string;
}

export async function sendRoutineEmail(
  lead: Lead,
  routine: GeneratedRoutine,
  pdfUrl?: string
) {
  try {
    const { data, error } = await resend.emails.send({
      from: process.env.FROM_EMAIL || 'logan@cougcuts.com',
      to: [lead.email],
      subject: `Your Personalized ${lead.hairType.charAt(0).toUpperCase() + lead.hairType.slice(1)} Hair Care Routine is Ready!`,
      html: generateRoutineEmailHTML(lead, routine, pdfUrl),
      text: generateRoutineEmailText(lead, routine, pdfUrl),
      tags: [
        { name: 'category', value: 'routine_delivery' },
        { name: 'hair_type', value: lead.hairType }
      ]
    });

    if (error) {
      console.error('Email send error:', error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (error) {
    console.error('Failed to send email:', error);
    return { success: false, error };
  }
}

function generateRoutineEmailHTML(
  lead: Lead,
  routine: GeneratedRoutine,
  pdfUrl?: string
): string {
  const firstName = lead.name || 'there';

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your Hair Care Routine</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">

  <!-- Header -->
  <div style="text-align: center; margin-bottom: 30px;">
    <h1 style="color: #8B0000; margin-bottom: 10px;">Your Personalized Hair Care Routine</h1>
    <p style="color: #666; font-size: 16px;">Created specifically for your ${lead.hairType} hair</p>
  </div>

  <!-- Greeting -->
  <p style="font-size: 18px;">Hey ${firstName}! 👋</p>

  <p>Your personalized ${lead.hairType} hair care routine is ready! I've put together a complete routine that works with YOUR specific hair texture, YOUR schedule at WSU, and YOUR budget.</p>

  <!-- Profile Summary -->
  <div style="background: #f5f5f5; padding: 20px; border-radius: 10px; margin: 20px 0;">
    <h3 style="color: #8B0000; margin-top: 0;">Your Profile:</h3>
    <p style="margin: 10px 0;"><strong>Hair Type:</strong> ${lead.hairType}</p>
    <p style="margin: 10px 0;"><strong>Profile ID:</strong> ${routine.profileId}</p>
    <p style="margin: 10px 0;"><strong>Monthly Budget:</strong> ~$${routine.monthlyCost}</p>
  </div>

  <!-- Challenge -->
  <div style="background: #fff3cd; border-left: 4px solid #8B0000; padding: 15px; margin: 20px 0;">
    <h4 style="margin-top: 0; color: #8B0000;">Your Specific Challenge:</h4>
    <p style="margin: 0;">${routine.challenge}</p>
  </div>

  <!-- Morning Routine Preview -->
  <div style="margin: 30px 0;">
    <h3 style="color: #8B0000;">Quick Morning Routine (${routine.estimatedTime.morning} min):</h3>
    <ol style="padding-left: 20px;">
      ${routine.morningRoutine.slice(0, 3).map(step =>
        `<li style="margin: 10px 0;">${step.step}</li>`
      ).join('')}
      ${routine.morningRoutine.length > 3 ? '<li><em>...and more in your full routine</em></li>' : ''}
    </ol>
  </div>

  <!-- Products Preview -->
  <div style="margin: 30px 0;">
    <h3 style="color: #8B0000;">Your Recommended Products:</h3>
    ${routine.products.slice(0, 3).map(product => `
      <div style="margin: 15px 0; padding: 15px; background: #f9f9f9; border-radius: 8px;">
        <strong>${product.category.toUpperCase()}: ${product.name}</strong> ($${product.price})<br>
        <span style="color: #666; font-size: 14px;">${product.description}</span>
      </div>
    `).join('')}
  </div>

  <!-- Download PDF Button -->
  ${pdfUrl ? `
  <div style="text-align: center; margin: 40px 0;">
    <a href="${pdfUrl}" style="display: inline-block; background: #8B0000; color: white; padding: 15px 30px; text-decoration: none; border-radius: 25px; font-weight: bold; font-size: 16px;">
      Download Your Complete Routine (PDF)
    </a>
  </div>
  ` : ''}

  <!-- CTA -->
  <div style="background: linear-gradient(135deg, #8B0000 0%, #6B0000 100%); color: white; padding: 30px; border-radius: 15px; text-align: center; margin: 40px 0;">
    <h3 style="margin-top: 0; color: white;">Ready to Take It to the Next Level?</h3>
    <p style="color: rgba(255,255,255,0.9);">Your routine is a great start, but there's nothing like getting a cut from someone who REALLY understands your hair.</p>
    <a href="${process.env.NEXT_PUBLIC_BOOKING_URL || 'https://cougcuts.com/book'}" style="display: inline-block; background: white; color: #8B0000; padding: 15px 30px; text-decoration: none; border-radius: 25px; font-weight: bold; margin-top: 15px;">
      Book Your Cut at Coug Cuts - $40
    </a>
  </div>

  <!-- Footer -->
  <div style="margin-top: 40px; padding-top: 20px; border-top: 2px solid #eee; text-align: center; color: #666; font-size: 14px;">
    <p><strong>Logan at Coug Cuts</strong><br>
    Washington State University<br>
    <a href="mailto:logan@cougcuts.com" style="color: #8B0000;">logan@cougcuts.com</a></p>

    <p style="margin-top: 20px;">
      <a href="https://instagram.com/cougcuts" style="color: #8B0000; text-decoration: none;">Instagram</a> |
      <a href="{unsubscribe_url}" style="color: #666; text-decoration: none;">Unsubscribe</a>
    </p>

    <p style="font-size: 12px; color: #999; margin-top: 20px;">
      P.S. Screenshot this routine and show it at your appointment for a personalized product recommendation session!
    </p>
  </div>

</body>
</html>
  `;
}

function generateRoutineEmailText(
  lead: Lead,
  routine: GeneratedRoutine,
  pdfUrl?: string
): string {
  const firstName = lead.name || 'there';

  return `
Hey ${firstName}!

Your personalized ${lead.hairType} hair care routine is ready!

YOUR PROFILE:
- Hair Type: ${lead.hairType}
- Profile ID: ${routine.profileId}
- Monthly Budget: ~$${routine.monthlyCost}

YOUR SPECIFIC CHALLENGE:
${routine.challenge}

MORNING ROUTINE (${routine.estimatedTime.morning} min):
${routine.morningRoutine.map((step, i) => `${i + 1}. ${step.step}`).join('\n')}

YOUR PRODUCTS:
${routine.products.map(p => `- ${p.category.toUpperCase()}: ${p.name} ($${p.price})`).join('\n')}

${pdfUrl ? `\nDOWNLOAD YOUR COMPLETE ROUTINE:\n${pdfUrl}\n` : ''}

READY TO LEVEL UP YOUR HAIR?
Book your cut at Coug Cuts: ${process.env.NEXT_PUBLIC_BOOKING_URL || 'https://cougcuts.com/book'}

Logan at Coug Cuts
Washington State University
logan@cougcuts.com
Instagram: @cougcuts

---
Unsubscribe: {unsubscribe_url}
  `.trim();
}

// Schedule follow-up emails
export async function scheduleFollowUpEmails(leadId: string) {
  // This would integrate with a job scheduler like:
  // - Vercel Cron Jobs
  // - Inngest
  // - Trigger.dev
  // For now, just log
  console.log(`Follow-up emails scheduled for lead: ${leadId}`);
}
