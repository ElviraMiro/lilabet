Template.postsList.helpers({
  'posts': function() {
    return Posts.find({isTrue: null}, {sort: {gameDate: 1}});
  },
  'momentGameDate': function() {
    return moment(this.gameDate).format("DD-MM-YYYY H:mm");
  },
  'tags': function() {
  	var tags = this.tags;
  	return Tags.find({title: {$in: tags}});
  }
});