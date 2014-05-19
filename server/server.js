Meteor.startup(function () {
	Meteor.users.update({"emails.address": "karashistka@yandex.ru"}, {$set: {isAdmin: true}});
});