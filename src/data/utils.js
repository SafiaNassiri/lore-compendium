import entries from './entries.js'

/** Get all entries of a given type */
export function getByType(type) {
    return entries.filter(e => e.type === type)
}

/** Get a single entry by slug */
export function getBySlug(slug) {
    return entries.find(e => e.slug === slug) ?? null
}

/** Get a single entry by id */
export function getById(id) {
    return entries.find(e => e.id === id) ?? null
}

/** Get all entries matching a tag */
export function getByTag(tag) {
    return entries.filter(e => e.tags.includes(tag))
}

/** Get all unique tags across all entries */
export function getAllTags() {
    return [...new Set(entries.flatMap(e => e.tags))].sort()
}

/** Get all entries (optionally filter by type array) */
export function getAll(types = null) {
    if (!types) return entries
    return entries.filter(e => types.includes(e.type))
}

/** Resolve relations for an entry — returns full entry objects */
export function resolveRelations(entry) {
    return entry.relations.map(r => ({
        ...r,
        entry: getById(r.id),
    }))
}