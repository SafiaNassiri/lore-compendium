import { getByType } from '../data/utils'
import EntryCard from '../components/EntryCard'
import styles from './FilteredList.module.css'

export default function Regions() {
    const entries = getByType('location').filter(e => e.tags.includes('region'))

    return (
        <div className={styles.page}>
        <div className={styles.header}>
            <h1 className={styles.title}>Regions</h1>
            <p className={styles.sub}>The named territories of the Verglas world.</p>
        </div>
        <div className={styles.grid}>
            {entries.map(e => <EntryCard key={e.id} entry={e} />)}
        </div>
        {entries.length === 0 && (
            <p className={styles.empty}>No region entries yet. Tag a location with "region" to show it here.</p>
        )}
        </div>
    )
}