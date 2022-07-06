import React from "react";
// import { useSelector } from "react-redux";
import style from "./index.module.css";

import avatar from "../../../assets/images/ava.png";

const DetailProfile = ({ receiver }) => {
  // const dispatch = useDispatch()

  // const receiverProfile = useSelector((state) => {
  //     return state.receiverProfile
  // })

  // useEffect(() => {
  //     const receiver = JSON.parse(localStorage.getItem('receiver'))
  //     dispatch(detailProfilePeople(receiver.id))
  // }, [dispatch])
  return (
    <div className="d-flex flex-column border-right">
      {receiver ? (
        <>
          <div className="d-flex flex-column justify-content-center align-items-center">
            {receiver.user.avatar ? (
              <img className={style.photoProfile} style={{ width: "80px", height: "80px" }} src={receiver.user.avatar} alt="" />
            ) : (
              <img className={style.photoProfile} style={{ width: "80px", height: "80px" }} src={avatar} alt="" />
            )}
          </div>
          <div className="d-flex flex-column" style={{ marginLeft: "30px", fontSize: "20px" }}>
            <label style={{ fontWeight: "bold", marginTop: "10px" }} htmlFor="">
              {receiver.user.name}
            </label>
            <label style={{ marginTop: "5px" }} className="" htmlFor="">
              online
            </label>
            <label style={{ textDecoration: "none", color: "black", fontWeight: "bold", marginTop: "10px" }} htmlFor="">
              {" "}
              phone number
            </label>
            <label style={{ fontSize: "18px", marginTop: "5px" }} htmlFor="">
              {receiver.user.phone}
            </label>
          </div>
        </>
      ) : (
        <div>Loading</div>
      )}
    </div>
  );
};

export default DetailProfile;
