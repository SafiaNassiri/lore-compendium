import { useParams, Link, useNavigate } from 'react-router-dom'
import { getBySlug, resolveRelations } from '../data/utils'
import Tag from '../components/Tag'
import NotesPanel from '../components/NotesPanel'
import styles from './EntryDetail.module.css'

const TYPE_COLORS = {
    deity:     'var(--color-gold)',
    character: 'var(--color-frost)',
    location:  'var(--color-verdant)',
    faction:   'var(--color-crimson)',
    article:   'var(--color-text-secondary)',
    event: 'var(--color-verdant)',
}

function renderContent(text) {
    return text.split('\n\n').map((para, i) => (
        <p key={i} className={styles.para}>{para}</p>
    ))
}

export default function EntryDetail() {
    const { slug }    = useParams()
    const navigate    = useNavigate()
    const entry       = getBySlug(slug)

    if (!entry) return (
        <div className={styles.notFound}>
        <h2>Entry not found</h2>
        <button onClick={() => navigate(-1)} className={styles.back}>← Go back</button>
        </div>
    )

    const color     = TYPE_COLORS[entry.type] ?? 'var(--color-text-secondary)'
    const relations = resolveRelations(entry)

    return (
        <div className={styles.page}>
            <button onClick={() => navigate(-1)} className={styles.back}>← Back</button>

            <div className={styles.hero} style={{ borderColor: color }}>
                <p className={styles.type} style={{ color }}>{entry.type}</p>
                <h1 className={styles.title}>{entry.title}</h1>
                <p className={styles.summary}>{entry.summary}</p>
                <div className={styles.tags}>
                    {entry.tags.map(t => <Tag key={t} label={t} linkable />)}
                </div>
                {entry.book && (
                    <p className={styles.book}>📖 {entry.book}</p>
                )}
            </div>

            <div className={styles.layout}>
        <article className={styles.content}>
            {renderContent(entry.content)}
        </article>

            {relations.length > 0 && (
            <aside className={styles.sidebar}>
                <h3 className={styles.sidebarTitle}>Relations</h3>
                {relations.map(r => (
                <div key={r.id} className={styles.relation}>
                    <span className={styles.relationLabel}>{r.label}</span>
                    {r.entry ? (
                    <Link to={`/entry/${r.entry.slug}`} className={styles.relationLink}>
                        {r.entry.title}
                    </Link>
                    ) : (
                    <span className={styles.relationMissing}>{r.id}</span>
                    )}
                </div>
                ))}
            </aside>
            )}
        </div>

        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 var(--space-lg)' }}>
            <NotesPanel entryId={entry.id} />
        </div>

        </div>
    )
}