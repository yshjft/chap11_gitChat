const mongoose =require('mongoose');

const {Schema}=mongoose;
const chatSchema=new Schema({
  room : {//채팅방 ID
    type: ObjectId, //Room 컬렉션의 ObejctId
    required : true,
    ref:'Room'
  },
  user : {
    type: String,
    required : true,
  },
  chat: String,
  gif: String,
  createdAt : {
    type: Date,
    default :Date.now,
  },
});

module.exports=mongoose('Chat', chatSchema);