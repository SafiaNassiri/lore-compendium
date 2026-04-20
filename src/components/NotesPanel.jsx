import { useState, useEffect } from 'react'
import { useAdmin } from '../context/AdminContext'
import { getNotesForEntry, saveNote, deleteNote } from '../data/store'
import styles from './NotesPanel.module.css'

const NOTE_TYPES = ['normal', 'spoiler', 'todo']

const TYPE_STYLES = {
    normal:  { color: 'var(--color-frost)',   label: '📝 Note'    },
    spoiler: { color: 'var(--color-crimson)', label: '⚠️ Spoiler' },
    todo:    { color: 'var(--color-gold)',    label: '☐ Todo'     },
}

function makeId() {
    return `note_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`
}

export default function NotesPanel({ entryId }) {
    const { isAdmin }           = useAdmin()
    const [notes, setNotes]     = useState([])
    const [adding, setAdding]   = useState(false)
    const [editing, setEditing] = useState(null)
    const [form, setForm]       = useState({ type: 'normal', text: '' })

    useEffect(() => {
        setNotes(getNotesForEntry(entryId))
    }, [entryId])

    if (!isAdmin) return null

    const refresh = () => setNotes(getNotesForEntry(entryId))

    const handleSave = () => {
        if (!form.text.trim()) return
        const note = {
        id:   editing ?? makeId(),
        type: form.type,
        text: form.text.trim(),
        updatedAt: new Date().toISOString(),
        }
        saveNote(entryId, note)
        refresh()
        setAdding(false)
        setEditing(null)
        setForm({ type: 'normal', text: '' })
    }

    const handleEdit = (note) => {
        setEditing(note.id)
        setForm({ type: note.type, text: note.text })
        setAdding(true)
    }

    const handleDelete = (noteId) => {
        deleteNote(entryId, noteId)
        refresh()
    }

    const handleCancel = () => {
        setAdding(false)
        setEditing(null)
        setForm({ type: 'normal', text: '' })
    }

    return (
        <div className={styles.panel}>
        <div className={styles.header}>
            <h3 className={styles.title}>Admin Notes</h3>
            {!adding && (
            <button className={styles.addBtn} onClick={() => setAdding(true)}>
                + Add Note
            </button>
            )}
        </div>

        {/* Add / Edit form */}
        {adding && (
            <div className={styles.form}>
            <div className={styles.typeRow}>
                {NOTE_TYPES.map(t => (
                <button
                    key={t}
                    className={`${styles.typePill} ${form.type === t ? styles.typePillActive : ''}`}
                    style={form.type === t ? { borderColor: TYPE_STYLES[t].color, color: TYPE_STYLES[t].color } : {}}
                    onClick={() => setForm(f => ({ ...f, type: t }))}
                >
                    {TYPE_STYLES[t].label}
                </button>
                ))}
            </div>
            <textarea
                className={styles.textarea}
                value={form.text}
                onChange={e => setForm(f => ({ ...f, text: e.target.value }))}
                placeholder="Write your note…"
                rows={3}
                autoFocus
            />
            <div className={styles.formActions}>
                <button className={styles.saveBtn} onClick={handleSave}>
                {editing ? 'Save' : 'Add'}
                </button>
                <button className={styles.cancelBtn} onClick={handleCancel}>
                Cancel
                </button>
            </div>
            </div>
        )}

        {/* Notes list */}
        {notes.length === 0 && !adding && (
            <p className={styles.empty}>No notes yet.</p>
        )}

        <div className={styles.notes}>
            {notes.map(note => {
            const ts = TYPE_STYLES[note.type] ?? TYPE_STYLES.normal
            return (
                <div
                key={note.id}
                className={styles.note}
                style={{ borderLeftColor: ts.color }}
                >
                <div className={styles.noteMeta}>
                    <span className={styles.noteType} style={{ color: ts.color }}>
                    {ts.label}
                    </span>
                    <div className={styles.noteActions}>
                    <button className={styles.noteBtn} onClick={() => handleEdit(note)}>Edit</button>
                    <button
                        className={`${styles.noteBtn} ${styles.noteBtnDelete}`}
                        onClick={() => handleDelete(note.id)}
                    >
                        Delete
                    </button>
                    </div>
                </div>
                <p className={styles.noteText}>{note.text}</p>
                </div>
            )
            })}
        </div>
        </div>
    )
}