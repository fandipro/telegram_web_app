import React from 'react'
import contactSidebar from '../../components/module/c-sidebar'
import style from './index.module.css'

const Home = () => {
    return (
        <div className={style.home}>
            <aside>
                <contactSidebar></contactSidebar>
            </aside>
        </div>
    )
}

export default Home