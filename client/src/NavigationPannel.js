import React, { Component } from 'react';
import app_log from "./Birdy_logo_main.png";
import search_bar_logo from "./loupe.png"
import "./NavigationPannel.css"
import NavigationPannelOption from "./NavigationPannelOption"
import ProfilDefaultImg from "./profil.png"
import MesaggesImg from "./message.png"
import FreindsImg from "./friends.png"
import SuggestionsImg from "./suggestion.png"
import CadenasImg from "./cadenas.png"



class NavigationPannel extends Component{
    constructor(props){
        super(props)
    }

    setProfil = () =>{
        if(this.props.change){
            this.props.goToProfil();
        }
        
    }


    Disconnect = () =>{
        this.props.Disconnect()
    }
    render = () =>{
        return(
        <div className = "externeAdd">
            <div className = "NavigationPannel">
                <nav>
                    <ul>
                        <li>
                            <div className = "nameLogo" >
                                <img src = {app_log} alt = "logo"></img>
                            </div>
                        </li>
                        
                    
                        <li>
                            <NavigationPannelOption text = "Profile" goToProfil = {this.setProfil} icone = {ProfilDefaultImg} />
                        </li>


                        <li>
                            <NavigationPannelOption text = "Deconnexion" Disconnect = {this.Disconnect} icone = {CadenasImg}   />
                        </li>
                        
                    </ul>


                </nav>
            </div>
        </div>

        )
    }
}


export default NavigationPannel