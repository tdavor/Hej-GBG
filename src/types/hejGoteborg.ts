export type AppLanguage = 'hr' | 'en' | 'sv';

export type LocalizedText = Record<AppLanguage, string>;
export type LocalizedList = Record<AppLanguage, string[]>;

export type AppTab = 'checklist' | 'glossary' | 'services' | 'android';

export type StepPhase = 'urgent' | 'banking_work' | 'city_living';

export interface ChecklistStep {
  id: string;
  order: number;
  title: LocalizedText;
  swedishTerm: string;
  phase: StepPhase;
  phaseLabel: LocalizedText;
  estimatedDays: LocalizedText;
  summary: LocalizedText;
  locationName: string;
  locationAddress: string;
  tramLines: LocalizedText;
  documentsRequired: LocalizedList;
  practicalTip: LocalizedText;
  officialUrl: string;
}

export type GlossaryCategory = 'all' | 'bureaucracy' | 'health' | 'work' | 'housing';

export interface GlossaryEntry {
  id: string;
  swedish: string;
  pronunciation: string;
  translation: LocalizedText;
  category: Exclude<GlossaryCategory, 'all'>;
  categoryLabel: LocalizedText;
  explanation: LocalizedText;
  exampleSv: string;
  exampleTranslation: LocalizedText;
}

export type ServiceCategory =
  | 'all'
  | 'institution'
  | 'health'
  | 'auto'
  | 'legal_finance'
  | 'everyday';

export interface GothenburgService {
  id: string;
  name: LocalizedText;
  category: Exclude<ServiceCategory, 'all'>;
  categoryLabel: LocalizedText;
  neighborhood: string;
  address: string;
  tramInfo: LocalizedText;
  languages: LocalizedText;
  phone?: string;
  website?: string;
  description: LocalizedText;
  isUserAdded?: boolean;
}

export interface EmergencyContact {
  number: string;
  title: LocalizedText;
  desc: LocalizedText;
}

export interface KotlinSourceFile {
  filename: string;
  packagePath: string;
  description: LocalizedText;
  code: string;
}
