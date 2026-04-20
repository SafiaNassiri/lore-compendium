import { useState } from 'react'
import Header from './Header'
import Sidebar from './Sidebar'
import styles from './Layout.module.css'

export default function Layout({ children }) {
    const [sidebarOpen, setSidebarOpen] = useState(false)

    return (
        <div className={styles.root}>
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <Sidebar open={sidebarOpen} />
        <main
            className={`${styles.main} ${sidebarOpen ? styles.mainShifted : ''}`}
            onClick={() => sidebarOpen && setSidebarOpen(false)}
        >
            {children}
        </main>
        </div>
    )
}