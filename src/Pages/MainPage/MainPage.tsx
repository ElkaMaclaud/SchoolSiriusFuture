import React from "react";
import classes from "./style/MainPage.module.css";
import { Outlet } from "react-router-dom";
import Sidebar from "../../Components/Sidebar/Sidebar";


const MainPage = () => {
  return (
    <div className={classes.wrapperPage}>
        <Sidebar />
      <div className={classes.content}>
        <Outlet />
      </div>
    </div>
  );
};

export default MainPage;