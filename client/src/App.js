import React, { Component } from 'react';
import FirstPage from './FirstPage';
import Connexion from './Connexion';
import Inscription from './Inscription'
import MainPage from './MainPage'
import Profil from './Profil';


import axios from 'axios'

class App extends Component {

  constructor(props){
    super(props)
    this.state = {
      currentPage : "FirstPage",
      userInfos : '',
      profilInfos : '',
      profliMessages : '',
      allMessages : [],
      MessagesUser : [],
      profilFollowers : [],
      profilFollowings : [],
      AddDeleteFriend : "Ajouter",
      Switch : "false",
      PersonMostTweeted : "",
      PersonMostFollowed : ""                
    }

    

      
    
  }

  setInscription = () =>{
    this.setState({currentPage : "Inscription"})
  }

  setConnexion = () =>{
    this.setState({currentPage : "Connexion"})
  }

  setInfos = (userInfos) =>{
    axios.get("http://localhost:4000/apifriend/user/" + this.state.userInfos.Login + "/friends",{}).then(
                (res)=>{
                  axios.get("http://localhost:4000/apimessage/messages/" + this.state.userInfos.Login,{Login : this.state.userInfos.Login}).then(
                      (res)=>{

                        axios.get("http://localhost:4000/apimessage/messages",{}).then(
                          (res1)=>{
                            this.setState({allMessages : res1.data})
              

                              axios.get("http://localhost:4000/apimessage/MostTweeted",{}).then(
                              (res2)=>{

                                  axios.get("http://localhost:4000/apifriend/MostFollowed",{}).then(
                                    (res3)=>{
                                      this.setState({PersonMostFollowed : res3.data})
                                      this.setState({allMessages : res1.data})
                                      this.setState({PersonMostTweeted : res2.data})
                                      this.setState({profilFollowers : res.data})
                                      this.setState({currentPage : "MainPage"})
                                      this.setState({userInfos : userInfos})
                                      this.setState({profilInfos : userInfos})
                                      this.setState({MessagesUser : res.data})
                                      this.setState({profliMessages : res.data})
                                      this.setState({Switch : "false"})
                                    }
                                  ).catch(
                                      (res3)=>{
                                          console.dir(res3.response)
                                      })
                                  
                                  
                              }
                          ).catch(
                              (res2)=>{
                                  console.dir(res2.response)
                              })
                
                      }
                  ).catch(
                      (res)=>{
                          console.dir(res.response)
                      })

                      

                  }
              ).catch(
                  (res)=>{
                      console.dir(res)
                  })


                  
      })

      .catch(
        (res)=>{
            console.dir(res)
        })
    

  }

  setMainPage = () =>{
    axios.get("http://localhost:4000/apimessage/messages",{}).then(
            (res)=>{
              this.setState({currentPage : "MainPage"})
              this.setState({allMessages : res.data})
              this.setState({Switch : "false"})
                
            }
        ).catch(
            (res)=>{
                console.dir(res.response)
            })
    
    
  }

  setProfil = () =>{
   
      axios.get("http://localhost:4000/apifriend/user/" + this.state.userInfos.Login + "/friends",{}).then(
          (res)=>{
            
            axios.get("http://localhost:4000/apifriend/user/" + this.state.userInfos.Login + "/followings",{}).then(
                  (followings)=>{
                    
                    axios.get("http://localhost:4000/apimessage/messages/" + this.state.userInfos.Login,{Login :this.state.userInfos.Login}).then(
                      (profliMessages)=>{
                            
                        let profilFollowers = []
                        if(res.data.length === 0){
                            this.setState({profilInfos : this.state.profilInfos})
                            this.setState({profliMessages : profliMessages.data})
                            this.setState({currentPage : "Profil"})
                            this.setState({profilFollowers : []})
                            this.setState({profilFollowings : followings.data})

                            if(this.state.profilFollowings.some(e => e.userid === this.state.userInfos.Login)){
                              this.setState({AddDeleteFriend : "retirer"})
                            }else{
                              this.setState({AddDeleteFriend : "Ajouter"})
                            }
                            
                        }else{
                          let i = 0;
                        for(i = 0;i < res.data.length; i++){
                          axios.get("http://localhost:4000/apiuser/user/"+ res.data[i].friend,{})
                          .then((FriendInfos) =>{
                            profilFollowers.push(FriendInfos.data)
                           
                            this.setState({profilInfos : this.state.profilInfos})
                            this.setState({profliMessages : profliMessages.data})
                            this.setState({currentPage : "Profil"})
                            this.setState({profilFollowers : profilFollowers})
                            this.setState({profilFollowings : followings.data})

                            if(this.state.profilFollowings.some(e => e.userid === this.state.userInfos.Login)){
                              this.setState({AddDeleteFriend : "retirer"})
                            }else{
                              this.setState({AddDeleteFriend : "Ajouter"})
                            }
                            

                          })

                          .catch((FriendInfos) =>{
                            console.log(FriendInfos)
                          })

                        }
                        }
                        

                        
                        
                          
                          ///////////////////////////////////
                          }
                      ).catch(
                          (profliMessages)=>{
                              console.dir(profliMessages)
                          })
                                       

                  })

                  .catch(
                    (followings)=>{
                        console.dir(followings)
                    })            
                    
                    
        })

        .catch(
          (res)=>{
              console.dir(res)
          })
  
      
    
   
  }

  setVisitProfile = (profilLogin) =>{
    axios.get("http://localhost:4000/apiuser/user/"+ profilLogin,{Login : profilLogin}).then(

      (profilInfos) =>{
        axios.get("http://localhost:4000/apifriend/user/" + profilLogin + "/friends",{}).then(
          (res)=>{
            
            axios.get("http://localhost:4000/apifriend/user/" + profilLogin + "/followings",{}).then(
                  (followings)=>{
                    
                    axios.get("http://localhost:4000/apimessage/messages/" + profilLogin,{Login :profilLogin}).then(
                      (profliMessages)=>{
                            
                            let profilFollowers = []
                            if(res.data.length === 0){
                                this.setState({profilInfos : profilInfos.data})
                                this.setState({profliMessages : profliMessages.data})
                                this.setState({currentPage : "Profil"})
                                this.setState({profilFollowers : []})
                                this.setState({profilFollowings : followings.data})

                                if(this.state.profilFollowings.some(e => e.userid === this.state.userInfos.Login)){
                                  this.setState({AddDeleteFriend : "retirer"})
                                }else{
                                  this.setState({AddDeleteFriend : "Ajouter"})
                                }
                                
                            }else{
                              let i = 0;
                            for(i = 0;i < res.data.length; i++){
                              axios.get("http://localhost:4000/apiuser/user/"+ res.data[i].friend,{})
                              .then((FriendInfos) =>{
                                profilFollowers.push(FriendInfos.data)
                               
                                this.setState({profilInfos : profilInfos.data})
                                this.setState({profliMessages : profliMessages.data})
                                this.setState({currentPage : "Profil"})
                                this.setState({profilFollowers : profilFollowers})
                                this.setState({profilFollowings : followings.data})

                                if(this.state.profilFollowings.some(e => e.userid === this.state.userInfos.Login)){
                                  this.setState({AddDeleteFriend : "retirer"})
                                }else{
                                  this.setState({AddDeleteFriend : "Ajouter"})
                                }
                                

                              })

                              .catch((FriendInfos) =>{
                                console.log(FriendInfos)
                              })

                            }
                            }
                            

                            
                            
            
                          }
                      ).catch(
                          (profliMessages)=>{
                              console.dir(profliMessages)
                          })
                                       

                  })

                  .catch(
                    (followings)=>{
                        console.dir(followings)
                    })            
                    
                    
        })

        .catch(
          (res)=>{
              console.dir(res)
          })
                  
                  
    }
    ).catch(
        (profilInfos)=>{
            console.dir(profilInfos)
        })

     
      
  }
  
  handleDeleteMessage = (messageid) =>{
    axios.delete("http://localhost:4000/apimessage/messages/" + this.state.userInfos.Login,{data: {messageid : messageid}}).then(
            (res)=>{
                
              axios.get("http://localhost:4000/apimessage/messages/" + this.state.userInfos.Login).then(
                (profliMessages)=>{
    
                            this.setState({profliMessages : profliMessages.data})
                               
                }
            ).catch(
                (profliMessages)=>{
                    console.dir(profliMessages)
                })

                
                
            }
        ).catch(
            (res)=>{
                console.dir(res)
            })
  }

  transformDate(param){
    console.log(param)
    if(param.toString().length === 1){
        return '0'+ param;
    }

    return param
  }

  handleSetMessage = (messageid, messagetopublish) =>{
    let date = new Date()
    var thedate = date.getFullYear() + '/' + this.transformDate(date.getMonth()+1) + '/'+ this.transformDate(date.getDate())+' '+this.transformDate(date.getHours())+':'+this.transformDate(date.getMinutes())+':'+this.transformDate(date.getSeconds())
    axios.put("http://localhost:4000/apimessage/messages/" + this.state.userInfos.Login, {messageid : messageid, messagetopublish : messagetopublish, dateofpublication : thedate}).then(
      (res)=>{

        axios.get("http://localhost:4000/apimessage/messages/" + this.state.userInfos.Login).then(
                (profliMessages)=>{
    
                            this.setState({profliMessages : profliMessages.data})
                               
                }
            ).catch(
                (profliMessages)=>{
                    console.dir(profliMessages)
                })
      }
    ).catch(
      (res)=>{
        console.dir(res)
      }
    )
  }
  
  handleAddFriend = (LoginFriend) =>{
    axios.post("http://localhost:4000/apifriend/user/" + this.state.userInfos.Login + "/friends",{LoginFriend : LoginFriend}).
        then((res) =>{
          
              axios.get("http://localhost:4000/apifriend/user/" + LoginFriend + "/followings",{}).then(
                  (followings)=>{
                    
                    this.setState({profilFollowings : followings.data})
                    this.setState({AddDeleteFriend : "retirer"})
                    

                  })

                  .catch(
                    (followings)=>{
                        console.dir(followings)
                    })

          }
          )

        .catch ((res) =>{
          console.dir(res)

        })
  }


  handleDeleteFriend = (LoginFriend) =>{
    axios.delete("http://localhost:4000/apifriend/user/" + this.state.userInfos.Login + "/friends",{data: {LoginFriend : LoginFriend}}).then(
      (res) =>{

        axios.get("http://localhost:4000/apifriend/user/" + LoginFriend + "/followings",{}).then(
          (followings)=>{
            
            this.setState({profilFollowings : followings.data})
            this.setState({AddDeleteFriend : "Ajouter"})
            

          })

          .catch(
            (followings)=>{
                console.dir(followings)
            })

          
      }
    ).catch ( (res) =>{
      console.log(res)
    })
  }


  handlePost = (message) =>{
    axios.post("http://localhost:4000/apimessage/messages/" + this.state.userInfos.Login,{Login : message.Login, messagetopublish : message.messagetopublish , dateofpublication : message.dateofpublication , imageBase64 : message.imageBase64}).then(
            (res) =>{
                  axios.get("http://localhost:4000/apimessage/messages",{}).then(
                    (res)=>{
                        this.setState({allMessages : res.data})
                        
                    }
                  ).catch(
                    (res)=>{
                        console.dir(res.response)
                    })
               
            }
        ).catch(
            (res) =>{
                console.dir(res);

            })
  }


  handleFilterMainPage = (value) =>{
    if(value!==null && value!== ''){
        var temp=[];
        for(let i = 0; i < this.state.allMessages.length; i++){
            if(this.state.allMessages[i].Login.toLowerCase().includes(value.toLowerCase()) || this.state.allMessages[i].messagetopublish.toLowerCase().includes(value.toLowerCase())){
                temp.push(this.state.allMessages[i])
            }
        }
        this.setState({allMessages : temp})
    }else{
      axios.get("http://localhost:4000/apimessage/messages",{}).then(
        (res)=>{
           
            this.setState({allMessages : res.data})
            this.setState({currentPage : "MainPage"})
            
        }
    ).catch(
        (res)=>{
            console.dir(res.response)
        })
    }
}

handleFilterProfil = (value) =>{
  if(value!==null && value!== ''){
      var temp=[];
      for(let i = 0; i < this.state.profliMessages.length; i++){
          if(this.state.profliMessages[i].Login.toLowerCase().includes(value.toLowerCase()) || this.state.profliMessages[i].messagetopublish.toLowerCase().includes(value.toLowerCase())){
              temp.push(this.state.profliMessages[i])
          }
      }
      this.setState({profliMessages : temp})
  }else{
    axios.get("http://localhost:4000/apimessage/messages/" + this.state.profilInfos.Login,{Login :this.state.profilInfos.Login}).then(
      (res)=>{
         
          this.setState({profliMessages : res.data})
          this.setState({currentPage : "Profil"})
          
      }
  ).catch(
      (res)=>{
          console.dir(res.response)
      })
  }
}

handleCheckbox = () =>{
  // import publicimg from "./globe.png"
  // import Icfriends from "./Icfriends.png"
  if(this.state.Switch === "true"){

    axios.get("http://localhost:4000/apimessage/messages",{}).then(
            (res)=>{
                console.dir(res)
                this.setState({allMessages : res.data})
                this.setState({Switch : "false"})
                
            }
        ).catch(
            (res)=>{
                console.dir(res.response)
            })
    
    
}
else{
    axios.get("http://localhost:4000/apifriend/user/"+this.state.userInfos.Login+"/friends",{}).then(
        (res)=>{
            let friends = res.data
            var tempo = []
            let temp = []
            for(let i = 0; i < friends.length; i++){
                axios.get("http://localhost:4000/apimessage/messages/"+ friends[i].friend,{}).then(
                    (follow)=>{
                        tempo = (follow.data)
                        temp = temp.concat(tempo)
                        this.setState({allMessages : temp})
                        this.setState({Switch : "true"})

                    }
                ).catch(
                    (follow)=>{
                        console.dir(follow.response)
                })
            }
            this.setState({MessagesFollow : []})
        }
        ).catch(
            (res)=>{
                console.dir(res.response)
            })
  }
}


Disconnect = () =>{
  axios.delete("http://localhost:4000/apiuser/user/" + this.state.userInfos.Login + "/logout",{}).then(
            (res)=>{
            }
        ).catch(
            (res)=>{
              this.setState({currentPage : "FirstPage"})
            })
}





  render(){

    
    if(this.state.currentPage === "FirstPage"){
      return (
        
          <FirstPage goToLogin = {this.setInscription} goToConnect = {this.setConnexion}   />
        );
      }
    
      if(this.state.currentPage === "Inscription"){
        return (
         
            <Inscription goToConnect = {this.setConnexion}/>
          );
        }

        if(this.state.currentPage === "Connexion"){
          return (
           
              <Connexion  goToLogin = {this.setInscription} goToMainPage = {this.setInfos} />
            );
          }

          if(this.state.currentPage === "MainPage"){
            
            return (
                
                <MainPage SetCheckbox = {this.handleCheckbox} goToProfil = {this.setProfil} TheUserInfos = {this.state.userInfos} goVisitProfile = {this.setVisitProfile} allMessages = {this.state.allMessages} handlePost = {this.handlePost} SetFilter = {this.handleFilterMainPage} Switch = {this.state.Switch}  Disconnect = {this.Disconnect} PersonMostTweeted = {this.state.PersonMostTweeted} PersonMostFollowed = {this.state.PersonMostFollowed}/>
              );
            }

            if(this.state.currentPage === "Profil"){
              return (
               
                  <Profil PersonMostTweeted = {this.state.PersonMostTweeted} PersonMostFollowed = {this.state.PersonMostFollowed} goToMainPage = {this.setMainPage} goVisitProfile = {this.setVisitProfile} TheUserInfos = {this.state.userInfos} TheProfilInfos = {this.state.profilInfos} UserMessages = {this.state.MessagesUser} TheProfilMessages = {this.state.profliMessages}  DeletMessage = {this.handleDeleteMessage} SetMessage = {this.handleSetMessage} AddFriend = {this.handleAddFriend} DeleteFriend = {this.handleDeleteFriend} TheProfilFollowers = {this.state.profilFollowers} TheProfilFollowings = {this.state.profilFollowings}  AddDeleteFriendSt = {this.state.AddDeleteFriend} SetFilter = {this.handleFilterProfil} Disconnect = {this.Disconnect} />
                );
              }
  }
    
}

export default App;
