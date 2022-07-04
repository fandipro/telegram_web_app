import React, { useState } from "react";
import styleAuth from "../Auth.module.css";
import { Link, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
import iconGoogle from "../../../assets/icons/google.svg";
import backIcon from "../../../assets/icons/goback.svg";
import { register } from "../../../config/redux/action/auth";

const Register = () => {
    const navigate = useNavigate()
    const [form, setForm] = useState({
        name: '',
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
        if (form.email === '' || form.password === '' || form.name === '') {
            Swal.fire({
                title: 'error',
                text: 'input must be filled',
                icon: 'error'
            })
        } else {
            register(form, Swal, navigate)
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
                        <Link to="/login">
                            <img className={styleAuth.goBack} src={backIcon} alt="" />
                        </Link>
                        <h5 className={"card-title"}>Register</h5>
                    </div>
                    <h6 className={`card-subtitle ${styleAuth.header}`}>Let’s create your account!</h6>
                    <form onSubmit={(e) => { onSubmitted(e) }}>
                        <div className="d-flex flex-column" style={{ marginLeft: "50px", marginRight: "50px" }}>
                            <label className={styleAuth.formLabel} htmlFor="">
                                Name
                            </label>
                            <input name="name" onChange={(e) => { handleChange(e) }} className={styleAuth.formInput} type="text" />
                            <label className={styleAuth.formLabel} htmlFor="">
                                Email
                            </label>
                            <input name="email" onChange={(e) => { handleChange(e) }} className={styleAuth.formInput} type="email" />
                            <label className={styleAuth.formLabel} htmlFor="">
                                Password
                            </label>
                            <input name="password" onChange={(e) => { handleChange(e) }} className={styleAuth.formInput} type="password" />

                            <button type="submit" className={styleAuth.buttonRegister}>
                                Register
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
                                    Register with
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
                            <button className={styleAuth.buttonRegisterGoogle}>
                                <img className={styleAuth.iconGoogle} src={iconGoogle} alt="" />
                                Register
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;
