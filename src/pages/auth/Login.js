import React, { useEffect, useState } from "react";
import { auth, googleAuthProvider } from "../../firebase";
import { signInWithPopup } from "firebase/auth";
import { toast } from "react-toastify";
import { Button } from "antd";
import { GoogleOutlined, UserAddOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

const loginfn = async (authtoken) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/login`,
    {},
    {
      headers: {
        authtoken,
      },
    }
  );
};

const Login = ({ history }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => ({ ...state }));
  // useEffect(() => {
  //   let intended = history.location.state;
  //   if (intended) {
  //     return;
  //   } else {
  //     if (user && user.token) history.push("/");
  //   }
  // }, [user,history]);

  const googleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleAuthProvider);

      const { user } = result;

      const idTokenResult = await user.getIdTokenResult();

      //posting the id token to backend
      loginfn(idTokenResult.token)
        .then((res) => {
          console.log("response from the backend on login", res);
          if (res.status === 201) {
            console.log("response from backend on login ", res);
            const { displayName } = user.reloadUserInfo;
            console.log("google result token->", displayName);
            dispatch({
              type: "LOGGED_IN_USER",
              payload: {
                email: user.email,
                name: displayName,
                token: idTokenResult.token,
                role: res.data.role,
                _id: res.data._id,
                image: user.picture,
              },
            });
            let intended = history.location.state;
            if (intended) {
              history.push(intended.from);
            } else {
              if (res.data.role === "admin") {
                history.push("/admin/dashboard");
              } else {
                history.push("/user/history");
              }
            }
          }
        })
        .catch((err) => {
          console.log("user not found->", err.message);
          if (err.response && err.response.status === 401) {
            toast.error("Please register yourself");
            dispatch({
              type: "USER NOT FOUND",
              payload: null,
            });
          }
        });
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <Button
            onClick={googleLogin}
            type="danger"
            className="mb-3"
            block
            shape="round"
            icon={<GoogleOutlined />}
            size="large"
          >
            Login with Google
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
