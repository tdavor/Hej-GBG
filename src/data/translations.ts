import { AppLanguage, AppTab, EmergencyContact } from '../types/hejGoteborg';

export const UI_TEXT: Record<
  AppLanguage,
  {
    languageLabel: string;
    emergencyButton: string;
    emergencyTitle: string;
    close: string;
    regionKicker: string;
    nav: Record<AppTab, { label: string; shortLabel: string }>;
    hero: Record<AppTab, { heading: string; subheading: string }>;
    checklist: {
      progressLabel: string;
      completedStepsSuffix: string;
      nextStepLabel: string;
      allDoneTitle: string;
      allDoneSubtitle: string;
      openGuideButton: string;
      filters: {
        all: string;
        urgent: string;
        banking_work: string;
        city_living: string;
      };
      hasNote: string;
      stepWord: string;
      requiredDocs: string;
      practicalTip: string;
      personalNoteLabel: string;
      personalNotePlaceholder: string;
      mapButton: string;
      officialPortal: string;
      markDone: string;
      markUndone: string;
    };
    glossary: {
      searchPlaceholder: string;
      shownCount: (shown: number, total: number) => string;
      tabs: {
        all: string;
        favorites: string;
        bureaucracy: string;
        work: string;
        health: string;
        housing: string;
      };
      emptyTitle: string;
      emptySubtitle: string;
      resetButton: string;
      pronunciationLabel: string;
      listenAria: (word: string) => string;
    };
    services: {
      searchPlaceholder: string;
      addButton: string;
      categories: {
        all: string;
        institution: string;
        health: string;
        auto: string;
        everyday: string;
        legal_finance: string;
      };
      userAddedBadge: string;
      languagesLabel: string;
      openMaps: string;
      website: string;
      modalTitle: string;
      formName: string;
      formNamePlaceholder: string;
      formCategory: string;
      formNeighborhood: string;
      formNeighborhoodPlaceholder: string;
      formAddress: string;
      formAddressPlaceholder: string;
      formTram: string;
      formTramPlaceholder: string;
      formPhone: string;
      formLanguages: string;
      formNotes: string;
      formNotesPlaceholder: string;
      formSubmit: string;
    };
    android: {
      title: string;
      description: string;
      copy: string;
      copied: string;
      download: string;
    };
  }
> = {
  hr: {
    languageLabel: 'Odaberi jezik aplikacije',
    emergencyButton: 'Važni brojevi',
    emergencyTitle: 'Važni brojevi u Göteborgu',
    close: 'Zatvori',
    regionKicker: 'Göteborg · Västra Götaland · Hrvatski / English / Svenska',
    nav: {
      checklist: { label: 'Prvih 90 dana', shortLabel: '90 Dana' },
      glossary: { label: 'Rječnik pojmova', shortLabel: 'Rječnik' },
      services: { label: 'Usluge i ustanove', shortLabel: 'Usluge' },
      android: { label: 'Kotlin kod', shortLabel: 'Android' },
    },
    hero: {
      checklist: {
        heading: 'Prvih 90 dana u Göteborgu',
        subheading:
          'Redoslijed prijava od Skatteverketa na Järntorgetu do BankID-a, 1177 zdravstva i Boplatsa za stan.',
      },
      glossary: {
        heading: 'Švedski u praksi — Rječnik za život i posao',
        subheading:
          'Ključni švedski pojmovi koje ćete čuti kod poslodavca, liječnika i prilikom najma stana, s izgovorom.',
      },
      services: {
        heading: 'Ustanove i provjerene preporuke u Göteborgu',
        subheading:
          'Adrese, tramvajske linije i kontakti u Västra Götalandu uz mogućnost dodavanja vlastitih preporuka.',
      },
      android: {
        heading: 'Hej Göteborg — Android Studio (Kotlin)',
        subheading:
          'Izvorni Jetpack Compose Material 3 kod s podrškom za HR / EN / SV spreman za Android Studio.',
      },
    },
    checklist: {
      progressLabel: 'Napredak u Göteborgu',
      completedStepsSuffix: 'dovršenih koraka',
      nextStepLabel: 'Sljedeći preporučeni korak',
      allDoneTitle: 'Sve osnovne prijave su završene',
      allDoneSubtitle: 'Spremni ste za život i rad u Göteborgu',
      openGuideButton: 'Otvori upute i dokumente',
      filters: {
        all: 'Svi koraci',
        urgent: '1.–14. dan',
        banking_work: 'Banka i posao',
        city_living: 'Stan i grad',
      },
      hasNote: 'Ima bilješku',
      stepWord: 'Korak',
      requiredDocs: 'Potrebni dokumenti',
      practicalTip: 'Savjet iz prakse',
      personalNoteLabel: 'Vaša osobna bilješka (datum termina, broj predmeta...)',
      personalNotePlaceholder: 'Npr. Termin kod Skatteverketa 14.12. u 09:30...',
      mapButton: 'Karta',
      officialPortal: 'Službeni portal',
      markDone: 'Označi kao dovršeno',
      markUndone: 'Vrati u aktivne korake',
    },
    glossary: {
      searchPlaceholder: 'Pretraži pojam (npr. VAB, Karensdag, Besiktning)...',
      shownCount: (shown, total) => `Prikazano ${shown} od ${total} pojmova`,
      tabs: {
        all: 'Svi pojmovi',
        favorites: 'Spremljeni',
        bureaucracy: 'Birokracija',
        work: 'Posao',
        health: 'Zdravstvo',
        housing: 'Stanovanje',
      },
      emptyTitle: 'Nema pronađenih pojmova',
      emptySubtitle: 'Pokušajte s drugim pojmom ili vratite filter na sve kategorije.',
      resetButton: 'Prikaži sve pojmove',
      pronunciationLabel: 'Izgovor',
      listenAria: (word) => `Poslušaj izgovor za ${word}`,
    },
    services: {
      searchPlaceholder: 'Pretraži ustanovu, kvart (Hisingen, Majorna) ili uslugu...',
      addButton: 'Dodaj svoju preporuku',
      categories: {
        all: 'Sve lokacije',
        institution: 'Ustanove',
        health: 'Zdravstvo',
        auto: 'Auto i servisi',
        everyday: 'Hrana i kupnja',
        legal_finance: 'Dokumenti',
      },
      userAddedBadge: 'Vaš unos',
      languagesLabel: 'Jezici',
      openMaps: 'Otvori u Kartama',
      website: 'Web',
      modalTitle: 'Dodaj lokalnu preporuku u Göteborgu',
      formName: 'Naziv lokacije ili majstora *',
      formNamePlaceholder: 'Npr. Vårdcentral Majorna ili Automehaničar',
      formCategory: 'Kategorija',
      formNeighborhood: 'Kvart',
      formNeighborhoodPlaceholder: 'Npr. Hisingen, Majorna...',
      formAddress: 'Adresa *',
      formAddressPlaceholder: 'Npr. Karl Johansgatan 45, Göteborg',
      formTram: 'Tramvaj / Bus',
      formTramPlaceholder: 'Npr. Spårvagn 3, 9',
      formPhone: 'Telefon (opcionalno)',
      formLanguages: 'Jezici',
      formNotes: 'Kratka napomena',
      formNotesPlaceholder: 'Zašto preporučujete ovo mjesto...',
      formSubmit: 'Spremi u moj imenik',
    },
    android: {
      title: 'Nativni Kotlin + Jetpack Compose kod za Android Studio',
      description:
        'Ovdje je struktura nativne Android aplikacije Hej Göteborg (Material 3, podrška za HR/EN/SV jezike, Compose Navigation i Maps Intent). Kopirajte ili preuzmite datoteke u svoj Android Studio projekt.',
      copy: 'Kopiraj kod',
      copied: 'Kopirano',
      download: 'Preuzmi',
    },
  },
  en: {
    languageLabel: 'Select app language',
    emergencyButton: 'Key Numbers',
    emergencyTitle: 'Essential Numbers in Gothenburg',
    close: 'Close',
    regionKicker: 'Gothenburg · Västra Götaland · Hrvatski / English / Svenska',
    nav: {
      checklist: { label: 'First 90 Days', shortLabel: '90 Days' },
      glossary: { label: 'Swedish Glossary', shortLabel: 'Glossary' },
      services: { label: 'Places & Services', shortLabel: 'Services' },
      android: { label: 'Kotlin Code', shortLabel: 'Android' },
    },
    hero: {
      checklist: {
        heading: 'Your First 90 Days in Gothenburg',
        subheading:
          'Step-by-step registration roadmap from Skatteverket at Järntorget to Mobilt BankID, 1177 healthcare, and Boplats.',
      },
      glossary: {
        heading: 'Everyday Swedish — Life & Work Glossary',
        subheading:
          'Essential Swedish terms you will hear at work, the doctor, and when renting an apartment, with pronunciation.',
      },
      services: {
        heading: 'Gothenburg Institutions & Local Directory',
        subheading:
          'Verified addresses, Västtrafik tram lines, and contacts across Västra Götaland with your own saved recommendations.',
      },
      android: {
        heading: 'Hej Göteborg — Android Studio (Kotlin)',
        subheading:
          'Native Jetpack Compose Material 3 source files with HR / EN / SV language switching ready for Android Studio.',
      },
    },
    checklist: {
      progressLabel: 'Gothenburg progress',
      completedStepsSuffix: 'steps completed',
      nextStepLabel: 'Next recommended step',
      allDoneTitle: 'All essential registrations complete',
      allDoneSubtitle: 'You are all set for living and working in Gothenburg',
      openGuideButton: 'Open guide & documents',
      filters: {
        all: 'All steps',
        urgent: 'Days 1–14',
        banking_work: 'Bank & Work',
        city_living: 'Housing & City',
      },
      hasNote: 'Has note',
      stepWord: 'Step',
      requiredDocs: 'Required documents',
      practicalTip: 'Local tip',
      personalNoteLabel: 'Personal note (appointment date, case number...)',
      personalNotePlaceholder: 'E.g. Skatteverket appointment Dec 14 at 09:30...',
      mapButton: 'Map',
      officialPortal: 'Official portal',
      markDone: 'Mark as completed',
      markUndone: 'Move back to active',
    },
    glossary: {
      searchPlaceholder: 'Search term (e.g. VAB, Karensdag, Besiktning)...',
      shownCount: (shown, total) => `Showing ${shown} of ${total} terms`,
      tabs: {
        all: 'All terms',
        favorites: 'Saved',
        bureaucracy: 'Bureaucracy',
        work: 'Work',
        health: 'Healthcare',
        housing: 'Housing',
      },
      emptyTitle: 'No matching terms found',
      emptySubtitle: 'Try a different keyword or reset the category filter.',
      resetButton: 'Show all terms',
      pronunciationLabel: 'Pronunciation',
      listenAria: (word) => `Listen to pronunciation of ${word}`,
    },
    services: {
      searchPlaceholder: 'Search office, district (Hisingen, Majorna) or service...',
      addButton: 'Add recommendation',
      categories: {
        all: 'All places',
        institution: 'Public offices',
        health: 'Healthcare',
        auto: 'Auto & repair',
        everyday: 'Food & markets',
        legal_finance: 'Documents',
      },
      userAddedBadge: 'Your entry',
      languagesLabel: 'Languages',
      openMaps: 'Open in Maps',
      website: 'Website',
      modalTitle: 'Add a local recommendation in Gothenburg',
      formName: 'Place or service name *',
      formNamePlaceholder: 'E.g. Vårdcentral Majorna or Bike Workshop',
      formCategory: 'Category',
      formNeighborhood: 'District',
      formNeighborhoodPlaceholder: 'E.g. Hisingen, Majorna...',
      formAddress: 'Address *',
      formAddressPlaceholder: 'E.g. Karl Johansgatan 45, Göteborg',
      formTram: 'Tram / Bus',
      formTramPlaceholder: 'E.g. Tram 3, 9',
      formPhone: 'Phone (optional)',
      formLanguages: 'Languages',
      formNotes: 'Short note',
      formNotesPlaceholder: 'Why you recommend this place...',
      formSubmit: 'Save to directory',
    },
    android: {
      title: 'Native Kotlin + Jetpack Compose code for Android Studio',
      description:
        'Complete starter structure for the native Hej Göteborg Android app (Material 3, HR/EN/SV language switcher, Compose Navigation, and Maps Intent). Copy or download files into Android Studio.',
      copy: 'Copy code',
      copied: 'Copied',
      download: 'Download',
    },
  },
  sv: {
    languageLabel: 'Välj appspråk',
    emergencyButton: 'Viktiga nummer',
    emergencyTitle: 'Viktiga telefonnummer i Göteborg',
    close: 'Stäng',
    regionKicker: 'Göteborg · Västra Götaland · Hrvatski / English / Svenska',
    nav: {
      checklist: { label: 'Första 90 dagarna', shortLabel: '90 Dagar' },
      glossary: { label: 'Ordlista', shortLabel: 'Ordlista' },
      services: { label: 'Service & Platser', shortLabel: 'Platser' },
      android: { label: 'Kotlin-kod', shortLabel: 'Android' },
    },
    hero: {
      checklist: {
        heading: 'Dina första 90 dagar i Göteborg',
        subheading:
          'Steg-för-steg-guide från Skatteverket vid Järntorget till Mobilt BankID, 1177 vård och Boplats Göteborg.',
      },
      glossary: {
        heading: 'Vardagssvenska — Ordlista för jobb & liv',
        subheading:
          'Viktiga svenska begrepp på jobbet, vårdcentralen och vid bostadssökande med uttal och förklaring.',
      },
      services: {
        heading: 'Myndigheter och lokala tips i Göteborg',
        subheading:
          'Adresser, spårvagnslinjer och kontaktuppgifter i Västra Götaland samt möjlighet att spara egna tips.',
      },
      android: {
        heading: 'Hej Göteborg — Android Studio (Kotlin)',
        subheading:
          'Källkod i Jetpack Compose och Material 3 med stöd för HR / EN / SV redo för Android Studio.',
      },
    },
    checklist: {
      progressLabel: 'Framsteg i Göteborg',
      completedStepsSuffix: 'avklarade steg',
      nextStepLabel: 'Nästa rekommenderade steg',
      allDoneTitle: 'Alla grundläggande steg är klara',
      allDoneSubtitle: 'Du är redo för livet och jobbet i Göteborg',
      openGuideButton: 'Öppna guide & dokument',
      filters: {
        all: 'Alla steg',
        urgent: 'Dag 1–14',
        banking_work: 'Bank & Jobb',
        city_living: 'Bostad & Stad',
      },
      hasNote: 'Har anteckning',
      stepWord: 'Steg',
      requiredDocs: 'Dokument som behövs',
      practicalTip: 'Lokalt tips',
      personalNoteLabel: 'Din anteckning (tidbokning, ärendenummer...)',
      personalNotePlaceholder: 'T.ex. Besök hos Skatteverket 14 dec kl 09:30...',
      mapButton: 'Karta',
      officialPortal: 'Officiell webbplats',
      markDone: 'Markera som klar',
      markUndone: 'Flytta tillbaka till aktiva',
    },
    glossary: {
      searchPlaceholder: 'Sök begrepp (t.ex. VAB, Karensdag, Besiktning)...',
      shownCount: (shown, total) => `Visar ${shown} av ${total} begrepp`,
      tabs: {
        all: 'Alla ord',
        favorites: 'Sparade',
        bureaucracy: 'Myndigheter',
        work: 'Arbete',
        health: 'Vård',
        housing: 'Bostad',
      },
      emptyTitle: 'Inga begrepp hittades',
      emptySubtitle: 'Prova ett annat sökord eller återställ kategorifiltret.',
      resetButton: 'Visa alla begrepp',
      pronunciationLabel: 'Uttal',
      listenAria: (word) => `Lyssna på uttal för ${word}`,
    },
    services: {
      searchPlaceholder: 'Sök myndighet, stadsdel (Hisingen, Majorna) eller tjänst...',
      addButton: 'Lägg till eget tips',
      categories: {
        all: 'Alla platser',
        institution: 'Myndigheter',
        health: 'Vård',
        auto: 'Bil & verkstad',
        everyday: 'Mat & handel',
        legal_finance: 'Dokument',
      },
      userAddedBadge: 'Eget tillägg',
      languagesLabel: 'Språk',
      openMaps: 'Öppna i Kartor',
      website: 'Webbplats',
      modalTitle: 'Lägg till lokalt tips i Göteborg',
      formName: 'Namn på plats eller tjänst *',
      formNamePlaceholder: 'T.ex. Vårdcentral Majorna eller Bilverkstad',
      formCategory: 'Kategori',
      formNeighborhood: 'Stadsdel',
      formNeighborhoodPlaceholder: 'T.ex. Hisingen, Majorna...',
      formAddress: 'Adress *',
      formAddressPlaceholder: 'T.ex. Karl Johansgatan 45, Göteborg',
      formTram: 'Spårvagn / Buss',
      formTramPlaceholder: 'T.ex. Spårvagn 3, 9',
      formPhone: 'Telefon (valfritt)',
      formLanguages: 'Språk',
      formNotes: 'Kort beskrivning',
      formNotesPlaceholder: 'Varför du rekommenderar denna plats...',
      formSubmit: 'Spara i katalogen',
    },
    android: {
      title: 'Native Kotlin + Jetpack Compose-kod för Android Studio',
      description:
        'Komplett startstruktur för Android-appen Hej Göteborg (Material 3, språkval för HR/EN/SV, Compose Navigation och Maps Intent). Kopiera eller ladda ner filerna till Android Studio.',
      copy: 'Kopiera kod',
      copied: 'Kopierat',
      download: 'Ladda ner',
    },
  },
};

export const EMERGENCY_CONTACTS: EmergencyContact[] = [
  {
    number: '112',
    title: {
      hr: 'Hitna pomoć, vatrogasci i policija',
      en: 'Emergency Ambulance, Fire & Police',
      sv: 'Akut hjälp: Ambulans, Brandkår & Polis',
    },
    desc: {
      hr: 'Samo za životno ugrožavajuće situacije i hitne nesreće.',
      en: 'Only for life-threatening emergencies and urgent accidents.',
      sv: 'Endast vid akuta nödsituationer där det är fara för liv, egendom eller miljö.',
    },
  },
  {
    number: '1177',
    title: {
      hr: 'Zdravstveni savjet (Vårdguiden)',
      en: 'Medical Advice Line (1177 Vårdguiden)',
      sv: 'Sjukvårdsrådgivning (1177 Vårdguiden)',
    },
    desc: {
      hr: 'Razgovor s medicinskom sestrom 0–24h na švedskom ili engleskom prije odlaska na hitnu.',
      en: 'Speak with a registered nurse 24/7 in Swedish or English before visiting an ER.',
      sv: 'Prata med en sjuksköterska dygnet runt innan du söker vård på akutmottagning.',
    },
  },
  {
    number: '114 14',
    title: {
      hr: 'Policija (ne-hitne prijave)',
      en: 'Police (non-emergency)',
      sv: 'Polisen (ej akuta ärenden)',
    },
    desc: {
      hr: 'Prijava krađe bicikla, izgubljenih dokumenata ili savjet policije.',
      en: 'Report bike theft, lost passports/IDs, or request general police advice.',
      sv: 'Anmäl stöld, förlorade handlingar eller få råd från polisen.',
    },
  },
  {
    number: '031-365 00 00',
    title: {
      hr: 'Grad Göteborg (Kontaktcenter)',
      en: 'City of Gothenburg Contact Center',
      sv: 'Göteborgs Stad Kontaktcenter',
    },
    desc: {
      hr: 'Opće informacije o vrtićima, školama, SFI tečajevima i gradskim uslugama.',
      en: 'General info about preschools, schools, SFI Swedish courses, and city services.',
      sv: 'Frågor om förskola, skola, SFI-kurser och kommunal service i Göteborg.',
    },
  },
  {
    number: '0771-41 43 00',
    title: {
      hr: 'Västtrafik korisnička podrška',
      en: 'Västtrafik Customer Service',
      sv: 'Västtrafik Kundservice',
    },
    desc: {
      hr: 'Izgubljene stvari u tramvaju, informacije o kartama i zonama A/B/C.',
      en: 'Lost & found on trams/ferries, ticket zones A/B/C, and travel support.',
      sv: 'Hittegods på spårvagn/färja samt frågor om biljetter och zoner A/B/C.',
    },
  },
];
