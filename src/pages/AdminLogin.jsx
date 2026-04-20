import { useState } from 'react'
import { useAdmin } from '../context/AdminContext'
import { useNavigate } from 'react-router-dom'
import styles from './AdminLogin.module.css'

export default function AdminLogin() {
    const { login }    = useAdmin()
    const navigate     = useNavigate()
    const [pw, setPw]  = useState('')
    const [err, setErr] = useState(false)

    const handleSubmit = () => {
        const ok = login(pw)
        if (ok) navigate('/admin')
        else { setErr(true); setPw('') }
    }

    return (
        <div className={styles.page}>
        <div className={styles.box}>
            <p className={styles.eyebrow}>Restricted</p>
            <h1 className={styles.title}>Admin Access</h1>
            <p className={styles.sub}>Enter the passphrase to continue.</p>
            <input
            className={`${styles.input} ${err ? styles.inputErr : ''}`}
            type="password"
            placeholder="Passphrase…"
            value={pw}
            onChange={e => { setPw(e.target.value); setErr(false) }}
            onKeyDown={e => e.key === 'Enter' && handleSubmit()}
            autoFocus
            />
            {err && <p className={styles.err}>Incorrect passphrase.</p>}
            <button className={styles.btn} onClick={handleSubmit}>
            Enter
            </button>
        </div>
        </div>
    )
}