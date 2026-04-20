import { Link } from 'react-router-dom'
import Tag from './Tag'
import styles from './EntryCard.module.css'

const TYPE_COLORS = {
    deity:     'var(--color-gold)',
    character: 'var(--color-frost)',
    location:  'var(--color-verdant)',
    faction:   'var(--color-crimson)',
    article:   'var(--color-text-secondary)',
    event: 'var(--color-verdant)',
}

export default function EntryCard({ entry }) {
    const color = TYPE_COLORS[entry.type] ?? 'var(--color-text-secondary)'

    return (
        <Link to={`/entry/${entry.slug}`} className={styles.card}>
        <div className={styles.typeBar} style={{ background: color }} />
        <div className={styles.body}>
            <p className={styles.type} style={{ color }}>{entry.type}</p>
            <h3 className={styles.title}>{entry.title}</h3>
            <p className={styles.summary}>{entry.summary}</p>
            <div className={styles.tags}>
            {entry.tags.slice(0, 3).map(t => (
                <Tag key={t} label={t} linkable />
            ))}
            </div>
        </div>
        </Link>
    )
}