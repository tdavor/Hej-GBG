export type CategoryId =
  | 'all'
  | 'transport'
  | 'coast_weather'
  | 'housing_community'
  | 'city_commerce';

export type ComplexityTier = 'weekend_mvp' | 'medium_project' | 'advanced_product';

export interface MvpFeature {
  id: string;
  label: string;
  phase: 'MVP' | 'v2';
  effortHours: number;
}

export interface ApiSource {
  name: string;
  provider: string;
  endpointHint: string;
  authType: string;
  freeTier: string;
  usageInApp: string;
}

export interface AppIdea {
  id: string;
  title: string;
  subtitle: string;
  category: Exclude<CategoryId, 'all'>;
  categoryLabel: string;
  complexity: ComplexityTier;
  complexityLabel: string;
  mvpWeeks: number;
  competitionLevel: 'Niska' | 'Srednja' | 'Visoka';
  demandSignal: string;
  neighborhoods: string[];
  problemStatement: string;
  androidAdvantage: string;
  targetAudience: string;
  techStack: string[];
  kotlinPackages: string[];
  apis: ApiSource[];
  features: MvpFeature[];
  monetization: string[];
  firstStepToday: string;
}

export interface CustomSpecConfig {
  appName: string;
  focusArea: string;
  targetUser: string;
  androidCapability: string;
  experienceLevel: 'Početnik' | 'Srednji' | 'Napredni';
  includeWearOs: boolean;
  includeWidget: boolean;
}
