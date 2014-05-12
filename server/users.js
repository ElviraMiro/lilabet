Meteor.publish('users', function() {
	return Meteor.users.find({},
		{fields: {'isAdmin': 1,
			'emails': 1}
	});
});
