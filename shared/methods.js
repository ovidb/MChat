Meteor.methods({
	updateChat:function(chatId, message) {
		// see if we can find a chat object in the database
		// to which we'll add the message
		var chat = Chats.findOne({
				_id: chatId
		});
		if (chat) { // ok - we have a chat to use
				var msgs = chat.messages; // pull the messages property
				if (!msgs) { // no messages yet, create a new array
						msgs = [];
				}
				// is a good idea to insert data straight from the form
				// (i.e. the user) into the database?? certainly not.
				// push adds the message to the end of the array
				msgs.push(message);
				// put the messages array onto the chat object
				chat.messages = msgs;
				// update the chat object in the database.
				Chats.update(chat._id, chat);
		}
	}
});
