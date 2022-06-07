class Messages{

    constructor(db){
        this.db = db;
    }

    createMessage(login,messagetopublish, dateofpublication , imageBase64,TweetsNumber ) {
      
      return new Promise((resolve, reject) => {

            
        this.db.messages.insert({Login : login ,messagetopublish : messagetopublish, dateOfPublication : dateofpublication , imageBase64 : imageBase64, TweetsNumber : TweetsNumber.length+1 },(err,docs)=>{
      
          if(err){
            reject(false);
          }else{
            resolve(docs[0]);
          }
        });
          
     

        
      })
    }

    getListMessage(){
      return new Promise((resolve, reject)=>{
        this.db.messages
        .find({})
        .sort({dateOfPublication : 1})
        .exec( (err,docs)=>{
          if(err){
            reject(false);
          }else{
            resolve(docs.reverse());
          }
        });
      })
    }

    getPersonMostTweeted(){
      return new Promise((resolve, reject)=>{
        this.db.messages
        .find({})
        .sort({TweetsNumber : 1})
        .exec( (err,docs)=>{
          if(err){
            reject(false);
          }else{
            resolve(docs.reverse()[0].Login);
          }
        });
      })
    }

    getListMessageUser(login){
      return new Promise((resolve, reject)=>{
        this.db.messages
        .find({Login : login})
        .sort({dateOfPublication : 1})
        .exec((err,docs)=>{
          if(err){
            reject(false);
          }else{
            resolve(docs.reverse());
          }
        });
      })
    }

    deleteMessage(login, message_id){
      return new Promise((resolve, reject)=>{
        this.db.messages.remove({Login : login, _id : message_id}, (err, docs)=>{
          if(err){
            reject(false);
          }else{
            console.log(docs)
            resolve(true);
          }
        });
      })
    }

    setMessage(login, message_id, messagetopublish, dateofpublication){
      return new Promise((resolve, reject)=>{
        this.db.messages.update({Login : login, _id : message_id}, {$set:{messagetopublish : messagetopublish, dateOfPublication : dateofpublication}}, (err, docs)=>{
          if(err){
            reject(false);
          }else{
            resolve(docs[0]);
          }
        });
      })
    }
}


exports.default = Messages;
