import React, { FC, useState } from "react";
import classes from "./style/Auth.module.css";
import { useAppDispatch, useAppSelector } from "../../store/reduxHooks";
import { AUTH_USER } from "../../store/slice";
import SiriusLabel from "../../UI_Component/Icons/SiriusLabel";
import { Link } from "react-router-dom";
import HidePassword from "../../UI_Component/Icons/HidePassword";
import ShowPassword from "../../UI_Component/Icons/ShowPassword";

interface ActionCreators {
  [key: string]: any;
}
const actionCreators: ActionCreators = {
  AUTH_USER,
};

const Auth = () => {
  const [hide, setHide] = useState<boolean>(true);
  const { success, user, language } = useAppSelector((state) => state.page);
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState({
    email: user.email,
    password: user.password,
  });
  const handleClick = (event: any) => {
    event.preventDefault();
  };

  return (
    <div className={classes.authorizationWrapper}>
      <div className={classes.authorization}>
        <SiriusLabel />
        <h1 className={classes.authorizationHeader}>Вход в Sirius Future</h1>
        <div className={classes.authorizationForm}>
          <form onSubmit={handleClick}>
            <input
              value={formData.email}
              onChange={(event) =>
                setFormData((user) => ({
                  ...user,
                  email: event.target.value.trim(),
                }))
              }
              type="text"
              placeholder="E-mail"
            />
            <div className={classes.inputWrapper}>
              <input
                value={formData.password}
                onChange={(event) =>
                  setFormData((user) => ({
                    ...user,
                    password: event.target.value.trim(),
                  }))
                }
                type={hide ? "password" : "text"}
                placeholder="Пароль"
              />
              <div
                className={classes.hidePasswordSVG}
                onClick={() => {
                  setHide(!hide);
                }}
              >
                {hide ? <HidePassword /> : <ShowPassword />}
              </div>{" "}
            </div>
            <label>
              <input type="checkbox" name="" id="" />
              Запомнить меня
            </label>
            <button
              type="submit"
              className={classes.Authorization__btn}
              disabled={!formData.email || !formData.password}
            >
              Войти
            </button>
          </form>
          <div className={classes.linksWrapper}>
            <Link to="/registration">Я забыл пароль</Link>
            <Link to="/registration">Войти как тренер</Link>
          </div>
        </div>
        <div className={classes.secondWrapper}>
          <span>Нет аккаунта?</span>
          <Link to="/registration">Зарегистрироваться</Link>
        </div>
      </div>
      <div className={classes.authorizationFooter}>
        <span className={language === "RU" ? classes.langActive : classes.lang}>
          RU
        </span>
        <span className={language === "EN" ? classes.langActive : classes.lang}>
          EN
        </span>
      </div>
    </div>
  );
};
export default Auth