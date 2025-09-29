export interface FilterOption {
  label: string;
  value: string;
}

export const CREDENTIALS_OPTIONS: FilterOption[] = [
  { label: 'MD', value: 'MD' },
  { label: 'MSW', value: 'MSW' },
  { label: 'PhD', value: 'PhD' }
];

export const EXPERIENCE_OPTIONS: FilterOption[] = [
  { label: '1-3', value: '1-3' },
  { label: '4-8', value: '4-8' },
  { label: '8+', value: '8+' }
];

export const SPECIALTIES_OPTIONS: FilterOption[] = [
  { label: "Personal Growth", value: "Personal growth" },
  { label: "Substance Use/Abuse", value: "Substance use/abuse" },
  { label: "Pediatrics", value: "Pediatrics" },
  { label: "Women's Issues", value: "Women's issues (post-partum, infertility, family planning)" },
  { label: "Coaching & Wellness", value: "Coaching (leadership, career, academic and wellness)" },
  { label: "Life Coaching", value: "Life coaching" },
  { label: "OCD", value: "Obsessive-compulsive disorders" },
  { label: "ADHD Testing", value: "Neuropsychological evaluations & testing (ADHD testing)" },
  { label: "ADHD", value: "Attention and Hyperactivity (ADHD)" },
  { label: "Personality Disorders", value: "Personality disorders" },
  { label: "Chronic Pain", value: "Chronic pain" },
  { label: "Weight Loss & Nutrition", value: "Weight loss & nutrition" },
  { label: "Eating Disorders", value: "Eating disorders" },
  { label: "Diabetic Diet", value: "Diabetic Diet and nutrition" },
  { label: "Sleep Issues", value: "Sleep issues" },
  { label: "Schizophrenia", value: "Schizophrenia and psychotic disorders" },
  { label: "Medication/Prescribing", value: "Medication/Prescribing" },
  { label: "Suicide History", value: "Suicide History/Attempts" },
  { label: "General Mental Health", value: "General Mental Health (anxiety, depression, stress, grief, life transitions)" },
  { label: "Men's Issues", value: "Men's issues" },
  { label: "Relationship Issues", value: "Relationship Issues (family, friends, couple, etc)" },
  { label: "Trauma & PTSD", value: "Trauma & PTSD" },
];