import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import style from "./index.module.css";
import editButton from "../../../assets/icons/editButton.svg";
import avatar from "../../../assets/images/ava.png";
import Swal from "sweetalert2";

const Profile = () => {
  const profile = useSelector((state) => state.profile);
  const [photo, setPhoto] = useState("");
  const [isChangePhoto, setIsChangePhoto] = useState(false);

  const [form, setForm] = useState({
    username: "",
    phone: "",
    bio: "",
  });

  const handleChangeImage = async () => {
    const formData = new FormData();
    formData
      .append("photo", photo)
      // updatePhoto(formData)
      .then((result) => {
        Swal.fire({
          title: "Success",
          text: "update photo succes",
          icon: "success",
        });
        // dispatch(detailUser())
        setIsChangePhoto(false);
      })
      .catch((err) => {
        Swal.fire({
          title: "Error",
          text: `${err.response.data.error}`,
          icon: "error",
        });
      });
    setIsChangePhoto(false);
  };

  const onSubmit = (e) => {
    e.preventDefault()
      // updateProfile(form)
      .then((res) => {
        // console.log(res)
        Swal.fire({
          title: "Success",
          text: `${res.message}`,
          icon: "success",
        });
        // dispatch(detailUser())
      })
      .catch((err) => {
        // console.log(err.response.data.error)
        Swal.fire({
          title: "Error",
          text: `${err.response.data.error}`,
          icon: "error",
        });
        // dispatch(detailUser());
      });
  };

  useEffect(() => {
    if (profile.data) {
      setForm({
        ...form,
        username: profile.data.username,
        phone: profile.data.phone,
        bio: profile.data.bio,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile]);

  return (
    <div className="d-flex flex-column border-right">
      {profile ? (
        <>
          <div className="d-flex flex-column justify-content-center align-items-center">
            {profile.data.photo ? (
              <img className={style.photoProfile} style={{ width: "80px", height: "80px" }} src={`${process.env.REACT_APP_API_URL}/${profile.data.photo}`} alt="" />
            ) : (
              <img className={style.photoProfile} style={{ width: "80px", height: "80px" }} src={avatar} alt="" />
            )}

            <div className="d-flex justify-content-center align-items-center w-100">
              <img src={editButton} alt="edit Button" />
              <label htmlFor="files">Edit photo</label>
              <input
                className="hidden"
                hidden
                type="file"
                id="files"
                onChange={(e) => {
                  setPhoto(e.target.files[0]);
                  setIsChangePhoto(true);
                }}
              />
            </div>
            {isChangePhoto && (
              <button style={{ backgroundColor: "white", borderRadius: "5px", width: "60px", marginTop: "10px" }} onClick={handleChangeImage} type="submit">
                Save
              </button>
            )}
            <label style={{ fontWeight: "bold", marginBottom: "20px", marginTop: "10px" }} htmlFor="">
              {profile.data.username}
            </label>
            <label style={{}} htmlFor="">
              {profile.data.email}
            </label>
          </div>
          <form onSubmit={(e) => onSubmit(e)} action="">
            <div style={{ marginLeft: "30px", marginTop: "30px" }} className="d-flex flex-column justify-content-left align-items-left">
              <label style={{ fontWeight: "bold" }} htmlFor="">
                Account
              </label>
              <input onChange={(e) => setForm({ ...form, username: e.target.value })} value={form.username} className={style.inputType} placeholder="Username" type="text" />
              <label style={{ textDecoration: "none", color: "#7E98DF", marginTop: "10px" }} htmlFor="">
                Username
              </label>
              <input onChange={(e) => setForm({ ...form, phone: e.target.value })} value={form.phone} className={style.inputType} placeholder="nomor telephone" type="text" />
              <label style={{ textDecoration: "none", color: "#7E98DF", marginTop: "10px" }} htmlFor="">
                {" "}
                phone number
              </label>
              <textarea onChange={(e) => setForm({ ...form, bio: e.target.value })} value={form.bio} className={style.inputTypeBio} name="" id="" cols="30"></textarea>
              <label style={{ marginTop: "10px", color: "#7E98DF" }} htmlFor="">
                Bio
              </label>

              <div style={{ marginLeft: "24%", marginTop: "20px" }}>
                <button style={{ marginRight: "10px", borderRadius: "10px", border: "1px solid #7E98DF", height: "40px", width: "60px", backgroundColor: "white" }} type="submit">
                  Save
                </button>
                <button style={{ borderRadius: "10px", border: "1px solid red", height: "40px", backgroundColor: "white" }} type="button">
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </>
      ) : (
        <div>Loading</div>
      )}
    </div>
  );
};

export default Profile;
