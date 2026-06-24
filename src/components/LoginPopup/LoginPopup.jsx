import React, { useContext, useState, useEffect } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext.jsx'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'

const LoginPopup = ({ setShowLogin }) => {

    const { url, setToken, setUserName, setUserEmail, setUserPhone, setUserRole } = useContext(StoreContext)

    const [currState, setCurrState] = useState("Login")
    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
        phone: ""
    })

    const [error, setError] = useState({})

    const navigate = useNavigate()

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({ ...data, [name]: value }))
    }

    const onLogin = async (event) => {
        event.preventDefault();
        let newUrl = url;
        if (currState === "Login") {
            newUrl += "/api/user/login"
        }
        else {
            newUrl += "/api/user/register"
        }

        const response = await axios.post(newUrl, data);

        if (response.data.success) {
            setToken(response.data.token);
            setUserName(response.data.name);
            setUserEmail(response.data.email);
            setUserPhone(response.data.phone);
            setUserRole(response.data.role);
            console.log(response.data.name, response.data.email, response.data.phone, response.data.role)
            // localStorage.setItem("token", response.data.token);
            setShowLogin(false)
            navigate("/")
        }
        else {
            toast.error(response.data.message || "Đã có lỗi xảy ra")
        }

    }

    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => document.body.style.overflow = "auto";
    }, []);

    const handleForgotPassword = async (event) => {
        event.preventDefault();

        if (!data.email) {
            toast.error("Vui lòng nhập email");
            return;
        }

        try {
            const response = await axios.post(
                `${url}/api/user/forgot-password`,
                {
                    email: data.email
                }
            );

            if (response.data.success) {
                toast.success(response.data.message);
                setCurrState("Login");
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error("Có lỗi xảy ra");
        }
    };

    return (
        <div className='login-popup'>
            <form
                onSubmit={
                    currState === "Forgot Password"
                        ? handleForgotPassword
                        : onLogin
                }
                className="login-popup-container"
            >
                <div className="login-popup-title">
                    <h2>
                        {
                            currState === "Login"
                                ? "Đăng nhập"
                                : currState === "Sign up"
                                    ? "Đăng ký"
                                    : "Quên mật khẩu"
                        }
                    </h2>
                    <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" />
                </div>
                <div className="login-popup-inputs">

                    {currState === "Sign up" && (
                        <>
                            <input
                                name="name"
                                onChange={onChangeHandler}
                                value={data.name}
                                type="text"
                                placeholder="Your name"
                                required
                            />

                            <input
                                name="phone"
                                onChange={onChangeHandler}
                                value={data.phone}
                                type="text"
                                placeholder="Your phone number"
                                required
                            />
                        </>
                    )}

                    <input
                        name="email"
                        onChange={onChangeHandler}
                        value={data.email}
                        type="email"
                        placeholder="Your email"
                        required
                    />

                    {currState !== "Forgot Password" && (
                        <input
                            name="password"
                            onChange={onChangeHandler}
                            value={data.password}
                            type="password"
                            placeholder="Password"
                            required
                        />
                    )}

                </div>
                <button type="submit">
                    {
                        currState === "Sign up"
                            ? "Đăng ký"
                            : currState === "Forgot Password"
                                ? "Gửi email đặt lại mật khẩu"
                                : "Đăng nhập"
                    }
                </button>
                {
                    currState === "Login" &&
                    (
                        <>
                            <div className="forget-password">
                                <p
                                    style={{ cursor: "pointer" }}
                                    onClick={() => setCurrState("Forgot Password")}
                                >
                                    Quên mật khẩu?
                                </p>
                            </div>

                            <p>
                                Đăng ký tài khoản?
                                <span onClick={() => setCurrState("Sign up")}>
                                    Nhấn đây
                                </span>
                            </p>
                        </>
                    )
                }
                {
                    currState === "Sign up" &&
                    (
                        <>
                            <div className="forget-password">
                                <p
                                    style={{ cursor: "pointer" }}
                                    onClick={() => setCurrState("Forgot Password")}
                                >
                                    Quên mật khẩu?
                                </p>
                            </div>

                            <p>Đã có tài khoản?<span onClick={() => setCurrState("Login")}>Đăng nhập</span></p>
                        </>
                    )
                }
                {
                    currState === "Forgot Password" &&
                    (
                        <p>
                            Quay lại
                            <span onClick={() => setCurrState("Login")}>
                                Đăng nhập
                            </span>
                        </p>
                    )
                }
            </form>
        </div>
    )
}

export default LoginPopup
