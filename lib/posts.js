PostSchema = new SimpleSchema({
	title: {
		type: String,
		label: "Title",
		max: 200
	},
	authorId: {
		type: String,
		label: "Author",
		optional: true,
		max: 200
	},
	content: {
		type: String,
		label: "Content"
	},
	sportId: {
		type: String,
		label: "Sport's type",
		max: 200
	},
	createdAt: {
		type: Date,
		label: "Created at"
	},
	tournamentId: {
		type: String,
		label: "Tournament",
		max: 200	
	},
	gameId: {
		type: String,
		label: "Game",
		max: 200	
	},
	gameDate: {
		type: String,
		label: "Date of Game"
	},
	tags: {
		type: [String],
		label: 'Tags',
		optional: true
	}
});

Posts = new Meteor.Collection('posts', {schema: PostSchema});