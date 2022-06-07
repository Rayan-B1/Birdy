import React, { Component } from 'react';
import './TweetBox.css'
import addimage from "./addimage.png"
import send from "./send.png"
import publicimg from "./globe.png"
import Icfriends from "./Icfriends.png"



class TweetBox extends Component{
    constructor(props){

        super(props);
        
        this.state = {
            publishBtnClass  : 'publishBtnDisabled',
            buttonState:true,
            postValue : "",
            Switch : "false"
        }
    }

    
    transformDate(param){
        console.log(param)
        if(param.toString().length === 1){
            return '0'+ param;
        }

        return param
    }

    handleSubmit = () =>{
        if(this.state.postValue != null  && this.state.postValue !== '' ){
            let date = new Date()
            
            var thedate = date.getFullYear() + '/' + this.transformDate(date.getMonth()+1) + '/'+ this.transformDate(date.getDate())+' '+this.transformDate(date.getHours())+':'+this.transformDate(date.getMinutes())+':'+this.transformDate(date.getSeconds())
            
            document.getElementById("textArea").innerHTML = '';
            this.setState({postValue : ''});
            this.setState({publishBtnClass : 'publishBtnDisabled'});
            this.setState({buttonState : true});
        
        }

            //le axios
        let message = {Login : this.props.TheUserInfos.Login , messagetopublish : this.state.postValue , dateofpublication :thedate , imageBase64 :  document.getElementById("none").className}
        this.props.handlePost(message)
                                                    
    

        }
    
    

    handleAddImage = (event) =>{
       
        let base64String  = ''
        var file = document.querySelector(
            'input[type=file]')['files'][0];
        
        
        var reader = new FileReader();
        reader.onloadend =  function () {
        base64String = reader.result.replace("data:", "")
            .replace(/^.+,/, "");

            document.getElementById("none").className = base64String

        
    
           
        }

        reader.readAsDataURL(file)
        
    
    

    }

    handlePlaceHolder = () =>{
        this.setState({postValue : "" })
    }

    handlePost = () =>{
        
        var postVal = document.getElementById("textArea").innerHTML;
        this.setState({postValue : postVal})
      
        
        if(postVal == null || postVal === ''  ){
            this.setState({publishBtnClass : 'publishBtnDisabled'})
            this.setState({buttonState : true})
            
        }else{
            this.setState({publishBtnClass : 'publishBtnEnabled'})
            this.setState({buttonState : false})
        }
        
    }

    handleCheckbox = () =>{
        this.props.SetCheckbox()

    }

    handleVisibility = () =>{
        if(this.props.Switch === "false"){
            return (
                <img src = {Icfriends} onClick = {this.handleCheckbox} ></img>

            )
        }else{
            return (
                <img src = {publicimg} onClick = {this.handleCheckbox} ></img>

            )
        }
    }


    render = () =>{
        
        return(
                <div className = "TweetBox">
                    <div className = "ProfImgTextArea" >

                        <div className = "ProfImgTwtBox">
                            <img src = {require("./pic.png")} alt = "image de profil" ></img>
                        </div>


                        <div id = "textArea" contentEditable = "true" spellCheck = "false"  onInput = {this.handlePost} data-placeholder =  {"Quoi de neuf " + this.props.TheUserInfos.Prenom +" ?"} >


                        </div>


                        
                    </div>

                    
                    <div className = "Pannel">
                        <div className = "PannelIcon">
                            <label for = "file-id">
                                <img src={addimage} ></img>
                                
                                
                            </label>
                            <input  className = "DontRender" id = "file-id" name = "picture" type = "file" onChange = {this.handleAddImage}></input>
                            
                        </div>

                        
                        
                       
                        <div className = "PannelIcon">
                            {this.handleVisibility()}
                           
                        </div>
                        
                        <div className = "PannelIcon">
                            <img src = {send}  disabled = {this.state.buttonState}  onClick = {this.handleSubmit} id = "PublishButton" type = "submit"></img>
                            
                        </div>
                        

                        <p id = "none" className = "none"></p>
                    </div>
                </div>


        )
    }
}

export default TweetBox