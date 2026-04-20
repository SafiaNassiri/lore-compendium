import { useState, useMemo } from 'react'
import { getAll, getAllTags } from '../data/utils'
import EntryCard from '../components/EntryCard'
import Tag from '../components/Tag'
import styles from './Articles.module.css'

const TYPES = ['all', 'article', 'deity', 'character', 'location', 'faction']

export default function Articles() {
    const [search, setSearch]       = useState('')
    const [activeType, setType]     = useState('all')
    const [activeTag, setTag]       = useState(null)
    const allTags                   = getAllTags()

    const entries = useMemo(() => {
        let results = getAll()

        if (activeType !== 'all')
        results = results.filter(e => e.type === activeType)

        if (activeTag)
        results = results.filter(e => e.tags.includes(activeTag))

        if (search.trim())
        results = results.filter(e =>
            e.title.toLowerCase().includes(search.toLowerCase()) ||
            e.summary.toLowerCase().includes(search.toLowerCase())
        )

        return results
    }, [search, activeType, activeTag])

    return (
        <div className={styles.page}>
        <div className={styles.header}>
            <h1 className={styles.title}>Lore Index</h1>
            <input
            className={styles.search}
            type="text"
            placeholder="Search entries…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            />
        </div>

        <div className={styles.filters}>
            <div className={styles.filterRow}>
            {TYPES.map(t => (
                <Tag
                key={t}
                label={t}
                active={activeType === t}
                onClick={() => setType(t)}
                />
            ))}
            </div>
            <div className={styles.filterRow}>
            {allTags.map(t => (
                <Tag
                key={t}
                label={t}
                active={activeTag === t}
                onClick={() => setTag(activeTag === t ? null : t)}
                />
            ))}
            </div>
        </div>

        {entries.length === 0 ? (
            <p className={styles.empty}>No entries match your filters.</p>
        ) : (
            <div className={styles.grid}>
            {entries.map(e => <EntryCard key={e.id} entry={e} />)}
            </div>
        )}
        </div>
    )
}