import { useState, useMemo } from 'react'
import { getAll } from '../data/utils'
import EntryCard from '../components/EntryCard'
import styles from './Search.module.css'

export default function Search() {
    const [query, setQuery] = useState('')

    const results = useMemo(() => {
        const q = query.trim().toLowerCase()
        if (!q) return []
        return getAll().filter(e =>
        e.title.toLowerCase().includes(q)       ||
        e.summary.toLowerCase().includes(q)     ||
        e.content.toLowerCase().includes(q)     ||
        e.tags.some(t => t.toLowerCase().includes(q)) ||
        e.type.toLowerCase().includes(q)
        )
    }, [query])

    return (
        <div className={styles.page}>
        <div className={styles.header}>
            <h1 className={styles.title}>Search</h1>
            <input
            className={styles.input}
            type="text"
            placeholder="Search all lore…"
            value={query}
            onChange={e => setQuery(e.target.value)}
            autoFocus
            />
        </div>

        {query.trim() === '' && (
            <p className={styles.hint}>Start typing to search across all entries, tags, and content.</p>
        )}

        {query.trim() !== '' && results.length === 0 && (
            <p className={styles.empty}>No results for "<strong>{query}</strong>".</p>
        )}

        {results.length > 0 && (
            <>
            <p className={styles.count}>{results.length} result{results.length !== 1 ? 's' : ''}</p>
            <div className={styles.grid}>
                {results.map(e => <EntryCard key={e.id} entry={e} />)}
            </div>
            </>
        )}
        </div>
    )
}