import React, { Component } from 'react'

import UserIcon from "./UserIcon.js"
import "./ProjectCollaboratorsBar.css"
import Modal from 'react-responsive-modal/lib/css';
import logIcon from "../images/Icons/log.png"
import rebase from "../rebase.js"
import Announcements from "./Announcements.js"
import "./Announcements.css"



class ProjectCollaboratorsBar extends Component {

    constructor() {
        super()
        this.state = {
            open: false,
        }
        
    }

    
    onOpenModal = () => {
        this.setState({ open: true });
    };
  
      onCloseModal = () => {
        this.setState({ open: false });
    };

    style = () => {

        if (this.state.iconIsManager) {
            return ({
                backgroundColor: this.color,
                borderColor: this.props.color,
                borderWidth: '2px',
                borderStyle: 'solid'
            })
        } else {
            return ({
                backgroundColor: this.color,
                borderColor: this.props.color,
            })

        }
   }

    /*
    This currently only is the box. It needs the following:
    1) Get the color for the project from Firebase
    2) Some way of knowing if it's currently selected
    3) If it's selected, stay expanded to the square
    4) If it's selected, have the box show on the side
    */
    render = () => {
        // let color = "#3CB4CB";
        let userKeys
        if (this.props.users) {
            userKeys = Object.keys(this.props.users)
        }
        
        let eventKeys
        if (this.props.events) {
            eventKeys = Object.keys(this.props.events)
        }

        const { open } = this.state;
        const hasOnClick = this.props.onClick

        let annKeys
        if (this.props.project.announcements){
            annKeys = Object.keys(this.props.project.announcements)
        }
   

        return (
            <div>
                <div id="ProjectCollaboratorsBarContainter">
               
                    {userKeys && userKeys.map((key) => {
                        return (<UserIcon hasBorder={true} color={this.props.color} getAppState={this.props.getAppState}
                        key={key} user={this.props.users[key]} userID={key} projectID={this.props.projectID} project={this.props.project}/>)
                    })}
                    <div onClick={() => {
                        if (!hasOnClick) {
                            this.onOpenModal()
                        } else {
                            this.props.onClick()
                        }
                    }} id="logIconContainer" style={this.style()}>
                        <img alt={"Project"} src={logIcon} className="projectPicture"/>
                        {/*This should only appear if it is selected as the project*/}
                       
                        <div id="projectIndicator" style={{backgroundColor: this.color}}></div>
                            <Modal open={open} onClose={this.onCloseModal} little>
                                <h2>System log for {this.props.title}</h2>
                                {eventKeys && eventKeys.map((key) => {
                                    return (<p>{this.props.events[key].useid + this.props.events[key].event + " on " + this.props.events[key].timestamp}</p>)
                                })}
                            </Modal>
                    </div>
                   
                </div>
                {annKeys && annKeys.map((key) => {
                        return (<Announcements key={key} data={this.props.project.announcements[key]}/>)
                    })}
            </div>
        )
    }

}

export default ProjectCollaboratorsBar;
