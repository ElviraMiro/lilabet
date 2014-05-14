Meteor.publish('countries', function() {
  return Countries.find();
});

Countries.allow({
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

Meteor.publish('cities', function() {
  return Cities.find();
});

Cities.allow({
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