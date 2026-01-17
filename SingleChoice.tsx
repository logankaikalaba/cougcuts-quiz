'use client';

import { motion } from 'framer-motion';
import type { QuestionOption } from '@/data/questions';

interface SingleChoiceProps {
  options: QuestionOption[];
  value: string | null;
  onChange: (value: string) => void;
}

export default function SingleChoice({ options, value, onChange }: SingleChoiceProps) {
  return (
    <div className="space-y-3">
      {options.map((option, index) => (
        <motion.button
          key={option.value}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
          onClick={() => onChange(option.value)}
          className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
            value === option.value
              ? 'border-[#8B0000] bg-[#8B0000]/5 shadow-md'
              : 'border-gray-200 hover:border-[#8B0000]/50 hover:bg-gray-50'
          }`}
        >
          <div className="flex items-start gap-3">
            <div className={`flex-shrink-0 w-6 h-6 rounded-full border-2 mt-0.5 flex items-center justify-center ${
              value === option.value
                ? 'border-[#8B0000] bg-[#8B0000]'
                : 'border-gray-300'
            }`}>
              {value === option.value && (
                <div className="w-2 h-2 bg-white rounded-full" />
              )}
            </div>
            <div className="flex-1">
              <div className="font-medium text-gray-900">{option.label}</div>
              {option.description && (
                <div className="text-sm text-gray-600 mt-1">{option.description}</div>
              )}
            </div>
          </div>
        </motion.button>
      ))}
    </div>
  );
}
