export type QuestionType =
  | 'single-choice'
  | 'multi-choice'
  | 'image-choice'
  | 'text-input';

export interface QuestionOption {
  value: string;
  label: string;
  description?: string;
  image?: string;
}

export interface Question {
  id: string;
  type: QuestionType;
  question: string;
  description?: string;
  options: QuestionOption[];
  required: boolean;
  dependsOn?: {
    questionId: string;
    answer: string | string[];
  };
  validation?: {
    min?: number;
    max?: number;
    pattern?: RegExp;
  };
}

// Universal Questions (Everyone answers these)
export const universalQuestions: Question[] = [
  {
    id: "hair_type",
    type: "image-choice",
    question: "What's your hair type?",
    description: "Not sure? Pick the one that looks closest to your natural hair",
    options: [
      {
        value: "straight",
        label: "Straight",
        image: "/images/hair-straight.jpg",
        description: "Falls flat, no natural curl pattern"
      },
      {
        value: "wavy",
        label: "Wavy",
        image: "/images/hair-wavy.jpg",
        description: "S-shaped pattern, some texture"
      },
      {
        value: "curly",
        label: "Curly",
        image: "/images/hair-curly.jpg",
        description: "Spiral curls, defined ringlets"
      },
      {
        value: "coily",
        label: "Coily",
        image: "/images/hair-coily.jpg",
        description: "Tight coils, Z-pattern"
      }
    ],
    required: true
  },
  {
    id: "hair_goals",
    type: "multi-choice",
    question: "What are your hair goals?",
    description: "Select all that apply",
    options: [
      { value: "growth", label: "Growth/length retention" },
      { value: "moisture", label: "Moisture/hydration" },
      { value: "volume", label: "Volume/thickness" },
      { value: "frizz", label: "Frizz control" },
      { value: "definition", label: "Definition" },
      { value: "low_maintenance", label: "Low maintenance" },
      { value: "damage_repair", label: "Damage repair" },
      { value: "scalp_health", label: "Scalp health" }
    ],
    required: true,
    validation: { min: 1, max: 4 }
  }
];

// Curly Hair Questions
export const curlyQuestions: Question[] = [
  {
    id: "curl_pattern",
    type: "single-choice",
    question: "How would you describe your curl pattern?",
    dependsOn: { questionId: "hair_type", answer: "curly" },
    options: [
      {
        value: "loose",
        label: "Loose curls (2C-3A)",
        description: "Could almost pass as wavy, looser spirals"
      },
      {
        value: "medium",
        label: "Medium curls (3B)",
        description: "Definite spirals, springy"
      },
      {
        value: "tight",
        label: "Tight curls (3C)",
        description: "Small ringlets, corkscrew pattern"
      }
    ],
    required: true
  },
  {
    id: "porosity",
    type: "single-choice",
    question: "Porosity test: Drop a clean hair strand in water. What happens?",
    description: "This tells us how your hair absorbs moisture",
    dependsOn: { questionId: "hair_type", answer: "curly" },
    options: [
      {
        value: "low",
        label: "Floats on top",
        description: "Low porosity - cuticles are tight"
      },
      {
        value: "normal",
        label: "Sinks slowly",
        description: "Normal porosity - balanced"
      },
      {
        value: "high",
        label: "Sinks immediately",
        description: "High porosity - absorbs water fast"
      }
    ],
    required: true
  },
  {
    id: "activity_level",
    type: "single-choice",
    question: "What's your typical week at WSU like?",
    dependsOn: { questionId: "hair_type", answer: "curly" },
    options: [
      { value: "very_active", label: "5+ gym sessions/workouts per week" },
      { value: "active", label: "2-4 gym sessions, moderately active" },
      { value: "minimal", label: "Minimal workouts, mostly in class/studying" },
      { value: "athlete", label: "Athlete/ROTC (daily intense physical activity)" }
    ],
    required: true
  },
  {
    id: "curl_frustration",
    type: "single-choice",
    question: "What's your biggest hair frustration right now?",
    dependsOn: { questionId: "hair_type", answer: "curly" },
    options: [
      { value: "falls_flat", label: "Curls fall flat by midday" },
      { value: "frizz", label: "Extreme frizz/halo effect" },
      { value: "tangles", label: "Tangles and knots constantly" },
      { value: "dry_breaking", label: "Dry, brittle, breaking" },
      { value: "greasy_roots", label: "Greasy roots but dry ends" }
    ],
    required: true
  },
  {
    id: "morning_time",
    type: "single-choice",
    question: "How much time can you realistically spend on hair in the morning?",
    dependsOn: { questionId: "hair_type", answer: "curly" },
    options: [
      { value: "3", label: "3 minutes max (literally rolling out of bed)" },
      { value: "5", label: "5-7 minutes (quick but intentional)" },
      { value: "10", label: "10-15 minutes (I care about my hair)" },
      { value: "20", label: "20+ minutes (hair is a priority)" }
    ],
    required: true
  }
];

// Straight Hair Questions
export const straightQuestions: Question[] = [
  {
    id: "texture_thickness",
    type: "single-choice",
    question: "How would you describe your hair texture and thickness?",
    dependsOn: { questionId: "hair_type", answer: "straight" },
    options: [
      { value: "fine", label: "Fine/thin - you can see scalp easily" },
      { value: "medium", label: "Medium - normal density" },
      { value: "thick", label: "Thick/coarse - lots of hair" }
    ],
    required: true
  },
  {
    id: "oil_production",
    type: "single-choice",
    question: "How quickly does your hair get greasy?",
    dependsOn: { questionId: "hair_type", answer: "straight" },
    options: [
      { value: "day_1", label: "Gets greasy by end of day one" },
      { value: "day_2", label: "Greasy by day 2" },
      { value: "day_3_4", label: "Can go 3-4 days before getting oily" },
      { value: "rarely", label: "Rarely gets oily, tends toward dry" }
    ],
    required: true
  },
  {
    id: "hair_condition",
    type: "single-choice",
    question: "What's your current hair condition?",
    dependsOn: { questionId: "hair_type", answer: "straight" },
    options: [
      { value: "healthy", label: "Healthy, just want to maintain" },
      { value: "heat_damage", label: "Some damage from heat styling" },
      { value: "bleached", label: "Bleached/colored - chemically treated" },
      { value: "breaking", label: "Breaking/thinning" }
    ],
    required: true
  },
  {
    id: "styling_frequency",
    type: "single-choice",
    question: "How often do you heat style?",
    dependsOn: { questionId: "hair_type", answer: "straight" },
    options: [
      { value: "daily", label: "Heat style daily (straightener, curling iron, blow dry)" },
      { value: "frequent", label: "Heat style 2-3x per week" },
      { value: "occasional", label: "Occasional heat styling" },
      { value: "never", label: "Never heat style, air dry only" }
    ],
    required: true
  },
  {
    id: "straight_concern",
    type: "single-choice",
    question: "What's your main concern?",
    dependsOn: { questionId: "hair_type", answer: "straight" },
    options: [
      { value: "no_volume", label: "No volume, falls flat" },
      { value: "greasy_roots", label: "Greasy roots, dry ends" },
      { value: "damage", label: "Damage and split ends" },
      { value: "frizz", label: "Frizz and flyaways" },
      { value: "growth", label: "Just want it to grow faster" }
    ],
    required: true
  }
];

// Coily Hair Questions
export const coilyQuestions: Question[] = [
  {
    id: "coil_tightness",
    type: "single-choice",
    question: "How would you describe your coil pattern?",
    dependsOn: { questionId: "hair_type", answer: "coily" },
    options: [
      { value: "4a", label: "4A - S-pattern coils, defined" },
      { value: "4b", label: "4B - Z-pattern, less definition" },
      { value: "4c", label: "4C - Tightest coils, minimal visible pattern" }
    ],
    required: true
  },
  {
    id: "shrinkage",
    type: "single-choice",
    question: "How much does your hair shrink when dry?",
    dependsOn: { questionId: "hair_type", answer: "coily" },
    options: [
      { value: "30_50", label: "30-50% shrinkage (hair looks half its real length)" },
      { value: "50_75", label: "50-75% shrinkage" },
      { value: "75_plus", label: "75%+ shrinkage (hair shrinks dramatically when dry)" }
    ],
    required: true
  },
  {
    id: "moisture_retention",
    type: "single-choice",
    question: "How long does moisture last in your hair?",
    dependsOn: { questionId: "hair_type", answer: "coily" },
    options: [
      { value: "hours", label: "Hair feels dry within hours of moisturizing" },
      { value: "1_2_days", label: "Stays moisturized for 1-2 days" },
      { value: "3_4_days", label: "Can go 3-4 days before re-moisturizing" }
    ],
    required: true
  },
  {
    id: "protective_styling",
    type: "single-choice",
    question: "How often do you wear protective styles?",
    description: "Braids, twists, wigs, etc.",
    dependsOn: { questionId: "hair_type", answer: "coily" },
    options: [
      { value: "always", label: "Wear protective styles 75%+ of the time" },
      { value: "sometimes", label: "Protective styles sometimes (50/50)" },
      { value: "mostly_out", label: "Mostly wear hair out/natural" },
      { value: "never", label: "Always wear hair out, no protective styles" }
    ],
    required: true
  },
  {
    id: "coily_goals",
    type: "single-choice",
    question: "What's your #1 hair goal?",
    dependsOn: { questionId: "hair_type", answer: "coily" },
    options: [
      { value: "length", label: "Length retention (growth)" },
      { value: "definition", label: "Definition and shine" },
      { value: "moisture", label: "Moisture and softness" },
      { value: "volume", label: "Volume and fullness" },
      { value: "low_manipulation", label: "Low manipulation/protective styling" }
    ],
    required: true
  }
];

// Wavy Hair Questions
export const wavyQuestions: Question[] = [
  {
    id: "wave_pattern",
    type: "single-choice",
    question: "Which wave pattern matches yours?",
    dependsOn: { questionId: "hair_type", answer: "wavy" },
    options: [
      { value: "2a", label: "2A - Subtle S-waves, mostly straight" },
      { value: "2b", label: "2B - Defined S-waves" },
      { value: "2c", label: "2C - Strong waves, almost curly" }
    ],
    required: true
  },
  {
    id: "frizz_level",
    type: "single-choice",
    question: "How's your frizz situation?",
    dependsOn: { questionId: "hair_type", answer: "wavy" },
    options: [
      { value: "minimal", label: "Minimal frizz, waves hold smooth" },
      { value: "moderate", label: "Moderate frizz halo" },
      { value: "extreme", label: "Extreme frizz, looks messy" },
      { value: "no_frizz_flat", label: "No frizz but waves fall flat" }
    ],
    required: true
  },
  {
    id: "density",
    type: "single-choice",
    question: "How much hair do you have?",
    dependsOn: { questionId: "hair_type", answer: "wavy" },
    options: [
      { value: "fine", label: "Fine hair, see scalp easily" },
      { value: "medium", label: "Medium density" },
      { value: "thick", label: "Thick, lots of hair" }
    ],
    required: true
  },
  {
    id: "wash_frequency",
    type: "single-choice",
    question: "How often do you prefer to wash your hair?",
    dependsOn: { questionId: "hair_type", answer: "wavy" },
    options: [
      { value: "daily", label: "Daily washer (can't function without it)" },
      { value: "every_other", label: "Every other day" },
      { value: "every_3_4", label: "Every 3-4 days" },
      { value: "weekly", label: "Once a week or less" }
    ],
    required: true
  },
  {
    id: "desired_outcome",
    type: "single-choice",
    question: "What's your ideal hair look?",
    dependsOn: { questionId: "hair_type", answer: "wavy" },
    options: [
      { value: "beachy", label: "Beachy, effortless texture" },
      { value: "polished", label: "Polished, defined waves" },
      { value: "volume", label: "Maximum volume" },
      { value: "sleek", label: "Sleek with slight movement" },
      { value: "low_maintenance", label: "Low-maintenance air dry" }
    ],
    required: true
  }
];

// Budget Question (Everyone)
export const budgetQuestion: Question = {
  id: "budget",
  type: "single-choice",
  question: "What's your realistic monthly budget for hair products?",
  description: "Be honest - we'll recommend options that fit",
  options: [
    { value: "low", label: "Under $30/month", description: "Budget-friendly drugstore options" },
    { value: "mid", label: "$30-70/month", description: "Quality mid-range products" },
    { value: "premium", label: "$70+/month", description: "Premium salon-quality products" }
  ],
  required: true
};

// All questions combined
export const allQuestions: Question[] = [
  ...universalQuestions,
  ...curlyQuestions,
  ...straightQuestions,
  ...coilyQuestions,
  ...wavyQuestions,
  budgetQuestion
];

// Helper function to get questions for a specific hair type
export function getQuestionsForHairType(hairType: string, currentAnswers: Record<string, any>): Question[] {
  const questions: Question[] = [...universalQuestions];

  // Add hair-type-specific questions
  if (hairType === 'curly') {
    questions.push(...curlyQuestions);
  } else if (hairType === 'straight') {
    questions.push(...straightQuestions);
  } else if (hairType === 'coily') {
    questions.push(...coilyQuestions);
  } else if (hairType === 'wavy') {
    questions.push(...wavyQuestions);
  }

  // Add budget question last
  questions.push(budgetQuestion);

  // Filter based on dependencies
  return questions.filter(q => {
    if (!q.dependsOn) return true;
    const dependentAnswer = currentAnswers[q.dependsOn.questionId];
    if (Array.isArray(q.dependsOn.answer)) {
      return q.dependsOn.answer.includes(dependentAnswer);
    }
    return dependentAnswer === q.dependsOn.answer;
  });
}
