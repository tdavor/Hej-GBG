import { useState } from 'react';
import { ExternalLink, Search } from 'lucide-react';
import { SWEDISH_API_CATALOG } from '../data/gothenburgIdeas';

export function ApiDirectoryView() {
  const [query, setQuery] = useState('');

  const filtered = SWEDISH_API_CATALOG.filter((api) => {
    const q = query.trim().toLowerCase();
    if (!q) return true;
    return (
      api.name.toLowerCase().includes(q) ||
      api.provider.toLowerCase().includes(q) ||
      api.category.toLowerCase().includes(q) ||
      api.usageInApp.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-slate-900">
            Otvoreni API izvori za Göteborg i Švedsku
          </h2>
          <p className="mt-1 text-sm text-slate-600">
            Stvarni, besplatni izvori podataka koje možete odmah spojiti u Kotlin aplikaciju putem Ktor ili Retrofit klijenta.
          </p>
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Pretraži API ili kategoriju..."
            className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700"
          />
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-xs font-medium text-slate-600">
                <th className="py-3 px-4">API i pružatelj</th>
                <th className="py-3 px-4">Područje</th>
                <th className="py-3 px-4">Autentifikacija</th>
                <th className="py-3 px-4">Primjena u Android aplikaciji</th>
                <th className="py-3 px-4 text-right">Dokumentacija</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-10 px-4 text-center text-slate-500">
                    Nema API izvora koji odgovaraju pojmu "{query}".
                  </td>
                </tr>
              ) : (
                filtered.map((api) => (
                  <tr key={api.name} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3.5 px-4 align-top">
                      <p className="font-medium text-slate-900">{api.name}</p>
                      <p className="mt-0.5 font-mono text-xs text-slate-500">{api.endpointHint}</p>
                    </td>
                    <td className="py-3.5 px-4 align-top text-slate-700 whitespace-nowrap">
                      {api.category}
                    </td>
                    <td className="py-3.5 px-4 align-top text-slate-700 whitespace-nowrap">
                      <span>{api.authType}</span>
                      <span className="block text-xs text-slate-500">{api.freeTier}</span>
                    </td>
                    <td className="py-3.5 px-4 align-top text-slate-600 max-w-md">
                      {api.usageInApp}
                    </td>
                    <td className="py-3.5 px-4 align-top text-right whitespace-nowrap">
                      <a
                        href={api.docsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-medium text-blue-800 hover:underline"
                      >
                        <span>Portal</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
