import styles from './Tag.module.css'

export default function Tag({ label, onClick, active }) {
    return (
        <button
        className={`${styles.tag} ${active ? styles.active : ''}`}
        onClick={onClick}
        >
        {label}
        </button>
    )
}