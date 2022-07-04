import React from 'react'
import styles from './index.module.css'

const AuthLayout = ({ children }) => {
    return (
        <main className={styles.layout_auth}>
            <div className='children'>{children}</div>
        </main>
    )
}

export default AuthLayout