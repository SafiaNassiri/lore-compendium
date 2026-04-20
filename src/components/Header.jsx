import { NavLink } from 'react-router-dom'
import styles from './Header.module.css'

export default function Header({ sidebarOpen, setSidebarOpen }) {
    return (
        <header className={styles.header}>
        <button
            className={styles.menuBtn}
            onClick={() => setSidebarOpen(o => !o)}
            aria-label="Toggle sidebar"
        >
            <span className={sidebarOpen ? styles.iconClose : styles.iconMenu}>
            {sidebarOpen ? '✕' : '☰'}
            </span>
        </button>

        <div className={styles.title}>
            <span className={styles.titleMain}>Verglas</span>
            <span className={styles.titleSub}>Divine Dissident</span>
        </div>

        <nav className={styles.nav}>
            <NavLink to="/" className={({ isActive }) => isActive ? styles.navLinkActive : styles.navLink}>
            Home
            </NavLink>
            <NavLink to="/map" className={({ isActive }) => isActive ? styles.navLinkActive : styles.navLink}>
            Map
            </NavLink>
        </nav>
        </header>
    )
}