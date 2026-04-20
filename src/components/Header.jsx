import { NavLink, useNavigate } from 'react-router-dom'
import { useState, useRef } from 'react'
import styles from './Header.module.css'

const NAV = [
    {
        label: 'World',
        children: [
        { to: '/map',      label: 'World Map'    },
        { to: '/regions',  label: 'Regions'      },
        { to: '/timeline', label: 'Timeline'     },
        ]
    },
    {
        label: 'Divine',
        children: [
        { to: '/gods',        label: 'Living Gods'  },
        { to: '/family-tree', label: 'Lineage Tree' },
        { to: '/factions',    label: 'Factions'     },
        ]
    },
    {
        label: 'Lore',
        children: [
        { to: '/articles',   label: 'All Entries'  },
        { to: '/characters', label: 'Characters'   },
        { to: '/locations',  label: 'Locations'    },
        ]
    },
    {
        label: 'Search',
        to: '/search',
    },
]

function Dropdown({ item }) {
    const [open, setOpen] = useState(false)
    const timer = useRef(null)

    const handleEnter = () => {
        clearTimeout(timer.current)
        setOpen(true)
    }

    const handleLeave = () => {
        timer.current = setTimeout(() => setOpen(false), 120)
    }

    // Single link — no dropdown
    if (item.to) {
        return (
        <NavLink
            to={item.to}
            className={({ isActive }) =>
            `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`
            }
        >
            {item.label}
        </NavLink>
        )
    }

    return (
        <div
        className={styles.dropdownWrap}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        >
        <button className={`${styles.navLink} ${styles.dropdownTrigger}`}>
            {item.label}
            <span className={`${styles.caret} ${open ? styles.caretOpen : ''}`}>▾</span>
        </button>

        {open && (
            <div className={styles.dropdown}>
            {item.children.map(child => (
                <NavLink
                key={child.to}
                to={child.to}
                className={({ isActive }) =>
                    `${styles.dropdownLink} ${isActive ? styles.dropdownLinkActive : ''}`
                }
                onClick={() => setOpen(false)}
                >
                {child.label}
                </NavLink>
            ))}
            </div>
        )}
        </div>
    )
}

export default function Header({ sidebarOpen, setSidebarOpen }) {
    return (
        <header className={styles.header}>
        <button
            className={styles.menuBtn}
            onClick={() => setSidebarOpen(o => !o)}
            aria-label="Toggle sidebar"
        >
            {sidebarOpen ? '✕' : '☰'}
        </button>

        <NavLink to="/" className={styles.brand}>
            <span className={styles.titleMain}>Verglas</span>
            <span className={styles.titleSub}>Divine Dissident</span>
        </NavLink>

        <nav className={styles.nav}>
            {NAV.map(item => (
            <Dropdown key={item.label} item={item} />
            ))}
        </nav>
        </header>
    )
}