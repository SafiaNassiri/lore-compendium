const entries = [
  // ── DEITIES ──────────────────────────────────────────
    {
        id: 'verglas',
        type: 'deity',
        title: 'Verglas',
        slug: 'verglas',
        tags: ['living-god', 'ice', 'dissident'],
        summary: 'The first god to refuse the Ascension. Patron of frozen truths.',
        content: `Verglas is the eldest of the Living Gods — a being who existed before the divine hierarchy calcified into law. When the other gods underwent the Ascension, binding themselves to mortal worship as a source of power, Verglas refused.\n\nThis refusal was not rebellion for its own sake. Verglas believed that a god sustained by prayer was a god held hostage. The frozen wastes of the Verglas Reach bear the god's name — not as tribute, but as warning.`,
        relations: [
        { id: 'the-ascension', label: 'refused' },
        { id: 'verglas-reach', label: 'namesake of' },
        ],
        updatedAt: '2025-01-01',
    },
    {
        id: 'solenne',
        type: 'deity',
        title: 'Solenne',
        slug: 'solenne',
        tags: ['living-god', 'light', 'orthodoxy'],
        summary: 'High Arbiter of the divine court. Oldest supporter of the Ascension.',
        content: `Solenne governs light — not sunlight, but the light of revelation, of exposure. Where Verglas hoards truths in ice, Solenne burns them into the open.\n\nShe is the chief antagonist of the Dissident faction, not out of cruelty, but out of genuine belief that gods who withhold themselves from mortals are gods who have abandoned their purpose.`,
        relations: [
        { id: 'verglas', label: 'opposes' },
        { id: 'the-ascension', label: 'architect of' },
        ],
        updatedAt: '2025-01-01',
    },

  // ── CHARACTERS ───────────────────────────────────────
    {
        id: 'eiravel',
        type: 'character',
        title: 'Eiravel',
        slug: 'eiravel',
        tags: ['mortal', 'protagonist', 'dissident-aligned'],
        summary: 'A cartographer who mapped the Reach without permission — and found something that shouldn\'t exist.',
        content: `Eiravel was contracted by the Orthodox Church to map the northern borders of the Verglas Reach — specifically to find gaps in Verglas's domain where Orthodox missionaries could establish footholds.\n\nShe completed the map. She also found the Threshold — a place where Verglas's power terminates abruptly, not from weakness, but by choice. What lies beyond it is the central mystery of the first book.`,
        relations: [
        { id: 'verglas', label: 'encountered' },
        { id: 'verglas-reach', label: 'mapped' },
        { id: 'the-threshold', label: 'discovered' },
        ],
        updatedAt: '2025-01-01',
    },

  // ── LOCATIONS ────────────────────────────────────────
    {
        id: 'verglas-reach',
        type: 'location',
        title: 'The Verglas Reach',
        slug: 'verglas-reach',
        tags: ['region', 'frozen', 'dissident-territory'],
        summary: 'A vast frozen expanse governed — or abandoned — by the god Verglas.',
        content: `The Reach is not a wasteland by natural cause. Before Verglas's refusal of the Ascension, the region was temperate — fertile lowlands dotted with small settlements.\n\nThe freeze came gradually over two centuries following the Dissident Wars. Whether it was punishment, protection, or simply the ambient effect of a god's grief made manifest, no scholar agrees.`,
        relations: [
        { id: 'verglas', label: 'domain of' },
        { id: 'eiravel', label: 'mapped by' },
        ],
        updatedAt: '2025-01-01',
    },
    {
        id: 'the-threshold',
        type: 'location',
        title: 'The Threshold',
        slug: 'the-threshold',
        tags: ['mystery', 'verglas-reach', 'key-location'],
        summary: 'The exact point where Verglas\'s divine domain ends — by choice, not force.',
        content: `The Threshold has no physical marker. It cannot be seen, only felt — a sudden absence of the cold that defines the Reach, as if stepping out of a shadow into open air.\n\nEiravel was the first mortal to document it. Her notes describe it as "the place where the god decided to stop." What lies beyond it remains classified by the Orthodox Church.`,
        relations: [
        { id: 'verglas', label: 'border of domain' },
        { id: 'eiravel', label: 'discovered by' },
        ],
        updatedAt: '2025-01-01',
    },

  // ── FACTIONS ─────────────────────────────────────────
    {
        id: 'orthodox-church',
        type: 'faction',
        title: 'The Orthodox Church',
        slug: 'orthodox-church',
        tags: ['faction', 'orthodoxy', 'antagonist'],
        summary: 'The governing religious body that administers the Ascension compact between gods and mortals.',
        content: `The Orthodox Church did not create the Ascension — but it formalized it, codified it, and has spent eight centuries enforcing it. In their theology, a god who does not accept worship is a god in violation of the natural order.\n\nThey are not cartoonishly evil. Many members genuinely believe that the Dissident gods pose an existential threat — that if gods can refuse their function, the entire framework of civilization collapses.`,
        relations: [
        { id: 'solenne', label: 'led by' },
        { id: 'verglas', label: 'opposes' },
        { id: 'eiravel', label: 'employed' },
        ],
        updatedAt: '2025-01-01',
    },

  // ── ARTICLES ─────────────────────────────────────────
    {
        id: 'the-ascension',
        type: 'article',
        title: 'The Ascension',
        slug: 'the-ascension',
        tags: ['lore', 'history', 'divine-law'],
        summary: 'The compact by which gods bound themselves to mortal worship as their source of power.',
        content: `Eight hundred years before the events of the first book, the gods of Verglas's world entered into what would become known as the Ascension — a voluntary (or coerced, depending on who you ask) binding that tethered divine power to mortal belief.\n\nThe mechanism is not fully understood even within the story. The Orthodox Church teaches that gods gain power from prayer and lose it from doubt. The Dissident faction argues the relationship is more parasitic — that mortal belief doesn't empower gods, it constrains them.\n\nVerglas is the only Living God known to have refused the compact outright and survived.`,
        relations: [
        { id: 'verglas', label: 'refused by' },
        { id: 'solenne', label: 'architected by' },
        { id: 'orthodox-church', label: 'enforced by' },
        ],
        updatedAt: '2025-01-01',
    },
]

export default entries