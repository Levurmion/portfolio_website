import React, { Component } from "react";
import styles from "./dropdown.module.scss";
import $ from 'jquery';

class Dropdown extends Component {
  // receives DROPDOWN OPTIONS as props from parents
  state = {
    dropdownOptions: this.props.dropdownOptions,
  };

  handleOnChange = (event) => {
    this.props.onSelect(event.target.value);
  };

  isNotUndefined = (structuresMenu) => {
    if (structuresMenu == undefined) {
      return false;
    } else {
      return true;
    }
  };

  // update dropdownOptions with most recent props.dropdownOptions
  static getDerivedStateFromProps(props, state) {
    if (props.dropdownOptions != state.dropdownOptions) {
      return { dropdownOptions: props.dropdownOptions.sort() };
    } else {
    }
  }

  // if this.state after an update (includes onChange) is different than prevState, reset to default
  getSnapshotBeforeUpdate(prevProps, prevState) {

    if (prevProps.dropdownOptions != this.props.dropdownOptions) {
      $("#default" + this.props.id).prop("selected",true)
    } else {
    }

  }

  componentDidUpdate() {
  }

  render() {
    // console.log("dropdown structures state: ", this.state.dropdownOptions);

    return (
      <select
        className={styles.dropdown}
        id={this.props.id}
        onChange={this.handleOnChange}
        disabled={this.props.enabled == "true" ? false : true}>
        <option
          key='default'
          id={'default' + this.props.id}
          className='dropdown-option'
          value={this.props.default}
          
        >
          {this.props.default}
        </option>
        {this.state.dropdownOptions != undefined ? this.state.dropdownOptions.map((option, index) => {
              return (
                <option key={index} className='dropdown-option' value={option}>
                  {option}
                </option>
              );
            })
          : {}}
      </select>
    );
  }
}

export default React.memo(Dropdown);
