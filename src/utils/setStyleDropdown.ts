import { CSSProperties } from "react";

export const setStyle= (refParent:React.RefObject<HTMLDivElement>): CSSProperties => {
    return {...getСoordinates(refParent),
    width: `${
      refParent.current?.clientWidth && refParent.current?.clientWidth + 5
    }px`,
    overflow: "hidden",
    padding: "0",
    zIndex: "1",
    boxShadow: "0px 0px 10px rgba(56, 49, 49, 0.1)",
    borderRadius: "10px",}
  };
  function getСoordinates(refParent:React.RefObject<HTMLDivElement>): CSSProperties {
    const top = refParent.current?.offsetTop;
    const left = refParent.current?.offsetLeft;
    return { top: `${top && top + 45}px`, left: `${left}px` };
  }