import { useNavigate } from 'react-router-dom'
import styles from './Home.module.css'

export default function Home() {
    const navigate = useNavigate()
    return (
        <div className={styles.page}>
        <div className={styles.hero}>
            <p className={styles.eyebrow}>Lore Compendium</p>
            <h1 className={styles.title}>Verglas</h1>
            <p className={styles.subtitle}>Divine Dissident</p>
            <p className={styles.tagline}>
            A world where gods do not die — they dissent.
            </p>
            <div className={styles.actions}>
            <button className={styles.btnPrimary} onClick={() => navigate('/articles')}>
                Browse Lore
            </button>
            <button className={styles.btnSecondary} onClick={() => navigate('/map')}>
                World Map
            </button>
            <button className={styles.btnSecondary} onClick={() => navigate('/family-tree')}>
                Lineage Tree
            </button>
            </div>
        </div>
        </div>
    )
}