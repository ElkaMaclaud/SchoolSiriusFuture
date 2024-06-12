import React from "react";

const Achievements = ({ isActive }: {isActive?: boolean}) => {
  const fillColor = isActive ? "#fff" : "#434B74";
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9 19.75C8.58579 19.75 8.25 20.0858 8.25 20.5C8.25 20.9142 8.58579 21.25 9 21.25V19.75ZM15 21.25C15.4142 21.25 15.75 20.9142 15.75 20.5C15.75 20.0858 15.4142 19.75 15 19.75V21.25ZM17 5.75C16.5858 5.75 16.25 6.08579 16.25 6.5C16.25 6.91421 16.5858 7.25 17 7.25V5.75ZM7 7.25C7.41421 7.25 7.75 6.91421 7.75 6.5C7.75 6.08579 7.41421 5.75 7 5.75V7.25ZM13 15.75H11V17.25H13V15.75ZM11 15.75C9.20521 15.75 7.75 14.2948 7.75 12.5H6.25C6.25 15.1232 8.37679 17.25 11 17.25V15.75ZM7.75 12.5V4.5H6.25V12.5H7.75ZM7.75 4.5C7.75 4.36221 7.86221 4.25 8 4.25V2.75C7.03379 2.75 6.25 3.53379 6.25 4.5H7.75ZM8 4.25H16V2.75H8V4.25ZM16 4.25C16.1378 4.25 16.25 4.36221 16.25 4.5H17.75C17.75 3.53379 16.9662 2.75 16 2.75V4.25ZM16.25 4.5V12.5H17.75V4.5H16.25ZM16.25 12.5C16.25 14.2948 14.7948 15.75 13 15.75V17.25C15.6232 17.25 17.75 15.1232 17.75 12.5H16.25ZM11.25 16.5V20.5H12.75V16.5H11.25ZM9 21.25H15V19.75H9V21.25ZM17 7.25H20V5.75H17V7.25ZM20 7.25C20.1378 7.25 20.25 7.36221 20.25 7.5H21.75C21.75 6.53379 20.9662 5.75 20 5.75V7.25ZM20.25 7.5V9.5H21.75V7.5H20.25ZM20.25 9.5C20.25 10.7428 19.2428 11.75 18 11.75V13.25C20.0712 13.25 21.75 11.5712 21.75 9.5H20.25ZM18 11.75H17V13.25H18V11.75ZM7 5.75H4V7.25H7V5.75ZM4 5.75C3.03379 5.75 2.25 6.53379 2.25 7.5H3.75C3.75 7.36221 3.86221 7.25 4 7.25V5.75ZM2.25 7.5V9.5H3.75V7.5H2.25ZM2.25 9.5C2.25 11.5712 3.92879 13.25 6 13.25V11.75C4.75721 11.75 3.75 10.7428 3.75 9.5H2.25ZM6 13.25H7V11.75H6V13.25Z"
        fill={fillColor}
      />
    </svg>
  );
};

export default Achievements;
