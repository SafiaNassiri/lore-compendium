import baseEntries from './entries.js'

const STORAGE_KEY = 'verglas_entries'

export function loadEntries() {
    try {
        const stored = localStorage.getItem(STORAGE_KEY)
        if (stored) return JSON.parse(stored)
    } catch (_) {}
    return baseEntries
}

export function saveEntries(entries) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries))
}

export function resetEntries() {
    localStorage.removeItem(STORAGE_KEY)
}

// CRUD
export function addEntry(entry) {
    const entries = loadEntries()
    const updated = [...entries, entry]
    saveEntries(updated)
    return updated
}

export function updateEntry(id, changes) {
    const entries = loadEntries()
    const updated = entries.map(e => e.id === id ? { ...e, ...changes } : e)
    saveEntries(updated)
    return updated
}

export function deleteEntry(id) {
    const entries = loadEntries()
    const updated = entries.filter(e => e.id !== id)
    saveEntries(updated)
    return updated
}