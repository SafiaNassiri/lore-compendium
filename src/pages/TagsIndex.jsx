import { Link } from 'react-router-dom'
import { getAllTags, getByTag } from '../data/utils'
import styles from './TagsIndex.module.css'

export default function TagsIndex() {
    const tags = getAllTags()

    return (
        <div className={styles.page}>
        <div className={styles.header}>
            <h1 className={styles.title}>Tags</h1>
            <p className={styles.sub}>Browse all lore by tag.</p>
        </div>
        <div className={styles.grid}>
            {tags.map(tag => {
            const count = getByTag(tag).length
            return (
                <Link key={tag} to={`/tag/${tag}`} className={styles.tag}>
                <span className={styles.tagName}>#{tag}</span>
                <span className={styles.tagCount}>{count}</span>
                </Link>
            )
            })}
        </div>
        {tags.length === 0 && (
            <p className={styles.empty}>No tags yet.</p>
        )}
        </div>
    )
}