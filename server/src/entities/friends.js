class Friends {
    constructor(db) {
      this.db = db
    }

    
    createFriend(user_id, login,FollowingsNumber){
        return new Promise((resolve, reject) =>{
            this.db.friends.insert({userid : user_id, friend : login, FollowingsNumber : FollowingsNumber.length+1},(err,docs)=>{
         
                if(err){
                  reject(false);
                }else{
                  resolve(docs[0]);
                }
            });
        })
    }

    getListFriends(user_id){
        return new Promise((resolve, reject)=>{
          this.db.friends.find({userid : user_id},{friend : 1, _id : 0},(err,docs)=>{
            if(err){
              reject(false);
            }else{
              resolve(docs);
            }
          });
        })
      }

    //getListFollowings

    getListFollowings(friend_id){
        return new Promise((resolve, reject)=>{
          this.db.friends.find({friend : friend_id},{userid : 1, _id : 0},(err,docs)=>{
            if(err){
              reject(false);
            }else{
              resolve(docs);
            }
          });
        })
      }
      
    async exists(user_id, login) {
        return new Promise((resolve, reject) => {
          this.db.friends.find({userid : user_id, friend : login},(err,docs) => {
            if(err){
              reject(err);
            }else{
              if(docs.length === 0){
               
                resolve(false);
    
              }else{
                resolve(true);
              }
              
            }
        });
      })
    }

    deleteFriend(login, friend_login){
        
      return new Promise((resolve, reject)=>{
        this.db.friends.remove({userid : login, friend : friend_login}, (err, docs)=>{
          if(err){
              
            reject(false);
          }else{
              
            resolve(true);
          }
        });
      })
    }

    getMostFollowed(){
      
      return new Promise((resolve, reject)=>{
        this.db.friends
        .find({})
        .sort({FollowingsNumber : 1})
        .exec( (err,docs)=>{
          if(err){
            reject(false);
          }else{
            if(docs.length !== 0){
              resolve(docs.reverse());


            }else{
              resolve("personne");

            }
          }
        });
      })
    }

    
}

exports.default = Friends;
