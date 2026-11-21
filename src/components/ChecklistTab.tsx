import { useState } from 'react';
import {
  Check,
  ChevronRight,
  ExternalLink,
  MapPin,
  TramFront,
  X,
} from 'lucide-react';
import { CHECKLIST_STEPS } from '../data/hejGoteborgData';
import { UI_TEXT } from '../data/translations';
import { AppLanguage, ChecklistStep, StepPhase } from '../types/hejGoteborg';

interface ChecklistTabProps {
  language: AppLanguage;
  completedIds: string[];
  onToggleComplete: (id: string) => void;
  stepNotes: Record<string, string>;
  onUpdateNote: (id: string, note: string) => void;
}

export function ChecklistTab({
  language,
  completedIds,
  onToggleComplete,
  stepNotes,
  onUpdateNote,
}: ChecklistTabProps) {
  const [phaseFilter, setPhaseFilter] = useState<StepPhase | 'all'>('all');
  const [activeStep, setActiveStep] = useState<ChecklistStep | null>(null);

  const t = UI_TEXT[language].checklist;

  const phaseFilters: { id: StepPhase | 'all'; label: string }[] = [
    { id: 'all', label: t.filters.all },
    { id: 'urgent', label: t.filters.urgent },
    { id: 'banking_work', label: t.filters.banking_work },
    { id: 'city_living', label: t.filters.city_living },
  ];

  const totalCount = CHECKLIST_STEPS.length;
  const completedCount = CHECKLIST_STEPS.filter((s) =>
    completedIds.includes(s.id)
  ).length;
  const progressPercent = Math.round((completedCount / totalCount) * 100);

  const visibleSteps = CHECKLIST_STEPS.filter(
    (s) => phaseFilter === 'all' || s.phase === phaseFilter
  );

  const radius = 24;
  const circumference = 2 * Math.PI * radius;
  const strokeOffset = circumference - (progressPercent / 100) * circumference;

  const nextPendingStep = CHECKLIST_STEPS.find(
    (s) => !completedIds.includes(s.id)
  );

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white border border-slate-200 rounded-2xl p-5 flex items-center gap-4">
          <div className="relative w-16 h-16 shrink-0 flex items-center justify-center">
            <svg className="w-16 h-16 -rotate-90" viewBox="0 0 60 60">
              <circle
                cx="30"
                cy="30"
                r={radius}
                fill="none"
                stroke="#e2e8f0"
                strokeWidth="5"
              />
              <circle
                cx="30"
                cy="30"
                r={radius}
                fill="none"
                stroke="#0f4c81"
                strokeWidth="5"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={strokeOffset}
                className="transition-all duration-300"
              />
            </svg>
            <span className="absolute text-xs font-bold font-mono tabular-nums text-slate-900">
              {progressPercent}%
            </span>
          </div>
          <div className="min-w-0">
            <p className="text-xs font-medium text-slate-500">{t.progressLabel}</p>
            <p className="mt-0.5 text-xl font-bold font-mono tabular-nums text-slate-900">
              {completedCount} / {totalCount}
            </p>
            <p className="mt-0.5 text-xs text-slate-600 truncate">
              {t.completedStepsSuffix}
            </p>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 lg:col-span-2 flex flex-col justify-between">
          <div>
            <p className="text-xs font-medium text-slate-500">
              {nextPendingStep ? t.nextStepLabel : t.allDoneTitle}
            </p>
            <h2 className="mt-1 text-base sm:text-lg font-semibold text-slate-900 text-balance">
              {nextPendingStep
                ? `${nextPendingStep.order}. ${nextPendingStep.title[language]}`
                : t.allDoneSubtitle}
            </h2>
            {nextPendingStep && (
              <p className="mt-1 text-xs text-slate-600">
                {nextPendingStep.locationName} · {nextPendingStep.tramLines[language]}
              </p>
            )}
          </div>
          {nextPendingStep && (
            <div className="mt-3">
              <button
                type="button"
                onClick={() => setActiveStep(nextPendingStep)}
                className="min-h-[44px] inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium text-white bg-blue-900 hover:bg-blue-950 rounded-xl transition-colors whitespace-nowrap"
              >
                <span>{t.openGuideButton}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
        {phaseFilters.map((filter) => (
          <button
            key={filter.id}
            type="button"
            onClick={() => setPhaseFilter(filter.id)}
            className={`min-h-[44px] px-4 py-2 text-xs font-medium rounded-xl transition-colors whitespace-nowrap shrink-0 ${
              phaseFilter === filter.id
                ? 'bg-slate-900 text-white'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl divide-y divide-slate-100 overflow-hidden">
        {visibleSteps.map((step) => {
          const isDone = completedIds.includes(step.id);
          const hasNote = Boolean(stepNotes[step.id]?.trim());
          return (
            <div
              key={step.id}
              className="flex items-center gap-3 px-4 py-3.5 sm:px-5 hover:bg-slate-50/80 transition-colors"
            >
              <button
                type="button"
                onClick={() => onToggleComplete(step.id)}
                aria-label={step.title[language]}
                aria-pressed={isDone}
                className="min-h-[44px] min-w-[44px] flex items-center justify-center shrink-0 -ml-1 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-800"
              >
                <span
                  className={`w-6 h-6 rounded-full border flex items-center justify-center transition-colors ${
                    isDone
                      ? 'bg-blue-900 border-blue-900 text-white'
                      : 'bg-white border-slate-300 text-transparent hover:border-slate-500'
                  }`}
                >
                  <Check className="w-3.5 h-3.5" strokeWidth={2.5} />
                </span>
              </button>

              <button
                type="button"
                onClick={() => setActiveStep(step)}
                className="flex-1 min-w-0 text-left min-h-[44px] flex items-center justify-between gap-3 py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-800 rounded-lg"
              >
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-x-2 text-xs text-slate-500">
                    <span className="font-mono tabular-nums font-medium text-blue-900">
                      0{step.order}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{step.swedishTerm}</span>
                    <span aria-hidden="true">·</span>
                    <span>{step.phaseLabel[language]}</span>
                    {hasNote && (
                      <>
                        <span aria-hidden="true">·</span>
                        <span className="text-slate-700 font-medium">{t.hasNote}</span>
                      </>
                    )}
                  </div>
                  <p
                    className={`mt-0.5 text-sm sm:text-base font-medium truncate ${
                      isDone ? 'line-through text-slate-400' : 'text-slate-900'
                    }`}
                  >
                    {step.title[language]}
                  </p>
                  <p className="mt-0.5 text-xs text-slate-500 truncate">
                    {step.locationName} · {step.tramLines[language]}
                  </p>
                </div>

                <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
              </button>
            </div>
          );
        })}
      </div>

      {activeStep && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-950/50 backdrop-blur-sm p-0 sm:p-4"
          onClick={() => setActiveStep(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="step-sheet-title"
            onClick={(e) => e.stopPropagation()}
            className="w-full sm:max-w-xl bg-white rounded-t-3xl sm:rounded-2xl border border-slate-200 max-h-[88vh] flex flex-col overflow-hidden"
          >
            <div className="sm:hidden pt-3 pb-1">
              <div className="w-10 h-1.5 bg-slate-300 rounded-full mx-auto" />
            </div>

            <div className="px-6 py-4 border-b border-slate-100 flex items-start justify-between gap-4">
              <div>
                <p className="text-xs text-slate-500">
                  {t.stepWord} {activeStep.order} · {activeStep.swedishTerm} ·{' '}
                  {activeStep.estimatedDays[language]}
                </p>
                <h3
                  id="step-sheet-title"
                  className="mt-1 text-lg font-bold text-slate-900 text-balance"
                >
                  {activeStep.title[language]}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveStep(null)}
                aria-label={UI_TEXT[language].close}
                className="min-h-[44px] min-w-[44px] flex items-center justify-center -mr-2 text-slate-500 hover:text-slate-900 rounded-xl"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-5 text-sm">
              <p className="text-slate-700 leading-relaxed">
                {activeStep.summary[language]}
              </p>

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-blue-900 mt-0.5 shrink-0" />
                  <div>
                    <p className="font-medium text-slate-900">{activeStep.locationName}</p>
                    <p className="text-xs text-slate-600">{activeStep.locationAddress}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <TramFront className="w-4 h-4 text-blue-900 mt-0.5 shrink-0" />
                  <p className="text-xs text-slate-700">{activeStep.tramLines[language]}</p>
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold text-slate-500">{t.requiredDocs}</p>
                <ul className="mt-2 space-y-1.5 text-slate-700">
                  {activeStep.documentsRequired[language].map((doc) => (
                    <li key={doc} className="flex items-start gap-2">
                      <span className="text-slate-400 select-none">–</span>
                      <span>{doc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="text-xs font-semibold text-slate-500">{t.practicalTip}</p>
                <p className="mt-1.5 text-slate-700 leading-relaxed">
                  {activeStep.practicalTip[language]}
                </p>
              </div>

              <div>
                <label
                  htmlFor="step-personal-note"
                  className="block text-xs font-semibold text-slate-500"
                >
                  {t.personalNoteLabel}
                </label>
                <textarea
                  id="step-personal-note"
                  rows={2}
                  value={stepNotes[activeStep.id] ?? ''}
                  onChange={(e) => onUpdateNote(activeStep.id, e.target.value)}
                  placeholder={t.personalNotePlaceholder}
                  className="mt-1.5 w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-800 focus:bg-white"
                />
              </div>
            </div>

            <div className="p-4 border-t border-slate-100 bg-white flex flex-wrap items-center gap-3">
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  activeStep.locationAddress
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[44px] inline-flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-medium text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors whitespace-nowrap"
              >
                <MapPin className="w-3.5 h-3.5" />
                <span>{t.mapButton}</span>
              </a>

              <a
                href={activeStep.officialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[44px] inline-flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-medium text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors whitespace-nowrap"
              >
                <span>{t.officialPortal}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <button
                type="button"
                onClick={() => {
                  onToggleComplete(activeStep.id);
                  setActiveStep(null);
                }}
                className="flex-1 min-h-[44px] px-4 py-2 text-xs font-medium text-white bg-blue-900 hover:bg-blue-950 rounded-xl transition-colors whitespace-nowrap"
              >
                {completedIds.includes(activeStep.id) ? t.markUndone : t.markDone}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
