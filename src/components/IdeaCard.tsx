import { Bookmark, ChevronRight } from 'lucide-react';
import { AppIdea } from '../types/idea';

interface IdeaCardProps {
  idea: AppIdea;
  isSaved: boolean;
  onToggleSave: (id: string) => void;
  onSelect: (idea: AppIdea) => void;
}

export function IdeaCard({ idea, isSaved, onToggleSave, onSelect }: IdeaCardProps) {
  const mvpHours = idea.features
    .filter((f) => f.phase === 'MVP')
    .reduce((acc, f) => acc + f.effortHours, 0);

  return (
    <article className="group flex flex-col justify-between bg-white border border-slate-200 rounded-xl p-6 transition-colors duration-150 hover:border-slate-300">
      <div>
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-500">
            <span className="font-medium text-blue-800">{idea.categoryLabel}</span>
            <span aria-hidden="true">·</span>
            <span>{idea.complexityLabel}</span>
            <span aria-hidden="true">·</span>
            <span className="tabular-nums">MVP ~{idea.mvpWeeks} tj.</span>
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onToggleSave(idea.id);
            }}
            aria-label={isSaved ? `Ukloni ${idea.title} iz spremljenih` : `Spremi ${idea.title}`}
            aria-pressed={isSaved}
            className={`inline-flex items-center justify-center w-9 h-9 rounded-lg border transition-colors duration-150 shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 ${
              isSaved
                ? 'bg-blue-50 border-blue-200 text-blue-800'
                : 'bg-white border-slate-200 text-slate-500 hover:text-slate-900 hover:border-slate-300'
            }`}
          >
            <Bookmark className="w-4 h-4" fill={isSaved ? 'currentColor' : 'none'} />
          </button>
        </div>

        <h3 className="mt-3 text-lg font-semibold tracking-tight text-slate-900 text-balance">
          {idea.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-slate-600">{idea.subtitle}</p>

        <div className="mt-4 pt-4 border-t border-slate-100">
          <p className="text-xs font-medium text-slate-500">Zašto baš za Android</p>
          <p className="mt-1 text-sm text-slate-700 line-clamp-2">{idea.androidAdvantage}</p>
        </div>
      </div>

      <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between gap-4">
        <div className="text-xs text-slate-500 truncate">
          <span className="tabular-nums font-mono text-slate-700">{mvpHours}h</span>
          <span> procjena MVP-a</span>
          <span className="mx-1.5" aria-hidden="true">·</span>
          <span>Konkurencija: {idea.competitionLevel}</span>
        </div>

        <button
          type="button"
          onClick={() => onSelect(idea)}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700"
        >
          <span>Otvori nacrt</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </article>
  );
}
