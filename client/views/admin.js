Session.set("selectedCountryId", null);

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

Template.adminGeographyPanel.helpers({
	'countries': function() {
		return Countries.find({},{sort: {title: 1}});
	},
  'cities': function() {
    return Cities.find({countryId: Session.get("selectedCountryId")},{sort: {title: 1}});
  },
  'selectedCountry': function() {
    return Countries.findOne(Session.get("selectedCountryId"));
  }
})

Template.adminGeographyPanel.events({
  'click #addCountry': function(event, template) {
    var title = $("#newCountryTitle").val();
    Countries.insert({title: title});
    $("#newCountryTitle").val("");
  },
  'click #addCity': function(e, t) {
    if (Session.get("selectedCountryId")) {
      var title = $("#newCityTitle").val();
      Cities.insert({countryId: Session.get("selectedCountryId"), title: title});
      $("#newCityTitle").val("");
    } else {
      $("#newCityTitle").val("");
    }
  },
  'click .selCountry': function(e, t) {
    var countryId = e.currentTarget.value;
    Session.set("selectedCountryId", countryId);
  }
});