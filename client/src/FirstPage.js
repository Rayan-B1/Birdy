import React, { Component } from 'react';
import './FirstPage.css';


class FirstPage extends Component{
    constructor(props){

        super(props);
        this.state = {
            
        }
    }


    render(){
        
        return( 
        
        
        <section>
        <p>{this.props.page}</p>
        
        <div className = "bg_image"></div>
        <div className = "informations"> 
            <div className = "logo_img"></div>
            <div className = "welcome_msg">
                <p>Ça se passe ici<br></br>maintenant</p>
            </div>

            <div className = "join_us">
                <p>Rejoignez nous dès aujourd'hui.</p>
            </div>
            
            
            <div className = "register_button">
                <input type = "submit"  value = "Inscris toi ici" onClick = {() => this.props.goToLogin()} ></input>
                
            </div>
        

            <div className = "already_registerd"><p>Vous avez dèja un compte ?</p></div>

        
            <div className = "login_button">
                <input type = "submit"  value = "Se connecter" onClick = {() => this.props.goToConnect()}></input>
            </div>

            
            
            </div>
            
        </section>
        
        )
    };
    
}




export default FirstPage;