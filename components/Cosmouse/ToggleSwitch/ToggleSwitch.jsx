import React, { Component } from "react";
import InfoRoundedIcon from "@mui/icons-material/InfoRounded";
import Tippy from "@tippy.js/react";
import styles from "./toggleSwitch.module.scss";
import $ from 'jquery';

class ToggleSwitch extends Component {
  // stateless component - purely relying on ":checked" state
  handleClickEvent = () => {
    let targetSwitch = $("#" + this.props.id + "-switch");

    if (targetSwitch.is(":checked")) {
      this.props.onToggle(true, this.props.id);
    } else {
      this.props.onToggle(false, this.props.id);
    }
  };

  // on component mount, check the prescribed default state
  componentDidMount() {
    let targetSwitch = $("#" + this.props.id + "-switch");

    if (this.props.default == true) {
      targetSwitch.prop("checked", true);
    } else {
      targetSwitch.prop("checked", false);
    }
  }

  render() {
    return (
      <Tippy
        content={this.props.tippyContent}
        placement='left'
        animation='shift-away'
        delay={[500, 0]}
        allowHTML={true}
        distance={10}
        theme='scoreInfo'>
        <div
          className={styles.formCheck + styles.formSwitch + styles.toggleSwitchDiv}
          id={this.props.id}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "start",
            }}>
            <InfoRoundedIcon
              style={{
                fontSize: "1vw",
                color: "#007a70",
                marginInlineEnd: "0.2vw",
              }}
            />
            <span>
              <strong>{this.props.label}</strong>
            </span>
          </div>
          <input
            className={styles.formCheckInput + styles.toggleSwitch}
            type='checkbox'
            id={this.props.id + "-switch"}
            onClick={this.handleClickEvent}></input>
        </div>
      </Tippy>
    );
  }
}

export default ToggleSwitch;
