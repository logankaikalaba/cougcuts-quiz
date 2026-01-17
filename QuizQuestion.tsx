'use client';

import { motion } from 'framer-motion';
import type { Question } from '@/data/questions';
import SingleChoice from './QuestionTypes/SingleChoice';
import MultiChoice from './QuestionTypes/MultiChoice';
import ImageChoice from './QuestionTypes/ImageChoice';

interface QuizQuestionProps {
  question: Question;
  value: any;
  onChange: (value: any) => void;
  onNext?: () => void;
  onBack?: () => void;
  showNext?: boolean;
  isValid: boolean;
}

export default function QuizQuestion({
  question,
  value,
  onChange,
  onNext,
  onBack,
  showNext = false,
  isValid
}: QuizQuestionProps) {
  const handleChange = (newValue: any) => {
    onChange(newValue);

    // Auto-advance for single choice questions
    if (question.type === 'single-choice' || question.type === 'image-choice') {
      setTimeout(() => {
        onNext?.();
      }, 300);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="w-full max-w-3xl mx-auto"
    >
      {/* Question */}
      <div className="mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
          {question.question}
        </h2>
        {question.description && (
          <p className="text-gray-600">{question.description}</p>
        )}
      </div>

      {/* Answer Options */}
      <div className="mb-8">
        {question.type === 'single-choice' && (
          <SingleChoice
            options={question.options}
            value={value}
            onChange={handleChange}
          />
        )}

        {question.type === 'multi-choice' && (
          <MultiChoice
            options={question.options}
            value={value || []}
            onChange={onChange}
            max={question.validation?.max}
          />
        )}

        {question.type === 'image-choice' && (
          <ImageChoice
            options={question.options}
            value={value}
            onChange={handleChange}
          />
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="flex gap-4 justify-between">
        {onBack && (
          <button
            onClick={onBack}
            className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-full font-medium hover:border-gray-400 hover:bg-gray-50 transition-all"
          >
            ← Back
          </button>
        )}

        {showNext && (
          <button
            onClick={onNext}
            disabled={!isValid}
            className={`ml-auto px-8 py-3 rounded-full font-semibold transition-all ${
              isValid
                ? 'bg-[#8B0000] text-white hover:bg-[#6B0000] shadow-lg hover:shadow-xl transform hover:scale-105'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Continue →
          </button>
        )}
      </div>
    </motion.div>
  );
}
