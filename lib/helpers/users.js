isUserAdmin = function(uid) {
	var user = Meteor.users.findOne(uid);
	if (user && user.isAdmin) {
		return true;
	} else {
		return false;
	}
};