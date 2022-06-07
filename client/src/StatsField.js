import React, { Component } from 'react';
import "./StatsField.css"
import Loupe from "./loupe.png"
import Croix from "./croix.png"
import idee from "./idee.png"


class StatsField extends Component{
    constructor(props){
        super(props);
        this.state = {
            postValue : "",
            Switch : false,
            ImageSwitch : Loupe,
            ImageClass : "Loupe"
        }
    }

    handleX = () =>{
        this.setState({postValue : ''})
        document.getElementById("search").value = '';
        this.props.SetFilter('')
    }

    handleSubmit = () =>{
        this.props.SetFilter(this.state.postValue)
    }

    handleSearch = () =>{
        if(this.state.Switch === false){
            this.handleSubmit()
            this.setState({ImageSwitch : Croix})
            this.setState({ImageClass : "Croix"})

            this.setState({Switch : true})
        }else{
            this.handleX()
            this.setState({ImageSwitch : Loupe})
            this.setState({ImageClass : "Loupe"})

            this.setState({Switch : false})
        }
    }

    handlePost = (event) =>{
        
        var postVal = event.target.value
        this.setState({postValue : postVal})
    }


    handleVisitProfilMostTweeted = () =>{
        this.props.goVisitProfile(this.props.PersonMostTweeted)
    }

    handleVisitProfilMostFollowed = () =>{
        this.props.goVisitProfile(this.props.PersonMostFollowed)
    }

    render = () =>{

        return (
            <div className = "StatsField">
                <div className = "SearchBar">
                    
                    <input type="text" id="search" placeholder = "Rechercher" onChange = {this.handlePost}></input>
                    
                    <img src = {this.state.ImageSwitch} onClick={this.handleSearch} className = {this.state.ImageClass}></img>

                    
                </div>

                <div className = "Stats">

                    <img src = {idee} ></img>

                    <div className = "PTitle">
                        <p >Sais-tu que</p>
                    </div>
                   
                    <div className = "PStats">
                        <p >la personne ayant le plus de tweets sur le réseau est :   <span className = "MostTweetedPerson" onClick = {this.handleVisitProfilMostTweeted} >@{this.props.PersonMostTweeted} </span></p>

                    </div >

                    <div className = "PStats">
                        <p >la personne ayant le plus d'abonnés sur le réseau est : <span className = "MostFollowedPerson" onClick = {this.handleVisitProfilMostFollowed} >@{this.props.PersonMostFollowed}</span></p>

                    </div>


                </div>
            </div>
        )
        
    }


}

export default StatsField;