import { useState } from 'react';
import {
  ArrowLeft,
  Bookmark,
  Check,
  Copy,
  Download,
  Plus,
  Trash2,
} from 'lucide-react';
import { AppIdea, MvpFeature } from '../types/idea';

interface IdeaBlueprintViewProps {
  idea: AppIdea;
  isSaved: boolean;
  onToggleSave: (id: string) => void;
  onBack: () => void;
}

export function IdeaBlueprintView({
  idea,
  isSaved,
  onToggleSave,
  onBack,
}: IdeaBlueprintViewProps) {
  const [checkedIds, setCheckedIds] = useState<string[]>(() =>
    idea.features.filter((f) => f.phase === 'MVP').map((f) => f.id)
  );
  const [customFeatures, setCustomFeatures] = useState<MvpFeature[]>([]);
  const [newFeatureText, setNewFeatureText] = useState('');
  const [notes, setNotes] = useState('');
  const [copied, setCopied] = useState(false);

  const allFeatures = [...idea.features, ...customFeatures];
  const selectedFeatures = allFeatures.filter((f) => checkedIds.includes(f.id));
  const totalSelectedHours = selectedFeatures.reduce((sum, f) => sum + f.effortHours, 0);

  const toggleFeature = (id: string) => {
    setCheckedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleAddFeature = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = newFeatureText.trim();
    if (!trimmed) return;
    const created: MvpFeature = {
      id: `custom-${Date.now()}`,
      label: trimmed,
      phase: 'MVP',
      effortHours: 8,
    };
    setCustomFeatures((prev) => [...prev, created]);
    setCheckedIds((prev) => [...prev, created.id]);
    setNewFeatureText('');
  };

  const removeCustomFeature = (id: string) => {
    setCustomFeatures((prev) => prev.filter((f) => f.id !== id));
    setCheckedIds((prev) => prev.filter((item) => item !== id));
  };

  const buildMarkdownSpec = () => {
    const featureLines = selectedFeatures
      .map((f) => `- [ ] [${f.phase}] ${f.label} (~${f.effortHours}h)`)
      .join('\n');
    const apiLines = idea.apis
      .map((a) => `- **${a.name}** (${a.provider}) — \`${a.endpointHint}\` | ${a.usageInApp}`)
      .join('\n');
    const packageLines = idea.kotlinPackages.map((p) => `- \`${p}\``).join('\n');

    return `# ${idea.title} — Android MVP Specifikacija (Göteborg)

## 1. Sažetak i problem u Göteborgu
${idea.problemStatement}

**Ciljna publika:** ${idea.targetAudience}
**Fokus kvartovi:** ${idea.neighborhoods.join(', ')}
**Prednost za Android:** ${idea.androidAdvantage}

## 2. Odabrani MVP opseg (Ukupno ~${totalSelectedHours}h rada)
${featureLines || '- Nema odabranih stavki'}

## 3. Preporučeni Android Tech Stack
${idea.techStack.map((t) => `- ${t}`).join('\n')}

## 4. Struktura Kotlin paketa
${packageLines}

## 5. Lokalni i švedski API izvori
${apiLines}

## 6. Monetizacija u Švedskoj
${idea.monetization.map((m) => `- ${m}`).join('\n')}

## 7. Prvi korak danas
${idea.firstStepToday}
${notes.trim() ? `\n## 8. Osobne bilješke\n${notes.trim()}\n` : ''}`;
  };

  const handleCopySpec = async () => {
    try {
      await navigator.clipboard.writeText(buildMarkdownSpec());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const handleDownloadSpec = () => {
    const content = buildMarkdownSpec();
    const blob = new Blob([content], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${idea.id}-android-mvp.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-700 hover:text-slate-900 bg-white border border-slate-200 rounded-lg transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Natrag na ideje</span>
        </button>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={() => onToggleSave(idea.id)}
            className={`inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium rounded-lg border transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 ${
              isSaved
                ? 'bg-blue-50 border-blue-200 text-blue-800'
                : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
            }`}
          >
            <Bookmark className="w-3.5 h-3.5" fill={isSaved ? 'currentColor' : 'none'} />
            <span>{isSaved ? 'Spremljeno' : 'Spremi ideju'}</span>
          </button>

          <button
            type="button"
            onClick={handleCopySpec}
            className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-200 hover:border-slate-300 rounded-lg transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Kopirano u međuspremnik' : 'Kopiraj Markdown'}</span>
          </button>

          <button
            type="button"
            onClick={handleDownloadSpec}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium text-white bg-blue-800 hover:bg-blue-900 rounded-lg transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Preuzmi MVP_SPEC.md</span>
          </button>
        </div>
      </div>

      {/* Main Blueprint Header */}
      <section className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8">
        <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs text-slate-500">
          <span className="font-medium text-blue-800">{idea.categoryLabel}</span>
          <span aria-hidden="true">·</span>
          <span>{idea.complexityLabel}</span>
          <span aria-hidden="true">·</span>
          <span className="tabular-nums">Procjena lansiranja: {idea.mvpWeeks} tjedna</span>
          <span aria-hidden="true">·</span>
          <span>Konkurencija: {idea.competitionLevel}</span>
        </div>

        <h2 className="mt-3 text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 text-balance">
          {idea.title}
        </h2>
        <p className="mt-2 text-base text-slate-600 max-w-3xl">{idea.subtitle}</p>

        <div className="mt-6 pt-6 border-t border-slate-100 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <p className="text-xs font-medium text-slate-500">Fokus područja u Göteborgu</p>
            <p className="mt-1.5 text-sm font-medium text-slate-900">
              {idea.neighborhoods.join(' · ')}
            </p>
          </div>
          <div>
            <p className="text-xs font-medium text-slate-500">Ciljna publika</p>
            <p className="mt-1.5 text-sm text-slate-700">{idea.targetAudience}</p>
          </div>
          <div>
            <p className="text-xs font-medium text-slate-500">Tržišni signal</p>
            <p className="mt-1.5 text-sm text-slate-700">{idea.demandSignal}</p>
          </div>
        </div>
      </section>

      {/* Two-Column Content: Problem + Android Advantage vs MVP Interactive Scope */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-7 space-y-6">
          <section className="bg-white border border-slate-200 rounded-xl p-6">
            <h3 className="text-base font-semibold text-slate-900">
              01. Lokalni problem i Android prednost
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-700">{idea.problemStatement}</p>
            <div className="mt-4 pt-4 border-t border-slate-100">
              <p className="text-xs font-medium text-slate-500">Zašto nativni Android</p>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-700">
                {idea.androidAdvantage}
              </p>
            </div>
          </section>

          <section className="bg-white border border-slate-200 rounded-xl p-6">
            <h3 className="text-base font-semibold text-slate-900">
              02. Službeni API izvori za Švedsku i Göteborg
            </h3>
            <div className="mt-4 divide-y divide-slate-100">
              {idea.apis.map((api) => (
                <div key={api.name} className="py-4 first:pt-0 last:pb-0">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <p className="text-sm font-semibold text-slate-900">{api.name}</p>
                    <span className="text-xs text-slate-500">
                      {api.provider} · {api.authType}
                    </span>
                  </div>
                  <p className="mt-1.5 font-mono text-xs text-blue-800 bg-slate-50 border border-slate-200 rounded-md px-2.5 py-1.5 overflow-x-auto">
                    {api.endpointHint}
                  </p>
                  <p className="mt-2 text-sm text-slate-600">{api.usageInApp}</p>
                  <p className="mt-1 text-xs text-slate-500">Uvjeti: {api.freeTier}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-white border border-slate-200 rounded-xl p-6">
            <h3 className="text-base font-semibold text-slate-900">
              03. Preporučena Android arhitektura
            </h3>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <p className="text-xs font-medium text-slate-500">Tehnologije i Jetpack moduli</p>
                <ul className="mt-2 space-y-1.5 text-sm text-slate-700">
                  {idea.techStack.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="text-slate-400 select-none">–</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-xs font-medium text-slate-500">Struktura Kotlin paketa</p>
                <ul className="mt-2 space-y-1.5 font-mono text-xs text-slate-700">
                  {idea.kotlinPackages.map((pkg) => (
                    <li key={pkg} className="truncate" title={pkg}>
                      {pkg}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        </div>

        {/* Right Column: Interactive MVP Scope Planner */}
        <div className="lg:col-span-5 space-y-6">
          <section className="bg-white border border-slate-200 rounded-xl p-6">
            <div className="flex items-baseline justify-between gap-4">
              <h3 className="text-base font-semibold text-slate-900">
                Interaktivni MVP planer
              </h3>
              <span className="text-xs font-mono tabular-nums text-blue-800 font-medium">
                {selectedFeatures.length} stavki · ~{totalSelectedHours}h
              </span>
            </div>
            <p className="mt-1 text-xs text-slate-500">
              Označite funkcionalnosti za prvu verziju i dodajte vlastite ideje prije preuzimanja specifikacije.
            </p>

            <div className="mt-4 divide-y divide-slate-100">
              {allFeatures.map((feature) => {
                const checked = checkedIds.includes(feature.id);
                const isCustom = feature.id.startsWith('custom-');
                return (
                  <div
                    key={feature.id}
                    className="py-3 flex items-start justify-between gap-3"
                  >
                    <label className="flex items-start gap-3 cursor-pointer flex-1 min-w-0">
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggleFeature(feature.id)}
                        className="mt-0.5 w-4 h-4 rounded border-slate-300 text-blue-800 focus:ring-blue-700 shrink-0"
                      />
                      <span className="text-sm text-slate-800 leading-snug">
                        {feature.label}
                      </span>
                    </label>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-xs font-mono tabular-nums text-slate-500">
                        {feature.phase} · {feature.effortHours}h
                      </span>
                      {isCustom && (
                        <button
                          type="button"
                          onClick={() => removeCustomFeature(feature.id)}
                          aria-label="Ukloni vlastitu stavku"
                          className="text-slate-400 hover:text-red-600 p-1 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <form onSubmit={handleAddFeature} className="mt-4 flex gap-2">
              <input
                type="text"
                value={newFeatureText}
                onChange={(e) => setNewFeatureText(e.target.value)}
                placeholder="Dodaj vlastitu značajku (npr. Swish podrška)..."
                className="flex-1 min-w-0 px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700 focus:bg-white"
              />
              <button
                type="submit"
                className="inline-flex items-center gap-1 px-3 py-2 text-xs font-medium text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors whitespace-nowrap shrink-0"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Dodaj</span>
              </button>
            </form>
          </section>

          <section className="bg-white border border-slate-200 rounded-xl p-6">
            <h3 className="text-base font-semibold text-slate-900">
              Monetizacija u Švedskoj & prvi korak
            </h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-700">
              {idea.monetization.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="text-slate-400 select-none">–</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-5 pt-4 border-t border-slate-100">
              <p className="text-xs font-medium text-slate-500">Što napraviti već danas</p>
              <p className="mt-1.5 text-sm text-slate-800 font-medium leading-relaxed">
                {idea.firstStepToday}
              </p>
            </div>

            <div className="mt-5 pt-4 border-t border-slate-100">
              <label htmlFor="blueprint-notes" className="block text-xs font-medium text-slate-500">
                Vaše bilješke (uključuju se u izvoz)
              </label>
              <textarea
                id="blueprint-notes"
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Npr. testirati na Pixelu kod Brunnsparkena, dodati podršku za engleski i švedski..."
                className="mt-2 w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700 focus:bg-white"
              />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
