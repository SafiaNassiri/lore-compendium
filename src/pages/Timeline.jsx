import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { getAll, getAllTags } from '../data/utils'
import styles from './Timeline.module.css'

const ERA_ORDER = [
    'The Age of Binding',
    'The Age of Frost',
    'The Present Age',
]

export default function Timeline() {
    const [activeEra,  setEra]  = useState('all')
    const [activeTag,  setTag]  = useState(null)

    const events = useMemo(() => {
        return getAll()
        .filter(e => e.type === 'event')
        .filter(e => activeEra === 'all' || e.era === activeEra)
        .filter(e => !activeTag || e.tags.includes(activeTag))
        .sort((a, b) => (a.year ?? 0) - (b.year ?? 0))
    }, [activeEra, activeTag])

    // Get tags only from events
    const eventTags = useMemo(() => {
        const all = getAll().filter(e => e.type === 'event').flatMap(e => e.tags)
        return [...new Set(all)].sort()
    }, [])

    const eras = ['all', ...ERA_ORDER]

    return (
        <div className={styles.page}>
        <div className={styles.header}>
            <h1 className={styles.title}>Timeline</h1>
            <p className={styles.sub}>The history of Verglas in chronological order.</p>
        </div>

        {/* Filters */}
        <div className={styles.filters}>
            <div className={styles.filterRow}>
            {eras.map(era => (
                <button
                key={era}
                className={`${styles.pill} ${activeEra === era ? styles.pillActive : ''}`}
                onClick={() => setEra(era)}
                >
                {era === 'all' ? 'All Eras' : era}
                </button>
            ))}
            </div>
            <div className={styles.filterRow}>
            {eventTags.map(tag => (
                <button
                key={tag}
                className={`${styles.pill} ${activeTag === tag ? styles.pillActive : ''}`}
                onClick={() => setTag(activeTag === tag ? null : tag)}
                >
                #{tag}
                </button>
            ))}
            </div>
        </div>

        {events.length === 0 && (
            <p className={styles.empty}>No events match your filters.</p>
        )}

        {/* Timeline */}
        <div className={styles.timeline}>
            {events.map((event, i) => (
            <div key={event.id} className={styles.event}>
                {/* Line + dot */}
                <div className={styles.spine}>
                <div className={styles.dot} />
                {i < events.length - 1 && <div className={styles.line} />}
                </div>

                {/* Content */}
                <div className={styles.card}>
                <div className={styles.meta}>
                    {event.era && (
                    <span className={styles.era}>{event.era}</span>
                    )}
                    {event.year !== undefined && (
                    <span className={styles.year}>
                        {event.year === 0
                        ? 'Present'
                        : event.year < 0
                            ? `${Math.abs(event.year)} years before`
                            : `${event.year} years after`}
                    </span>
                    )}
                </div>

                <h2 className={styles.eventTitle}>
                    <Link to={`/entry/${event.slug}`} className={styles.eventLink}>
                    {event.title}
                    </Link>
                </h2>

                <p className={styles.summary}>{event.summary}</p>

                <div className={styles.tags}>
                    {event.tags.map(t => (
                    <Link key={t} to={`/tag/${t}`} className={styles.tag}>
                        #{t}
                    </Link>
                    ))}
                </div>

                {event.relations?.length > 0 && (
                    <div className={styles.relations}>
                    {event.relations.map(r => (
                        <span key={r.id} className={styles.relation}>
                        {r.label}: <Link to={`/entry/${r.id}`} className={styles.relationLink}>{r.id}</Link>
                        </span>
                    ))}
                    </div>
                )}
                </div>
            </div>
            ))}
        </div>
        </div>
    )
}