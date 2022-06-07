import React, { Component } from 'react';
import './Connexion.css';
import logo from "./Birdy_logo_min.png";
import axios from 'axios'

class Connexion extends Component{
    constructor(props){
        super(props)
        this.state = {
            LoginClass : "",
            PasswordClass : "",

            LoginLabel : "LabelOk",
            PasswordLabel : "LabelOk",

            LoginLabelMess : "",
            PasswordLabelMess : "",

            Login: '',
            password: ''
        }
        
    }

    handleLogin = (event) =>{

        this.setState({LoginClass : ""})
        this.setState({LoginLabel : "LabelOk"})
        this.setState({Login : event.target.value})

        
       
    }

    handlePassword = (event) =>{
       
        this.setState({PasswordClass : ""})
        this.setState({PasswordLabel : "LabelOk"})
        this.setState({password : event.target.value})
    }

    handleButton = (event) =>{
        var ICanPost = true;
        if(this.state.Login === ''){
            this.setState({LoginClass : "field_error"})
            this.setState({LoginLabel : "LabelErr"})
            this.setState({LoginLabelMess : "email ou nom d'utilisateur non renseigné"})
            ICanPost = false

        }

        if(this.state.password == null || this.state.password === ''){
            this.setState({PasswordClass : "field_error"})
            this.setState({PasswordLabel : "LabelErr"})
            this.setState({PasswordLabelMess: "mot de passe non renseigné"})
            ICanPost = false
           
        }
        
        if(ICanPost){
            axios.post("http://localhost:4000/apiuser/user/login",{Login : this.state.Login , password : this.state.password}).then(

                (res) =>{
                   
                    this.props.goToMainPage(res.data.message);
                    console.dir(res.data.message)
                   
                }
                ).catch(
                    
                    (res) =>{
                        console.dir(res.response)
                        
                        if(res.response.data.status === 401){
                            this.setState({LoginClass : "field_error"})
                            this.setState({LoginLabel : "LabelErr"})
                            this.setState({LoginLabelMess : res.response.data.message})
                        }
            
                        if(res.response.data.status === 403){
                            this.setState({PasswordClass : "field_error"})
                            this.setState({PasswordLabel : "LabelErr"})
                            this.setState({PasswordLabelMess : "mot de passe incorrect , veuillez réessayer"})
                        }
                        
                 })
                

        }
       
        
        
    }

    render(){
        return ( 
        <div className= "allCon">
        
            <div className = "title">Birdy
                <img src = {logo} alt="logo" height = "24" ></img>
            </div>
        
        <div className = "Connexion">
            <div className = "infos-user">
                <div className = "signin-message">
                    <p>Se connecter</p>
                </div>

                <div className="input-box">
                    <input type = "text" type = "text"  placeholder = "login" className = {this.state.LoginClass} onChange = {this.handleLogin} ></input><br></br>
                    <span className = {this.state.LoginLabel}>{this.state.LoginLabelMess}</span>

                </div>    

                <div className="input-box">
                    <input type = "password"  placeholder = "Mot de passe" className = {this.state.PasswordClass} onChange = {this.handlePassword}></input><br></br>
                    <span className = {this.state.PasswordLabel}>{this.state.PasswordLabelMess}</span>

                </div>

                <div className = "button">
                    <button type = "submit" onClick = {() => this.handleButton()}  >Se Connecter</button>
                </div>
            </div>

            <div className="registerd">
                <p> Pas encore inscrit ? <a onClick = {() => this.props.goToLogin()} > Inscrivez-vous ici </a> </p>
            </div>
    
        </div>
    </div>
    );
    }
}

export default Connexion