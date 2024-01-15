import React,{useEffect, useState} from "react";
import { Route } from "react-router-dom";
import { useSelector } from "react-redux";
import  LoadingToRedirect  from "./LoadingToRedirect";
import { currentAdmin } from "../../functons/auth";
const AdminRoute = ({ children, ...rest }) => {
  const { user } = useSelector((state) => ({ ...state }));
    const [ok,setOk]=useState(false);
    useEffect(()=>{
        if(user && user.token){
            currentAdmin(user.token).then(res=>{
                console.log("CURRENT ADMIN RESPONSE",res)
                setOk(true);
            }).catch(err=>{
                console.log("ADMIN ROUTE ERROR",err);
                setOk(false)
            })
        }
    },[user])
  return ok ? (
    <Route {...rest} ></Route>
  ) : (
    <LoadingToRedirect />
  );
};

export default AdminRoute;
