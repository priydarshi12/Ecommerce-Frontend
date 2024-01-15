import React, { useState } from "react";
import { Menu } from "antd";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";
import {
  AppstoreOutlined,
  SettingOutlined,
  UserOutlined,
  UserAddOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import "./Header.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const { SubMenu, Item } = Menu;

const Header = () => {
  let dispatch = useDispatch();
  let { user } = useSelector((state) => ({ ...state }));
  console.log("header", user);
  let history = useHistory();
  const [current, setCurrent] = useState("Home");
  const handleClick = (e) => {
    setCurrent(e.key);
  };

  const logout = async (e) => {
    try {
      await auth.signOut(); // Use signOut from your Firebase authentication instance
      dispatch({
        type: "LOGOUT",
        payload: null,
      });
      history.push("/login"); // Use history.push without "State"
    } catch (error) {
      console.error("Error during logout:", error.message);
    }
  };
  return (
    <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
      <Item key="home" icon={<AppstoreOutlined />}>
        <Link to="/">Home</Link>
      </Item>
      {!user && (
        <Item key="login" icon={<UserOutlined />} className="float-right">
          <Link to="/login">Login</Link>
        </Item>
      )}
      {!user && (
        <Item key="register" icon={<UserAddOutlined />} className="float-right">
          <Link to="/register">Register</Link>
        </Item>
      )}
      {user && (
        <SubMenu
          icon={<SettingOutlined />}
          title={user.name}
          className="float-right"
        >
          {user && user.role === "subscriber " && (
            <Item>
              <Link to="/user/history">Dashboard</Link>
            </Item>
          )}
          {user && user.role === "admin " && (
            <Item>
              <Link to="/admin/dashboard">Dashboard</Link>
            </Item>
          )}

          <Item icon={<LogoutOutlined />} onClick={logout}>
            Logout
          </Item>
        </SubMenu>
      )}
    </Menu>
  );
};

export default Header;
