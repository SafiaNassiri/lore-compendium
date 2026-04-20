import { useNavigate } from 'react-router-dom'
import styles from './NotFound.module.css'

export default function NotFound() {
    const navigate = useNavigate()
    return (
        <div className={styles.page}>
        <p className={styles.code}>404</p>
        <h1 className={styles.title}>Lost in the Reach</h1>
        <p className={styles.sub}>This page does not exist — or was swallowed by the frost.</p>
        <button className={styles.btn} onClick={() => navigate('/')}>
            Return to the Compendium
        </button>
        </div>
    )
}