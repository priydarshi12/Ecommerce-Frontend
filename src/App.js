import React,{useEffect} from "react";
import { Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Home from "./pages/Home";
import Header from "./components/nav/Header";
import RegisterComplete from "./pages/auth/RegisterComplete";

import { auth } from "./firebase";
import {useDispatch} from 'react-redux'
import { toast } from "react-toastify";

import { currentUser } from "./functons/auth";
function App() {
  const dispatch=useDispatch();
  useEffect(()=>{
    const unsubscribe=auth.onAuthStateChanged(async(user)=>{
      if(user){
        console.log(user)
        const idTokenResult=await user.getIdTokenResult();
        // dispatch({
        //   type:"LOGGED_IN_USER",
        //   payload:{
        //     email:user.email,
        //     token:idTokenResult.token,
        //   },
        // });
        currentUser(idTokenResult.token)
        .then((res) => {
          console.log("response from the backend on login",res);
          if(res.status===201){
          console.log("response from backend on login ",res);
          const { displayName } = user.reloadUserInfo;
          console.log("google result token->", displayName);
          dispatch({
            type: "CURRENT_USER",
            payload: {
              email: user.email,
              name: displayName,
              token: idTokenResult.token,
              role:res.data.role,
              _id:res.data._id,
            },
          });
    
         
        }
      })
        .catch((err) =>{
          console.log("user not found->",err.message)
          if(err.response && err.response.status === 401){
          toast.error("Please register yourself")
          dispatch({
            type: "USER NOT FOUND",
            payload: null,
          });
          }
        });
      }
    });
    //cleanup
    return ()=>unsubscribe()
  },[]);
  return (
    <>
      <Header />
      <ToastContainer/>
      <Switch>
        <Route exact path="/" component={Home}></Route>
        <Route exact path="/login" component={Login}></Route>
        <Route exact path="/register" component={Register}></Route>
        <Route exact path="/register/complete" component={RegisterComplete}></Route>

      </Switch>
    </>
  );
}

export default App;
