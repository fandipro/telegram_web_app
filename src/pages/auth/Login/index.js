import React, { useState } from "react";
import "./login.module.css";
import styleAuth from "../Auth.module.css";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import iconGoogle from "../../../assets/icons/google.svg";
import { login } from "../../../config/redux/action/auth";
import { useDispatch } from "react-redux";

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [form, setForm] = useState({
    email: '',
    password: ''
  })

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    }
    )
  }

  const onSubmitted = (e) => {
    e.preventDefault()
    if (form.email === '' || form.password === '') {
      Swal.fire({
        title: 'error',
        text: 'input must be filled',
        icon: 'error'
      })
    } else {
      dispatch(login(form, Swal, navigate))
    }
  }

  console.log(form);
  return (
    <div
      style={{
        backgroundColor: "#E5E5E5",
        height: "100vh",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className="card" style={{ width: "auto", borderRadius: "5%" }}>
        <div className="card-body">
          <div className={styleAuth.tittle}>
            <h5 className={"card-title"}>Login</h5>
          </div>
          <h6 className={`card-subtitle ${styleAuth.header}`}>Hi, Welcome back!</h6>
          <form
            onSubmit={(e) => {
              onSubmitted(e);
            }}
          >
            <div className="d-flex flex-column" style={{ marginLeft: "50px", marginRight: "50px" }}>
              <label className={styleAuth.formLabel} htmlFor="">
                Email
              </label>
              <input name="email" onChange={(e) => handleChange(e)} className={styleAuth.formInput} type="email" />
              <label className={styleAuth.formLabel} htmlFor="">
                Password
              </label>
              <input name="password" onChange={(e) => handleChange(e)} className={styleAuth.formInput} type="password" />

              <button type="submit" className={styleAuth.buttonRegister}>
                Login
              </button>

              <div className="d-flex justify-content-center align-items-center">
                <hr
                  style={{
                    width: "28%",
                    marginBottom: "30px",
                    marginRight: "25px",
                    color: "#848484",
                    height: "2px",
                  }}
                />
                <label className={styleAuth.labelRegisterWith} htmlFor="">
                  Login with
                </label>
                <hr
                  style={{
                    width: "28%",
                    marginBottom: "30px",
                    marginLeft: "25px",
                    color: "#848484",
                    height: "2px",
                  }}
                />
              </div>
              {/* <img src="../assets/icons/google.svg" alt="img-google" /> */}
              <button className={styleAuth.buttonRegisterGoogle}>
                <img className={styleAuth.iconGoogle} src={iconGoogle} alt="" />
                Login
              </button>
            </div>
          </form>
          <label style={{ marginLeft: "25%" }} className={styleAuth.labelDonthaveAcoount} htmlFor="">
            Don’t have an account?
            <Link to="/register" className={styleAuth.linkSignUp}>
              Sign Up
            </Link>
          </label>
        </div>
      </div>
    </div>
  );
};

export default Login;
