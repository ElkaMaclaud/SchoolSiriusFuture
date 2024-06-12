import React, {
    useRef,
    useState,
    useLayoutEffect,
    useEffect,
    ReactNode,
    FC,
  } from "react";
  import ReactDOM from "react-dom";
  import classes from "./style/Modal.module.css";
import Cross from "../../UI_Component/Icons/Cross";
  
  interface IModal {
    title?: string;
    handleAction?: () => void;
    children: ReactNode;
  }
  
  export  const Modal:FC<IModal> = ({ title, children, handleAction }) => {
    const ref = useRef<HTMLDivElement>(null);
    const [active, setActive] = useState(true);
    const [open, setOpen] = useState(false);
    const node = document.querySelector("#react_modal");
    const [modalTop, setModalTop] = useState(0);
    
    useLayoutEffect(() => {
      if (ref.current) {
        setModalTop(
          window.scrollY + (window.innerHeight - ref.current?.clientHeight) / 2
        );
      }
    }, []);
    useEffect(() => {
      setOpen(true);
      function handleClick(event: MouseEvent) {
        if (
          event.target instanceof Node &&
          !ref.current?.contains(event.target)
        ) {
          if (open) {
            setActive(false);
          }
        }
      }
      document.addEventListener("click", handleClick);
      return () => {
        document.removeEventListener("click", handleClick);
      };
    }, [open, handleAction]);
    function onClick() {
      function handleClick(event: MouseEvent) {
        if (event.target instanceof Node && ref.current?.contains(event.target)) {
          setActive(false);
        }
      }
      document.addEventListener("click", handleClick);
      return () => {
        document.removeEventListener("click", handleClick);
      };
    }
    const closeModal = () => {
      setActive(false);
    };
    const checkPropsType = (prop: ReactNode = children): prop is string => {
      return typeof prop === "string";
    };
  
    if (!node) return null;
    const ContentModal = () => {
      if (checkPropsType()) {
        return (
          <>
            <span></span>
            <p>{children}</p>
          </>
        );
      }
      return <>{children}</>;
    };
    return ReactDOM.createPortal(
      <div
        style={{ top: `${modalTop}px` }}
        className={active ? classes.modal : classes.modalFalse}
        ref={ref}
      > duhgfljl
        <div className={classes.roundCross} onClick={closeModal}>
        <Cross />
      </div>
      </div>,
      node
    );
  }