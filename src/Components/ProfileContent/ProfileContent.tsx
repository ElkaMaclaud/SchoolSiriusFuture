import React, { FC } from "react";
import Avatar from "../Avatar/Avatar";
import { useNavigate } from "react-router-dom";
import Cross from "../../UI_Component/Icons/Cross";
import classes from "./style/ProfileContent.module.css";
import Exit from "../../UI_Component/Icons/Exit";
import { useAppDispatch } from "../../store/reduxHooks";
import { SET_PAGE } from "../../store/slice";
const users = [1, 2];
const ProfileContent: FC<{ handleClick: () => void }> = ({ handleClick }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch()
  const handleNavigate = () => {
    dispatch(SET_PAGE("LOGIN"))
    navigate("/auth");
  };
  return (
    <div className={classes.profileWrapper}>
      <div onClick={handleClick} className={classes.profileWrapperClose}>
        <Cross />
      </div>
      <div className={classes.profileWrapperContent}>
      <div>Смена пользователя</div>
      {users.map((user) => {
        const key = user;
        return (
          <div className={classes.profileUserCard}>
            <Avatar
            key={key}
            name={
              "https://s3-alpha-sig.figma.com/img/dae3/59ff/8f6d0de811237737f4dd4647e4b450b5?Expires=1719187200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=cYD5~UVyi0e5FV6UufOzKn-kYLLkBtdbeNVh8Sc5D7hexbteNXIDyMA3L7QQ791nLZ~~MEdKDi16wngFy2UFv9AXHxGBInvlziicEY4n8U9pz~vSTdifZPI7eFWmINMRvMaIv69pbbIVwlksZ6jDGpx24XjEIit9WqE-ni6WDUUvw798cEJMbN8rZv9f6ghzfOpivOBDYZnCAyg3Fl9r8PRFckK4nCUuFvPZkxXKMybOqq7ojoOJ1iMITpNuGJxHHR9ODy8jXBtobCQQeHO2xUA7XwTiVQjpDKNtESAsYvWdo5RUviy1YIuUSqGqcjz~lvUKSTNfz8-lkSbYw5iqeQ__"
            }
          />
          </div>
        );
      })}
      <span className={classes.profileWrapperBorder}></span>
      <div className={classes.profileExit}><div className={classes.profileWrapperLink}>
        Выйти
      </div>
      <div onClick={handleNavigate} ><Exit /></div></div>
      </div>
    </div>
  );
};

export default ProfileContent;
