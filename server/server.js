Meteor.startup(function () {
	Meteor.users.update({"emails.address": "karashistka@yandex.ru"}, {$set: {isAdmin: true}});
	Meteor.users.update({"emails.address": "yarotska@ya.ru"}, {$set: {isAdmin: true}});
});