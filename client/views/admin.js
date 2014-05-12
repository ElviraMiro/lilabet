Template.admin.rendered = function() {
	$('#admin a:last').tab('show');
}

Template.admin.helpers({
  isAdmin: function() {
  	if (Meteor.user()) {
  		if (Meteor.user().isAdmin) {
  			return true;
  		}
  	}
    return false;
  }
});

Template.admin.events({
  'click button': function(event, template) {
    Session.set('myAppVariable', Math.floor(Math.random() * 11));
  }
});