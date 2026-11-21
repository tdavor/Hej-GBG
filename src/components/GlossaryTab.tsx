import { useState } from 'react';
import { Bookmark, Search, Volume2 } from 'lucide-react';
import { GLOSSARY_ENTRIES } from '../data/hejGoteborgData';
import { UI_TEXT } from '../data/translations';
import { AppLanguage, GlossaryCategory } from '../types/hejGoteborg';

interface GlossaryTabProps {
  language: AppLanguage;
  favoriteIds: string[];
  onToggleFavorite: (id: string) => void;
}

export function GlossaryTab({
  language,
  favoriteIds,
  onToggleFavorite,
}: GlossaryTabProps) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<GlossaryCategory | 'favorites'>('all');
  const [speakingId, setSpeakingId] = useState<string | null>(null);

  const t = UI_TEXT[language].glossary;

  const categoryTabs: { id: GlossaryCategory | 'favorites'; label: string }[] = [
    { id: 'all', label: t.tabs.all },
    { id: 'favorites', label: t.tabs.favorites },
    { id: 'bureaucracy', label: t.tabs.bureaucracy },
    { id: 'work', label: t.tabs.work },
    { id: 'health', label: t.tabs.health },
    { id: 'housing', label: t.tabs.housing },
  ];

  const filtered = GLOSSARY_ENTRIES.filter((entry) => {
    if (category === 'favorites' && !favoriteIds.includes(entry.id)) return false;
    if (
      category !== 'all' &&
      category !== 'favorites' &&
      entry.category !== category
    ) {
      return false;
    }
    const q = query.trim().toLowerCase();
    if (!q) return true;
    return (
      entry.swedish.toLowerCase().includes(q) ||
      entry.translation[language].toLowerCase().includes(q) ||
      entry.explanation[language].toLowerCase().includes(q)
    );
  });

  const handleSpeakSwedish = (id: string, text: string) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'sv-SE';
    utterance.rate = 0.9;
    utterance.onend = () => setSpeakingId(null);
    utterance.onerror = () => setSpeakingId(null);
    setSpeakingId(id);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t.searchPlaceholder}
            className="w-full min-h-[44px] pl-10 pr-4 py-2 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-800"
          />
        </div>

        <p className="text-xs text-slate-500 font-mono tabular-nums">
          {t.shownCount(filtered.length, GLOSSARY_ENTRIES.length)}
        </p>
      </div>

      <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
        {categoryTabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setCategory(tab.id)}
            className={`min-h-[44px] px-4 py-2 text-xs font-medium rounded-xl transition-colors whitespace-nowrap shrink-0 ${
              category === tab.id
                ? 'bg-slate-900 text-white'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center">
          <p className="text-base font-semibold text-slate-900">{t.emptyTitle}</p>
          <p className="mt-1 text-sm text-slate-600">{t.emptySubtitle}</p>
          <button
            type="button"
            onClick={() => {
              setQuery('');
              setCategory('all');
            }}
            className="mt-4 min-h-[44px] px-4 py-2 text-xs font-medium text-white bg-blue-900 hover:bg-blue-950 rounded-xl"
          >
            {t.resetButton}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((entry) => {
            const isFav = favoriteIds.includes(entry.id);
            const isSpeaking = speakingId === entry.id;
            return (
              <article
                key={entry.id}
                className="bg-white border border-slate-200 rounded-2xl p-5 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-xs text-slate-500">
                        <span className="font-medium text-blue-900">
                          {entry.categoryLabel[language]}
                        </span>
                        <span className="mx-1.5" aria-hidden="true">
                          ·
                        </span>
                        <span>
                          {t.pronunciationLabel}: /{entry.pronunciation}/
                        </span>
                      </p>
                      <h3 className="mt-1 text-lg font-bold text-slate-900">
                        {entry.swedish}
                      </h3>
                      <p className="text-sm font-medium text-slate-700">
                        {entry.translation[language]}
                      </p>
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        type="button"
                        onClick={() => handleSpeakSwedish(entry.id, entry.swedish)}
                        aria-label={t.listenAria(entry.swedish)}
                        className={`min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl border transition-colors ${
                          isSpeaking
                            ? 'bg-blue-50 border-blue-200 text-blue-900'
                            : 'bg-white border-slate-200 text-slate-500 hover:text-slate-900'
                        }`}
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => onToggleFavorite(entry.id)}
                        aria-label={entry.swedish}
                        aria-pressed={isFav}
                        className={`min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl border transition-colors ${
                          isFav
                            ? 'bg-blue-50 border-blue-200 text-blue-900'
                            : 'bg-white border-slate-200 text-slate-500 hover:text-slate-900'
                        }`}
                      >
                        <Bookmark className="w-4 h-4" fill={isFav ? 'currentColor' : 'none'} />
                      </button>
                    </div>
                  </div>

                  <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                    {entry.explanation[language]}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 text-xs space-y-1">
                  <p className="font-medium text-slate-800">„{entry.exampleSv}“</p>
                  <p className="text-slate-500">{entry.exampleTranslation[language]}</p>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
