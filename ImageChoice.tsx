'use client';

import { motion } from 'framer-motion';
import type { QuestionOption } from '@/data/questions';

interface ImageChoiceProps {
  options: QuestionOption[];
  value: string | null;
  onChange: (value: string) => void;
}

export default function ImageChoice({ options, value, onChange }: ImageChoiceProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {options.map((option, index) => (
        <motion.button
          key={option.value}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.05 }}
          onClick={() => onChange(option.value)}
          className={`relative rounded-xl overflow-hidden border-4 transition-all ${
            value === option.value
              ? 'border-[#8B0000] shadow-lg scale-105'
              : 'border-gray-200 hover:border-[#8B0000]/50'
          }`}
        >
          {/* Placeholder for hair type image */}
          <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
            <div className="text-center p-4">
              <div className="text-4xl mb-2">
                {option.value === 'straight' && '✨'}
                {option.value === 'wavy' && '〰️'}
                {option.value === 'curly' && '🌀'}
                {option.value === 'coily' && '🔁'}
              </div>
              <div className="text-sm font-medium text-gray-700">{option.label}</div>
            </div>
          </div>

          {/* Selection indicator */}
          {value === option.value && (
            <div className="absolute top-2 right-2 w-8 h-8 bg-[#8B0000] rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          )}

          <div className="p-3 bg-white border-t border-gray-200">
            <div className="text-xs text-gray-600 text-center">{option.description}</div>
          </div>
        </motion.button>
      ))}
    </div>
  );
}
