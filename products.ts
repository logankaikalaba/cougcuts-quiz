export type ProductCategory = 'shampoo' | 'conditioner' | 'treatment' | 'styler' | 'oil' | 'tool';
export type BudgetTier = 'low' | 'mid' | 'premium';
export type HairType = 'curly' | 'straight' | 'coily' | 'wavy';

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: ProductCategory;
  price: number;
  buyLink: string;
  tier: BudgetTier;
  hairTypes: HairType[];
  concerns: string[];
  description: string;
  usage: string;
  lastingTime: number; // months
}

export const products: Product[] = [
  // CURLY HAIR PRODUCTS
  // Budget-friendly curly hair products
  {
    id: 'nymct_shampoo',
    name: "Not Your Mother's Curl Talk Shampoo",
    brand: "Not Your Mother's",
    category: 'shampoo',
    price: 6.99,
    buyLink: 'https://amazon.com/dp/B07L8QXJVL',
    tier: 'low',
    hairTypes: ['curly', 'wavy'],
    concerns: ['definition', 'frizz'],
    description: 'Sulfate-free gentle cleansing shampoo',
    usage: 'Apply to scalp, massage gently, rinse thoroughly. Use 2-3x per week.',
    lastingTime: 2
  },
  {
    id: 'nymct_conditioner',
    name: "Not Your Mother's Curl Talk Conditioner",
    brand: "Not Your Mother's",
    category: 'conditioner',
    price: 6.99,
    buyLink: 'https://amazon.com/dp/B07L8QXKPL',
    tier: 'low',
    hairTypes: ['curly', 'wavy'],
    concerns: ['moisture', 'frizz', 'definition'],
    description: 'Moisturizing conditioner for defined curls',
    usage: 'Apply from mid-length to ends, detangle with fingers, leave 3-5 min, rinse.',
    lastingTime: 2
  },
  {
    id: 'shea_moisture_curl_mousse',
    name: 'Shea Moisture Curl Mousse',
    brand: 'Shea Moisture',
    category: 'styler',
    price: 9.99,
    buyLink: 'https://amazon.com/dp/B00UGGUHMG',
    tier: 'low',
    hairTypes: ['curly'],
    concerns: ['definition', 'frizz', 'volume'],
    description: 'Coconut & hibiscus curl enhancing mousse',
    usage: 'Apply to damp hair, scrunch upward. Air dry or diffuse.',
    lastingTime: 3
  },
  {
    id: 'la_looks_gel',
    name: 'LA Looks Extreme Sport Gel',
    brand: 'LA Looks',
    category: 'styler',
    price: 3.49,
    buyLink: 'https://amazon.com/dp/B000V39K00',
    tier: 'low',
    hairTypes: ['curly', 'wavy'],
    concerns: ['frizz', 'definition'],
    description: 'Strong hold gel for curl definition',
    usage: 'Apply to soaking wet hair, scrunch. Let dry completely, then scrunch out the crunch.',
    lastingTime: 3
  },

  // Mid-tier curly hair products
  {
    id: 'ouidad_shampoo',
    name: 'Ouidad VitalCurl+ Shampoo',
    brand: 'Ouidad',
    category: 'shampoo',
    price: 26.00,
    buyLink: 'https://amazon.com/dp/B01N0YVZQ9',
    tier: 'mid',
    hairTypes: ['curly'],
    concerns: ['moisture', 'definition'],
    description: 'Curl-specific gentle cleansing shampoo',
    usage: 'Massage into scalp, let sit 1 minute, rinse. Use 1-2x per week.',
    lastingTime: 3
  },
  {
    id: 'curlsmith_conditioner',
    name: 'Curlsmith Curl Quenching Conditioning Wash',
    brand: 'Curlsmith',
    category: 'conditioner',
    price: 28.00,
    buyLink: 'https://amazon.com/dp/B07Q2QKLXW',
    tier: 'mid',
    hairTypes: ['curly', 'coily'],
    concerns: ['moisture', 'frizz'],
    description: 'Co-wash that cleanses and conditions',
    usage: 'Use as shampoo alternative. Massage into scalp and hair, detangle, rinse.',
    lastingTime: 2
  },
  {
    id: 'kinky_curly_custard',
    name: 'Kinky-Curly Curling Custard',
    brand: 'Kinky-Curly',
    category: 'styler',
    price: 18.00,
    buyLink: 'https://amazon.com/dp/B001AWDKWU',
    tier: 'mid',
    hairTypes: ['curly', 'coily'],
    concerns: ['definition', 'frizz'],
    description: 'Natural curl defining gel',
    usage: 'Apply to soaking wet hair in sections. Air dry or diffuse.',
    lastingTime: 2.5
  },

  // Premium curly hair products
  {
    id: 'devacurl_shampoo',
    name: 'DevaCurl No-Poo Cleanser',
    brand: 'DevaCurl',
    category: 'shampoo',
    price: 28.00,
    buyLink: 'https://amazon.com/dp/B000PKEJGQ',
    tier: 'premium',
    hairTypes: ['curly'],
    concerns: ['moisture', 'frizz'],
    description: 'Zero-lather conditioning cleanser',
    usage: 'Massage into scalp and roots, rinse thoroughly. Weekly use.',
    lastingTime: 3
  },

  // STRAIGHT HAIR PRODUCTS
  // Budget straight hair
  {
    id: 'dove_shampoo_volume',
    name: 'Dove Volume & Fullness Shampoo',
    brand: 'Dove',
    category: 'shampoo',
    price: 5.99,
    buyLink: 'https://amazon.com/dp/B005VM5ZDO',
    tier: 'low',
    hairTypes: ['straight'],
    concerns: ['volume', 'no_volume'],
    description: 'Lightweight volumizing shampoo',
    usage: 'Use daily or as needed. Focus on roots, rinse well.',
    lastingTime: 2
  },
  {
    id: 'tresemme_heat_protect',
    name: 'TRESemmé Thermal Creations Heat Tamer Spray',
    brand: 'TRESemmé',
    category: 'treatment',
    price: 5.49,
    buyLink: 'https://amazon.com/dp/B001ECQ4XQ',
    tier: 'low',
    hairTypes: ['straight', 'wavy'],
    concerns: ['damage', 'heat_damage'],
    description: 'Heat protection up to 450°F',
    usage: 'Spray on damp hair before blow drying or heat styling.',
    lastingTime: 3
  },
  {
    id: 'ogx_argan_oil',
    name: 'OGX Renewing Argan Oil of Morocco',
    brand: 'OGX',
    category: 'oil',
    price: 7.99,
    buyLink: 'https://amazon.com/dp/B004FEEJ1E',
    tier: 'low',
    hairTypes: ['straight', 'wavy'],
    concerns: ['damage', 'frizz'],
    description: 'Lightweight argan oil for shine',
    usage: 'Apply 1-2 drops to ends when damp or dry.',
    lastingTime: 4
  },

  // Mid-tier straight hair
  {
    id: 'olaplex_no4_shampoo',
    name: 'Olaplex No. 4 Bond Maintenance Shampoo',
    brand: 'Olaplex',
    category: 'shampoo',
    price: 30.00,
    buyLink: 'https://amazon.com/dp/B07RPRN8RK',
    tier: 'mid',
    hairTypes: ['straight', 'wavy'],
    concerns: ['damage', 'bleached', 'breaking'],
    description: 'Bond-building repair shampoo',
    usage: 'Use 2-3x per week. Lather, leave 2 min, rinse.',
    lastingTime: 3
  },
  {
    id: 'living_proof_dry_shampoo',
    name: 'Living Proof Perfect Hair Day Dry Shampoo',
    brand: 'Living Proof',
    category: 'treatment',
    price: 25.00,
    buyLink: 'https://amazon.com/dp/B00I3EFXDC',
    tier: 'mid',
    hairTypes: ['straight', 'wavy'],
    concerns: ['greasy_roots', 'volume'],
    description: 'Triple-action dry shampoo',
    usage: 'Shake well, spray on roots, wait 30 sec, massage in.',
    lastingTime: 3
  },

  // Premium straight hair
  {
    id: 'kerastase_resistance',
    name: 'Kérastase Resistance Bain Force Architecte',
    brand: 'Kérastase',
    category: 'shampoo',
    price: 38.00,
    buyLink: 'https://amazon.com/dp/B00AYL8A52',
    tier: 'premium',
    hairTypes: ['straight'],
    concerns: ['damage', 'breaking'],
    description: 'Reconstructing shampoo for damaged hair',
    usage: 'Apply to wet hair, massage, rinse. Use 2-3x per week.',
    lastingTime: 3
  },

  // COILY HAIR PRODUCTS
  // Budget coily hair
  {
    id: 'cantu_shampoo',
    name: 'Cantu Shea Butter Sulfate-Free Cleansing Cream Shampoo',
    brand: 'Cantu',
    category: 'shampoo',
    price: 5.99,
    buyLink: 'https://amazon.com/dp/B01LTIAWE6',
    tier: 'low',
    hairTypes: ['coily', 'curly'],
    concerns: ['moisture', 'frizz'],
    description: 'Gentle sulfate-free cleanser',
    usage: 'Massage into wet hair and scalp. Rinse thoroughly.',
    lastingTime: 2
  },
  {
    id: 'shea_moisture_jbco_masque',
    name: 'Shea Moisture Jamaican Black Castor Oil Strengthen & Restore Treatment Masque',
    brand: 'Shea Moisture',
    category: 'treatment',
    price: 11.99,
    buyLink: 'https://amazon.com/dp/B00PKHSH76',
    tier: 'low',
    hairTypes: ['coily', 'curly'],
    concerns: ['damage_repair', 'breaking', 'moisture'],
    description: 'Deep conditioning treatment',
    usage: 'Apply to clean, damp hair. Leave 15-30 min. Rinse.',
    lastingTime: 2
  },
  {
    id: 'eco_styler_gel',
    name: 'Eco Styler Olive Oil Gel',
    brand: 'Eco Styler',
    category: 'styler',
    price: 4.99,
    buyLink: 'https://amazon.com/dp/B0000AZMAY',
    tier: 'low',
    hairTypes: ['coily', 'curly'],
    concerns: ['definition', 'frizz'],
    description: 'Maximum hold styling gel',
    usage: 'Apply to damp hair for slicked styles or definition.',
    lastingTime: 4
  },

  // Mid-tier coily hair
  {
    id: 'mielle_babassu_shampoo',
    name: 'Mielle Organics Babassu Oil Mint Deep Conditioning Shampoo',
    brand: 'Mielle Organics',
    category: 'shampoo',
    price: 12.99,
    buyLink: 'https://amazon.com/dp/B01MRZWHWH',
    tier: 'mid',
    hairTypes: ['coily'],
    concerns: ['scalp_health', 'moisture'],
    description: 'Cleansing and conditioning shampoo',
    usage: 'Massage into scalp, work through hair, rinse.',
    lastingTime: 2.5
  },
  {
    id: 'camille_rose_moisture_milk',
    name: 'Camille Rose Almond Jai Twisting Butter',
    brand: 'Camille Rose',
    category: 'styler',
    price: 18.99,
    buyLink: 'https://amazon.com/dp/B00HQ3VJNQ',
    tier: 'mid',
    hairTypes: ['coily', 'curly'],
    concerns: ['moisture', 'definition'],
    description: 'Rich twisting and styling butter',
    usage: 'Apply to damp hair in sections for twist-outs or wash-n-gos.',
    lastingTime: 2
  },

  // Premium coily hair
  {
    id: 'pattern_treatment_mask',
    name: 'Pattern Intensive Conditioner',
    brand: 'Pattern Beauty',
    category: 'treatment',
    price: 25.00,
    buyLink: 'https://amazon.com/dp/B083XQR1PF',
    tier: 'premium',
    hairTypes: ['coily', 'curly'],
    concerns: ['moisture', 'damage_repair'],
    description: 'Deep conditioning treatment',
    usage: 'Apply to clean hair. Leave 20-30 min. Rinse thoroughly.',
    lastingTime: 2
  },

  // WAVY HAIR PRODUCTS
  // Budget wavy hair
  {
    id: 'garnier_fructis_curl_mousse',
    name: 'Garnier Fructis Curl Construct Mousse',
    brand: 'Garnier Fructis',
    category: 'styler',
    price: 4.99,
    buyLink: 'https://amazon.com/dp/B001ET76EY',
    tier: 'low',
    hairTypes: ['wavy'],
    concerns: ['definition', 'frizz'],
    description: 'Curl enhancing mousse',
    usage: 'Apply to damp hair, scrunch. Air dry or diffuse.',
    lastingTime: 3
  },
  {
    id: 'aussie_sea_spray',
    name: 'Aussie Beach Mate Sea Salt Spray',
    brand: 'Aussie',
    category: 'styler',
    price: 5.99,
    buyLink: 'https://amazon.com/dp/B01NCOSDD1',
    tier: 'low',
    hairTypes: ['wavy', 'straight'],
    concerns: ['volume', 'beachy'],
    description: 'Texturizing sea salt spray',
    usage: 'Spray on damp or dry hair. Scrunch for texture.',
    lastingTime: 3
  },

  // Mid-tier wavy hair
  {
    id: 'bumble_surf_spray',
    name: 'Bumble and bumble Surf Spray',
    brand: 'Bumble and bumble',
    category: 'styler',
    price: 27.00,
    buyLink: 'https://amazon.com/dp/B000RI5EXM',
    tier: 'mid',
    hairTypes: ['wavy'],
    concerns: ['beachy', 'volume', 'definition'],
    description: 'Beach wave texturizing spray',
    usage: 'Spray throughout damp hair. Air dry or diffuse.',
    lastingTime: 3
  },
  {
    id: 'curlsmith_wave_gel',
    name: 'Curlsmith Weightless Air Dry Cream',
    brand: 'Curlsmith',
    category: 'styler',
    price: 26.00,
    buyLink: 'https://amazon.com/dp/B084RGKQRW',
    tier: 'mid',
    hairTypes: ['wavy', 'curly'],
    concerns: ['frizz', 'definition', 'low_maintenance'],
    description: 'Lightweight wave enhancing cream',
    usage: 'Apply to soaking wet hair. Air dry for best results.',
    lastingTime: 2.5
  },

  // Premium wavy hair
  {
    id: 'ouai_wave_spray',
    name: 'OUAI Wave Spray',
    brand: 'OUAI',
    category: 'styler',
    price: 28.00,
    buyLink: 'https://amazon.com/dp/B01N4N8XCC',
    tier: 'premium',
    hairTypes: ['wavy'],
    concerns: ['beachy', 'volume', 'polished'],
    description: 'Rice protein wave spray',
    usage: 'Spray on damp hair. Scrunch or braid for waves.',
    lastingTime: 3
  },

  // UNIVERSAL PRODUCTS (work for multiple hair types)
  {
    id: 'olaplex_no3',
    name: 'Olaplex No. 3 Hair Perfector',
    brand: 'Olaplex',
    category: 'treatment',
    price: 30.00,
    buyLink: 'https://amazon.com/dp/B00SNM5US4',
    tier: 'mid',
    hairTypes: ['straight', 'wavy', 'curly', 'coily'],
    concerns: ['damage_repair', 'breaking', 'bleached'],
    description: 'At-home bond building treatment',
    usage: 'Apply to damp hair before shampooing. Leave 10+ min. Shampoo and condition.',
    lastingTime: 3
  },
  {
    id: 'the_ordinary_hair_serum',
    name: 'The Ordinary Multi-Peptide Serum for Hair Density',
    brand: 'The Ordinary',
    category: 'treatment',
    price: 15.90,
    buyLink: 'https://amazon.com/dp/B07ZPZWJ5G',
    tier: 'mid',
    hairTypes: ['straight', 'wavy', 'curly', 'coily'],
    concerns: ['growth', 'scalp_health'],
    description: 'Hair density serum',
    usage: 'Apply directly to scalp daily. Massage in. Do not rinse.',
    lastingTime: 2
  },
  {
    id: 'microfiber_towel',
    name: 'Turbie Twist Microfiber Hair Towel',
    brand: 'Turbie Twist',
    category: 'tool',
    price: 7.99,
    buyLink: 'https://amazon.com/dp/B000FLDCHS',
    tier: 'low',
    hairTypes: ['straight', 'wavy', 'curly', 'coily'],
    concerns: ['frizz', 'damage'],
    description: 'Microfiber hair drying towel',
    usage: 'After washing, wrap hair to absorb excess water without friction.',
    lastingTime: 24
  },
  {
    id: 'wide_tooth_comb',
    name: 'Wide Tooth Detangling Comb',
    brand: 'Generic',
    category: 'tool',
    price: 4.99,
    buyLink: 'https://amazon.com/dp/B075ZPQQRV',
    tier: 'low',
    hairTypes: ['wavy', 'curly', 'coily'],
    concerns: ['tangles', 'damage'],
    description: 'Gentle detangling comb',
    usage: 'Use on wet, conditioned hair to detangle gently from ends to roots.',
    lastingTime: 24
  },
  {
    id: 'silk_pillowcase',
    name: 'Mulberry Silk Pillowcase',
    brand: 'Various',
    category: 'tool',
    price: 19.99,
    buyLink: 'https://amazon.com/dp/B07VQBFKBM',
    tier: 'mid',
    hairTypes: ['straight', 'wavy', 'curly', 'coily'],
    concerns: ['frizz', 'damage'],
    description: 'Silk pillowcase to reduce friction',
    usage: 'Sleep on silk to prevent breakage and frizz. Wash weekly.',
    lastingTime: 36
  }
];

// Helper function to get products by criteria
export function getProductsByCriteria(
  hairType: HairType,
  concerns: string[],
  budget: BudgetTier,
  category?: ProductCategory
): Product[] {
  return products.filter(p => {
    const matchesHairType = p.hairTypes.includes(hairType);
    const matchesBudget = p.tier === budget;
    const matchesConcerns = concerns.some(c => p.concerns.includes(c));
    const matchesCategory = category ? p.category === category : true;

    return matchesHairType && matchesBudget && matchesConcerns && matchesCategory;
  });
}

// Get recommended product set for a routine
export function getRecommendedProducts(
  hairType: HairType,
  concerns: string[],
  budget: BudgetTier
): Product[] {
  const recommended: Product[] = [];

  // Get one product from each essential category
  const shampoo = getProductsByCriteria(hairType, concerns, budget, 'shampoo')[0];
  const conditioner = getProductsByCriteria(hairType, concerns, budget, 'conditioner')[0];
  const styler = getProductsByCriteria(hairType, concerns, budget, 'styler')[0];

  if (shampoo) recommended.push(shampoo);
  if (conditioner) recommended.push(conditioner);
  if (styler) recommended.push(styler);

  // Add treatment if needed for damage/repair concerns
  if (concerns.includes('damage_repair') || concerns.includes('breaking') || concerns.includes('bleached')) {
    const treatment = getProductsByCriteria(hairType, concerns, budget, 'treatment')[0];
    if (treatment) recommended.push(treatment);
  }

  // Add oil for moisture concerns
  if (concerns.includes('moisture') || concerns.includes('frizz')) {
    const oil = getProductsByCriteria(hairType, ['moisture', 'frizz'], budget, 'oil')[0];
    if (oil) recommended.push(oil);
  }

  // Add essential tools
  const microfiber = products.find(p => p.id === 'microfiber_towel');
  if (microfiber) recommended.push(microfiber);

  if (hairType === 'curly' || hairType === 'coily' || hairType === 'wavy') {
    const comb = products.find(p => p.id === 'wide_tooth_comb');
    if (comb) recommended.push(comb);
  }

  return recommended;
}

// Calculate monthly cost
export function calculateMonthlyCost(products: Product[]): number {
  return products.reduce((total, p) => {
    if (p.category === 'tool') return total; // Tools are one-time purchases
    return total + (p.price / p.lastingTime);
  }, 0);
}
