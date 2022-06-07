import React, { Component } from 'react'
import "./Profil.css"
import BackImg from "./background.png"
import ProfileImg from "./pic.png"
import Arrow from "./arrow.png"
import NavigationPannel from "./NavigationPannel"
import ListMessages from './ListMessages'
import ListAmis from "./ListAmis"
import StatsField from "./StatsField"


class Profile extends React.Component{
    constructor(props){
        super(props)
        this.state={
            FollowBtnState : "UnFollowBtnDisplay"
        };

        this.UserBackImg = BackImg
       
    }

    handleDeleteMessage = (messageid) =>{
        this.props.DeletMessage(messageid)
    }

    handleSetMessage = (messageid, messagetopublish) =>{
        this.props.SetMessage(messageid, messagetopublish)
    }

    handleFollowDelete = () =>{
        if(this.props.AddDeleteFriendSt === "Ajouter"){
            this.props.AddFriend(this.props.TheProfilInfos.Login )
        }else{
            this.props.DeleteFriend(this.props.TheProfilInfos.Login)
        }
        
    }

    handleFilter = (value) =>{
        this.props.SetFilter(value)
    }

    handleVisitProfile = (param) =>{
       
        this.props.goVisitProfile(param)
        
    }


    Disconnect = () =>{
        this.props.Disconnect()
    }
    
    render=()=>{
        console.log(this.props.TheProfilFollowers[0])
        if(this.props.TheProfilInfos.Login !== this.props.TheUserInfos.Login){
            this.state.FollowBtnState = "FollowBtnDisplay"
        }

        return <div className = "alln">
        
        <div className = "NavigationPannelProfil">
            <NavigationPannel change = {false} Disconnect = {this.Disconnect} />
        </div>
        
        <div className = "ProfilePage">
            <div className = "ProfileInfos" >
                <div className = "UserTweets">

                    <div className = "GoToMainPage">
                        <img src = {Arrow} alt = "arrow" onClick = {() => {this.props.goToMainPage(this.props.TheUserInfos)}}></img>
                    </div>

                    <div className = "UserProfileInfos">
                        <p id ="UsernameProfile" >{this.props.TheProfilInfos.Prenom + " " + this.props.TheProfilInfos.Nom } </p>
                        <p id = "NbTweets">{this.props.TheProfilMessages.length} Tweets</p>
                    </div>
                    
                </div>

                <div className = "BackGroundProfileImg">
                    <img src = {BackImg} id = "BackGImg"></img>
                    <img src = {ProfileImg} id = "ProfileImg"></img>
                    
                </div>
            
                <div className = {this.state.FollowBtnState} >
                    <button   onClick = {this.handleFollowDelete} type = "submit">{this.props.AddDeleteFriendSt}</button>
                </div>

                <div className = "UsernamLink">
                    <p id ="UsernameProfile" >{this.props.TheProfilInfos.Prenom + " " + this.props.TheProfilInfos.Nom }</p>
                    <p id = "UserLink">{"@" + this.props.TheProfilInfos.Login}</p>
                </div>

                <div className = "DateOfJoin">
                    <p >Nous a rejoint {this.props.TheProfilInfos.dateOfJoin}</p>
                </div>


                <div className = "FollowingFollowers">
                    <p id = "Foll">{this.props.TheProfilFollowings.length} abonnés  {this.props.TheProfilFollowers.length} abonnements</p>
                </div>
                
            </div>

            <ListMessages Messages = {this.props.TheProfilMessages} CanDelete = {this.props.TheProfilInfos.Login === this.props.TheUserInfos.Login} DeletMessage = {this.handleDeleteMessage} SetMessage = {this.handleSetMessage} goVisitProfile = {this.handleVisitProfile} />

        </div>

        <div className = "RightComponent">
            <StatsField SetFilter = {this.handleFilter} PersonMostTweeted = {this.props.PersonMostTweeted} PersonMostFollowed = {this.props.PersonMostFollowed} goVisitProfile = {this.handleVisitProfile}/>
            <ListAmis Friends = {this.props.TheProfilFollowers} VistFriend = {this.handleVisitProfile} />
        </div>
    </div>



                 
              
        
    }
}
export default Profile