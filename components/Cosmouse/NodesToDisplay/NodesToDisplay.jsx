import React, { Component } from "react";
import styles from './nodesToDisplay.module.scss'

class NodesToDisplay extends Component {

  state = {
    numberOfNodes: 10
  }

  handleOnChange = (event) => {
    this.props.onNumberChange(event.target.value)
    this.setState({
      numberOfNodes: event.target.value
    })
  }

  render() {
    return (
      <div className={this.state.numberOfNodes < 100 ? styles.NodesToDisplayWrapper : styles.NodesToDisplayWrapper + styles.warning} id={this.props.id}>
        <span id={`${this.props.id}-label`}><strong>{this.props.labelText}</strong></span>
        <input
          type='number'
          className={this.state.numberOfNodes < 100 ? styles.NodesToDisplayInput : styles.NodesToDisplayInput + styles.warning}
          id={this.props.id}
          min={this.props.min}
          max={this.props.max}
          defaultValue={this.props.defaultVal}
          onChange = {this.handleOnChange}
        />
      </div>
    );
  }
}

export default NodesToDisplay;
