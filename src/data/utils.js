import { loadEntries } from './store.js'

export function getByType(type) {
    return loadEntries().filter(e => e.type === type)
}

export function getBySlug(slug) {
    return loadEntries().find(e => e.slug === slug) ?? null
}

export function getById(id) {
    return loadEntries().find(e => e.id === id) ?? null
}

export function getByTag(tag) {
    return loadEntries().filter(e => e.tags.includes(tag))
}

export function getAllTags() {
    return [...new Set(loadEntries().flatMap(e => e.tags))].sort()
}

export function getAll(types = null) {
    const entries = loadEntries()
    if (!types) return entries
    return entries.filter(e => types.includes(e.type))
}

export function resolveRelations(entry) {
    return entry.relations.map(r => ({
        ...r,
        entry: getById(r.id),
    }))
}