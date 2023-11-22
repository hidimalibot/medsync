import React from "react";
import "../styles/RegiserStyles.css";
import { Form, Input, message } from "antd";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import back from '../pic/back.png';
import logooo from '../pic/logo2.png';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //form handler
  const onfinishHandler = async (values) => {
    try {
      dispatch(showLoading());
      const res = await axios.post("/api/v1/user/login", values);
      window.location.reload();
      dispatch(hideLoading());
      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        message.success("Login Successfully");
        navigate("/");
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("something went wrong");
    }
  };
  return (
    <div className="form-container ">

      <Form layout="vertical" onFinish={onfinishHandler} className="register-form">

        <div className='img-logooo'>
          <img src={logooo} alt="Medsync Logo" className='logo'/>
        </div>

        <h3 className="text-center">Login</h3>
        <Form.Item label="Email" name="email">
          <Input type="email" required />
        </Form.Item>
        <Form.Item label="Password" name="password">
          <Input type="password" required />
        </Form.Item>
        <Link to="/register" className="m-2">
          Don't have an accout yet?
        </Link>
        <button className="btn btn-primary" type="submit">
          Login
        </button>
      </Form>

      <div className='back-image'>
        <img src={back} alt="Medsync Logo" className='back'/>
      </div>

    </div>
  );
};

export default Login;