import React, { Component } from 'react';
import styles from './toggleButtons.module.scss'

class ToggleButton extends Component {

    // button keeps track of its own ON/OFF state
    // text to be displayed given as props from parent
    // ON --> this.props.onText
    // OFF --> this.props.offText

    state = { 
        buttonON: true
    }

    handleOnClick = () => {
        
        if (this.state.buttonON ==  true) {
            this.props.onToggle(false,this.props.id);
            this.setState({buttonON: false})
        } else {
            this.props.onToggle(true,this.props.id);
            this.setState({buttonON: true})
        }
    }

    render() { 
        return (
            <button className={styles.toggleButton} id={this.props.id} onClick={this.handleOnClick}>
                <span>{this.state.buttonON == true ? this.props.onText : this.props.offText}</span>
            </button>
        );
    }
}
 
export default ToggleButton;