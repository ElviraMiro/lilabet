Meteor.publish('sports', function() {
  return Sports.find();
});

Sports.allow({
	insert: function(userId, doc) {
		return true;
		var user = Meteor.users.findOne({_id: userId});
		if (user.isAdmin) {
			return true;
		} else {
			return false;
		}
	},
	update: function(userId, doc) {
		return true;
		var user = Meteor.users.findOne({_id: userId});
		if (user.isAdmin) {
			return true;
		} else {
			return false;
		}
	},
	remove: function(userId, doc) {
		return true;
		var user = Meteor.users.findOne({_id: userId});
		if (user.isAdmin) {
			return true;
		} else {
			return false;
		}
	}
});

Meteor.publish('teams', function() {
  return Teams.find();
});

Teams.allow({
	insert: function(userId, doc) {
		return true;
		var user = Meteor.users.findOne({_id: userId});
		if (user.isAdmin) {
			return true;
		} else {
			return false;
		}
	},
	update: function(userId, doc) {
		return true;
		var user = Meteor.users.findOne({_id: userId});
		if (user.isAdmin) {
			return true;
		} else {
			return false;
		}
	},
	remove: function(userId, doc) {
		return true;
		var user = Meteor.users.findOne({_id: userId});
		if (user.isAdmin) {
			return true;
		} else {
			return false;
		}
	}
});