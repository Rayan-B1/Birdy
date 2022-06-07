import React, { Component } from 'react';
import "./NavigationPannelOption.css"

class NavigationPannelOption extends Component{
    constructor(props){
        super(props);
        this.state = {
            
        }
    }

    handleNav = (text) => {
        if(text === "Profile"){
            this.props.goToProfil();
        }else{
            this.props.Disconnect();
        }
    }

    render = () =>{
        return (
            <div className = "NavigationPannelOp">
                <img src = {this.props.icone} alt = "icone"></img>
                <p onClick = {() => this.handleNav(this.props.text)} >{this.props.text}</p>
            </div>
        )
    }


}

export default NavigationPannelOption;