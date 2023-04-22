import React, { Component } from "react";
import styles from "./AJAXButton.module.scss";

class AJAXButton extends Component {
  // stateless component - clicking only triggers AJAX call

  handleOnClick = () => {
    this.props.onReloadRequest();
  };

  render() {
    return (
      <div id={this.props.id} className={styles.ajaxButtonWrapper}>
        <div className={styles.shadowBox}></div>
        <div className={styles.ajaxButton} onClick={this.handleOnClick}>
          {this.props.buttonText}
        </div>
      </div>
    );
  }
}

export default AJAXButton;
