import React, { useEffect, useState } from "react";
// import "./index.module.css";
import Card from "../../components/base/Card";
import ListChat from "../../components/module/ListChat";
import { useDispatch, useSelector } from "react-redux";
import { getListContact, getProfile } from "../../config/redux/action/user";
import ChatRoom from "../../components/module/ChatRoom";
import io from "socket.io-client";
import 'react-notifications/lib/notifications.css';

// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

import style from "./index.module.css";
import {NotificationContainer, NotificationManager} from 'react-notifications';

const Home = () => {
  const [socket, setSocketio] = useState(null);
  const [listChat, setListChat] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [chat, setChat] = useState("");
  const [receiver, setReceiver] = useState({});
  const dispatch = useDispatch();
  // const [notif, setNotif] = useState("");

  const { listContact } = useSelector((state) => {
    return state.user;
  });
  const { profile } = useSelector((state) => {
    return state.user;
  });

  const { isLoading } = useSelector((state) => {
    return state.user;
  });

  // const notify = (sender) => {
  //   toast(`New messages from ${sender}`)
  //   setNotif('')
  // };

  const createNotification = (sender, message) => {
    return NotificationManager.info(message, `New chat from: ${sender}`, 5000);
  };

  useEffect(() => {
    // const resultSocket = io("http://localhost:4000");
    const token = localStorage.getItem("token");
    // // console.log(token);
    // const resultSocket = io("http://localhost:4000", {
    //   query: {
    //     token,
    //   },
    // });
    const resultSocket = io("https://chatan-app.herokuapp.com", {
      query: {
        token,
      },
    });
    resultSocket.on("send-message-response", (response) => {
      console.log("apakah respon jalan");
      console.log(response);
      // console.log(notif);

      const receiver = JSON.parse(localStorage.getItem("receiver"));
      console.log("apakah use jalan");
      console.log(receiver);
      console.log("apakah use jalan");
      if (response.length) {
        if (receiver.user.id === response[0].sender_id || receiver.user.id === response[0].receiver_id) {
          setListChat(response);
          // if (notif && response[0].receiver_id) {
          //   console.log(`ini notif ${notif}`);
          //   setNotif(notif)
          // }
        } else {
          createNotification(
            response[response.length - 1].sender,
            response[response.length - 1].chat
          );
          // notify(response[0].sender_id)
          // setNotif(response.length - 1);
        }
      }
    });
    setSocketio(resultSocket);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    console.log("apakah ini jalan");
    dispatch(getListContact(searchName));
    dispatch(getProfile());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchName]);

  // console.log(listContact);
  // console.log(profile);
  // console.log(`ini notif ${notif}`);

  return (
    <div className={style.main + " content"}>
      <Card>
        <div className="row g-0">
          {/* {notif && (
            <>
              <div hidden>{
              notify(notif)
              }</div>
              <ToastContainer></ToastContainer>
            </>
          )} */}
          <NotificationContainer/>
          <ListChat user={profile} setSearchName={setSearchName} isLoading={isLoading} receiver={receiver} socketio={socket} setReceiver={setReceiver} setListChat={setListChat} listContact={listContact}></ListChat>
          <ChatRoom style={style} listChat={listChat} receiver={receiver} user={profile} socketio={socket} setListChat={setListChat} chat={chat} setChat={setChat}></ChatRoom>
        </div>
      </Card>
      
    </div>
  );
};

export default Home;
