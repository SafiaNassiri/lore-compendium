import { getByType } from '../data/utils'
import EntryCard from '../components/EntryCard'
import { useNavigate } from 'react-router-dom'
import styles from './FilteredList.module.css'

export default function Gods() {
    const entries = getByType('deity')
    const navigate = useNavigate()

    return (
        <div className={styles.page}>
        <div className={styles.header}>
            <h1 className={styles.title}>Living Gods</h1>
            <p className={styles.sub}>The divine beings who persist beyond mortal comprehension.</p>
        </div>
        <div className={styles.grid}>
            {entries.map(e => <EntryCard key={e.id} entry={e} />)}
        </div>
        {entries.length === 0 && (
            <p className={styles.empty}>No deity entries yet. Add them in the admin panel.</p>
        )}
        </div>
    )
}