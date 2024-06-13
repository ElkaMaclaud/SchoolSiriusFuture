import React, { CSSProperties, useEffect } from "react";
import CardClass from "../../UI_Component/CardClass/CardClass";
import { FETCH_LESSONS_COUNTS, FETCH_UPCOMING_LESSONS } from "../../store/slice";
import { useAppDispatch } from "../../store/reduxHooks";

const style: CSSProperties = { width: "356px", height: "318px" };
const Profile = () => {
  const dispatch = useAppDispatch()
  useEffect(() => {
      dispatch(FETCH_LESSONS_COUNTS());
      dispatch(FETCH_UPCOMING_LESSONS());
  }, [dispatch])
  return (
    <div>
      <CardClass styles={style}>Profile</CardClass>
    </div>
  );
};

export default Profile;
