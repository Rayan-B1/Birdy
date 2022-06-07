import React, { Component } from 'react';
import "./MainPage.css"
import NavigationPannel from './NavigationPannel'
import TweetBox from './TweetBox'
import ListMessages from "./ListMessages"
import StatsField from "./StatsField"

class MainPage extends Component{
    constructor(props){
        super(props)
        this.state = {

        }
                   
    }

    setProfil = () =>{
        this.props.goToProfil()
    }

    handleVisitProfile = (param) =>{
       
        this.props.goVisitProfile(param)
        
    }

    handlePost =  (message) =>{
        this.props.handlePost(message)

    }

    handleFilter = (value) =>{
        this.props.SetFilter(value)
    }

    
    handleCheckbox = () =>{
        this.props.SetCheckbox()
    }

    handleLike = () =>{
        this.props.SetLike()
    }

    Disconnect = () =>{
        this.props.Disconnect()
    }

    handleClickF5 = () =>{
        document.attachEvent("onkeydown", this.handleRefresh); 

    }

    handleRefresh = (e) =>
        { if ((e.which || e.keyCode) === 116) e.preventDefault(); }    
        


    render = (event) => {

        return (
    <div className = "TheePage">
        {this.handleClickF5}
        {this.handleRefresh}
        <div className = "wall">

        <div className = "LeftComponent">
                <NavigationPannel goToProfil = {this.setProfil} Disconnect = {this.Disconnect}  change = {true} />
         </div>

        <div className ="CenterComponent">
        
            <TweetBox   TheUserInfos = {this.props.TheUserInfos} handlePost = {this.handlePost} SetCheckbox = {this.handleCheckbox} Switch = {this.props.Switch} />
            
            <ListMessages Messages = {this.props.allMessages} goVisitProfile = {this.handleVisitProfile} CanDelete = {false} SetLike = {this.handleLike}  />
        
        </div>

            

        <div className = "RightComponent">
            <StatsField  SetFilter = {this.handleFilter} PersonMostTweeted = {this.props.PersonMostTweeted} PersonMostFollowed = {this.props.PersonMostFollowed} goVisitProfile = {this.handleVisitProfile} />
        </div>


        </div>
    </div>
        )
    }
}

export default MainPage;