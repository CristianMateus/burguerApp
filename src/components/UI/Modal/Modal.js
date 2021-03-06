import React from "react";

// Style
import classes from "./Modal.css";

// HOC
import Auxiliary from "../../../hoc/Auxiliary/Auxiliary";

// Components
import Backdrop from "../Backdrop/Backdrop";

class Modal extends React.Component {

  shouldComponentUpdate(nextProps, nextState){
    return nextProps.show !== this.props.show  || nextProps.children !== this.props.children
  }

  render() {
    return (
      <Auxiliary>
        <Backdrop show={this.props.show} clicked={this.props.modalClosed} />
        <div
          style={{
            transform: this.props.show ? "translateY(0)" : "translateY(-100vh)",
            opacity: this.props.show ? "1" : "0"
          }}
          className={classes.Modal}
        >
          {this.props.children}
        </div>
      </Auxiliary>
    );
  }
}

export default Modal;
