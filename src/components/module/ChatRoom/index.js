import React, { useEffect, useState } from "react";
import Drawer from "react-modern-drawer";
import DetailProfile from "../DetailProfile";
// import moment from "moment";

import profileMenu from "../../../assets/icons/profileMenu.svg";
import plus from "../../../assets/icons/plus.svg";
import emoticon from "../../../assets/icons/emoticon.svg";
import camera from "../../../assets/icons/camera.svg";
import defaultAva from "../../../assets/images/ava.png";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { getListContact } from "../../../config/redux/action/user";

const ChatRoom = ({ style, receiver, listChat, setListChat, socketio, ...props }) => {
  const [isOpenProfile1, setIsOpenProfile1] = useState(false);
  const dispatch = useDispatch();

  const toggleDrawer2 = () => {
    // const receiver = JSON.parse(localStorage.getItem("receiver"));
    // dispatch(detailProfilePeople(receiver.id))
    setIsOpenProfile1((prevState) => !prevState);
  };

  const onSubmitMessage = (e) => {
    e.preventDefault();
    // const user = JSON.parse(localStorage.getItem("user"));
    const receiver = JSON.parse(localStorage.getItem("receiver"));
    // const time = moment(new Date()).format("LT")

    const payload = {
      sender_id: props.user.id,
      receiver_id: receiver.id,
      sender: props.user.name,
      receiver: receiver.name,
      sender_avatar: props.user.avatar,
      receiver_avatar: receiver.avatar,
      chat: props.chat,
      // created_at: `${new Date(time).getHours()}:${new Date(time).getMinutes()}`
      // created_at: time
    };

    console.log('ini waktu pesan dibuat');
    console.log(payload.created_at);

    setListChat([...listChat, payload]);
    // console.log(listChat);

    const data = {
      sender: props.user.id,
      receiver: receiver.user.id,
      chat: props.chat,
    };
    console.log(data);
    socketio.emit("send-message", data);
    props.setChat("");
  };

  const onDeleteMessage = (items) => {
    // console.log(items);
    Swal.fire({
      title: "Are you sure to delete this message?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    })
      .then((result) => {
        if (result.isConfirmed) {
          const newListChat = listChat.filter((item) => {
            return items.id !== item.id;
          });
          // console.log('ini chat yang akan didelete');
          // console.log(items);
          const data = {
            sender: props.user.id,
            receiver: receiver.user.id,
            id: items.id,
          };
          socketio.emit("delete-message", data);
          // console.log(`ini data id================`);
          // console.log(data.id);
          // console.log(items.id);
          // console.log(`ini data kumpulan===========`);
          console.log(listChat);
          setListChat([...newListChat]);

          Swal.fire("Deleted!", "Your message has been deleted.", "success");
        }
      })
      .catch((err) => {
        Swal.fire("Deleted!", "Failed", "Gagal");
      });
  };

  useEffect(() => {
    dispatch(getListContact(""));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listChat]);

  // console.log(listChat);
  console.log("lihat isi reveiver");
  console.log(receiver);
  console.log("ini list chat");
  console.log(listChat);

  return (
    <div className={`${style.main_chat} col-12 col-lg-7 col-xl-9`}>
      {receiver.user ? (
        // header chat
        <div className={`${style.header_chat} py-2 px-4 d-none d-lg-block`}>
          <div className="d-flex align-items-center py-1">
            <div className="position-relative">
              {receiver.user.avatar ? (
                <img alt="" src={receiver.user.avatar} style={{ marginRight: "10px", borderRadius: "10px" }} width="40" height="40" />
              ) : (
                <img alt="" src={defaultAva} style={{ marginRight: "10px", borderRadius: "10px" }} width="40" height="40" />
              )}
            </div>
            <div className="flex-grow-1 pl-3">
              <strong>{receiver.user.username}</strong>
              <div style={{ color: "#7E98DF" }}>{receiver.user.is_online === 1 ? "Online" : "Not Online"}</div>
            </div>
            <div>
              <button onClick={toggleDrawer2} className="btn btn-light border btn-lg px-3">
                <img src={profileMenu} width="24" height="24" alt="" />
              </button>
            </div>
            <Drawer open={isOpenProfile1} onClose={toggleDrawer2} direction="right" className="toggle" style={{ width: "335px" }}>
              <DetailProfile receiver={receiver} />
            </Drawer>
          </div>
        </div>
      ) : (
        <div className={`${style.header_chat} py-2 px-4 d-none d-lg-block`}>
          <div style={{ height: "55px" }} className="d-flex align-items-center py-1">
            {" "}
            {/* cek 12 */}
          </div>
        </div>
      )}

      {/* isi chat */}
      <div className="position-relative">
        {receiver.user ? (
          <div style={{ overflow: "auto " }} className={`${style.chat_messages} p-4`}>
            {listChat.map((items, index) => (
              <div key={index}>
                {items.sender_id === props.user.id ? (
                  // bingkai chat right
                  <div className={`${style.chat_message_right} pb-4`}>
                    <div>
                      {items.sender_avatar ? <img alt="" src={items.sender_avatar} className="rounded-circle mr-1" width="40" height="40" /> : <img alt="" src={defaultAva} className="rounded-circle mr-1" width="40" height="40" />}

                      <div className="text-muted small text-nowrap mt-2">{new Date(items.created_at).getHours()}:{new Date(items.created_at).getMinutes()}</div>
                      {/* <div className="text-muted small text-nowrap mt-2">{moment(items.created_at).format("LT")}</div> */}
                    </div>
                    <div
                      style={{
                        backgroundColor: "white",
                        color: "black",
                        borderTopLeftRadius: "50px",
                        borderTopRightRadius: "50px",
                        borderBottomRightRadius: "8px",
                        borderBottomLeftRadius: "50px",
                        paddingTop: "20px",
                        paddingLeft: "30px",
                        paddingRight: "30px",
                      }}
                      className="flex-shrink-1 mr-3"
                    >
                      {items.chat}
                    </div>
                    <span className="text-danger pointer mt-3" onClick={() => onDeleteMessage(items)} style={{ marginTop: "20px", marginLeft: "30px" }}>
                      Delete
                    </span>
                  </div>
                ) : (
                  // bingkai chat left
                  <div className={`${style.chat_message_left} pb-4`}>
                    <div>
                      {items.sender_avatar ? <img alt="" src={items.sender_avatar} className="" width="40" height="40" /> : <img alt="rava" src={defaultAva} className="rounded-circle mr-1" width="40" height="40" />}

                      <div className="text-muted small text-nowrap mt-2">{new Date(items.created_at).getHours()}:{new Date(items.created_at).getMinutes()}</div>
                      {/* <div className="text-muted small text-nowrap mt-2">{moment(items.created_at).format("LT")}</div> */}
                    </div>
                    {/* balon chat left */}
                    <div
                      style={{
                        backgroundColor: "#7E98DF",
                        color: "white",
                        borderTopLeftRadius: "50px",
                        borderTopRightRadius: "50px",
                        borderBottomRightRadius: "50px",
                        borderBottomLeftRadius: "8px",
                        paddingTop: "20px",
                        paddingLeft: "30px",
                        paddingRight: "30px",
                      }}
                      className="flex-shrink-1 ml-3"
                    >
                      {items.chat}
                    </div>
                    <span className="text-danger pointer mt-3" onClick={() => onDeleteMessage(items)} style={{ marginTop: "20px", marginLeft: "30px" }}>
                      Delete
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className={`${style.chat_messages} p-4 d-flex justify-content-center align-items-center`}>
            <label style={{ color: "#848484", fontSize: "20px" }} htmlFor="">
              Please select a chat to start messaging
            </label>
          </div>
        )}
      </div>
      <form onSubmit={onSubmitMessage} action="">
        <div style={{ backgroundColor: "white", position: "relative" }} className="input-group">
          <input
            onChange={(e) => props.setChat(e.target.value)}
            value={props.chat}
            style={{
              backgroundColor: "#FAFAFA",
              width: "20px",
              height: "50px",
              margin: "20px 10px 20px 30px",
              borderRadius: "10px",
            }}
            type="text"
            className="form-control"
            placeholder="Type your message"
            required
          />
          <img src={plus} alt="" />
          <img style={{ margin: "0px 10px 0px 10px" }} src={emoticon} alt="" />
          <img style={{ marginRight: "30px" }} src={camera} alt="" />
        </div>
      </form>
    </div>
  );
};

export default ChatRoom;
