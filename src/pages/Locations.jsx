import { getByType } from '../data/utils'
import EntryCard from '../components/EntryCard'
import styles from './FilteredList.module.css'

export default function Locations() {
    const entries = getByType('location')

    return (
        <div className={styles.page}>
        <div className={styles.header}>
            <h1 className={styles.title}>Locations</h1>
            <p className={styles.sub}>Places of power, ruin, and forgotten history.</p>
        </div>
        <div className={styles.grid}>
            {entries.map(e => <EntryCard key={e.id} entry={e} />)}
        </div>
        {entries.length === 0 && (
            <p className={styles.empty}>No location entries yet.</p>
        )}
        </div>
    )
}