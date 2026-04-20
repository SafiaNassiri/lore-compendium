/**
 * Lore Entry Schema — Verglas: Divine Dissident
 *
 * type: 'article' | 'character' | 'location' | 'faction' | 'deity'
 *
 * {
 *   id:        string   — unique kebab-case identifier
 *   type:      string   — one of the types above
 *   title:     string
 *   slug:      string   — used in URL (/articles/slug)
 *   tags:      string[]
 *   summary:   string   — one-line description
 *   content:   string   — markdown body
 *   relations: { id: string, label: string }[]
 *   updatedAt: string   — ISO date
 * }
 */