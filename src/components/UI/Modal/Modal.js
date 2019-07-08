import React from "react";

// Style
import classes from "./Modal.css";

// HOC
import Auxiliary from "../../../hoc/Auxiliary/Auxiliary";

// Components
import Backdrop from "../Backdrop/Backdrop";

const modal = props => {
  return (
    <Auxiliary>
      <Backdrop show={props.show} clicked={props.modalClosed}/>
      <div
        style={{
          transform: props.show ? "translateY(0)" : "translateY(-100vh)",
          opacity: props.show ? "1" : "0"
        }}
        className={classes.Modal}
      >
        {props.children}
      </div>
    </Auxiliary>
  );
};

export default modal;
