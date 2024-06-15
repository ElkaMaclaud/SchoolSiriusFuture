import React, { useEffect } from "react";
import CardClass from "../../UI_Component/CardClass/CardClass";
import {
  FETCH_LESSONS_COUNTS,
  FETCH_UPCOMING_LESSONS,
} from "../../store/slice";
import { useAppDispatch, useAppSelector } from "../../store/reduxHooks";
import BalanceOfActivities from "../../Components/BalanceOfActivities/BalanceOfActivities";
import AdvertisingCard from "../../Components/AdvertisingCard/AdvertisingCard";
import classes from "./style/Profile.module.css"

const Profile = () => {
  const { lessons, timeToNextLesson, listLessons } = useAppSelector(
    (state) => state.page
  );
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(FETCH_LESSONS_COUNTS());
    dispatch(FETCH_UPCOMING_LESSONS());
  }, []);

  return (
    <div  className={classes.wrapper}>
      <div>
        <CardClass
          style={{
            width: "526px",
            height: "248px",
            backgroundColor: "#7362BC",
            border: "none"
          }}
        >
          <AdvertisingCard />
        </CardClass>
      </div>
      <div>
        <CardClass style={{ width: "344px", height: "372px" }}>
          <BalanceOfActivities listLessons={listLessons} />
        </CardClass>
      </div>
    </div>
  );
};

export default Profile;
