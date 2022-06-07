import React, { Component } from 'react';
import './Inscription.css';
import logo from "./Birdy_logo_min.png";
import MainPage from './MainPage'


var axios = require('axios')

class Inscription extends Component{
    constructor(props){
        super(props)
        this.state = {

            NameClass : '',
            PrenomClass : '',
            PasswordClass : "",
            LoginClass:"",
            
            NameLabel : "LabelOk" ,
            PrenomLabel : "LabelOk",
            PasswordLabel : "LabelOk",
            PasswordConfLabel : "LabelOk",
            LoginLabel : "LabelOk",
            

            NameLabelMess : "" ,
            PrenomLabelMess : "",
            PasswordLabelMess : "",
            PasswordConfLabelMess : "",
            LoginLabelMess : "",
            
            Nom : '',
            Prenom: '',
            Login : '',
            password : '',
            passwordConf : ''
            

        };
        this.myRef = React.createRef();
        this.handleNom = this.handleNom.bind(this);
    }

    handleNom(event){
      
        this.setState({NameClass : ""})
        this.setState({NameLabel : "LabelOk"})
        this.setState({Nom : event.target.value})
        
    }

   
    handlePrenom = (event) =>{
        
        this.setState({PrenomClass : ""})
        this.setState({PrenomLabel : "LabelOk"})
        this.setState({Prenom : event.target.value})
       
    }

    handleLogin = (event) =>{
        this.setState({LoginClass : ""})
        this.setState({LoginLabel : "LabelOk"})
        this.setState({Login : event.target.value})
    }

    handlePassword = (event) =>{
      
        this.setState({password_class : ""})
        this.setState({PasswordLabel : "LabelOk"})
        this.setState({password : event.target.value})
    }

    handleConfirmPassword = (event) =>{
        this.setState({passwordConf : event.target.value}) 
        this.setState({confirmpass_class : ""})
        this.setState({PasswordConfLabel : "LabelOk"})
     
        
    }

    handleButton = (event) =>{
        var CanIPost = true
        if(this.state.Nom === ''){
            this.setState({NameClass : "field_error"})
            this.setState({NameLabel : "LabelErr"})
            this.setState({NameLabelMess : "Nom non renseigné"})
            CanIPost = false

        }
        
        if(this.state.Prenom == null || this.state.Prenom === ""){
            this.setState({PrenomClass : "field_error"})
            this.setState({PrenomLabel : "LabelErr"})
            this.setState({PrenomLabelMess : " Prénom non renseigné"})
            CanIPost = false
        }

        if(this.state.Login == null || this.state.Login === ""){
            this.setState({LoginClass : "field_error"})
            this.setState({LoginLabel : "LabelErr"})
            this.setState({LoginLabelMess : "Login non renseigné"})
            CanIPost = false
        }

        

        if(this.state.password === ''){
            this.setState({password_class : "field_error"})
            this.setState({PasswordLabel : "LabelErr"})
            this.setState({PasswordLabelMess: "mot de passe non renseigné"})
            CanIPost = false
           
        }

        if(this.state.password.length <= 5){
            this.setState({password_class : "field_error"})
            this.setState({PasswordLabel : "LabelErr"})
            this.setState({PasswordLabelMess: "taille du mot de passe doit etre au minimum 6"})
            CanIPost = false
        }


        if(this.state.passwordConf !== this.state.password){
            this.setState({confirmpass_class : "field_error"})
            this.setState({PasswordConfLabel : "LabelErr"})
            this.setState({PasswordConfLabelMess: "les deux mots de passe ne sont pas identiques"})

            CanIPost = false;
        }
            
        if(CanIPost){
            let date = new Date()
            var thedate =  (date.getMonth()+1) + ' ' +date.getFullYear()
            axios.post("http://localhost:4000/apiuser/user",{Nom : this.state.Nom , Prenom : this.state.Prenom, Login : this.state.Login ,  password : this.state.password, dateOfJoin : thedate}).then(
                (res) =>{
                    console.dir(res)
                    
                }
            ).catch(
                (res) =>{
                    console.dir(res.response);

                    if(res.response.data.status === 401){
                        this.setState({LoginClass : "field_error"})
                        this.setState({LoginLabelMess : res.response.data.message})
                        this.setState({LoginLabel : "LabelErr"})
                    }
                    

                }
            )

        }
    }
        


    render = () => {
    
        return (
        <div className = "allIns">

        
        <div className="title">Birdy
            <img src= {logo} alt="Birdy_logo_min" height="24"></img>
        </div>
            
        <div className = "Inscription">
            <div className = "user-details">
                <div className = "register-message">
                    <p>Créer un compte</p>
                </div>

                <div className = "register-message-desc">
                    <p>C'est rapide et facile.</p>
                </div>
                
                <hr></hr>
                
                <div className="input-box">
                    <input type = "text"  placeholder = "Nom"  className = {this.state.NameClass} onChange = {this.handleNom} ref = {this.myRef} ></input>
                    <span className = {this.state.NameLabel}>{this.state.NameLabelMess}</span>
                </div>

                <div className="input-box">
                    <input type = "text"  placeholder = "Prénom"  className = {this.state.PrenomClass} onChange = {this.handlePrenom} ref = {this.myRef} ></input>
                    <span className = {this.state.PrenomLabel}>{this.state.PrenomLabelMess}</span>
                </div>
                        
                <div className="input-box">
                    <input type = "Prenom"  placeholder = "login"   className = {this.state.LoginClass} onChange = {this.handleLogin} ref = {this.myRef} ></input>
                    <span className = {this.state.LoginLabel}>{this.state.LoginLabelMess}</span>

                </div>
                
                <div className="input-box">
                    <input type = "password"  placeholder = "Mot de passe"  className = {this.state.password_class} onChange = {this.handlePassword} ref = {this.myRef} ></input>
                    <span className = {this.state.PasswordLabel}>{this.state.PasswordLabelMess}</span>

                </div>

                <div className="input-box">
                    <input type = "password"  placeholder = "Confirmer mot de passe"  className = {this.state.confirmpass_class} onChange = {this.handleConfirmPassword} ref = {this.myRef} ></input>
                    <span className = {this.state.PasswordConfLabel}>{this.state.PasswordConfLabelMess}</span>

                </div>
                
                <div className = "button">
                    
               <button type = "submit"   onClick = {this.handleButton}>S'inscrire</button>
                
                </div>  

                <div className= "LinkToInscription">
                <p> Vous avez déja un compte ? <a onClick = {() => this.props.goToConnect()} > Connectez-vous ici </a> </p>
                </div>
                
            </div>
    
        </div>
    
    </div>
    )}
}

export default Inscription;
