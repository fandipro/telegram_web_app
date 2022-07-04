import React from 'react'
import './index.module.css'
import Card from '../../components/base/Card'
import ListChat from '../../components/module/ListChat'
import ChatRoom from '../../components/module/ChatRoom'

// import style from './index.module.css'

const Home = () => {
    return (
        <div className='content main'>
            <Card>
                <div className='row g-0'>
                    <ListChat>
                    </ListChat>
                    <ChatRoom>

                    </ChatRoom>
                </div>
            </Card>
        </div>
    )
}

export default Home