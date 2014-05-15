TagSchema = new SimpleSchema({
	title: {
		type: String,
		label: "Title",
		max: 100
	},
	tagType: {
		// 0 - sport, 1 - tournament, 2 - team, 3 - other
		type: Number,
		label: "Tag's type"
	}
});

Tags = new Meteor.Collection("tags", {schema: TagSchema});

Tags.allow({
	insert: function(userId, doc) {
		var user = Meteor.users.findOne(userId);
		if (user && user.isAdmin) {
			return true;
		} else {
			return false;
		}
	},
	update: function(userId, doc, fields, modifier) {
		var user = Meteor.users.findOne(userId);
		if (user && user.isAdmin) {
			return true;
		} else {
			return false;
		}
	},
	remove: function(userId, doc) {
		var user = Meteor.users.findOne(userId);
		if (user && user.isAdmin) {
			return true;
		} else {
			return false;
		}
	}
});

PostSchema = new SimpleSchema({
	title: {
		type: String,
		label: "Title",
		max: 100
	},
	content: {
		type: String,
		label: "Content"
	},
	tags: {
		type: [String],
		label: "Tags"
	},
	gameDate: {
		type: Date,
		label: "Date of Game"
	},
	isTrue: {
		type: Boolean,
		optional: true 
	}
});

Posts = new Meteor.Collection('posts', {schema: PostSchema});

Posts.allow({
	insert: function(userId, doc) {
		var user = Meteor.users.findOne(userId);
		if (user && user.isAdmin) {
			return true;
		} else {
			return false;
		}
	},
	update: function(userId, doc, fields, modifier) {
		var user = Meteor.users.findOne(userId);
		if (user && user.isAdmin) {
			return true;
		} else {
			return false;
		}
	},
	remove: function(userId, doc) {
		var user = Meteor.users.findOne(userId);
		if (user && user.isAdmin) {
			return true;
		} else {
			return false;
		}
	}
});