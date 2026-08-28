/**
 * UI dictionaries. English defines the shape: `es` and `it` are typed as
 * `Dictionary`, so a missing or extra key fails `astro check`. Voice
 * rule: same spare, terminal-flavored tone as the English copy, and
 * never an em-dash.
 */
const en = {
  skipToContent: "Skip to content",
  themeToggle: "Toggle color theme",
  meta: {
    /** Short role for JSON-LD (the full one lives in SITE.jobTitle) */
    jobTitleShort: "Platform Engineer",
  },
  nav: {
    aria: "Main navigation",
    about: "about",
    work: "work",
    writing: "writing",
    experience: "experience",
    security: "security",
  },
  /** aria/title for the header language links, per target locale */
  langSwitch: {
    label: "Language",
    en: "Read in English",
    es: "Read in Spanish",
    it: "Read in Italian",
  },
  hero: {
    wipShort: "// ongoing development",
    wip: "// work in progress: this portfolio is under active development, content and polish land incrementally",
    openTo: "open to opportunities",
    accent: "reliable",
    viewCv: "View CV",
  },
  about: {
    title: "About",
    p1: "I'm a platform engineer who gravitates toward the layer where systems stay up: infrastructure as code, Kubernetes, CI/CD and observability. At Saab I diagnosed a critical failover flaw in a mission-critical, on-prem VoIP system and designed its cloud-native Active/Active replacement on AWS EKS. The work won Best Engineering Internship of the Year from the Danish National Academies and a public endorsement from Saab's Head of Platform Engineering.",
    p2: "Day to day that means GCP and AWS managed as code with Terraform, quality gates in CI, Datadog and Prometheus telling me the truth about production, and AI-assisted development used daily (agents included), building genuine fluency rather than surface-level use.",
    p3: "Off the clock I run a tailnet-only homelab and work through HackTheBox labs, because understanding how systems break is how you learn to keep them up. Full write-ups and postmortems land on this site as they happen. Still early in my career, and genuinely motivated to keep improving: new tools when they help, teammates who know more than I do whenever I can find them.",
    p4: "Beyond the terminal: skis in winter, a bouldering wall year-round, and enthusiastic attempts at surfing that the ocean graciously does not grade.",
    facts: [
      "Platform engineer, most comfortable in Python and Go",
      "Cloud as code: GCP & AWS with Terraform · Kubernetes · GitOps",
      "Observability: Datadog, Prometheus, Grafana",
      "Spanish & Italian citizen (EU) · Madrid · open to relocate",
    ],
  },
  projects: {
    title: "Selected work",
    howWired: "How it's wired",
    liveInHomelab: "✓ live in homelab",
    liveInHomelabTitle: "Deployed and running live in my self-hosted homelab",
    techAria: "Technologies used",
    writeupInProgress: "write-up in progress",
    readWriteup: "read write-up →",
  },
  writing: {
    title: "Writing",
    minRead: "min read",
    viewAll: "view all posts →",
  },
  experience: {
    title: "Experience",
    readStory: "read the full story →",
    browseAll: "browse all roles →",
    indexTitle: "Experience",
    indexDescription:
      "Where I've worked and what I owned, deeper than any CV bullet.",
  },
  security: {
    title: "Security",
    learning: "Learning",
    learningBlurb:
      "Structured study through the HackTheBox academy paths, plus machines and challenges for hands-on practice.",
    modulesCompleted: "// modules completed",
    proLabs: "Pro labs",
    competitive: "competitive",
    proLabsBlurb:
      "Multi-machine corporate networks, typically full Active Directory environments. The goal is simple and brutal: own everything.",
    certJourney: "Certification journey",
    earned: "earned",
    inProgress: "in progress",
    status: {
      completed: "completed",
      active: "active",
      planned: "planned",
    },
  },
  skills: {
    title: "Toolbox",
  },
  testimonials: {
    title: "Kind words",
  },
  footer: {
    contactAria: "Contact",
    hireSub: "Hiring for a platform or backend role, or curious about the homelab? My inbox is open.",
    orWrite: "or write directly on /contact",
    builtWith: "built with astro · static first · self hosted git",
    viewSource: "view source",
  },
  palette: {
    openAria: "Open quick navigation",
    search: "search",
    dialogAria: "Quick navigation",
    inputAria: "Search pages, sections and posts",
    placeholder: "jump to…",
    hintLine: "↑↓ navigate · enter open · esc close",
    noMatches: "no matches",
    hint: {
      page: "page",
      section: "section",
      contact: "contact",
    },
    cmd: {
      home: "home",
      about: "about",
      selectedWork: "selected work",
      writing: "writing",
      experience: "experience",
      security: "security",
      toolbox: "toolbox",
      cvViewer: "cv viewer",
      uses: "uses",
      now: "now",
      contact: "contact",
    },
  },
};

export type Dictionary = typeof en;

const es: Dictionary = {
  skipToContent: "Saltar al contenido",
  themeToggle: "Cambiar tema de color",
  meta: {
    jobTitleShort: "Ingeniero de Plataformas",
  },
  nav: {
    aria: "Navegación principal",
    about: "sobre mí",
    work: "trabajo",
    writing: "escritos",
    experience: "experiencia",
    security: "seguridad",
  },
  langSwitch: {
    label: "Idioma",
    en: "Leer en inglés",
    es: "Leer en español",
    it: "Leer en italiano",
  },
  hero: {
    wipShort: "// en desarrollo continuo",
    wip: "// trabajo en curso: este portfolio está en desarrollo activo, el contenido y los detalles llegan poco a poco",
    openTo: "disponible para oportunidades",
    accent: "fiables",
    viewCv: "Ver CV",
  },
  about: {
    title: "Sobre mí",
    p1: "Soy ingeniero de plataformas y gravito hacia la capa donde los sistemas se mantienen en pie: infraestructura como código, Kubernetes, CI/CD y observabilidad. En Saab diagnosticé un fallo crítico de failover en un sistema VoIP on-prem de misión crítica y diseñé su reemplazo cloud-nativo Activo/Activo en AWS EKS. Ese trabajo ganó el premio a la Mejor Pasantía de Ingeniería del Año de las Academias Nacionales Danesas y una recomendación pública del Head of Platform Engineering de Saab.",
    p2: "El día a día son GCP y AWS gestionados como código con Terraform, quality gates en CI, Datadog y Prometheus diciéndome la verdad sobre producción, y desarrollo asistido por IA a diario (agentes incluidos), construyendo fluidez real en lugar de un uso superficial.",
    p3: "Fuera del trabajo mantengo un homelab accesible solo por tailnet y trabajo los laboratorios de HackTheBox, porque entender cómo se rompen los sistemas es como aprendes a mantenerlos en pie. Los write-ups completos y los postmortem se publican en esta web a medida que ocurren. Todavía estoy al principio de mi carrera y con ganas reales de mejorar: herramientas nuevas cuando ayudan, compañeros que sepan más que yo siempre que pueda encontrarlos.",
    p4: "Fuera de la terminal: esquí en invierno, escalada en bloque todo el año e intentos entusiastas de surf que el mar amablemente no puntúa.",
    facts: [
      "Ingeniero de plataformas, más cómodo en Python y Go",
      "Cloud como código: GCP y AWS con Terraform · Kubernetes · GitOps",
      "Observabilidad: Datadog, Prometheus, Grafana",
      "Ciudadano español e italiano (UE) · Madrid · dispuesto a trasladarme",
    ],
  },
  projects: {
    title: "Trabajo destacado",
    howWired: "Cómo está cableado",
    liveInHomelab: "✓ vivo en mi homelab",
    liveInHomelabTitle: "Desplegado y funcionando en mi homelab autoalojado",
    techAria: "Tecnologías utilizadas",
    writeupInProgress: "artículo en preparación",
    readWriteup: "leer el write-up →",
  },
  writing: {
    title: "Escritos",
    minRead: "min de lectura",
    viewAll: "ver todos los posts →",
  },
  experience: {
    title: "Experiencia",
    readStory: "leer la historia completa →",
    browseAll: "ver todos los roles →",
    indexTitle: "Experiencia",
    indexDescription:
      "Dónde he trabajado y qué he gestionado, con más profundidad que cualquier punto de un CV.",
  },
  security: {
    title: "Seguridad",
    learning: "Aprendizaje",
    learningBlurb:
      "Estudio estructurado con las rutas de la academia de HackTheBox, más máquinas y retos como práctica hands-on.",
    modulesCompleted: "// módulos completados",
    proLabs: "Pro labs",
    competitive: "competitivo",
    proLabsBlurb:
      "Redes corporativas de varias máquinas, normalmente entornos Active Directory completos. El objetivo es simple y brutal: hacerse con todo.",
    certJourney: "Trayectoria de certificaciones",
    earned: "obtenida",
    inProgress: "en curso",
    status: {
      completed: "completado",
      active: "activo",
      planned: "planificado",
    },
  },
  skills: {
    title: "Caja de herramientas",
  },
  testimonials: {
    title: "Palabras amables",
  },
  footer: {
    contactAria: "Contacto",
    hireSub: "¿Contratas para un rol de plataforma o backend, o tienes curiosidad por el homelab? Mi bandeja de entrada está abierta.",
    orWrite: "o escríbeme directamente en /contact",
    builtWith: "hecho con astro · static first · git autoalojado",
    viewSource: "ver código fuente",
  },
  palette: {
    openAria: "Abrir navegación rápida",
    search: "buscar",
    dialogAria: "Navegación rápida",
    inputAria: "Buscar páginas, secciones y posts",
    placeholder: "ir a…",
    hintLine: "↑↓ navegar · enter abrir · esc cerrar",
    noMatches: "sin resultados",
    hint: {
      page: "página",
      section: "sección",
      contact: "contacto",
    },
    cmd: {
      home: "inicio",
      about: "sobre mí",
      selectedWork: "trabajo destacado",
      writing: "escritos",
      experience: "experiencia",
      security: "seguridad",
      toolbox: "herramientas",
      cvViewer: "visor cv",
      uses: "uses",
      now: "now",
      contact: "contacto",
    },
  },
};

const it: Dictionary = {
  skipToContent: "Salta al contenuto",
  themeToggle: "Cambia tema colore",
  meta: {
    jobTitleShort: "Ingegnere di Piattaforme",
  },
  nav: {
    aria: "Navigazione principale",
    about: "chi sono",
    work: "lavori",
    writing: "scritti",
    experience: "esperienza",
    security: "sicurezza",
  },
  langSwitch: {
    label: "Lingua",
    en: "Leggi in inglese",
    es: "Leggi in spagnolo",
    it: "Leggi in italiano",
  },
  hero: {
    wipShort: "// in sviluppo continuo",
    wip: "// lavoro in corso: questo portfolio è in sviluppo attivo, contenuti e rifiniture arrivano poco per volta",
    openTo: "aperto a opportunità",
    accent: "affidabili",
    viewCv: "Vedi CV",
  },
  about: {
    title: "Chi sono",
    p1: "Sono un ingegnere di piattaforme e gravito verso lo strato dove i sistemi restano in piedi: infrastruttura come codice, Kubernetes, CI/CD e osservabilità. In Saab ho diagnosticato un difetto critico di failover in un sistema VoIP on-prem mission-critical e ne ho progettato la sostituzione cloud-native Active/Active su AWS EKS. Il lavoro ha vinto il premio di Miglior Tirocinio di Ingegneria dell'Anno delle Accademie Nazionali Danesi e un endorsement pubblico dal Capo del Platform Engineering di Saab.",
    p2: "Nel quotidiano significa GCP e AWS gestiti come codice con Terraform, quality gate in CI, Datadog e Prometheus che mi dicono la verità sulla produzione, e sviluppo assistito dall'IA ogni giorno (agenti inclusi), per costruire una padronanza reale e non di superficie.",
    p3: "Fuori dal lavoro gestisco un homelab raggiungibile solo via tailnet e faccio i lab di HackTheBox, perché capire come i sistemi si rompono è il modo in cui impari a tenerli in piedi. I write-up completi e i postmortem finiscono su questo sito appena succedono. Sono a inizio carriera e con la vera voglia di migliorare: strumenti nuovi quando servono, colleghi che sanno più di me ogni volta che riesco a trovarli.",
    p4: "Oltre al terminale: sci d'inverno, bouldering tutto l'anno e tentativi entusiasti di surf che l'oceano gentilmente non valuta.",
    facts: [
      "Ingegnere di piattaforme, più a mio agio con Python e Go",
      "Cloud come codice: GCP e AWS con Terraform · Kubernetes · GitOps",
      "Osservabilità: Datadog, Prometheus, Grafana",
      "Cittadino spagnolo e italiano (UE) · Madrid · disponibile al trasferimento",
    ],
  },
  projects: {
    title: "Lavori selezionati",
    howWired: "Com'è cablato",
    liveInHomelab: "✓ live nel mio homelab",
    liveInHomelabTitle: "Deployato e in funzione nel mio homelab self-hosted",
    techAria: "Tecnologie utilizzate",
    writeupInProgress: "articolo in preparazione",
    readWriteup: "leggi il write-up →",
  },
  writing: {
    title: "Scritti",
    minRead: "min di lettura",
    viewAll: "vedi tutti i post →",
  },
  experience: {
    title: "Esperienza",
    readStory: "leggi la storia completa →",
    browseAll: "vedi tutti i ruoli →",
    indexTitle: "Esperienza",
    indexDescription:
      "Dove ho lavorato e cosa ho gestito, più a fondo di qualsiasi voce di CV.",
  },
  security: {
    title: "Sicurezza",
    learning: "Apprendimento",
    learningBlurb:
      "Studio strutturato con i percorsi della HackTheBox Academy, più macchine e challenge come pratica hands-on.",
    modulesCompleted: "// moduli completati",
    proLabs: "Pro lab",
    competitive: "competitivo",
    proLabsBlurb:
      "Reti corporate multi-macchina, in genere ambienti Active Directory completi. L'obiettivo è semplice e brutale: prendere tutto.",
    certJourney: "Percorso di certificazioni",
    earned: "ottenuta",
    inProgress: "in corso",
    status: {
      completed: "completato",
      active: "attivo",
      planned: "pianificato",
    },
  },
  skills: {
    title: "Toolkit",
  },
  testimonials: {
    title: "Parole gentili",
  },
  footer: {
    contactAria: "Contatti",
    hireSub: "Stai assumendo per un ruolo platform o backend, o sei curioso dell'homelab? La mia casella è aperta.",
    orWrite: "oppure scrivimi direttamente su /contact",
    builtWith: "costruito con astro · static first · git self-hosted",
    viewSource: "vedi il sorgente",
  },
  palette: {
    openAria: "Apri navigazione rapida",
    search: "cerca",
    dialogAria: "Navigazione rapida",
    inputAria: "Cerca pagine, sezioni e post",
    placeholder: "vai a…",
    hintLine: "↑↓ sposta · invio apri · esc chiudi",
    noMatches: "nessun risultato",
    hint: {
      page: "pagina",
      section: "sezione",
      contact: "contatti",
    },
    cmd: {
      home: "home",
      about: "chi sono",
      selectedWork: "lavori selezionati",
      writing: "scritti",
      experience: "esperienza",
      security: "sicurezza",
      toolbox: "toolkit",
      cvViewer: "visualizza cv",
      uses: "uses",
      now: "now",
      contact: "contatti",
    },
  },
};

export const ui: Record<import("./index").Locale, Dictionary> = {
  en,
  es,
  it,
};
