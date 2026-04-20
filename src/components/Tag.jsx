import { useNavigate } from 'react-router-dom'
import styles from './Tag.module.css'

export default function Tag({ label, onClick, active, linkable }) {
    const navigate = useNavigate()

    const handleClick = (e) => {
        if (linkable) {
        e.preventDefault()
        navigate(`/tag/${label}`)
        } else if (onClick) {
        onClick()
        }
    }

    return (
        <button
        className={`${styles.tag} ${active ? styles.active : ''} ${linkable ? styles.linkable : ''}`}
        onClick={handleClick}
        >
        {label}
        </button>
    )
}