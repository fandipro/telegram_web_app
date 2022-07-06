import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import style from "./index.module.css";
import editButton from "../../../assets/icons/editButton.svg";
// import avatar from "../../../assets/images/ava.png";
import Swal from "sweetalert2";
import Label from "../../base/Label";
import Button from "../../base/Button"
// import { updateProfile } from "../../../config/redux/action/user";
import { getProfile, updateProfile, updateAva } from "../../../config/redux/action/user";

const Profile = ({ user }) => {
  const { profile } = useSelector((state) => state.user);
  const [avaPreview, setAvaPreview] = useState("")
  const [avatar, setAvatar] = useState("");
  const [isChangePhoto, setIsChangePhoto] = useState(false);
  const [isEditActvie, setIsEditActive] = useState(true)
  const dispatch = useDispatch()

  const [form, setForm] = useState({
    name: "",
    username: "",
    phone: "",
    bio: "",
  });

  const onHandleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const onChangeAva = (e) => {
    let file = e.target.files[0]
    console.log(file);
    setAvaPreview(URL.createObjectURL(file))
    setAvatar(file)
    setIsChangePhoto(true);
    file = null

  }

  const handleChangeImage = async () => {
    const formData = new FormData();
    formData
      .append("avatar", avatar)
    updateAva(formData)
      .then((result) => {
        Swal.fire({
          title: "Success",
          text: "update photo succes",
          icon: "success",
        });
        dispatch(getProfile())
        setIsChangePhoto(false);
      })
      .catch((err) => {
        Swal.fire({
          title: "Error",
          text: `Gagal Update Avatar`,
          icon: "error",
        });
      });
    setAvaPreview(profile.avatar)
    setIsChangePhoto(false);
  };

  const onSubmit = (e) => {
    e.preventDefault()
    updateProfile(form)
      .then((res) => {
        // console.log(res)
        Swal.fire({
          title: "Success",
          text: `${res.message}`,
          icon: "success",
        });
        dispatch(getProfile())
        setIsEditActive(true)
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
        name: profile.name,
        username: profile.username,
        phone: profile.phone || "No Number",
        bio: profile.bio || "saya adalah seorang kapiten",
      });
      setAvaPreview(profile.avatar)
      // console.log('apakah ini jalan');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile, isEditActvie]);

  return (
    <div className="d-flex flex-column border-right">
      {profile ? (
        <>
          <div className="d-flex flex-column justify-content-center align-items-center">
            {profile.avatar ? (
              <img className={style.photoProfile} style={{ width: "80px", height: "80px" }} src={avaPreview} alt="" />
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
                  onChangeAva(e)
                }}
              />
            </div>
            {isChangePhoto && (
              <div>
                <button style={{ backgroundColor: "white", borderRadius: "5px", width: "60px", marginTop: "10px" }} onClick={handleChangeImage} type="submit">
                  Save
                </button>
                <button style={{ backgroundColor: "white", borderRadius: "5px", width: "60px", marginTop: "10px" }} onClick={
                  () => {
                    setAvaPreview(profile.avatar)
                    setAvatar("")
                    setIsChangePhoto(false)
                  }
                }
                  type="submit">
                  Cancel
                </button>
              </div>

            )}
            {/* <label style={{ fontWeight: "bold", marginBottom: "20px", marginTop: "10px" }} htmlFor="">
              {profile.name}
            </label>
            <label style={{}} htmlFor="">
              {profile.email}
            </label> */}
          </div>
          {isEditActvie ? (
            <div>
              <div className="col text-center d-flex flex-column">
                <label style={{ fontWeight: "bold", marginBottom: "20px", marginTop: "10px" }} htmlFor="">
                  {profile.name}
                </label>
                <label style={{}} htmlFor="">
                  {profile.email}
                </label>
              </div>
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

            </div>

          )
            :
            (
              <form onSubmit={(e) => onSubmit(e)} action="">

                <div style={{ marginLeft: "30px", marginTop: "30px" }} className="d-flex flex-column justify-content-left align-items-left">
                  <label style={{ fontWeight: "bold" }} htmlFor="">
                    Account
                  </label>
                  <input name="name" onChange={(e) => onHandleChange(e)} value={form.name} className={style.inputType} placeholder="Username" type="text" />
                  <label style={{ textDecoration: "none", color: "#7E98DF", marginTop: "10px" }} htmlFor="">
                    Name
                  </label>
                  <input name="username" onChange={(e) => onHandleChange(e)} value={form.username} className={style.inputType} placeholder="Username" type="text" />
                  <label style={{ textDecoration: "none", color: "#7E98DF", marginTop: "10px" }} htmlFor="">
                    Username
                  </label>
                  <input name="phone" onChange={(e) => onHandleChange(e)} value={form.phone} className={style.inputType} placeholder="nomor telephone" type="text" />
                  <label style={{ textDecoration: "none", color: "#7E98DF", marginTop: "10px" }} htmlFor="">
                    {" "}
                    phone number
                  </label>
                  <textarea name="bio" onChange={(e) => onHandleChange(e)} value={form.bio} className={style.inputTypeBio} id="" cols="30"></textarea>
                  <label style={{ marginTop: "10px", color: "#7E98DF" }} htmlFor="">
                    Bio
                  </label>

                  <div style={{ marginLeft: "24%", marginTop: "20px" }}>
                    <button onSubmit={(e) => {
                      onSubmit(e)

                    }} style={{ marginRight: "10px", borderRadius: "10px", border: "1px solid #7E98DF", height: "40px", width: "60px", backgroundColor: "white" }} type="submit">
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
