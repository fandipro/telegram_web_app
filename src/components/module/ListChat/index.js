import React, { useState } from "react";
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from "reactstrap";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import Menu from "../../../assets/icons/menu.svg";
import settingicon from "../../../assets/icons/setting.svg";
import callicon from "../../../assets/icons/call.svg";
import contacticon from "../../../assets/icons/contact.svg";
import bookmark from "../../../assets/icons/bookmark.svg";
import invitefriend from "../../../assets/icons/inviteFriend.svg";
import FAQ from "../../../assets/icons/FAQ.svg";
import logout from "../../../assets/icons/logout.svg";
import plus from "../../../assets/icons/plus.svg";
import Profile from "../Profile";
import avatar from "../../../assets/images/ava.png";
import { useNavigate } from "react-router-dom";

const ListChat = ({ listContact, user, setListChat, socketio, ...props }) => {
  const [dropdownOpen, setOpen] = useState(false);
  const [isOpenProfile, setIsOpenProfile] = useState(false);
  // const [isReceiverProfile, setReceiverProfile] = useState(false)
  // const [searchName, setSearchName] = useState('')

  // const [activeReceiver, setActiveReceiver] = useState({})
  // console.log('apakah ini jalan');
  // console.log(user);
  const navigate = useNavigate();
  const onLogout = () => {
    localStorage.clear();
    return navigate("/login");
  };
  const selectReceiver = (item) => {
    setListChat([]);
    props.setReceiver(item);
    localStorage.setItem("receiver", JSON.stringify(item));
    console.log("apakah receiver jalan");
    // const data2 = {
    //   message: 'aku adalah seorang kapiten'
    // }
    // socketio.emit('ping', data2)
    // socketio.on('ping-response', (  ) => {
    //   console.log('apakah receiver 2 jalan');
    //   console.log(response);
    // })
    // socketio.emit("join-room", user);
    // console.log('apakah ini jalan');
    // console.log(user.id);
    // console.log(item.user.id);
    const data = {
      sender: user.id,
      receiver: item.user.id,
    };
    socketio.emit("chat-history", data);
  };
  const toggleDrawer = () => {
    setIsOpenProfile((prevState) => !prevState);
  };

  console.log(listContact);
  // console.log(props.receiver);
  return (
    <div className="col-12 col-lg-5 col-xl-3 border-right">
      {/* header sidebar */}
      <div className="px-4 d-none d-md-block">
        {/* menu */}
        <div className="">
          <label
            style={{
              marginTop: "20px",
              fontWeight: "bold",
              color: "#7E98DF",
              fontSize: "30px",
            }}
            htmlFor=""
          >
            Telegram
          </label>
          <Dropdown
            toggle={() => {
              setOpen(!dropdownOpen);
            }}
            isOpen={dropdownOpen}
            style={{ position: "absolute", top: "32px", left: "156px" }}
          >
            <DropdownToggle data-toggle="dropdown" tag="span">
              <img src={Menu} style={{ marginLeft: "141px" }} alt="" />
            </DropdownToggle>
            <DropdownMenu style={{ backgroundColor: "#7E98DF" }}>
              <div className="d-flex">
                <img style={{ marginTop: "-10px", marginLeft: "10px" }} src={settingicon} alt="" />
                <DropdownItem onClick={toggleDrawer} style={{ color: "white", marginBottom: "10px" }}>
                  Setting
                </DropdownItem>
              </div>
              <div className="d-flex">
                <img style={{ marginTop: "-10px", marginLeft: "10px" }} src={contacticon} alt="" />
                <DropdownItem style={{ color: "white", marginBottom: "10px" }}>Contact</DropdownItem>
              </div>
              <div className="d-flex">
                <img style={{ marginTop: "-10px", marginLeft: "6px" }} src={callicon} alt="" />
                <DropdownItem style={{ color: "white", marginBottom: "10px" }}>Calls</DropdownItem>
              </div>
              <div className="d-flex">
                <img
                  style={{
                    marginTop: "-10px",
                    marginLeft: "12px",
                    marginRight: "5px",
                  }}
                  src={bookmark}
                  alt=""
                />
                <DropdownItem style={{ color: "white", marginBottom: "10px" }}>Save Messages</DropdownItem>
              </div>
              <div className="d-flex">
                <img
                  style={{
                    marginTop: "-10px",
                    marginLeft: "10px",
                    marginRight: "5px",
                  }}
                  src={invitefriend}
                  alt=""
                />
                <DropdownItem style={{ color: "white", marginBottom: "10px" }}>Invite Friend</DropdownItem>
              </div>
              <div className="d-flex">
                <img
                  style={{
                    marginTop: "-10px",
                    marginLeft: "10px",
                    marginRight: "5px",
                  }}
                  src={FAQ}
                  alt=""
                />
                <DropdownItem style={{ color: "white", marginBottom: "10px" }}>FAQ</DropdownItem>
              </div>
              <div className="d-flex">
                <img
                  style={{
                    marginTop: "-10px",
                    marginLeft: "10px",
                    marginRight: "5px",
                  }}
                  src={logout}
                  alt=""
                />
                <DropdownItem style={{ color: "white", marginBottom: "10px" }} onClick={onLogout}>
                  Logout
                </DropdownItem>
              </div>
            </DropdownMenu>
          </Dropdown>
        </div>
        <Drawer
          // sidebar profile
          open={isOpenProfile}
          onClose={toggleDrawer}
          direction="left"
          className="sidebar"
          style={{ width: "335px" }}
        >
          <Profile user={user} />
        </Drawer>
        {/* search name */}
        <form action="">
          <div className="d-flex align-items-center">
            <div className="flex-grow-1">
              <input
                onChange={(e) => props.setSearchName(e.target.value)}
                type="text"
                className="form-control my-3"
                placeholder="Search..."
              // value={searchName}
              />
            </div>
            <img src={plus} style={{ marginLeft: "15px" }} alt="" />
          </div>
        </form>
      </div>
      {props.isLoading ? (
        <div>Laoding</div>
      ) : (
        listContact?.map((items, index) =>
          items.user.id !== user.id ? (
            <div key={index} className="px-3 d-none d-md-block">
              <div></div>
              <a href="#chat" id="idku" className="list-group-item list-group-item-action border-0" onClick={() => selectReceiver(items)}>
                <div className="d-flex align-items-start">
                  {items.user.avatar ? (
                    <img alt="" src={items.user.avatar} className="rounded-circle mr-1" width="40" height="40" style={{ marginRight: "15px" }} />
                  ) : (
                    <img alt="" src={avatar} className="rounded-circle mr-1" width="40" height="40" style={{ marginRight: "15px" }} />
                  )}
                  <div id="chat" className="flex-grow-1 ml-3">
                    <label htmlFor=""> {items.user.name}</label>
                    <label
                      htmlFor=""
                      style={{
                        color: "#848484",
                        position: "absolute",
                        right: "0px",
                      }}
                    >
                      {items.message[0]?.created_at}
                    </label>
                    <div className="small" style={{ color: "#7E98DF" }}>
                      <span className="fas fa-circle chat-online">{items.message[0]?.chat}</span>
                    </div>
                  </div>
                </div>
              </a>
            </div>
          ) : null
        )
      )}
      <hr className="d-block d-lg-none mt-1 mb-0" />
    </div>
  );
};

export default ListChat;
