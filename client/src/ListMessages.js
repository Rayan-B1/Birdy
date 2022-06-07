import React, { Component } from 'react';
import Message from "./Message"
import profil_logo from "./myProfilImg.jpg"
import "./Message.css"


class ListMessages extends Component{
    constructor(props){
        super(props);
        this.state = {
        
        }
        
        
    }

    handleVisitProfile = (param) =>{
        this.props.goVisitProfile(param)
    }

    handleDeleteMessage = (messageid) =>{
        

        this.props.DeletMessage(messageid)
    }

    handleSetMessage = (messageid, messagetopublish) =>{
        this.props.SetMessage(messageid, messagetopublish)
    }


    
    

    render = () =>{
    return (
        
        <div>
            
            {
            
            this.props.Messages.map(message => 
                <Message message = {message} goVisitProfile = {this.handleVisitProfile} CanDelete = {this.props.CanDelete}  DeletMessage = {this.handleDeleteMessage} SetMessage = {this.handleSetMessage}  />
                
            )
            
            }
        </div>
                
        )
    }
}
export default ListMessages