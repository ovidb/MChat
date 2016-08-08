///
// helper functions
///
Template.available_user_list.helpers({
    users: function() {
        return Meteor.users.find();
    }
})
Template.available_user.helpers({
    getUsername: function(userId) {
        user = Meteor.users.findOne({
            _id: userId
        });
        return user.profile.username;
    },
    isMyUser: function(userId) {
        if (userId == Meteor.userId()) {
            return true;
        } else {
            return false;
        }
    }
});

Template.chat_message.helpers({
  isMyUser: function(userId) {
      if (userId == Meteor.userId()) {
          return true;
      } else {
          return false;
      }
  },
  getProfilePicture: function(userId) {
    user = Meteor.users.findOne({
      _id: userId
    });
    if(!user) {return;} // no user giving up
    return user.profile.avatar;
  },
  getOtherUsername: function(userId) {
    user = Meteor.users.findOne({
        _id: userId
    });
    if(!user) {return; } //no user giving up
    return user.profile.username;
  },
});

Template.chat_page.helpers({
    messages: function() {
        var chat = Chats.findOne({
            _id: Session.get("chatId")
        });
        return chat.messages;
    },
    other_user: function() {
        return ""
    },
});

Template.chat_page.events({
    // this event fires when the user sends a message on the chat page
    'submit .js-send-chat': function(event) {
        // stop the form from triggering a page reload
        event.preventDefault();
        chatId = Session.get("chatId");
        var message = {};
        message.from = Meteor.userId();
        message.text = event.target.chat.value;
        Meteor.call("updateChat", chatId, message, function(err,res) {
          if(err) {
            console.log("js-send-chat evnet err" + err);
          } else {
            event.target.chat.value = "";
          }
        });
    }
});
