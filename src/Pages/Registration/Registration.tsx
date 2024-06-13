import React, { Fragment } from "react";
import Auth from "../../Components/Auth/Auth";

const Registration = () => {
  return (
    <Fragment>
      <Auth action={"REGISTR_USER"} />
    </Fragment>
  );
};

export default Registration;
