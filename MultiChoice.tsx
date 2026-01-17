'use client';

import { motion } from 'framer-motion';
import type { QuestionOption } from '@/data/questions';

interface MultiChoiceProps {
  options: QuestionOption[];
  value: string[];
  onChange: (value: string[]) => void;
  max?: number;
}

export default function MultiChoice({ options, value = [], onChange, max }: MultiChoiceProps) {
  const handleToggle = (optionValue: string) => {
    const newValue = value.includes(optionValue)
      ? value.filter(v => v !== optionValue)
      : max && value.length >= max
      ? value
      : [...value, optionValue];
    onChange(newValue);
  };

  return (
    <div className="space-y-3">
      {max && (
        <p className="text-sm text-gray-600 mb-4">
          Select up to {max} option{max !== 1 ? 's' : ''}
          {value.length > 0 && ` (${value.length}/${max} selected)`}
        </p>
      )}
      {options.map((option, index) => {
        const isSelected = value.includes(option.value);
        const isDisabled = max ? value.length >= max && !isSelected : false;

        return (
          <motion.button
            key={option.value}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            onClick={() => !isDisabled && handleToggle(option.value)}
            disabled={isDisabled}
            className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
              isSelected
                ? 'border-[#8B0000] bg-[#8B0000]/5 shadow-md'
                : isDisabled
                ? 'border-gray-200 bg-gray-100 opacity-50 cursor-not-allowed'
                : 'border-gray-200 hover:border-[#8B0000]/50 hover:bg-gray-50'
            }`}
          >
            <div className="flex items-start gap-3">
              <div className={`flex-shrink-0 w-6 h-6 rounded border-2 mt-0.5 flex items-center justify-center ${
                isSelected
                  ? 'border-[#8B0000] bg-[#8B0000]'
                  : 'border-gray-300'
              }`}>
                {isSelected && (
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
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
        );
      })}
    </div>
  );
}
