import React from "react";
import classes from "./style/LoadingPage.module.css";

const LoadingPage = () => {
  return (
    <div className={classes.wrapper}>
      <div className={classes.container}>
        <div className={classes.content}>
          <div className={classes.circle}></div>
          <div className={classes.circle}></div>
          <div className={classes.circle}></div>
          <div className={classes.circle}></div>
        </div>
      </div>
    </div>
  );
};
export default LoadingPage;
