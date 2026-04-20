import { getByType } from '../data/utils'
import EntryCard from '../components/EntryCard'
import styles from './FilteredList.module.css'

export default function Characters() {
    const entries = getByType('character')

    return (
        <div className={styles.page}>
        <div className={styles.header}>
            <h1 className={styles.title}>Characters</h1>
            <p className={styles.sub}>Mortals and other beings caught in the wake of divine dissent.</p>
        </div>
        <div className={styles.grid}>
            {entries.map(e => <EntryCard key={e.id} entry={e} />)}
        </div>
        {entries.length === 0 && (
            <p className={styles.empty}>No character entries yet.</p>
        )}
        </div>
    )
}