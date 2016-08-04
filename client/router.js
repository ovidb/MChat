// set up the main template the the router will use to build pages
Router.configure({
  layoutTemplate: 'ApplicationLayout'
});
// specify the top level route, the page users see when they arrive at the site
Router.route('/', {
  waitOn: function () {
    // return one handle, a function, or an array
    return Meteor.subscribe('users');
  },
  action:function () {
    console.log("rendering root /");
    this.render("navbar", {to:"header"});
    this.render("lobby_page", {to:"main"});
  },
});

// specify a route that allows the current user to chat to another users
Router.route('/chat/:_id', {

  waitOn: function () {
    // return one handle, a function, or an array
    return Meteor.subscribe('chatByOtherUserId', this.params._id);
  },

  action: function () {
    var chat = Chats.findOne();
    if (chat) {
      Session.set("chatId", chat._id);
    }
    this.render("navbar", {to:"header"});
    this.render("chat_page", {to:"main"});
  }
});
