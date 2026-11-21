import { useState } from 'react';
import {
  ExternalLink,
  MapPin,
  Phone,
  Plus,
  Search,
  Trash2,
  TramFront,
  X,
} from 'lucide-react';
import { UI_TEXT } from '../data/translations';
import {
  AppLanguage,
  GothenburgService,
  ServiceCategory,
} from '../types/hejGoteborg';

interface ServicesTabProps {
  language: AppLanguage;
  services: GothenburgService[];
  onAddService: (service: GothenburgService) => void;
  onRemoveUserService: (id: string) => void;
}

export function ServicesTab({
  language,
  services,
  onAddService,
  onRemoveUserService,
}: ServicesTabProps) {
  const [category, setCategory] = useState<ServiceCategory>('all');
  const [query, setQuery] = useState('');
  const [showAddSheet, setShowAddSheet] = useState(false);

  const [name, setName] = useState('');
  const [newCat, setNewCat] = useState<Exclude<ServiceCategory, 'all'>>('everyday');
  const [neighborhood, setNeighborhood] = useState('');
  const [address, setAddress] = useState('');
  const [tramInfo, setTramInfo] = useState('');
  const [phone, setPhone] = useState('');
  const [languages, setLanguages] = useState('Hrvatski, English, Svenska');
  const [description, setDescription] = useState('');

  const t = UI_TEXT[language].services;

  const serviceCategories: { id: ServiceCategory; label: string }[] = [
    { id: 'all', label: t.categories.all },
    { id: 'institution', label: t.categories.institution },
    { id: 'health', label: t.categories.health },
    { id: 'auto', label: t.categories.auto },
    { id: 'everyday', label: t.categories.everyday },
    { id: 'legal_finance', label: t.categories.legal_finance },
  ];

  const filtered = services.filter((srv) => {
    if (category !== 'all' && srv.category !== category) return false;
    const q = query.trim().toLowerCase();
    if (!q) return true;
    return (
      srv.name[language].toLowerCase().includes(q) ||
      srv.neighborhood.toLowerCase().includes(q) ||
      srv.address.toLowerCase().includes(q) ||
      srv.description[language].toLowerCase().includes(q)
    );
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !address.trim()) return;

    const categoryLabelMap: Record<
      Exclude<ServiceCategory, 'all'>,
      { hr: string; en: string; sv: string }
    > = {
      institution: { hr: 'Javna ustanova', en: 'Public office', sv: 'Myndighet' },
      health: { hr: 'Zdravstvo', en: 'Healthcare', sv: 'Vård' },
      auto: { hr: 'Auto i servisi', en: 'Auto & repair', sv: 'Bil & verkstad' },
      everyday: { hr: 'Hrana i svakodnevica', en: 'Food & markets', sv: 'Mat & handel' },
      legal_finance: {
        hr: 'Pravo i dokumenti',
        en: 'Documents & legal',
        sv: 'Dokument & juridik',
      },
    };

    const trimmedName = name.trim();
    const trimmedTram = tramInfo.trim();
    const trimmedLang = languages.trim();
    const trimmedDesc = description.trim();

    const created: GothenburgService = {
      id: `user-${Date.now()}`,
      name: { hr: trimmedName, en: trimmedName, sv: trimmedName },
      category: newCat,
      categoryLabel: categoryLabelMap[newCat],
      neighborhood: neighborhood.trim() || 'Göteborg',
      address: address.trim(),
      tramInfo: {
        hr: trimmedTram || 'Lokalni Västtrafik prijevoz',
        en: trimmedTram || 'Local Västtrafik transit',
        sv: trimmedTram || 'Lokal Västtrafik-linje',
      },
      languages: {
        hr: trimmedLang || 'Hrvatski, Švedski',
        en: trimmedLang || 'Croatian, Swedish, English',
        sv: trimmedLang || 'Svenska, Engelska',
      },
      phone: phone.trim() || undefined,
      description: {
        hr: trimmedDesc || 'Osobno spremljena preporuka u Göteborgu.',
        en: trimmedDesc || 'Personal saved recommendation in Gothenburg.',
        sv: trimmedDesc || 'Personligt sparat tips i Göteborg.',
      },
      isUserAdded: true,
    };

    onAddService(created);
    setName('');
    setNeighborhood('');
    setAddress('');
    setTramInfo('');
    setPhone('');
    setDescription('');
    setShowAddSheet(false);
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

        <button
          type="button"
          onClick={() => setShowAddSheet(true)}
          className="min-h-[44px] inline-flex items-center justify-center gap-2 px-4 py-2 text-xs font-medium text-white bg-blue-900 hover:bg-blue-950 rounded-xl transition-colors whitespace-nowrap shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>{t.addButton}</span>
        </button>
      </div>

      <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
        {serviceCategories.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => setCategory(cat.id)}
            className={`min-h-[44px] px-4 py-2 text-xs font-medium rounded-xl transition-colors whitespace-nowrap shrink-0 ${
              category === cat.id
                ? 'bg-slate-900 text-white'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((srv) => (
          <article
            key={srv.id}
            className="bg-white border border-slate-200 rounded-2xl p-5 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-xs text-slate-500">
                    <span className="font-medium text-blue-900">
                      {srv.categoryLabel[language]}
                    </span>
                    <span className="mx-1.5" aria-hidden="true">
                      ·
                    </span>
                    <span>{srv.neighborhood}</span>
                    {srv.isUserAdded && (
                      <>
                        <span className="mx-1.5" aria-hidden="true">
                          ·
                        </span>
                        <span className="text-slate-700 font-medium">
                          {t.userAddedBadge}
                        </span>
                      </>
                    )}
                  </p>
                  <h3 className="mt-1 text-base sm:text-lg font-bold text-slate-900">
                    {srv.name[language]}
                  </h3>
                </div>

                {srv.isUserAdded && (
                  <button
                    type="button"
                    onClick={() => onRemoveUserService(srv.id)}
                    aria-label={srv.name[language]}
                    className="min-h-[44px] min-w-[44px] flex items-center justify-center text-slate-400 hover:text-red-600 rounded-xl shrink-0"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>

              <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                {srv.description[language]}
              </p>

              <div className="mt-4 space-y-1.5 text-xs text-slate-700">
                <p className="flex items-start gap-2">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 mt-0.5 shrink-0" />
                  <span>{srv.address}</span>
                </p>
                <p className="flex items-start gap-2">
                  <TramFront className="w-3.5 h-3.5 text-slate-400 mt-0.5 shrink-0" />
                  <span>{srv.tramInfo[language]}</span>
                </p>
                <p className="text-slate-500">
                  {t.languagesLabel}: {srv.languages[language]}
                </p>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center gap-2">
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  `${srv.name[language]}, ${srv.address}`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[44px] inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors whitespace-nowrap"
              >
                <MapPin className="w-3.5 h-3.5" />
                <span>{t.openMaps}</span>
              </a>

              {srv.phone && (
                <a
                  href={`tel:${srv.phone.replace(/[^+\d]/g, '')}`}
                  className="min-h-[44px] inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors whitespace-nowrap"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>{srv.phone}</span>
                </a>
              )}

              {srv.website && (
                <a
                  href={srv.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[44px] inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-blue-900 hover:underline whitespace-nowrap ml-auto"
                >
                  <span>{t.website}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </article>
        ))}
      </div>

      {showAddSheet && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-950/50 backdrop-blur-sm p-0 sm:p-4"
          onClick={() => setShowAddSheet(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="add-service-title"
            onClick={(e) => e.stopPropagation()}
            className="w-full sm:max-w-lg bg-white rounded-t-3xl sm:rounded-2xl border border-slate-200 max-h-[90vh] flex flex-col overflow-hidden"
          >
            <div className="sm:hidden pt-3 pb-1">
              <div className="w-10 h-1.5 bg-slate-300 rounded-full mx-auto" />
            </div>

            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <h3 id="add-service-title" className="text-lg font-bold text-slate-900">
                {t.modalTitle}
              </h3>
              <button
                type="button"
                onClick={() => setShowAddSheet(false)}
                aria-label={UI_TEXT[language].close}
                className="min-h-[44px] min-w-[44px] flex items-center justify-center -mr-2 text-slate-500 hover:text-slate-900 rounded-xl"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 text-sm">
              <div>
                <label htmlFor="srv-name" className="block text-xs font-medium text-slate-600">
                  {t.formName}
                </label>
                <input
                  id="srv-name"
                  required
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={t.formNamePlaceholder}
                  className="mt-1 w-full min-h-[44px] px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-800 focus:bg-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label htmlFor="srv-cat" className="block text-xs font-medium text-slate-600">
                    {t.formCategory}
                  </label>
                  <select
                    id="srv-cat"
                    value={newCat}
                    onChange={(e) =>
                      setNewCat(e.target.value as Exclude<ServiceCategory, 'all'>)
                    }
                    className="mt-1 w-full min-h-[44px] px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-800 focus:bg-white"
                  >
                    <option value="everyday">{t.categories.everyday}</option>
                    <option value="health">{t.categories.health}</option>
                    <option value="auto">{t.categories.auto}</option>
                    <option value="legal_finance">{t.categories.legal_finance}</option>
                    <option value="institution">{t.categories.institution}</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="srv-hood" className="block text-xs font-medium text-slate-600">
                    {t.formNeighborhood}
                  </label>
                  <input
                    id="srv-hood"
                    type="text"
                    value={neighborhood}
                    onChange={(e) => setNeighborhood(e.target.value)}
                    placeholder={t.formNeighborhoodPlaceholder}
                    className="mt-1 w-full min-h-[44px] px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-800 focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="srv-addr" className="block text-xs font-medium text-slate-600">
                  {t.formAddress}
                </label>
                <input
                  id="srv-addr"
                  required
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder={t.formAddressPlaceholder}
                  className="mt-1 w-full min-h-[44px] px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-800 focus:bg-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label htmlFor="srv-tram" className="block text-xs font-medium text-slate-600">
                    {t.formTram}
                  </label>
                  <input
                    id="srv-tram"
                    type="text"
                    value={tramInfo}
                    onChange={(e) => setTramInfo(e.target.value)}
                    placeholder={t.formTramPlaceholder}
                    className="mt-1 w-full min-h-[44px] px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-800 focus:bg-white"
                  />
                </div>
                <div>
                  <label htmlFor="srv-phone" className="block text-xs font-medium text-slate-600">
                    {t.formPhone}
                  </label>
                  <input
                    id="srv-phone"
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+46 31 ..."
                    className="mt-1 w-full min-h-[44px] px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-800 focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="srv-lang" className="block text-xs font-medium text-slate-600">
                  {t.formLanguages}
                </label>
                <input
                  id="srv-lang"
                  type="text"
                  value={languages}
                  onChange={(e) => setLanguages(e.target.value)}
                  className="mt-1 w-full min-h-[44px] px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-800 focus:bg-white"
                />
              </div>

              <div>
                <label htmlFor="srv-desc" className="block text-xs font-medium text-slate-600">
                  {t.formNotes}
                </label>
                <textarea
                  id="srv-desc"
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder={t.formNotesPlaceholder}
                  className="mt-1 w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-800 focus:bg-white"
                />
              </div>

              <button
                type="submit"
                className="w-full min-h-[48px] px-4 py-2.5 text-sm font-medium text-white bg-blue-900 hover:bg-blue-950 rounded-xl transition-colors"
              >
                {t.formSubmit}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
