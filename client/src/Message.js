import React, { Component } from 'react';
import profil_logo from "./pic.png"
import "./Message.css"
import menu from "./menu.png"
import likedBtn from "./liked.png"
import UnlikedBtn from "./unliked.png"

class Message extends Component{
    
    constructor(props){
        super(props);
        this.state = {
            messagetopublish : "",
            publishBtnClass  : "publishBtnDisabled",
            buttonState : true,
            ClassDeleteModify : "DeleteModifybtn",
            ClassFromDeleteModify : "NoFromDeleteModify",
            CanModify : "false",
            CanModifyMessage : "NoCanModifyMessage"
            
        }
               
    }


    handleDisplayImg = () =>{
        if(this.props.message.imageBase64 !== "none"){
            var image = new Image();
            image.onload = function(){
             }
            image.src = 'data:image/png;base64,'+this.props.message.imageBase64;
            return <img src = {image.src}></img>
             

            
        }

    }


    handleVisitProfile = () =>{
        this.props.goVisitProfile(this.props.message.Login)
        
    }

    handleDeleteMessage = () =>{
        this.props.DeletMessage(this.props.message._id)
    }

    handleSetMessage = () =>{
        this.handleCancel()
        this.props.SetMessage(this.props.message._id, this.state.messagetopublish)
    }

    handleTextBox = () =>{
        this.setState({CanModify : "true"})
    }

    handleCancel = () =>{
            
            this.setState({ClassFromDeleteModify : "NoFromDeleteModify"})
            this.setState({CanModify : "false"})
            this.setState({CanModifyMessage : "NoCanModifyMessage"})
            document.getElementById(this.props.message._id).innerHTML = this.props.message.messagetopublish;
            this.setState({messagetopublish : this.props.message.messagetopublish});
            this.setState({buttonState : true});
            this.setState({publishBtnClass : "publishBtnDisabled"})
        
        
    }

    handleDeleteModify = () =>{
        
        if(this.state.ClassFromDeleteModify === "NoFromDeleteModify"){
            this.setState({ClassFromDeleteModify : "FromDeleteModify"})
            this.setState({CanModify : "true"})
            this.setState({CanModifyMessage : "CanModifyMessage"})

        }
        else{
            this.setState({ClassFromDeleteModify : "NoFromDeleteModify"})
            this.setState({CanModify : "false"})
            this.setState({CanModifyMessage : "NoCanModifyMessage"})
            document.getElementById(this.props.message._id).innerHTML = this.props.message.messagetopublish;
            this.setState({messagetopublish : this.props.message.messagetopublish});
        }
    }

    handlePost = () =>{
        var postVal = document.getElementById(this.props.message._id).innerHTML;
        this.setState({messagetopublish : postVal})
        
        if(postVal == null || postVal === ''  ){
            this.setState({publishBtnClass : 'publishBtnDisabled'})
            this.setState({buttonState : true})
            
        }else{
            this.setState({publishBtnClass : 'publishBtnEnabled'})
            this.setState({buttonState : false})
        }
        
    }

    
    render = () => {

       
        

        if( this.props.CanDelete === false){
            this.state.ClassDeleteModify = "NoDeleteModifybtn"
            this.state.CanModify = "false"
            this.state.CanModifyMessage = "NoCanModifyMessage"
        }


        return (
            <div className = "commentField">
                <div className= "UserAvatar">
                    <img src ={profil_logo} alt = "image" id = "imgMessage"></img>
                </div>


              
                <div className = "UsernameDateMessageImg">
                    <div className= "UsernameDate">
                        <p id = "usernameMessage" onClick = {this.handleVisitProfile} > @{this.props.message.Login} </p>
                        <p id = "dateMessage">{this.props.message.dateOfPublication}</p>
                        
                        <div className = {this.state.ClassDeleteModify} > 
                            <img src = {menu} alt = "image" onClick = {this.handleDeleteModify}  ></img>
                        
                        </div>

                        
                    </div>
                    
                    <div className = "MessageToTweet"  >
                        <p contentEditable = {this.state.CanModify} id = {this.props.message._id} onInput = {this.handlePost}>{this.props.message.messagetopublish}</p>
                        
                        <div className = {this.state.CanModifyMessage}>
                            <button className = {this.state.publishBtnClass}  disabled = {this.state.buttonState}  type = "submit" onClick = {this.handleSetMessage}>modifier</button>
                            <button className = "Cancel" type = "reset" onClick = {this.handleCancel}>annuler</button>
                            <button className = "DeleteBtn" type = "submit" onClick = {this.handleDeleteMessage}>supprimer</button>

                        </div>
                        
                    </div>
                    
                    <div className = "ImageToPublish" id = "DisplayimgTweet">
                            {this.handleDisplayImg()}
                        
                    </div>

                    
                </div>
            
          
            </div>
            )
    }
}

export default Message;