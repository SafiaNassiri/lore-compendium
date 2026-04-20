import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { getAll } from '../data/utils'
import styles from './BookTracker.module.css'

const TYPE_COLORS = {
    deity:     'var(--color-gold)',
    character: 'var(--color-frost)',
    location:  'var(--color-verdant)',
    faction:   'var(--color-crimson)',
    article:   'var(--color-text-secondary)',
    event:     'var(--color-verdant)',
}

export default function BookTracker() {
    const [activeBook, setBook] = useState('all')
    const [activeType, setType] = useState('all')

    const allEntries = getAll().filter(e => e.type !== 'event')

    const books = useMemo(() => {
        const b = allEntries
        .map(e => e.book)
        .filter(Boolean)
        return ['all', ...new Set(b)]
    }, [allEntries])

    const types = ['all', 'article', 'deity', 'character', 'location', 'faction']

    const filtered = useMemo(() => {
        return allEntries
        .filter(e => activeBook === 'all' || e.book === activeBook)
        .filter(e => activeType === 'all' || e.type === activeType)
    }, [activeBook, activeType, allEntries])

    // Group by book
    const grouped = useMemo(() => {
        if (activeBook !== 'all') {
        return { [activeBook]: filtered }
        }
        const groups = {}
        filtered.forEach(e => {
        const key = e.book ?? 'Unassigned'
        if (!groups[key]) groups[key] = []
        groups[key].push(e)
        })
        return groups
    }, [filtered, activeBook])

    return (
        <div className={styles.page}>
        <div className={styles.header}>
            <h1 className={styles.title}>Book Tracker</h1>
            <p className={styles.sub}>See which entries appear in each book.</p>
        </div>

        {/* Filters */}
        <div className={styles.filters}>
            <div className={styles.filterRow}>
            {books.map(b => (
                <button
                key={b}
                className={`${styles.pill} ${activeBook === b ? styles.pillActive : ''}`}
                onClick={() => setBook(b)}
                >
                {b === 'all' ? 'All Books' : b}
                </button>
            ))}
            </div>
            <div className={styles.filterRow}>
            {types.map(t => (
                <button
                key={t}
                className={`${styles.pill} ${activeType === t ? styles.pillActive : ''}`}
                onClick={() => setType(t)}
                >
                {t === 'all' ? 'All Types' : t}
                </button>
            ))}
            </div>
        </div>

        {/* Groups */}
        {Object.entries(grouped).map(([book, entries]) => (
            <div key={book} className={styles.group}>
            <div className={styles.groupHeader}>
                <h2 className={styles.groupTitle}>{book}</h2>
                <span className={styles.groupCount}>{entries.length} entries</span>
            </div>
            <div className={styles.table}>
                {entries.map(e => (
                <Link key={e.id} to={`/entry/${e.slug}`} className={styles.row}>
                    <span
                    className={styles.type}
                    style={{ color: TYPE_COLORS[e.type] ?? 'var(--color-text-muted)' }}
                    >
                    {e.type}
                    </span>
                    <span className={styles.entryTitle}>{e.title}</span>
                    <span className={styles.summary}>{e.summary}</span>
                </Link>
                ))}
            </div>
            </div>
        ))}

        {filtered.length === 0 && (
            <p className={styles.empty}>No entries match your filters.</p>
        )}
        </div>
    )
}