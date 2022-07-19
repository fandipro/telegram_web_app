import React, { useEffect, useState } from "react";
// import "./index.module.css";
import Card from "../../components/base/Card";
import ListChat from "../../components/module/ListChat";
import { useDispatch, useSelector } from "react-redux";
import { getListContact, getProfile } from "../../config/redux/action/user";
import ChatRoom from "../../components/module/ChatRoom";
import io from "socket.io-client";

import style from "./index.module.css";

const Home = () => {
  const [socket, setSocketio] = useState(null);
  const [listChat, setListChat] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [chat, setChat] = useState("");
  const [receiver, setReceiver] = useState({});
  const dispatch = useDispatch();

  const { listContact } = useSelector((state) => {
    return state.user;
  });
  const { profile } = useSelector((state) => {
    return state.user;
  });

  const { isLoading } = useSelector((state) => {
    return state.user;
  });

  useEffect(() => {
    // const resultSocket = io("http://localhost:4000");
    const token = localStorage.getItem("token");
    // console.log(token);
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

      const receiver = JSON.parse(localStorage.getItem("receiver"));
      console.log("apakah use jalan");
      console.log(receiver);
      console.log("apakah use jalan");
      if (response.length) {
        if (receiver.user.id === response[0].sender_id || receiver.user.id === response[0].receiver_id) {
          setListChat(response);
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

  return (
    <div className={style.main + " content"}>
      <Card>
        <div className="row g-0">
          <ListChat user={profile} setSearchName={setSearchName} isLoading={isLoading} receiver={receiver} socketio={socket} setReceiver={setReceiver} setListChat={setListChat} listContact={listContact}></ListChat>
          <ChatRoom style={style} listChat={listChat} receiver={receiver} user={profile} socketio={socket} setListChat={setListChat} chat={chat} setChat={setChat}></ChatRoom>
        </div>
      </Card>
    </div>
  );
};

export default Home;
