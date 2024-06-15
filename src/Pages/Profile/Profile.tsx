import React, { useEffect } from "react";
import CardClass from "../../UI_Component/CardClass/CardClass";
import {
  FETCH_LESSONS_COUNTS,
  FETCH_UPCOMING_LESSONS,
  SET_LOADING,
} from "../../store/slice";
import { useAppDispatch, useAppSelector } from "../../store/reduxHooks";
import BalanceOfActivities from "../../Components/BalanceOfActivities/BalanceOfActivities";
import AdvertisingCard from "../../Components/AdvertisingCard/AdvertisingCard";
import classes from "./style/Profile.module.css";
import TimeToNextLesson from "../../Components/TimeToNextLesson/TimeToNextLesson";
import Spinner from "../../Components/Spinner/Spinner";
import UpcomingLessons from "../../Components/UpcomingLessons/UpcomingLessons";
import SiriusLabel from "../../UI_Component/Icons/SiriusLabel";

const Profile = () => {
  const { loading, lessons, timeToNextLesson, listLessons } = useAppSelector(
    (state) => state.page
  );
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(SET_LOADING(true));
    dispatch(FETCH_LESSONS_COUNTS());
    dispatch(FETCH_UPCOMING_LESSONS());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={classes.wrapper}>
      <div className={classes.contentCards}>
        <div>
          <CardClass
            style={{
              width: "526px",
              height: "248px",
              backgroundColor: "#7362BC",
              border: "none",
            }}
          >
            <AdvertisingCard />
          </CardClass>
        </div>
        <div>
          <CardClass
            style={{
              width: "344px",
              height: "248px",
              backgroundColor: "#FFF1CB",
              border: "none",
            }}
          >
            <TimeToNextLesson nextLesson={timeToNextLesson} />
          </CardClass>
        </div>
        <div>
          <CardClass
            style={{
              width: "162px",
              height: "248px",
              backgroundColor: "#E8CBFF",
              border: "none",
            }}
          >
            <div style={{ padding: "28px" }}>
              <SiriusLabel />
            </div>
          </CardClass>
        </div>
      </div>
      <div className={classes.contentCards}>
        <div>
          <CardClass style={{ width: "344px", height: "372px" }}>
            <BalanceOfActivities listLessons={listLessons} />
          </CardClass>
        </div>
        <div>
          <CardClass
            style={{
              width: "708px",
              height: "372px",
            }}
          >
            <UpcomingLessons lessons={lessons} />
          </CardClass>
        </div>
        {loading && <Spinner />}
      </div>
    </div>
  );
};

export default Profile;
