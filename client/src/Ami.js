import React, { Component } from 'react';
import "./Ami.css";
import profil_logo from "./pic.png";


class Ami extends Component{

    constructor(props){
        super(props)
        this.state = {
           
        }
    }
   
    handleVisitFriend = () =>{
        this.props.VistFriend(this.props.friendInfos.Login)
    }

    render = () => {
        
        return(
            <div className = "Ami">

                <div className= "UserAvatar">
                    <img src ={profil_logo} alt = "image" id = "imgMessage"></img>
                </div>

                <div className = "FriendInfos">
                    <div className= "FiendLoginName">
                        <p> {this.props.friendInfos.Prenom} {this.props.friendInfos.Nom} <span className = "LoginFriendPrfil" onClick = {this.handleVisitFriend}> @{this.props.friendInfos.Login} </span>  </p>
                       
                    </div>
                    <div className = "FriendJoin"> 
                        <p>Nous a rejoint {this.props.friendInfos.dateOfJoin}</p>
            
                    </div>
                </div>
                
            </div>
        )
    }
}

export default Ami