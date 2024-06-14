import React from "react";
import classes from "./style/MainPage.module.css";
import { Outlet } from "react-router-dom";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Header from "../../Components/Header/Header";

const MainPage = () => {
  return (
    <div className={classes.wrapperPage}>
      <div className={classes.wrapperSidebar}><Sidebar /></div>
      <div className={classes.contentWrapper}>
        <Header />
        <div className={classes.content}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};
export default MainPage;
