import styles from './Home.module.css'

export default function Home() {
    return (
        <div className={styles.page}>
        <div className={styles.hero}>
            <p className={styles.eyebrow}>Lore Compendium</p>
            <h1 className={styles.title}>Verglas</h1>
            <p className={styles.subtitle}>Divine Dissident</p>
            <p className={styles.tagline}>
            A world where gods do not die — they dissent.
            </p>
        </div>
        </div>
    )
}