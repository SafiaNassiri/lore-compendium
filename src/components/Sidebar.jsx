import { NavLink } from 'react-router-dom'
import styles from './Sidebar.module.css'

const NAV = [
    {
        label: 'World',
        items: [
        { to: '/',        label: 'Overview' },
        { to: '/map',     label: 'World Map' },
        { to: '/regions', label: 'Regions' },
        ]
    },
    {
        label: 'The Divine',
        items: [
        { to: '/gods',        label: 'Living Gods' },
        { to: '/family-tree', label: 'Lineage Tree' },
        { to: '/factions',    label: 'Factions' },
        ]
    },
    {
        label: 'Lore',
        items: [
        { to: '/articles',   label: 'Articles' },
        { to: '/characters', label: 'Characters' },
        { to: '/locations',  label: 'Locations' },
        { to: '/books', label: 'Book Tracker' },
        { to: '/tags', label: 'Tags' },
        { to: '/search', label: 'Search' },
        ]
    },
    {
        label: 'System',
        items: [
        { to: '/admin', label: 'Admin Panel' },
        ]
    },
]

export default function Sidebar({ open }) {
    return (
        <aside className={`${styles.sidebar} ${open ? styles.open : ''}`}>
        <nav className={styles.nav}>
            {NAV.map(section => (
            <div key={section.label} className={styles.section}>
                <p className={styles.sectionLabel}>{section.label}</p>
                {section.items.map(item => (
                <NavLink
                    key={item.to}
                    to={item.to}
                    end={item.to === '/'}
                    className={({ isActive }) =>
                    `${styles.link} ${isActive ? styles.linkActive : ''}`
                    }
                >
                    {item.label}
                </NavLink>
                ))}
            </div>
            ))}
        </nav>
        </aside>
    )
}