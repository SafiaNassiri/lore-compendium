import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Header from './Header'
import Sidebar from './Sidebar'
import styles from './Layout.module.css'

export default function Layout({ children }) {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const location = useLocation()

  // Close sidebar on route change (mobile)
    useEffect(() => {
        setSidebarOpen(false)
    }, [location.pathname])

    return (
        <div className={styles.root}>
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <Sidebar open={sidebarOpen} />
        {/* Overlay for mobile */}
        {sidebarOpen && (
            <div className={styles.overlay} onClick={() => setSidebarOpen(false)} />
        )}
        <main className={`${styles.main} ${sidebarOpen ? styles.mainShifted : ''}`}>
            {children}
        </main>
        </div>
    )
}