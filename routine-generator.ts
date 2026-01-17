import { getRecommendedProducts, calculateMonthlyCost, type Product } from '@/data/products';

export interface RoutineGeneratorInput {
  hairType: string;
  hairGoals: string[];
  quizAnswers: Record<string, any>;
  budget: 'low' | 'mid' | 'premium';
}

export interface RoutineStep {
  step: string;
  tip?: string;
  product?: string;
}

export interface GeneratedRoutine {
  profileId: string;
  challenge: string;
  morningRoutine: RoutineStep[];
  washDayRoutine: RoutineStep[];
  products: Product[];
  hacks: string[];
  wsuTips: string[];
  estimatedTime: {
    morning: number;
    washDay: number;
  };
  monthlyCost: number;
}

export function createProfileId(input: RoutineGeneratorInput): string {
  const parts = [
    input.hairType,
    input.quizAnswers.curl_pattern || input.quizAnswers.wave_pattern || input.quizAnswers.coil_tightness || input.quizAnswers.texture_thickness,
    input.quizAnswers.porosity || input.quizAnswers.oil_production || input.quizAnswers.moisture_retention,
    input.quizAnswers.activity_level || input.quizAnswers.wash_frequency,
    input.quizAnswers.curl_frustration || input.quizAnswers.straight_concern || input.quizAnswers.coily_goals || input.quizAnswers.frizz_level,
    input.quizAnswers.morning_time || input.quizAnswers.styling_frequency,
    input.budget
  ].filter(Boolean);

  return parts.join('_').toLowerCase().replace(/[^a-z0-9_]/g, '');
}

export function identifyChallenge(input: RoutineGeneratorInput): string {
  const { hairType, quizAnswers } = input;

  // Curly hair challenges
  if (hairType === 'curly') {
    if (quizAnswers.porosity === 'low' && quizAnswers.activity_level === 'very_active') {
      return "Low porosity means products sit on your hair instead of absorbing. You're washing frequently due to gym, which is stripping your curls. Frizz = lack of moisture getting IN.";
    }
    if (quizAnswers.porosity === 'high' && quizAnswers.curl_frustration === 'dry_breaking') {
      return "High porosity means moisture escapes as fast as it enters. You're probably heat damaged or have chemical damage. Hair drinks up products but stays dry. Tight curls + porosity = breakage city.";
    }
    if (quizAnswers.curl_pattern === 'tight' && quizAnswers.curl_frustration === 'tangles') {
      return "Tight curl pattern = maximum tangle potential. Your curls wind around each other constantly. Detangling when dry = breakage. You need a slip-focused routine.";
    }
    if (quizAnswers.porosity === 'low' && quizAnswers.curl_frustration === 'frizz') {
      return "Low porosity + frizz means your hair can't absorb moisture, so it seeks it from the air = frizz halo. You need heat and humectants to open those cuticles.";
    }
    return "Your curly hair needs a routine that balances moisture and definition while working with your natural curl pattern and WSU lifestyle.";
  }

  // Straight hair challenges
  if (hairType === 'straight') {
    if (quizAnswers.texture_thickness === 'fine' && quizAnswers.straight_concern === 'no_volume') {
      return "Fine hair + oil + gravity = flat, limp hair that looks dirty fast. You're probably using products that weigh hair down. You need volumizing products that create lift.";
    }
    if (quizAnswers.hair_condition === 'bleached' && quizAnswers.straight_concern === 'damage') {
      return "Bleach compromises hair structure. Your hair is chemically damaged and porous. Split ends = need protein + moisture balance to rebuild strength.";
    }
    if (quizAnswers.oil_production === 'day_1' && quizAnswers.straight_concern === 'greasy_roots') {
      return "Overactive sebaceous glands + fine texture = greasy roots within hours. Washing too often makes it worse (scalp overcompensates). You need to retrain your scalp.";
    }
    if (quizAnswers.styling_frequency === 'daily' && quizAnswers.hair_condition === 'heat_damage') {
      return "Daily heat styling at high temps = fried, damaged hair. Heat breaks protein bonds. You need heat protection, lower temps, and repair treatments.";
    }
    return "Your straight hair needs a routine that adds volume and addresses damage while maintaining healthy scalp balance.";
  }

  // Coily hair challenges
  if (hairType === 'coily') {
    if (quizAnswers.coil_tightness === '4c' && quizAnswers.moisture_retention === 'hours') {
      return "4C with extreme shrinkage + low moisture retention = guaranteed breakage. Your hair texture is the most fragile. Moisture escapes fast. You need intensive moisture-sealing techniques.";
    }
    if (quizAnswers.coil_tightness === '4a' && quizAnswers.moisture_retention === '3_4_days') {
      return "You've got ideal moisture retention for coily hair. 4A holds definition well. You're doing something right already. Goal = enhance what's working and prevent damage.";
    }
    if (quizAnswers.protective_styling === 'never' && quizAnswers.coily_goals === 'length') {
      return "Wearing 4C hair out 24/7 = maximum manipulation and breakage. For length retention, you need to incorporate protective styles to reduce daily stress on your ends.";
    }
    if (quizAnswers.shrinkage === '75_plus' && quizAnswers.coily_goals === 'definition') {
      return "Extreme shrinkage means your length is hidden. For definition, you need products and techniques that elongate curls while fighting shrinkage.";
    }
    return "Your coily hair needs a moisture-focused routine with protective strategies for length retention and health.";
  }

  // Wavy hair challenges
  if (hairType === 'wavy') {
    if (quizAnswers.wave_pattern === '2a' && quizAnswers.frizz_level === 'no_frizz_flat') {
      return "2A barely holds wave pattern. Fine hair = no body. Daily washing strips oils that weigh you down but removes volume. You need lightweight products and techniques that CREATE texture.";
    }
    if (quizAnswers.wave_pattern === '2c' && quizAnswers.frizz_level === 'extreme') {
      return "2C is on the curly spectrum but you're probably treating it like straight hair. Frizz = moisture escaping. Pullman humidity varies = frizz nightmare. You need curl methods, not wave methods.";
    }
    if (quizAnswers.density === 'thick' && quizAnswers.desired_outcome === 'volume') {
      return "You have thick hair naturally but it's weighed down. Too much product or wrong products are flattening your waves. You need lightweight, volumizing techniques.";
    }
    if (quizAnswers.wash_frequency === 'daily' && quizAnswers.frizz_level === 'moderate') {
      return "Daily washing disrupts wave pattern and causes frizz. Your scalp is overproducing oil because you strip it daily. You need to extend wash days and use proper styling products.";
    }
    return "Your wavy hair needs a routine that enhances your natural texture while managing frizz and adding definition.";
  }

  return `Your ${hairType} hair has unique needs based on your lifestyle and goals. This routine is customized for your specific combination.`;
}

export function buildMorningRoutine(input: RoutineGeneratorInput): RoutineStep[] {
  const { hairType, quizAnswers } = input;
  const timeAvailable = parseInt(quizAnswers.morning_time || '10') || 10;
  const routine: RoutineStep[] = [];

  // Curly hair morning routines
  if (hairType === 'curly') {
    if (timeAvailable <= 3) {
      routine.push(
        { step: "Spray hair with water until damp (not soaking)" },
        { step: "Apply small amount of leave-in or curl cream", tip: "Focus on ends, avoid roots" },
        { step: "Scrunch upward and go", tip: "Done in 2 min" }
      );
    } else if (timeAvailable <= 7) {
      routine.push(
        { step: "Wet hands, scrunch water into hair" },
        { step: "Apply leave-in cream section by section" },
        { step: "Apply gel with praying hands method" },
        { step: "Scrunch upward, let air dry or diffuse briefly" },
        { step: "Optional: Diffuse roots for 2 min for volume" }
      );
    } else {
      routine.push(
        { step: "Fully wet hair in shower or with spray bottle" },
        { step: "Apply leave-in conditioner, detangle with fingers" },
        { step: "Section hair, apply curl cream" },
        { step: "Apply gel using praying hands + scrunch" },
        { step: "Diffuse on medium heat for 10-15 min or air dry", tip: "Hover diffuse - don't touch hair" },
        { step: "Once 100% dry, scrunch out the crunch" }
      );
    }
  }

  // Straight hair morning routines
  if (hairType === 'straight') {
    if (quizAnswers.straight_concern === 'no_volume') {
      routine.push(
        { step: "Flip head upside down, spray dry shampoo at roots" },
        { step: "Massage into scalp for 30 sec" },
        { step: "Flip back up, tease roots slightly with fingers" },
        { step: "Optional: Use 1-2 drops of oil on ends only" }
      );
    } else if (quizAnswers.styling_frequency === 'daily') {
      routine.push(
        { step: "Apply heat protectant to damp hair" },
        { step: "Blow dry with round brush, pulling at roots for volume" },
        { step: "Straighten or curl as desired" },
        { step: "Finish with light oil or serum on ends" }
      );
    } else {
      routine.push(
        { step: "Brush through hair" },
        { step: "Apply dry shampoo if needed (day 2+)" },
        { step: "Style as desired - air dried or touch up with heat" }
      );
    }
  }

  // Coily hair morning routines
  if (hairType === 'coily') {
    if (quizAnswers.protective_styling === 'always') {
      routine.push(
        { step: "Spray edges with water" },
        { step: "Apply edge control or gel to smooth edges" },
        { step: "Tie down with silk scarf for 5 min while you get ready" },
        { step: "Remove scarf, you're done" }
      );
    } else {
      routine.push(
        { step: "Spray hair with water-leave-in mix (pre-made in spray bottle)" },
        { step: "Apply oil to seal moisture (focus on ends)" },
        { step: "Fluff with pick or fingers" },
        { step: "Go - your hair is set from yesterday's styling" }
      );
    }
  }

  // Wavy hair morning routines
  if (hairType === 'wavy') {
    if (quizAnswers.desired_outcome === 'beachy') {
      routine.push(
        { step: "Spray sea salt spray throughout hair" },
        { step: "Scrunch upward" },
        { step: "Air dry or diffuse for 5 min" }
      );
    } else if (quizAnswers.desired_outcome === 'polished') {
      routine.push(
        { step: "Refresh waves with water spray" },
        { step: "Apply small amount of wave cream" },
        { step: "Use diffuser on low to set waves" },
        { step: "Finish with light hold hairspray" }
      );
    } else {
      routine.push(
        { step: "Refresh with water or leave-in spray" },
        { step: "Scrunch in mousse or cream" },
        { step: "Air dry or diffuse briefly" }
      );
    }
  }

  return routine;
}

export function buildWashDayRoutine(input: RoutineGeneratorInput): RoutineStep[] {
  const { hairType, quizAnswers } = input;
  const routine: RoutineStep[] = [];

  // Curly hair wash day
  if (hairType === 'curly') {
    routine.push(
      { step: "Pre-poo: Apply oil to hair before shower (optional but recommended)", tip: "Coconut, olive, or argan oil. Protects from water damage." },
      { step: "Wet hair thoroughly with warm water" },
      { step: "Apply sulfate-free shampoo to SCALP only, massage 2 min", tip: "Don't scrub hair itself, just scalp" },
      { step: "Rinse with warm water" },
      { step: "Apply generous conditioner from ears down", tip: "Never on scalp/roots" },
      { step: "Detangle with wide-tooth comb or fingers while conditioner is in" },
      { step: "Leave conditioner 3-5 min" },
      { step: "Rinse with COLD water (seals cuticle)", tip: "This is non-negotiable for frizz control" },
      { step: "Squeeze excess water - DON'T rub with towel" },
      { step: "Apply leave-in conditioner while soaking wet" },
      { step: "Section hair, apply curl cream with praying hands" },
      { step: "Apply gel with praying hands, then scrunch" },
      { step: "Plop in microfiber towel for 10-20 min" },
      { step: "Air dry or diffuse" }
    );
  }

  // Straight hair wash day
  if (hairType === 'straight') {
    routine.push(
      { step: "Wet hair with warm water" },
      { step: "Apply shampoo, focus on scalp and roots", tip: "Massage scalp for 1-2 min" },
      { step: "Rinse thoroughly" },
      { step: "Apply conditioner mid-length to ends (avoid roots if hair gets oily)" },
      { step: "Leave 2-3 min, rinse with cool water" },
      { step: "Gently squeeze out excess water" },
      { step: "Apply heat protectant if blow drying" },
      { step: "Blow dry with cool shot at end to seal cuticle" }
    );

    if (quizAnswers.hair_condition === 'bleached' || quizAnswers.hair_condition === 'heat_damage') {
      routine.push(
        { step: "Weekly: Apply deep conditioning treatment or hair mask", tip: "Leave for 15-30 min before regular shampoo" }
      );
    }
  }

  // Coily hair wash day
  if (hairType === 'coily') {
    routine.push(
      { step: "Pre-poo with oil for at least 30 min (overnight is best)", tip: "This prevents hygral fatigue" },
      { step: "Section hair into 4-6 sections, twist or braid each" },
      { step: "Wet hair in shower" },
      { step: "Apply shampoo to scalp only, work through each section" },
      { step: "Rinse thoroughly" },
      { step: "Apply deep conditioner to each section" },
      { step: "Detangle ONE section at a time with wide-tooth comb, re-twist when done" },
      { step: "Leave conditioner 15-30 min (sit under hooded dryer or use heat cap)" },
      { step: "Rinse with cool water" },
      { step: "Apply leave-in conditioner to each section" },
      { step: "Apply styling cream or butter" },
      { step: "Apply gel or custard for hold" },
      { step: "Style as desired (twist-out, braid-out, wash-n-go)" },
      { step: "Let air dry or sit under hooded dryer" }
    );
  }

  // Wavy hair wash day
  if (hairType === 'wavy') {
    routine.push(
      { step: "Wet hair with warm water" },
      { step: "Apply shampoo to scalp, massage, rinse" },
      { step: "Apply conditioner mid-length to ends" },
      { step: "Detangle with fingers or wide-tooth comb" },
      { step: "Rinse with cool water" },
      { step: "Squeeze out excess water" },
      { step: "Apply wave cream or mousse to soaking wet hair" },
      { step: "Scrunch upward to encourage wave pattern" },
      { step: "Plop in microfiber towel for 10 min" },
      { step: "Air dry or diffuse on low" },
      { step: "Optional: Scrunch in light gel for hold" }
    );
  }

  return routine;
}

export function getRelevantHacks(input: RoutineGeneratorInput): string[] {
  const { hairType, quizAnswers } = input;
  const hacks: string[] = [];

  // Universal hacks
  hacks.push("Sleep on silk/satin pillowcase to reduce friction and breakage");
  hacks.push("Never brush curly/wavy hair when dry - only detangle when wet with conditioner in");

  // Hair type specific hacks
  if (hairType === 'curly' || hairType === 'coily') {
    hacks.push("Pineapple method for sleep: High loose ponytail on top of head");
    hacks.push("Refresh day 2-3 hair: Spray with water, scrunch in a tiny bit of gel");
    hacks.push("Plop in microfiber towel after washing - never rub with regular towel");
    if (quizAnswers.porosity === 'low') {
      hacks.push("Low porosity hack: Use heat (steam, hooded dryer) to help products penetrate");
    }
    if (quizAnswers.porosity === 'high') {
      hacks.push("High porosity hack: Always seal with oil after leave-in. Use protein treatments monthly.");
    }
  }

  if (hairType === 'straight') {
    hacks.push("Dry shampoo at night (not morning) for better oil absorption");
    hacks.push("Blow dry upside down for maximum volume");
    if (quizAnswers.straight_concern === 'greasy_roots') {
      hacks.push("Scalp retraining: Extend time between washes by 1 day each week");
    }
  }

  if (hairType === 'wavy') {
    hacks.push("Scrunch don't brush - brushing kills wave pattern");
    hacks.push("Diffuse upside down for volume");
    hacks.push("Braid damp hair before bed for heatless waves");
  }

  if (hairType === 'coily') {
    hacks.push("LOC method: Leave-in, Oil, Cream (or LCO depending on porosity)");
    hacks.push("Weekly protein treatments for strength");
    hacks.push("Protective styles are your friend for length retention");
  }

  return hacks;
}

export function getWSUSpecificTips(input: RoutineGeneratorInput): string[] {
  const tips: string[] = [];

  tips.push("Pullman water is HARD. Consider a shower filter attachment (~$20 on Amazon). Hard water causes buildup and dryness.");
  tips.push("Dorm hack: Keep a spray bottle with water + leave-in for quick refreshes between classes");
  tips.push("Gym on campus? Keep travel-size products in your gym bag for post-workout refresh");
  tips.push("Winter in Pullman is DRY. Double up on moisturizing products October-March");
  tips.push("Buy in bulk at Walmart or Target in Pullman for budget products. Amazon subscribe & save for mid/premium products.");

  if (input.quizAnswers.activity_level === 'very_active' || input.quizAnswers.activity_level === 'athlete') {
    tips.push("Don't wash hair after every workout. Co-wash or water rinse instead. Full wash 2-3x per week max.");
  }

  tips.push("Stressed about finals? Stress = hair shedding. Keep taking care of your hair even when busy.");

  return tips;
}

function calculateTime(morningRoutine: RoutineStep[], washDayRoutine: RoutineStep[]): { morning: number; washDay: number } {
  // Estimate based on number of steps
  const morningTime = morningRoutine.length * 1.5;
  const washDayTime = washDayRoutine.length * 3;

  return {
    morning: Math.round(morningTime),
    washDay: Math.round(washDayTime)
  };
}

export function generateRoutine(input: RoutineGeneratorInput): GeneratedRoutine {
  // 1. Create unique profile ID
  const profileId = createProfileId(input);

  // 2. Identify specific challenges
  const challenge = identifyChallenge(input);

  // 3. Build routines
  const morningRoutine = buildMorningRoutine(input);
  const washDayRoutine = buildWashDayRoutine(input);

  // 4. Select products
  const products = getRecommendedProducts(
    input.hairType as any,
    input.hairGoals,
    input.budget
  );

  // 5. Get hacks and tips
  const hacks = getRelevantHacks(input);
  const wsuTips = getWSUSpecificTips(input);

  // 6. Calculate time and cost
  const estimatedTime = calculateTime(morningRoutine, washDayRoutine);
  const monthlyCost = Math.round(calculateMonthlyCost(products));

  return {
    profileId,
    challenge,
    morningRoutine,
    washDayRoutine,
    products,
    hacks,
    wsuTips,
    estimatedTime,
    monthlyCost
  };
}
