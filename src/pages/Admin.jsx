import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAdmin } from '../context/AdminContext'
import { loadEntries, addEntry, updateEntry, deleteEntry, resetEntries } from '../data/store'
import styles from './Admin.module.css'

const EMPTY_FORM = {
    id: '', type: 'article', title: '', slug: '',
    tags: '', summary: '', content: '', relations: '',
    era: '', year: '',
    updatedAt: new Date().toISOString().split('T')[0],
}

    const TYPES = ['article', 'character', 'deity', 'location', 'faction', 'event']

    export default function Admin() {
    const { isAdmin, logout } = useAdmin()
    const navigate = useNavigate()
    const [entries, setEntries]   = useState([])
    const [form, setForm]         = useState(EMPTY_FORM)
    const [editing, setEditing]   = useState(null)  // id of entry being edited
    const [view, setView]         = useState('list') // 'list' | 'form'
    const [search, setSearch]     = useState('')
    const [confirm, setConfirm]   = useState(null)  // id pending delete

    useEffect(() => {
        if (!isAdmin) navigate('/admin/login')
        else setEntries(loadEntries())
    }, [isAdmin])

    const refresh = () => setEntries(loadEntries())

    const handleEdit = (entry) => {
        setForm({
        ...entry,
        tags:      entry.tags.join(', '),
        relations: entry.relations.map(r => `${r.id}:${r.label}`).join(', '),
        })
        setEditing(entry.id)
        setView('form')
    }

    const handleNew = () => {
        setForm(EMPTY_FORM)
        setEditing(null)
        setView('form')
    }

    const handleDelete = (id) => {
        deleteEntry(id)
        refresh()
        setConfirm(null)
    }

    const handleSubmit = () => {
        // Validate
        if (!form.id.trim() || !form.title.trim() || !form.slug.trim()) {
        alert('ID, Title, and Slug are required.')
        return
        }

        const parsed = {
            ...form,
            tags: form.tags.split(',').map(t => t.trim()).filter(Boolean),
            year: form.year !== '' ? Number(form.year) : undefined,
            relations: form.relations
                .split(',')
                .map(r => r.trim())
                .filter(Boolean)
                .map(r => {
                const [id, ...rest] = r.split(':')
                return { id: id.trim(), label: rest.join(':').trim() || 'related' }
            }),
        }

        if (editing) updateEntry(editing, parsed)
        else addEntry(parsed)

        refresh()
        setView('list')
        setEditing(null)
        setForm(EMPTY_FORM)
    }

    const handleReset = () => {
        if (window.confirm('Reset ALL entries to defaults? This cannot be undone.')) {
        resetEntries()
        refresh()
        }
    }

    const filtered = entries.filter(e =>
        e.title.toLowerCase().includes(search.toLowerCase()) ||
        e.type.toLowerCase().includes(search.toLowerCase())
    )

    if (!isAdmin) return null

    return (
        <div className={styles.page}>
        {/* Header */}
        <div className={styles.topbar}>
            <h1 className={styles.title}>Admin Panel</h1>
            <div className={styles.topbarActions}>
            <button className={styles.btnGhost} onClick={() => navigate('/')}>← Site</button>
            <button className={styles.btnDanger} onClick={logout}>Logout</button>
            </div>
        </div>

        {view === 'list' && (
            <>
            <div className={styles.toolbar}>
                <input
                className={styles.search}
                placeholder="Filter entries…"
                value={search}
                onChange={e => setSearch(e.target.value)}
                />
                <button className={styles.btnPrimary} onClick={handleNew}>
                + New Entry
                </button>
                <button className={styles.btnDanger} onClick={handleReset}>
                Reset to Default
                </button>
            </div>

            <div className={styles.table}>
                <div className={styles.tableHead}>
                <span>Title</span>
                <span>Type</span>
                <span>Slug</span>
                <span>Actions</span>
                </div>
                {filtered.map(e => (
                <div key={e.id} className={styles.tableRow}>
                    <span className={styles.entryTitle}>{e.title}</span>
                    <span className={styles.entryType}>{e.type}</span>
                    <span className={styles.entrySlug}>{e.slug}</span>
                    <div className={styles.rowActions}>
                    <button className={styles.btnEdit} onClick={() => handleEdit(e)}>Edit</button>
                    {confirm === e.id ? (
                        <>
                        <button className={styles.btnDanger} onClick={() => handleDelete(e.id)}>Confirm</button>
                        <button className={styles.btnGhost} onClick={() => setConfirm(null)}>Cancel</button>
                        </>
                    ) : (
                        <button className={styles.btnDanger} onClick={() => setConfirm(e.id)}>Delete</button>
                    )}
                    </div>
                </div>
                ))}
                {filtered.length === 0 && (
                <p className={styles.empty}>No entries match.</p>
                )}
            </div>
            </>
        )}

        {view === 'form' && (
            <div className={styles.form}>
            <div className={styles.formHeader}>
                <h2 className={styles.formTitle}>{editing ? 'Edit Entry' : 'New Entry'}</h2>
                <button className={styles.btnGhost} onClick={() => setView('list')}>← Back</button>
            </div>

            <div className={styles.formGrid}>
                <label className={styles.field}>
                <span className={styles.label}>ID <em>(kebab-case, unique)</em></span>
                <input className={styles.input} value={form.id}
                    onChange={e => setForm(f => ({ ...f, id: e.target.value }))}
                    disabled={!!editing}
                />
                </label>

                <label className={styles.field}>
                <span className={styles.label}>Type</span>
                <select className={styles.input} value={form.type}
                    onChange={e => setForm(f => ({ ...f, type: e.target.value }))}
                >
                    {TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
                </label>

                <label className={styles.field}>
                <span className={styles.label}>Title</span>
                <input className={styles.input} value={form.title}
                    onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                />
                </label>

                <label className={styles.field}>
                <span className={styles.label}>Slug <em>(used in URL)</em></span>
                <input className={styles.input} value={form.slug}
                    onChange={e => setForm(f => ({ ...f, slug: e.target.value }))}
                />
                </label>

                <label className={`${styles.field} ${styles.fullWidth}`}>
                <span className={styles.label}>Tags <em>(comma separated)</em></span>
                <input className={styles.input} value={form.tags}
                    onChange={e => setForm(f => ({ ...f, tags: e.target.value }))}
                    placeholder="living-god, dissident, ice"
                />
                </label>

                <label className={`${styles.field} ${styles.fullWidth}`}>
                <span className={styles.label}>Summary</span>
                <input className={styles.input} value={form.summary}
                    onChange={e => setForm(f => ({ ...f, summary: e.target.value }))}
                />
                </label>

                <label className={`${styles.field} ${styles.fullWidth}`}>
                <span className={styles.label}>Content <em>(plain text, blank lines = paragraphs)</em></span>
                <textarea className={styles.textarea} value={form.content} rows={8}
                    onChange={e => setForm(f => ({ ...f, content: e.target.value }))}
                />
                </label>

                <label className={`${styles.field} ${styles.fullWidth}`}>
                <span className={styles.label}>Relations <em>(id:label, comma separated — e.g. verglas:opposes)</em></span>
                <input className={styles.input} value={form.relations}
                    onChange={e => setForm(f => ({ ...f, relations: e.target.value }))}
                    placeholder="verglas:opposes, eiravel:employed"
                />
                </label>

                <label className={styles.field}>
                <span className={styles.label}>Era <em>(for events)</em></span>
                <input className={styles.input} value={form.era}
                    onChange={e => setForm(f => ({ ...f, era: e.target.value }))}
                    placeholder="The Age of Binding"
                />
                </label>

                <label className={styles.field}>
                <span className={styles.label}>Year <em>(negative = before present)</em></span>
                <input className={styles.input} type="number" value={form.year}
                    onChange={e => setForm(f => ({ ...f, year: e.target.value }))}
                    placeholder="-800"
                />
                </label>
            </div>

            <div className={styles.formActions}>
                <button className={styles.btnPrimary} onClick={handleSubmit}>
                {editing ? 'Save Changes' : 'Create Entry'}
                </button>
                <button className={styles.btnGhost} onClick={() => setView('list')}>
                Cancel
                </button>
            </div>
            </div>
        )}
        </div>
    )
}