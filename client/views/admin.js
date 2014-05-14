Session.set("selectedCountryId", null);
Session.set("selectedSportTypeId", null);
Session.set("newPost", false);
Session.set("addSport", false);
Session.set("addTeam", false);

Template.admin.helpers({
  isAdmin: function() {
  	if (Meteor.user()) {
  		if (Meteor.user().isAdmin) {
  			return true;
  		}
  	}
    return true;//false;
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
  'click .editCountry': function(e, t) {
    var countryId = this._id;
    var countryTitle = $(".country"+countryId).val();
    Countries.update(countryId, {$set: {title: countryTitle}});
  },
  'click .editCity': function(e, t) {
    var cityId = this._id;
    cityTitle = $(".city"+cityId).val();
    Cities.update(cityId, {$set: {title: cityTitle}});
  },
  'click .selCountry': function(e, t) {
    var countryId = e.currentTarget.value;
    Session.set("selectedCountryId", countryId);
  }
});

Template.adminSportsPanel.helpers({
  'disabledTeam': function() {
    if (Session.get("selectedSportTypeId")) {
      return "";
    } else {
      return "disabled";
    }
  },
  'addSport': function() {
    return Session.get('addSport');
  },
  'sports': function() {
    return Sports.find({},{sort: {title: 1}});
  },
  'btnSport': function() {
    if (this._id == Session.get("selectedSportTypeId")) {
      return "btn-primary";
    } else {
      return "btn-default";
    }
  },
  'selectedSportTypeId': function() {
    return Session.get("selectedSportTypeId");
  }
});

Template.adminSportsPanel.events({
  'click .addSport': function(e, t) {
    Session.set("addSport", true);
  },
  'click .addTeam': function(e, t) {
    Session.set("addTeam", true);
  },
  'click .saveSport': function(e, t) {
    var title = $("#newSportTitle").val();
    if (Session.get("addSport")) {
      Sports.insert({title: title});
      Session.set("addSport", false);
    }
  },
  'click .cancelSport': function(e, t) {
    Session.set("addSport", false);
  },
  'click .selSport': function(e, t) {
    Session.set("selectedSportTypeId", this._id);
  }
});

Template.adminPostsPanel.helpers({
  'newPost': function() {
    return Session.get("newPost");
  },
  'posts': function() {
    return Posts.find({}, {sort: {createdAt: 1}});
  }
});

Template.adminPostsPanel.events({
  'click .newPost': function(e, t) {
    Session.set("newPost", true);
  }
})

Template.editPost.rendered = function() {
  $( 'textarea.editable' ).ckeditor();
};