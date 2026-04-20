import { createContext, useContext, useState, useEffect } from 'react'

const AdminContext = createContext(null)

const ADMIN_KEY  = 'verglas_admin'
const PASSWORD   = 'dissident'

export function AdminProvider({ children }) {
    const [isAdmin, setIsAdmin] = useState(() => {
        return localStorage.getItem(ADMIN_KEY) === 'true'
    })

    const login  = (pw) => {
        if (pw === PASSWORD) {
        localStorage.setItem(ADMIN_KEY, 'true')
        setIsAdmin(true)
        return true
        }
        return false
    }

    const logout = () => {
        localStorage.removeItem(ADMIN_KEY)
        setIsAdmin(false)
    }

    return (
        <AdminContext.Provider value={{ isAdmin, login, logout }}>
        {children}
        </AdminContext.Provider>
    )
}

export function useAdmin() {
    return useContext(AdminContext)
}