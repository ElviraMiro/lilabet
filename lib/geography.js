CountrySchema = new SimpleSchema({
	title: {
		type: String,
		label: "Title",
		max: 200
	}
});

Countries = new Meteor.Collection("countries", {schema: CountrySchema});


CitySchema = new SimpleSchema({
	title: {
		type: String,
		label: "Title",
		max: 200
	},
	countryId: {
		type: String,
		label: 'Country',
		max: 200
	}
});

Cities = new Meteor.Collection("cities", {schema: CitySchema});