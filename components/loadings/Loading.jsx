import React from 'react'
import styles from './loading.module.css'
export function Loading() {
    return (
        <div className={styles.bars}>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
        </div>

    )
}
