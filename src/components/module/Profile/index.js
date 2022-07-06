import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import style from "./index.module.css";
import editButton from "../../../assets/icons/editButton.svg";
// import avatar from "../../../assets/images/ava.png";
import Swal from "sweetalert2";
import Label from "../../base/Label";
import Button from "../../base/Button"

const Profile = ({ user }) => {
  const { profile } = useSelector((state) => state.user);
  const [photo, setPhoto] = useState("");
  const [isChangePhoto, setIsChangePhoto] = useState(false);
  const [isEditActvie, setIsEditActive] = useState(true)

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
    if (profile) {
      setForm({
        ...form,
        username: profile.username,
        phone: profile.phone || "No Number",
        bio: profile.bio || "saya adalah",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile]);

  return (
    <div className="d-flex flex-column border-right">
      {profile ? (
        <>
          <div className="d-flex flex-column justify-content-center align-items-center">
            {profile.avaatar ? (
              <img className={style.photoProfile} style={{ width: "80px", height: "80px" }} src={`${"http://localhost:4000/img/default.png"}`} alt="" />
            ) : (
              <img className={style.photoProfile} style={{ width: "80px", height: "80px" }} src={`http://localhost:4000/img/default.png`} alt="" />
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
              {profile.username}
            </label>
            <label style={{}} htmlFor="">
              {profile.email}
            </label>
          </div>
          {isEditActvie ? (
            <div style={{ marginLeft: "30px", marginTop: "30px" }} className="d-flex account flex-column justify-content-left align-items-left">
              <div id="phone">
                <Label>
                  Account
                </Label>
                <p className="mt-3">081818</p>
                <p className={style.text}>Phone Number</p>
                <hr className={style.hr} />
              </div>
              <div id="username">
                <p className="mt-3 fw-bold">{profile.username}</p>
                <p className={style.text}>username</p>
                <hr className={style.hr} />
              </div>
              <div id="bio">
                <p className="mt-3 fw-bold">{profile.bio}</p>
                <p className={style.text}>Bio</p>
                <hr className={style.hr} />
              </div>
              <div className="text-end"><Button onClick={() => setIsEditActive(false)} className="btn btn-primary me-4" border="none" width="40%">Edit</Button></div>
            </div>

          )
            :
            (
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
                    <button onClick={() => setIsEditActive(true)} style={{ borderRadius: "10px", border: "1px solid red", height: "40px", backgroundColor: "white" }} type="button">
                      Cancel
                    </button>
                  </div>
                </div>
              </form>
            )
          }

        </>
      ) : (
        <div>Loading</div>
      )
      }
    </div >
  );
};

export default Profile;
