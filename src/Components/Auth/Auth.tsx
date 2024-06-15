import React, { FC, useEffect, useState } from "react";
import classes from "./style/Auth.module.css";
import { useAppDispatch, useAppSelector } from "../../store/reduxHooks";
import { AUTH_USER, REGISTR_USER, SET_LANGUAGE, SET_USER_DATA } from "../../store/slice";
import SiriusLabel from "../../UI_Component/Icons/SiriusLabel";
import { Link, useNavigate } from "react-router-dom";
import HidePassword from "../../UI_Component/Icons/HidePassword";
import ShowPassword from "../../UI_Component/Icons/ShowPassword";

interface ActionCreators {
  [key: string]: any;
}
const actionCreators: ActionCreators = {
  REGISTR_USER,
  AUTH_USER,
};

const Auth: FC<{ action: string }> = ({ action }) => {
  const [hide, setHide] = useState<boolean>(true);
  const { user, language, success } = useAppSelector((state) => state.page);
  const navigate = useNavigate()
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState({
    email: user.email,
    password: user.password,
  });
  const handleClick = (event: any) => {
    event.preventDefault();
    const actionFunction = actionCreators[action];
    if (actionFunction) {
      const actionFunction = actionCreators[action];
      dispatch(actionFunction({ ...formData }));
      dispatch(SET_USER_DATA({ ...formData }));
    }
  };

  useEffect(() => {
    if (success) {
      navigate("/auth");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [success]);

  const changeLanguage = (value: string) => {
    dispatch(SET_LANGUAGE(value))
  }

  return (
    <div className={classes.authorizationWrapper}>
      <div className={classes.authorization}>
        <SiriusLabel />
        <h1 className={classes.authorizationHeader}>{language === "RU" ? "Вход в Sirius Future" : "Login to Sirius Future"}</h1>
        <div className={classes.authorizationForm}>
          <form onSubmit={handleClick} autoComplete="on">
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
                placeholder={language === "RU" ? "Пароль" : "Password"}
              />
              <div
                className={classes.hidePasswordSVG}
                onClick={() => {
                  setHide(!hide);
                }}
              >
                {hide ? <HidePassword /> : <ShowPassword />}
              </div>
            </div>
            <label>
              <input type="checkbox" name="" id="" />
              {language === "RU" ? "Запомнить меня" : "Remember me"}
            </label>
            <button
              type="submit"
              className={classes.Authorization__btn}
              disabled={!formData.email || !formData.password}
            >
              {action === "REGISTR_USER" ? (language === "EN" ? "Register" : "Зарегистрироваться") : 
              (language === "RU" ? "Войти" : "Sign in")}

            </button>
          </form>
          <div className={classes.linksWrapper}>
            <Link to="/auth">{ language === "RU" ? "Я забыл пароль" : "I forgot password"}</Link>
            <Link to="/auth">{ language === "RU" ? "Войти как тренер" : "Login as a coach"}</Link>
          </div>
        </div>
        <div className={classes.secondWrapper}>
          <span>{language === "RU" ? "Нет аккаунта?" : "Don't have an account?"}</span>
          {action === "REGISTR_USER" ? (
            <Link to="/auth">{language === "RU" ? "Уже есть аккаунт" : "Already have an account"}</Link>
          ) : (
            <Link to="/registration">{language === "RU" ? "Зарегистрироваться" : "Register"}</Link>
          )}
        </div>
      </div>
      <div className={classes.authorizationFooter}>
        <span className={language === "RU" ? classes.langActive : classes.lang} onClick={() => changeLanguage("RU")}>
          RU
        </span>
        <span className={language === "EN" ? classes.langActive : classes.lang} onClick={() => changeLanguage("EN")}>
          EN
        </span>
      </div>
    </div>
  );
};
export default Auth;
