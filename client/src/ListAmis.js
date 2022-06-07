import React, { Component } from 'react';
import Ami from "./Ami"
import "./ListAmis.css"



class ListAmis extends Component{
    constructor(props){
        super(props);
        this.state = {
        
        }
    }

    handleVistFriend = (param) =>{
        this.props.VistFriend(param)
    }

    render = () => {
        return (
            <div className = "ListAmis">
                {this.props.Friends.map(friend => 

                   <Ami  friendInfos = {friend} VistFriend = {this.handleVistFriend} />
            )}
            </div>
        )
    }

}

export default ListAmis