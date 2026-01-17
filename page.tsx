'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import ProgressBar from '@/components/quiz/ProgressBar';
import QuizQuestion from '@/components/quiz/QuizQuestion';
import { getQuestionsForHairType, universalQuestions, budgetQuestion } from '@/data/questions';

export default function QuizPage() {
  const router = useRouter();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [questions, setQuestions] = useState(universalQuestions);
  const [sessionId, setSessionId] = useState<string>('');

  // Initialize session
  useEffect(() => {
    const id = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    setSessionId(id);

    // Track quiz start
    fetch('/api/analytics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        event: 'quiz_started',
        sessionId: id
      })
    });
  }, []);

  // Update questions when hair type is selected
  useEffect(() => {
    if (answers.hair_type) {
      const allQuestions = getQuestionsForHairType(answers.hair_type, answers);
      setQuestions(allQuestions);
    }
  }, [answers.hair_type]);

  const currentQuestion = questions[currentQuestionIndex];
  const currentValue = answers[currentQuestion?.id];

  const isValid = () => {
    if (!currentQuestion) return false;

    if (currentQuestion.type === 'multi-choice') {
      const val = currentValue || [];
      const min = currentQuestion.validation?.min || 1;
      const max = currentQuestion.validation?.max || Infinity;
      return val.length >= min && val.length <= max;
    }

    return currentValue !== undefined && currentValue !== null && currentValue !== '';
  };

  const handleAnswer = (value: any) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: value
    }));

    // Track answer
    fetch('/api/analytics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        event: 'question_answered',
        sessionId,
        questionId: currentQuestion.id,
        answer: value
      })
    });
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Quiz complete - go to email capture
      router.push(`/quiz/email?session=${sessionId}`);
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  if (!currentQuestion) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#8B0000] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading quiz...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Hair Care Quiz</h1>
          <p className="text-gray-600">Help us understand your hair to create your perfect routine</p>
        </div>

        {/* Progress */}
        <ProgressBar current={currentQuestionIndex + 1} total={questions.length} />

        {/* Question */}
        <AnimatePresence mode="wait">
          <QuizQuestion
            key={currentQuestion.id}
            question={currentQuestion}
            value={currentValue}
            onChange={handleAnswer}
            onNext={handleNext}
            onBack={currentQuestionIndex > 0 ? handleBack : undefined}
            showNext={currentQuestion.type === 'multi-choice'}
            isValid={isValid()}
          />
        </AnimatePresence>

        {/* Safety exit */}
        <div className="text-center mt-12">
          <button
            onClick={() => router.push('/')}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            Exit quiz
          </button>
        </div>
      </div>

      {/* Store answers in sessionStorage for email page */}
      {typeof window !== 'undefined' && (
        <script
          dangerouslySetInnerHTML={{
            __html: `sessionStorage.setItem('quizAnswers', '${JSON.stringify(answers)}')`,
          }}
        />
      )}
    </div>
  );
}
