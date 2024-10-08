import React, { useState } from "react";
import { Menu ,Badge} from "antd";
import { auth } from "../../firebase";

import {
  AppstoreOutlined,
  SettingOutlined,
  UserOutlined,
  UserAddOutlined,
  LogoutOutlined,
  ShoppingOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import "./Header.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Search from "../forms/Search";
const { SubMenu, Item } = Menu;

const Header = () => {
  let dispatch = useDispatch();
  let { user,cart } = useSelector((state) => ({ ...state }));
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

      <Item key="shop" icon={<ShoppingOutlined />}>
        <Link to="/shop">Shop</Link>
      </Item>
      <Item key="cart" icon={<ShoppingCartOutlined />}>
        <Link to="/cart">
          <Badge count={cart.length} offset={[9, 0]}>
            Cart
          </Badge>
        </Link>
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
          // icon={<img src="https://lh3.googleusercontent.com/a/ACg8ocK2m866nY9-rB6dZaea0Ef1bys0rASew7ET5Jg7j2eJ-Z4=s96-c" alt="new"/>}
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
      <span className="float-right p-1">
        <Search />
      </span>
    </Menu>
  );
};

export default Header;
