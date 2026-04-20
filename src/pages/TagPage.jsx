import { useParams, Link } from 'react-router-dom'
import { getByTag, getAll } from '../data/utils'
import EntryCard from '../components/EntryCard'
import styles from './FilteredList.module.css'

export default function TagPage() {
    const { tag } = useParams()
    const entries = getByTag(tag)

    return (
        <div className={styles.page}>
        <div className={styles.header}>
            <p className={styles.eyebrow}>Tag</p>
            <h1 className={styles.title}>#{tag}</h1>
            <p className={styles.sub}>{entries.length} entr{entries.length !== 1 ? 'ies' : 'y'} tagged with this.</p>
        </div>
        <div className={styles.grid}>
            {entries.map(e => <EntryCard key={e.id} entry={e} />)}
        </div>
        {entries.length === 0 && (
            <p className={styles.empty}>No entries found for this tag.</p>
        )}
        </div>
    )
}