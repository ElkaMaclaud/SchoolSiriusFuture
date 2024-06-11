import React, { FC, useState } from "react";
import classes from "./style/LoginPage.module.css";
import { useAppDispatch, useAppSelector } from "../../store/reduxHooks";
import {
  AUTH_USER,
} from "../../store/slice";
import SiriusLabel from "../../UI_Component/SiriusLabel";
import { Link } from "react-router-dom";


interface ActionCreators {
  [key: string]: any;
}
const actionCreators: ActionCreators = {
  AUTH_USER,
};

export const LoginPage = () => {
  const { success, user, language} = useAppSelector((state) => state.page);
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState({
    email: user.email,
    password: user.password,
  });
  const handleClick = (event: any) => {
    event.preventDefault();

  };

  return (
    <div className={classes.Authorization}>
      <SiriusLabel />
      <h2 className={classes.Authorization__header}>
        Вход в Sirius Future
      </h2>
      <form className={classes.Authorization} onSubmit={handleClick}>
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
        <input
          value={formData.password}
          onChange={(event) =>
            setFormData((user) => ({
              ...user,
              password: event.target.value.trim(),
            }))
          }
          type="password"
          placeholder="Пароль"
        />
        <label><input type="checkbox" name="" id="" />Запомнить меня</label>
        <button
          type="submit"
          className={classes.Authorization__btn}
          disabled={!formData.email || !formData.password}
        >
          Войти
        </button>
      </form>
      <div><Link to="">Я забыл пароль</Link><Link to="">Войти как тренер</Link></div>
      <span>Нет аккаунта?</span>
      <Link to="">Зарегистрироваться</Link>
      <div><span>{language}</span><span>{!language}</span></div>
    </div>
  );
};
