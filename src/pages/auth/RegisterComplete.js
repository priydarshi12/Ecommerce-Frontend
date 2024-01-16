// import React, { useState, useEffect } from "react";
// import { auth } from "../../firebase";
// import { createUserWithEmailAndPassword } from "firebase/auth";
// import {toast} from "react-toastify"

// import "react-toastify/dist/ReactToastify.css";
// const RegisterComplete = ({ history }) => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   useEffect(() => {
//     setEmail(window.localStorage.getItem("emailForRegistration"));
//   }, []);
//   const handleSubmit = async (e) => {
//     //validation
//     if (!email || !password) {
//       toast.error("Email and password is required");
//       return;
//       }
//       if (password.length <6){
//       toast.error("Password must be at least 6 characters long");
//       return;
//       }
//     e.preventDefault();
//     console.log(email);
//     try{
//     const result = await createUserWithEmailAndPassword(
//       auth,
//       email,
//       password
//       );
//       console.log("RESULT", result);
//       if(result){
//         //remove user email from local storage
//         window.localStorage.removeItem('emailForRegistration')
//         //get user
//         let user=auth.currentUser

//         const idTokenResult=await user.getIdTokenResult();
//         //redux store
//         console.log('user',user,'idTokenResult',idTokenResult)
//         //redirect
//         history.push('/');
//       }
//      }catch (error) {

//       toast.error(error.message)
//       }
//       };

//   const completeRegistrationForm = () => (
//     <form onSubmit={handleSubmit}>
//       <input type="email" className="form-control" value={email} disabled />
//       <input
//         type="password"
//         className="form-control"
//         value={password}
//         onChange={(e) => {
//           setPassword(e.target.value);
//         }}
//         placeholder="Password"
//         autoFocus
//       />
//       <br />
//       <button type="submit" className="btn btn-raised">
//         Complete Registration
//       </button>
//     </form>
//   );
//   return (
//     <div className="container p-5">
//       <div className="row">
//         <div className="col-md-6 offset-md-3">
//           <h4>Register Complete</h4>

//           {completeRegistrationForm()}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RegisterComplete;

import React, { useState, useEffect } from "react";

// import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, googleAuthProvider } from "../../firebase";
import { signInWithPopup } from "firebase/auth";
import { toast } from "react-toastify";
import { Button } from "antd";
import { GoogleOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
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

const RegisterComplete = ({ history }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const { user } = useSelector((state) => ({ ...state }));
  useEffect(() => {
    if (user && user.token) history.push("/");
  }, [user,history]);
  useEffect(() => {
    setEmail(window.localStorage.getItem("emailForRegistration"));
  }, []);

  const googleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleAuthProvider);

      const { user } = result;
      const idTokenResult = await user.getIdTokenResult();
      console.log("google result ->", user);
      createOrUpdate(idTokenResult.token)
        .then((res) => {
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
            
            },
          });

          history.push("/");
        })
        .catch((error) => {
          console.log(error.message);
          toast.error(error.message);
        });
    } catch (err) {
      toast.error(err.message);
    }
  };
  const completeRegistrationForm = () => (
    <form>
      <input type="email" className="form-control" value={email} disabled />
      <Button
        onClick={googleLogin}
        type="danger"
        className="mb-3"
        block
        shape="round"
        icon={<GoogleOutlined />}
        size="large"
      >
        signup with Google
      </Button>
    </form>
  );
  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h4>Register Complete</h4>

          {completeRegistrationForm()}
        </div>
      </div>
    </div>
  );
};

export default RegisterComplete;
