/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';
import {
  BookOpen,
  CheckCircle2,
  Code2,
  Globe,
  MapPin,
  Phone,
  X,
} from 'lucide-react';
import { GOTHENBURG_SERVICES } from './data/hejGoteborgData';
import { EMERGENCY_CONTACTS, UI_TEXT } from './data/translations';
import { AppLanguage, AppTab, GothenburgService } from './types/hejGoteborg';
import { ChecklistTab } from './components/ChecklistTab';
import { GlossaryTab } from './components/GlossaryTab';
import { ServicesTab } from './components/ServicesTab';
import { AndroidCodeTab } from './components/AndroidCodeTab';

const STORAGE_KEYS = {
  language: 'hej_gbg_language_v1',
  completed: 'hej_gbg_completed_steps_v1',
  notes: 'hej_gbg_step_notes_v1',
  favorites: 'hej_gbg_glossary_favs_v1',
  userServices: 'hej_gbg_user_services_v1',
};

const LANGUAGE_OPTIONS: { id: AppLanguage; short: string; label: string }[] = [
  { id: 'hr', short: 'HR', label: 'HR · Hrvatski' },
  { id: 'en', short: 'EN', label: 'EN · English' },
  { id: 'sv', short: 'SV', label: 'SV · Svenska' },
];

export default function App() {
  const [language, setLanguage] = useState<AppLanguage>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.language);
      if (saved === 'hr' || saved === 'en' || saved === 'sv') return saved;
    } catch {
      // Ignore storage errors
    }
    return 'hr';
  });

  const [activeTab, setActiveTab] = useState<AppTab>('checklist');
  const [showEmergencySheet, setShowEmergencySheet] = useState(false);

  const [completedIds, setCompletedIds] = useState<string[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.completed);
      return raw ? JSON.parse(raw) : ['step-personnummer'];
    } catch {
      return ['step-personnummer'];
    }
  });

  const [stepNotes, setStepNotes] = useState<Record<string, string>>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.notes);
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  });

  const [favoriteGlossaryIds, setFavoriteGlossaryIds] = useState<string[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.favorites);
      return raw ? JSON.parse(raw) : ['g-personnummer', 'g-vab'];
    } catch {
      return ['g-personnummer', 'g-vab'];
    }
  });

  const [userServices, setUserServices] = useState<GothenburgService[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.userServices);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    document.documentElement.lang = language;
    try {
      localStorage.setItem(STORAGE_KEYS.language, language);
    } catch {
      // Ignore storage errors
    }
  }, [language]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.completed, JSON.stringify(completedIds));
    } catch {
      // Ignore storage errors
    }
  }, [completedIds]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.notes, JSON.stringify(stepNotes));
    } catch {
      // Ignore storage errors
    }
  }, [stepNotes]);

  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEYS.favorites,
        JSON.stringify(favoriteGlossaryIds)
      );
    } catch {
      // Ignore storage errors
    }
  }, [favoriteGlossaryIds]);

  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEYS.userServices,
        JSON.stringify(userServices)
      );
    } catch {
      // Ignore storage errors
    }
  }, [userServices]);

  const toggleComplete = (id: string) => {
    setCompletedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const updateNote = (id: string, note: string) => {
    setStepNotes((prev) => ({ ...prev, [id]: note }));
  };

  const toggleFavoriteGlossary = (id: string) => {
    setFavoriteGlossaryIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleAddService = (service: GothenburgService) => {
    setUserServices((prev) => [service, ...prev]);
  };

  const handleRemoveUserService = (id: string) => {
    setUserServices((prev) => prev.filter((s) => s.id !== id));
  };

  const allServices = [...userServices, ...GOTHENBURG_SERVICES];
  const t = UI_TEXT[language];
  const navOrder: AppTab[] = ['checklist', 'glossary', 'services', 'android'];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20 md:pb-10">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-30 h-12 md:h-16 bg-white/95 backdrop-blur-md border-b border-slate-200 px-3 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto h-full flex items-center justify-between gap-3 sm:gap-8">
          {/* Zone 1: Single text element wordmark */}
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              setActiveTab('checklist');
            }}
            className="text-base sm:text-lg font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0"
          >
            Hej Göteborg
          </a>

          {/* Zone 2: Concise single-line desktop nav links */}
          <nav
            aria-label="Glavna navigacija"
            className="hidden md:flex items-center gap-6 text-sm font-medium"
          >
            {navOrder.map((tabId) => (
              <button
                key={tabId}
                type="button"
                onClick={() => setActiveTab(tabId)}
                className={`py-1 transition-colors whitespace-nowrap shrink-0 border-b-2 ${
                  activeTab === tabId
                    ? 'text-blue-900 border-blue-900'
                    : 'text-slate-600 border-transparent hover:text-slate-900'
                }`}
              >
                {t.nav[tabId].label}
              </button>
            ))}
          </nav>

          {/* Zone 3: Language Switcher + Emergency Numbers */}
          <div className="flex items-center gap-2 shrink-0">
            <div className="relative flex items-center">
              <Globe
                aria-hidden="true"
                className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 pointer-events-none"
              />
              <select
                aria-label={t.languageLabel}
                value={language}
                onChange={(e) => setLanguage(e.target.value as AppLanguage)}
                className="min-h-[36px] md:min-h-[40px] pl-7 pr-6 py-1 text-xs font-medium text-slate-800 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-lg transition-colors appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-800"
              >
                {LANGUAGE_OPTIONS.map((opt) => (
                  <option key={opt.id} value={opt.id}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <span
                aria-hidden="true"
                className="pointer-events-none absolute right-2 text-[10px] text-slate-500"
              >
                ▾
              </span>
            </div>

            <button
              type="button"
              onClick={() => setShowEmergencySheet(true)}
              className="min-h-[36px] md:min-h-[40px] inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-blue-900 hover:bg-blue-950 rounded-lg transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-800"
            >
              <Phone className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{t.emergencyButton}</span>
              <span className="sm:hidden">112</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main id="top" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 space-y-6">
        <section className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-7">
          <p className="text-xs text-slate-500">{t.regionKicker}</p>
          <h1 className="mt-1.5 text-xl sm:text-3xl font-bold tracking-tight text-slate-900 text-balance">
            {t.hero[activeTab].heading}
          </h1>
          <p className="mt-2 text-sm sm:text-base text-slate-600 max-w-3xl leading-relaxed">
            {t.hero[activeTab].subheading}
          </p>
        </section>

        {activeTab === 'checklist' && (
          <ChecklistTab
            language={language}
            completedIds={completedIds}
            onToggleComplete={toggleComplete}
            stepNotes={stepNotes}
            onUpdateNote={updateNote}
          />
        )}

        {activeTab === 'glossary' && (
          <GlossaryTab
            language={language}
            favoriteIds={favoriteGlossaryIds}
            onToggleFavorite={toggleFavoriteGlossary}
          />
        )}

        {activeTab === 'services' && (
          <ServicesTab
            language={language}
            services={allServices}
            onAddService={handleAddService}
            onRemoveUserService={handleRemoveUserService}
          />
        )}

        {activeTab === 'android' && <AndroidCodeTab language={language} />}
      </main>

      {/* Mobile Fixed Bottom Navigation Bar */}
      <nav
        aria-label="Mobilna navigacija"
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 h-14 bg-white/95 backdrop-blur-md border-t border-slate-200 grid grid-cols-4 items-center"
      >
        <button
          type="button"
          onClick={() => setActiveTab('checklist')}
          className={`min-h-[44px] flex flex-col items-center justify-center transition-colors ${
            activeTab === 'checklist' ? 'text-blue-900' : 'text-slate-500'
          }`}
        >
          <CheckCircle2
            className="w-5 h-5"
            strokeWidth={activeTab === 'checklist' ? 2.25 : 1.75}
          />
          <span className="text-[10px] font-medium tracking-tight mt-0.5 whitespace-nowrap">
            {t.nav.checklist.shortLabel}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('glossary')}
          className={`min-h-[44px] flex flex-col items-center justify-center transition-colors ${
            activeTab === 'glossary' ? 'text-blue-900' : 'text-slate-500'
          }`}
        >
          <BookOpen
            className="w-5 h-5"
            strokeWidth={activeTab === 'glossary' ? 2.25 : 1.75}
          />
          <span className="text-[10px] font-medium tracking-tight mt-0.5 whitespace-nowrap">
            {t.nav.glossary.shortLabel}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('services')}
          className={`min-h-[44px] flex flex-col items-center justify-center transition-colors ${
            activeTab === 'services' ? 'text-blue-900' : 'text-slate-500'
          }`}
        >
          <MapPin
            className="w-5 h-5"
            strokeWidth={activeTab === 'services' ? 2.25 : 1.75}
          />
          <span className="text-[10px] font-medium tracking-tight mt-0.5 whitespace-nowrap">
            {t.nav.services.shortLabel}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('android')}
          className={`min-h-[44px] flex flex-col items-center justify-center transition-colors ${
            activeTab === 'android' ? 'text-blue-900' : 'text-slate-500'
          }`}
        >
          <Code2
            className="w-5 h-5"
            strokeWidth={activeTab === 'android' ? 2.25 : 1.75}
          />
          <span className="text-[10px] font-medium tracking-tight mt-0.5 whitespace-nowrap">
            {t.nav.android.shortLabel}
          </span>
        </button>
      </nav>

      {/* Emergency & Essential Numbers Bottom Sheet / Modal */}
      {showEmergencySheet && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-950/50 backdrop-blur-sm p-0 sm:p-4"
          onClick={() => setShowEmergencySheet(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="emergency-sheet-title"
            onClick={(e) => e.stopPropagation()}
            className="w-full sm:max-w-lg bg-white rounded-t-3xl sm:rounded-2xl border border-slate-200 max-h-[85vh] flex flex-col overflow-hidden"
          >
            <div className="sm:hidden pt-3 pb-1">
              <div className="w-10 h-1.5 bg-slate-300 rounded-full mx-auto" />
            </div>

            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <h2 id="emergency-sheet-title" className="text-lg font-bold text-slate-900">
                {t.emergencyTitle}
              </h2>
              <button
                type="button"
                onClick={() => setShowEmergencySheet(false)}
                aria-label={t.close}
                className="min-h-[44px] min-w-[44px] flex items-center justify-center -mr-2 text-slate-500 hover:text-slate-900 rounded-xl"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="divide-y divide-slate-100 overflow-y-auto px-6 py-2">
              {EMERGENCY_CONTACTS.map((item) => (
                <div
                  key={item.number}
                  className="py-4 flex items-center justify-between gap-4"
                >
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-slate-900">
                      {item.title[language]}
                    </p>
                    <p className="mt-0.5 text-xs text-slate-600 leading-relaxed">
                      {item.desc[language]}
                    </p>
                  </div>
                  <a
                    href={`tel:${item.number.replace(/[^+\d]/g, '')}`}
                    className="min-h-[44px] inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-mono font-semibold text-blue-900 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-xl whitespace-nowrap shrink-0"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>{item.number}</span>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
