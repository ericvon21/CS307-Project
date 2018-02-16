import React, { Component } from 'react'
import rebase, { auth, google} from "../rebase.js"
import { Row, Grid, Col } from 'react-bootstrap'

import tempPic from "../images/temp.jpg"
import "./UserIcon.css"
import 'react-responsive-modal/lib/react-responsive-modal.css';
import Modal from 'react-responsive-modal/lib/css';


class UserIcon extends Component {

    constructor() {
      super();

      this.state = { open: false }
    }

    onOpenModal = () => {
      this.setState({ open: true });
    };

    onCloseModal = () => {
      this.setState({ open: false });
    };

    /*
    This currently only is the box. It needs the following:
    1) Get the color for the project from Firebase
    2) Some way of knowing if it's currently selected
    3) If it's selected, stay expanded to the square
    4) If it's selected, have the box show on the side
    */



    render = () => {
        const { open } = this.state;
        let color = "#3CB4CB";
        var divStyle = {
            backgroundColor: color,
            borderColor: color
        }
        return (
            <div onClick={this.onOpenModal} id="userIconContainer" style={{divStyle}}>
                <img src={tempPic} className="projectPicture"/>
                {/*This should only appear if it is selected as the project*/}
                <div id="projectIndicator" style={{backgroundColor: color}}></div>
                    <Modal open={open} onClose={this.onCloseModal} little>
                      <h2>Simple centered modal.<br/><br/>Here is some more text.<br/><br/>The rest of it.</h2>
                    </Modal>
            </div>
        )
    }

}

export default UserIcon;