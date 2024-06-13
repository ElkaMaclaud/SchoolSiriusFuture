import React from "react";
import classes from "./style/NotfoundPage.module.css";
import { useNavigate } from "react-router-dom";
import { Arrow } from "../../UI_Component/Icons/Arrow";

const NotfoundPage = () => {
  const navigate = useNavigate();
  return (
      <div className={classes.wrapperPage}>
          <div onClick={() => navigate(-1)} className={classes.pageLink}>
              <Arrow />
              <span>Вернуться назад</span>
          </div>
          <img
              src="https://img.freepik.com/free-vector/oops-404-error-with-a-broken-robot-concept-illustration_114360-5529.jpg?size=338&ext=jpg&ga=GA1.1.1371518722.1717891200&semt=ais_user"
              alt=""
          />
      </div>
  );
};

export default NotfoundPage;