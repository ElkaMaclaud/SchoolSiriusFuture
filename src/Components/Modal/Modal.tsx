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
  
  interface IModal {
    title: string;
    handleAction: () => void;
    content: ReactNode;
  }
  
  export  const Modal:FC<IModal> = ({ title, content, handleAction }) => {
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
      if (active) {
        document.body.style.overflowY = "hidden";
      } 
      return () => {
        document.body.style.overflowY = "visible";
      }
    }, [active]);
    useEffect(() => {
      setOpen(true);
      function handleClick(event: MouseEvent) {
        if (
          event.target instanceof Node &&
          !ref.current?.contains(event.target)
        ) {
          if (open) {
            handleAction();
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
          handleAction();
          setActive(false);
        }
      }
      document.addEventListener("click", handleClick);
      return () => {
        document.removeEventListener("click", handleClick);
      };
    }
    const closeModal = () => {
      handleAction();
      setActive(false);
    };
    const checkPropsType = (prop: ReactNode = content): prop is string => {
      return typeof prop === "string";
    };
  
    if (!node) return null;
    const ContentModal = () => {
      if (checkPropsType()) {
        return (
          <>
            <span></span>
            <p>{content}</p>
          </>
        );
      }
      return <>{content}</>;
    };
    return ReactDOM.createPortal(
      <div
        style={{ top: `${modalTop}px` }}
        className={active ? classes.modal : classes.modalFalse}
        ref={ref}
      >
        <div className={classes.modalContent}>

        </div>
      </div>,
      node
    );
  }