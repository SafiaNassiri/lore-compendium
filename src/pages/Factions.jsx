import { getByType } from '../data/utils'
import EntryCard from '../components/EntryCard'
import styles from './FilteredList.module.css'

export default function Factions() {
    const entries = getByType('faction')

    return (
        <div className={styles.page}>
        <div className={styles.header}>
            <h1 className={styles.title}>Factions</h1>
            <p className={styles.sub}>The powers that shape the world — divine, mortal, and otherwise.</p>
        </div>
        <div className={styles.grid}>
            {entries.map(e => <EntryCard key={e.id} entry={e} />)}
        </div>
        {entries.length === 0 && (
            <p className={styles.empty}>No faction entries yet.</p>
        )}
        </div>
    )
}