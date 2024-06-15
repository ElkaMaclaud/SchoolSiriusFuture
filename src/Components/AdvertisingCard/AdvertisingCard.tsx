import React from "react";
import classes from "./style/AdvertisingCard.module.css";
import Present from "../../UI_Component/Icons/Present";

const AdvertisingCard = () => {
  return (
    <div className={classes.wrapper}>
      <div className={classes.content}>
        <div className={classes.wrapperText}>
          <h2>До 31 декабря любой курс со скидкой 20%</h2>
          <p>
            До конца года у вас есть уникальная возможность воспользоваться
            нашей новогодней скидкой 20% на любой курс!
          </p>
          <div className={classes.wrapperImage}>
          <Present />
        </div>
        </div>
      </div>
    </div>
  );
};

export default AdvertisingCard;
