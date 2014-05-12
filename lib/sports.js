SportSchema = new SimpleSchema({
	title: {
		type: String,
		label: "Sport's type",
		max: 200
	}
});

Sports = new Meteor.Collection("sports", {schema: SportSchema});

TeamSchema = new SimpleSchema({
	title: {
		type: String,
		label: "Title",
		max: 200
	},
	cityId: {
		type: String,
		label: "City",
		optional: true,
		max: 200
	},
	countryId: {
		type: String,
		label: "Country",
		max: 200,
		optional: true
	},
	sportId: {
		type: String,
		label: "Sport's type",
		max: 200
	}
});

Teams = new Meteor.Collection("teams", {schema: TeamSchema});


TournamentSchema = new SimpleSchema({
	title: {
		type: String,
		label: "Title",
		max: 200
	},
	sportId: {
		type: String,
		label: "Sport's type",
		max: 200
	},
	countryId: {
		type: String,
		label: "Country",
		max: 200,
		optional: true
	}
});

Tournaments = new Meteor.Collection("tournaments", {schema: TournamentSchema});


GameSchema = new SimpleSchema({
	title: {
		type: String,
		max: 200,
		label: "Title",
		optional: true
	},
	tournamentId: {
		type: String,
		label: "Tournament",
		max: 200
	},
	sportId: {
		type: String,
		label: "Sport",
		max: 200
	},
	countryId: {
		type: String,
		label: "Country",
		optional: true,
		max: 200
	},
	cityId: {
		type: String,
		label: "City",
		optional: true,
		max: 200
	},
	prediction: {
		type: String,
		label: "Prediction",
		max: 200
	},
	dateOf: {
		type: Date,
		label: "Date of"
	},
	teamId1: {
		type: String,
		label: "Team 1",
		max: 200
	},
	teamId2: {
		type: String,
		label: "Team 2",
		max: 200
	}
});

Games = new Meteor.Collection("games", {schema: GameSchema});
