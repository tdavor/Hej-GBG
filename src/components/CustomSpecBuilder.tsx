import { useState } from 'react';
import { Check, Copy, Download } from 'lucide-react';
import { CustomSpecConfig } from '../types/idea';

const FOCUS_AREAS = [
  'Cijeli Göteborg i okolica (Mölndal, Partille)',
  'Hisingen i Lindholmen Science Park',
  'Južni i Sjeverni arhipelag (Styrsö, Brännö, Hönö)',
  'Majorna, Linné i Slottsskogen',
  'Sveučilišni kampusi (Chalmers Johanneberg & GU)',
];

const TARGET_USERS = [
  'Svakodnevni putnici javnim prijevozom i biciklom',
  'Studenti i istraživači',
  'Doseljenici i dijaspora u Švedskoj',
  'Ljubitelji mora, kajaka i prirode',
  'Obitelji i lokalni kupci (loppis, hrana)',
];

const ANDROID_CAPABILITIES = [
  'Home Screen Widget (Jetpack Glance)',
  'Pozadinske pametne obavijesti (WorkManager + Geofencing)',
  'Offline-first lokalna karta i baza (Room + MapLibre)',
  'Brza kamera / skeniranje računa ili prostora (CameraX)',
  'Kontinuirano praćenje kretanja / navigacija (Foreground Service)',
];

export function CustomSpecBuilder() {
  const [config, setConfig] = useState<CustomSpecConfig>({
    appName: 'Göteborg Pocket Companion',
    focusArea: FOCUS_AREAS[0],
    targetUser: TARGET_USERS[0],
    androidCapability: ANDROID_CAPABILITIES[0],
    experienceLevel: 'Srednji',
    includeWearOs: false,
    includeWidget: true,
  });

  const [copied, setCopied] = useState(false);

  const recommendedApis = (() => {
    const list: string[] = [];
    if (
      config.focusArea.includes('arhipelag') ||
      config.targetUser.includes('putnici') ||
      config.focusArea.includes('Hisingen')
    ) {
      list.push('Västtrafik Planera Resa v4 (polasci tramvaja i brodova)');
    }
    if (
      config.targetUser.includes('mora') ||
      config.focusArea.includes('arhipelag') ||
      config.targetUser.includes('putnici')
    ) {
      list.push('SMHI Open Data (vjetar, kiša i temperatura mora)');
    }
    if (config.focusArea.includes('Göteborg') || config.targetUser.includes('Obitelji')) {
      list.push('Göteborgs Stad Open Data (biciklističke pumpe, parkinzi, igrališta)');
    }
    if (list.length === 0) {
      list.push('OpenStreetMap Overpass API + lokalni kurirani JSON');
    }
    return list;
  })();

  const recommendedLibs = (() => {
    const libs = ['Kotlin 2.x + Jetpack Compose (Material 3)', 'Ktor Client + Kotlinx Serialization'];
    if (config.includeWidget || config.androidCapability.includes('Glance')) {
      libs.push('Jetpack Glance (AppWidget)');
    }
    if (config.androidCapability.includes('WorkManager') || config.androidCapability.includes('Geofencing')) {
      libs.push('WorkManager + Play Services Location (Geofencing)');
    }
    if (config.androidCapability.includes('Room') || config.experienceLevel !== 'Početnik') {
      libs.push('Room Database + DataStore Preferences');
    }
    if (config.androidCapability.includes('CameraX')) {
      libs.push('CameraX + Coil Image Loading');
    }
    if (config.includeWearOs) {
      libs.push('Wear OS Compose + Horologist Tiles');
    }
    return libs;
  })();

  const estimatedWeeks =
    config.experienceLevel === 'Početnik' ? 6 : config.experienceLevel === 'Srednji' ? 4 : 2;

  const generateMarkdown = () => {
    return `# ${config.appName || 'Moja Göteborg Android Aplikacija'} — Prilagođeni Nacrt

- **Fokus područje:** ${config.focusArea}
- **Ciljna skupina:** ${config.targetUser}
- **Ključna Android prednost:** ${config.androidCapability}
- **Razina iskustva:** ${config.experienceLevel} (procjena do prvog MVP-a: ~${estimatedWeeks} tjedna)
- **Dodatni moduli:** ${[config.includeWidget ? 'Home Widget' : '', config.includeWearOs ? 'Wear OS' : ''].filter(Boolean).join(', ') || 'Standardna mobilna aplikacija'}

## Preporučeni API izvori
${recommendedApis.map((a) => `- ${a}`).join('\n')}

## Android Studio Tech Stack
${recommendedLibs.map((l) => `- ${l}`).join('\n')}

## Plan za prva 3 tjedna
1. **Tjedan 1:** Kreiranje Compose projekta, spajanje na ${recommendedApis[0]} i prikaz osnovne liste u Material 3 dizajnu.
2. **Tjedan 2:** Implementacija glavne Android prednosti (${config.androidCapability}) i lokalnog spremanja u Room/DataStore.
3. **Tjedan 3:** Terensko testiranje u Göteborgu (tramvaj, slabiji 4G na otocima, tamna tema za zimu) i zatvoreno testiranje na Google Play Console.
`;
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generateMarkdown());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([generateMarkdown()], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${(config.appName || 'gbg-android-app')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold tracking-tight text-slate-900">
          Generator prilagođene Android specifikacije
        </h2>
        <p className="mt-1 text-sm text-slate-600">
          Prilagodite ideju svom kvartu u Göteborgu, ciljanoj publici i iskustvu u Android razvoju.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-6 bg-white border border-slate-200 rounded-xl p-6 space-y-5">
          <div>
            <label htmlFor="spec-app-name" className="block text-xs font-medium text-slate-600">
              Radni naziv aplikacije
            </label>
            <input
              id="spec-app-name"
              type="text"
              value={config.appName}
              onChange={(e) => setConfig({ ...config, appName: e.target.value })}
              className="mt-1.5 w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700 focus:bg-white"
            />
          </div>

          <div>
            <label htmlFor="spec-focus" className="block text-xs font-medium text-slate-600">
              Kvart ili geografski fokus
            </label>
            <select
              id="spec-focus"
              value={config.focusArea}
              onChange={(e) => setConfig({ ...config, focusArea: e.target.value })}
              className="mt-1.5 w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700 focus:bg-white"
            >
              {FOCUS_AREAS.map((area) => (
                <option key={area} value={area}>
                  {area}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="spec-user" className="block text-xs font-medium text-slate-600">
              Ciljna skupina u gradu
            </label>
            <select
              id="spec-user"
              value={config.targetUser}
              onChange={(e) => setConfig({ ...config, targetUser: e.target.value })}
              className="mt-1.5 w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700 focus:bg-white"
            >
              {TARGET_USERS.map((user) => (
                <option key={user} value={user}>
                  {user}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="spec-cap" className="block text-xs font-medium text-slate-600">
              Glavna Android prednost
            </label>
            <select
              id="spec-cap"
              value={config.androidCapability}
              onChange={(e) => setConfig({ ...config, androidCapability: e.target.value })}
              className="mt-1.5 w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700 focus:bg-white"
            >
              {ANDROID_CAPABILITIES.map((cap) => (
                <option key={cap} value={cap}>
                  {cap}
                </option>
              ))}
            </select>
          </div>

          <div>
            <span className="block text-xs font-medium text-slate-600">
              Vaše iskustvo s Kotlinom / Androidom
            </span>
            <div className="mt-2 inline-flex p-1 bg-slate-100 rounded-lg gap-1">
              {(['Početnik', 'Srednji', 'Napredni'] as const).map((level) => (
                <button
                  key={level}
                  type="button"
                  onClick={() => setConfig({ ...config, experienceLevel: level })}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                    config.experienceLevel === level
                      ? 'bg-white text-slate-900 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-2 flex flex-wrap gap-5">
            <label className="inline-flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
              <input
                type="checkbox"
                checked={config.includeWidget}
                onChange={(e) => setConfig({ ...config, includeWidget: e.target.checked })}
                className="w-4 h-4 rounded border-slate-300 text-blue-800 focus:ring-blue-700"
              />
              <span>Uključi Home Widget</span>
            </label>

            <label className="inline-flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
              <input
                type="checkbox"
                checked={config.includeWearOs}
                onChange={(e) => setConfig({ ...config, includeWearOs: e.target.checked })}
                className="w-4 h-4 rounded border-slate-300 text-blue-800 focus:ring-blue-700"
              />
              <span>Dodaj Wear OS podršku</span>
            </label>
          </div>
        </div>

        <div className="lg:col-span-6 bg-white border border-slate-200 rounded-xl p-6 space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div>
              <p className="text-xs font-medium text-blue-800">Generirani nacrt</p>
              <h3 className="text-lg font-bold text-slate-900 mt-0.5">
                {config.appName || 'Moja Göteborg Aplikacija'}
              </h3>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors whitespace-nowrap shrink-0"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Kopirano' : 'Kopiraj'}</span>
              </button>
              <button
                type="button"
                onClick={handleDownload}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-white bg-blue-800 hover:bg-blue-900 rounded-lg transition-colors whitespace-nowrap shrink-0"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Preuzmi .md</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-xs text-slate-500">Procijenjeno vrijeme do MVP-a</p>
              <p className="mt-1 font-semibold font-mono tabular-nums text-slate-900">
                ~{estimatedWeeks} tjedna
              </p>
            </div>
            <div>
              <p className="text-xs text-slate-500">Ciljana arhitektura</p>
              <p className="mt-1 font-medium text-slate-900">MVVM + Clean Compose</p>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100">
            <p className="text-xs font-medium text-slate-500">Preporučeni API izvori</p>
            <ul className="mt-2 space-y-1.5 text-sm text-slate-700">
              {recommendedApis.map((api) => (
                <li key={api} className="flex items-start gap-2">
                  <span className="text-slate-400">–</span>
                  <span>{api}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-4 border-t border-slate-100">
            <p className="text-xs font-medium text-slate-500">Android biblioteke za `build.gradle.kts`</p>
            <ul className="mt-2 space-y-1.5 font-mono text-xs text-slate-700">
              {recommendedLibs.map((lib) => (
                <li key={lib}>{lib}</li>
              ))}
            </ul>
          </div>

          <div className="pt-4 border-t border-slate-100">
            <p className="text-xs font-medium text-slate-500">Lokalni testni scenarij u Göteborgu</p>
            <p className="mt-1.5 text-sm text-slate-700 leading-relaxed">
              Testirajte aplikaciju u realnim uvjetima za fokus <span className="font-medium text-slate-900">{config.focusArea}</span>:
              provjerite čitljivost ekrana na obalnom suncu i u zimskom mraku (obavezno podržite Material 3 Dark Theme) te ponašanje pri slabijem signalu na trajektu ili u tunelu.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
