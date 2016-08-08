Meteor.startup(function () {
  if (!Meteor.users.findOne()){
    for (var i=1;i<9;i++){
      var email = "user"+i+"@test.com";
      var username = "user"+i;
      var avatar = "ava"+i+".png"
      console.log("creating a user with password 'test123' and username/ email: "+email);
      Meteor.users.insert({profile:{username:username, avatar:avatar}, emails:[{address:email}],services:{ password:{"bcrypt" : "$2a$10$I3erQ084OiyILTv8ybtQ4ON6wusgPbMZ6.P33zzSDei.BbDL.Q4EO"}}});
    }
  }
});

Meteor.publish("chatByOtherUserId", function(otherUserId) {
  // find a chat that has two users that match current user id
  // and the requested user id
  var filter = {$or:[
              {user1Id:this.userId, user2Id:otherUserId},
              {user2Id:this.userId, user1Id:otherUserId}
              ]};
  var chat = Chats.findOne(filter);
  if (!chat){// no chat matching the filter - need to insert a new one
    chatId = Chats.insert({user1Id:this.userId, user2Id:otherUserId});
  }
  else {// there is a chat going already - use that.
    chatId = chat._id;
  }
  if (chatId){// looking good, save the id to the session
    return Chats.find({_id:chatId});
  } else {
    console.log("no chat id");
  }
});
Meteor.publish("allUserData", function () {
  return Meteor.users.find({}, {fields: {'profile': 1}});
});
Meteor.publish('emojis', function() {
  // Here you can choose to publish a subset of all emojis
  // if you'd like to.
  return Emojis.find();
});
