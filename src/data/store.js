import baseEntries from './entries.js'

const STORAGE_KEY = 'verglas_entries'
const NOTES_KEY = 'verglas_notes'

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

export function loadNotes() {
    try {
        const stored = localStorage.getItem(NOTES_KEY)
        if (stored) return JSON.parse(stored)
    } catch (_) {}
    return {}
}

export function saveNote(entryId, note) {
    const notes = loadNotes()
    if (!notes[entryId]) notes[entryId] = []
    const existing = notes[entryId].findIndex(n => n.id === note.id)
    if (existing >= 0) notes[entryId][existing] = note
    else notes[entryId].push(note)
    localStorage.setItem(NOTES_KEY, JSON.stringify(notes))
}

export function deleteNote(entryId, noteId) {
    const notes = loadNotes()
    if (!notes[entryId]) return
    notes[entryId] = notes[entryId].filter(n => n.id !== noteId)
    localStorage.setItem(NOTES_KEY, JSON.stringify(notes))
}

export function getNotesForEntry(entryId) {
    const notes = loadNotes()
    return notes[entryId] ?? []
}