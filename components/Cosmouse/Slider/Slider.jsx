import React, { Component, useState } from "react";
import styles from "./slider.module.scss";

class Slider extends Component {
  // mostly stateless component - only returns the value it is currently set to but keeps track of display state

  state = {
    displayText: <span>{this.props.displayText}{this.props.defaultVal}</span>,
    currentValue: this.props.defaultVal,
  }
  
    // handle onChange event, changing the slider display value
  handleOnChange = (event) => {
    this.setState({
        displayText: <span>{this.props.displayText}{event.target.value}</span>,
        currentValue: event.target.value
    })
    this.props.onSlide(event.target.value,this.props.id)
  }

  render() {

    return (
      <div className={this.props.enabled == "true" ? styles.sliderWrapper : styles.sliderWrapper + styles.disabled} id={this.props.id}>
        <input
          className={styles.slider}
          type='range'
          id={this.props.id + "slider"}
          min={this.props.min}
          max={this.props.max}
          step={this.props.step}
          defaultValue={this.props.defaultVal}
          onChange={this.handleOnChange}
          disabled={this.props.enabled == "false" ? true : false}
        />
        <div className={styles.sliderDisplay} id={this.props.id + '-slider-display'}>
          {this.state.displayText == undefined ? <span>{this.props.displayText}{this.props.defaultVal}</span> : this.state.displayText}
        </div>
      </div>
    );
  }
}

export default Slider;
