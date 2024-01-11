import React, { useEffect } from "react";
import { auth, googleAuthProvider } from "../../firebase";
import { signInWithPopup } from "firebase/auth";
import { toast } from "react-toastify";
import { Button } from "antd";
import { GoogleOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

const createOrUpdate = async (authtoken) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/create-or-update-user`,
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

  useEffect(() => {
    if (user && user.token) history.push("/");
  }, [user]);

  const googleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleAuthProvider);

      const { user } = result;

      const idTokenResult = await user.getIdTokenResult();

      //posting the id token to backend
      createOrUpdate(idTokenResult.token)
        .then((res) => console.log("CREATE OR UPDATE RES", res))
        .catch((err) => console.log("error in frontend->", err));

      const { displayName } = user.reloadUserInfo;
      console.log("google result token->", displayName);
      dispatch({
        type: "LOGGED_IN_USER",
        payload: {
          email: user.email,
          name: displayName,
          token: idTokenResult.token,
        },
      });

      // history.push("/");
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
