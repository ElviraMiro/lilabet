Meteor.publish('postsForStatistics', function() {
  return Posts.find({isTrue: {$ne: null}}, {fields: {tags: 1, isTrue: 1}});
});

Meteor.publish('workingPosts', function() {
  return Posts.find({isTrue: null});
});

Meteor.publish('tags', function() {
	return Tags.find();
});