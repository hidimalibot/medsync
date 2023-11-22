import React from "react";
import "../styles/RegiserStyles.css";
import { Form, Input, message } from "antd";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";

import back from '../pic/back.png';
import logooo from '../pic/logo2.png';

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // form handler
  const onFinishHandler = async (values) => {
    try {
      dispatch(showLoading());

      // Assuming your backend returns a verification token
      const res = await axios.post("/api/v1/user/register", values);
      dispatch(hideLoading());

      if (res.data.success) {
        message.success("Please check your email for verification.");
        navigate("/login");
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("Something Went Wrong");
    }
  };

  return (
    <>
      <div className="form-container ">
        <Form layout="vertical" onFinish={onFinishHandler} className="register-form">

          <div className='img-logooo'>
            <img src={logooo} alt="Medsync Logo" className='logo'/>
          </div>

          <h3 className="text-center">Sign Up</h3>
          <Form.Item label="Name" name="name">
            <Input type="text" required />
          </Form.Item>
          <Form.Item label="Email" name="email">
            <Input type="email" required />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please enter your password!",
              },
              {
                min: 8,
                message: "Password must be at least 8 characters long!",
              },
            ]}
          >
            <Input type="password" />
          </Form.Item>
          <Link to="/login" className="m-2">
            Have an account?
          </Link>
          <button className="btn btn-primary" type="submit">
            Sign Up
          </button>
        </Form>
      
        <div className='back-image'>
          <img src={back} alt="Medsync Logo" className='back'/>
        </div>
      </div>
    </>
  );
};

export default Register;
