import React, { useEffect, useState } from 'react'
import './index.module.css'
import Card from '../../components/base/Card'
import ListChat from '../../components/module/ListChat'
import { useDispatch, useSelector } from 'react-redux'
import { getListContact, getProfile } from '../../config/redux/action/user'
import ChatRoom from '../../components/module/ChatRoom'
import io from 'socket.io-client'

// import style from './index.module.css'

const Home = () => {
    const [socket, setSocketio] = useState(null)
    const [listChat, setListChat] = useState([])
    const [searchName, setSearchName] = useState('')
    const [activeReceiver, setActiveReceiver] = useState({})
    const dispatch = useDispatch()

    const { listContact } = useSelector((state) => {
        return state.user
    })
    const { profile } = useSelector((state) => {
        return state.user
    })

    const { isLoading } = useSelector((state) => {
        return state.user
    })

    useEffect(() => {
        const resultSocket = io("http://localhost:4000")
        resultSocket.on('send-message-response', (response) => {
            const receiver = JSON.parse(localStorage.getItem('receiver'))
            if (
                receiver.username === response[0].sender ||
                receiver.username === response[0].receiver
            ) {
                setListChat(response)
            }
        })
        setSocketio(resultSocket)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        console.log('apakah ini jalan');
        dispatch(getListContact(searchName))
        dispatch(getProfile())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchName])

    console.log(listContact);
    console.log(profile);


    return (
        <div className='content main'>
            <Card>
                <div className='row g-0'>
                    <ListChat user={profile} isLoading={isLoading} socketio={socket} setActiveReceiver={setActiveReceiver} setListChat={setListChat} listContact={listContact}>
                    </ListChat>
                    <ChatRoom listChat={listChat} socketio={socket} setListChat={setListChat}>
                    </ChatRoom>
                </div>
            </Card >
        </div >
    )
}

export default Home