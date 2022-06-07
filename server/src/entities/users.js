

class Users {
  constructor(db) {
    this.db = db
   
   
    // suite plus tard avec la BD
  }

  create(Nom, Prenom, Login, password, dateOfJoin) {
    
    return new Promise((resolve, reject) => {
    this.db.users.insert({Nom : Nom ,Prenom : Prenom, Login : Login, password : password, dateOfJoin : dateOfJoin},(err,docs)=>{
     
      if(err){
        reject(false);
      }else{
        
        resolve(Login);
      }
    });

  })
}



  get(userid) {
    
    return new Promise((resolve, reject) => {
      this.db.users.find({Login : userid},{Nom : 1,Prenom : 1,Login : 1 , dateOfJoin : 1, _id : 0},(err,docs)=>{
        if(err){
          reject(false);
        }else{
          resolve(docs[0]);
        }
      });
  
    })
  }

  async exists(login) {

    return new Promise((resolve, reject) => {

      /*si le login existe dans la base de donnees*/
      this.db.users.find({Login : login}  ,(err,docs) => {
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

  checkpassword(login, password) {
    return new Promise((resolve, reject) => {
      this.db.users.find({Login : login, password : password},{Login : 1 , Nom : 1, Prenom : 1,dateOfJoin : 1},(err,docs) =>{
        if(err){
          reject(err);
        }else{
          if(docs.length === 1){
            resolve(docs[0]);
          }else{
            resolve(false);
          }
        }
      })
    })
  }
}

exports.default = Users;

