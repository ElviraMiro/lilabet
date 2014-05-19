Session.set("addPost", false);
Session.set("selectedPost", null);
Session.set("deletingPost", null);
Session.set("addTags", []);

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

Template.adminNavigation.helpers({
  'addPost': function() {
    return Session.get("addPost");
  },
  'isAdmin': function() {
    return Template.admin.isAdmin;
  }
})

Template.adminNavigation.events({
  'click .newPost': function() {
    Session.set("addPost", true);
  }
})

Template.adminPanel.helpers({
  'posts': function() {
    //return Posts.find({isTrue: null}, {sort: {gameDate: 1}});
    return Posts.find({}, {sort: {gameDate: 1}});
  },
  'addPost': function() {
    return Session.get("addPost");
  },
  'editPost': function() {
    if (Session.get("selectedPost")) {
      return true;
    } else {
      return false;
    }
  },
  'momentGameDate': function() {
    return moment(this.gameDate).format("DD-MM-YYYY H:mm");
  },
  'sporttags': function() {
    var post = Session.get("selectedPost");
    if (post) {
      return Tags.find({title: {$nin: post.tags}, tagType: 0}, {sort: {title: 1}});
    } else {
      return Tags.find({tagType: 0}, {sort: {title: 1}});
    }
  },
  'tourtags': function() {
    var post = Session.get("selectedPost");
    if (!post) {
      return Tags.find({tagType: 0}, {sort: {title: 1}});
    } else {
      return Tags.find({title: {$nin: post.tags}, tagType: 1}, {sort: {title: 1}});
    }
  },
  'teamtags': function() {
    var post = Session.get("selectedPost");
    if (!post) {
      return Tags.find({tagType: 0}, {sort: {title: 1}});
    } else {
      return Tags.find({title: {$nin: post.tags}, tagType: 2}, {sort: {title: 1}});
    }
  },
  'othertags': function() {
    var post = Session.get("selectedPost");
    if (!post) {
      return Tags.find({tagType: 0}, {sort: {title: 1}});
    } else {
      return Tags.find({title: {$nin: post.tags}, tagType: 3}, {sort: {title: 1}});
    }
  },
  'isTrueSet': function() {
    var post = Posts.find({_id: this._id, isTrue: null});
    if (post.count() == 0) {
      return false;
    } else {
      return true;
    }
  }
});

Template.adminPanel.events({
  'click .edit': function(e, t) {
    var post = Posts.findOne(this._id);
    Session.set("selectedPost", post);
    Session.set("addTags", post.tags);
  },
  'click .delete': function(e, t) {
    var post = Posts.findOne(this._id);
    Session.set("deletingPost", post);
    $("#deletePost").modal({show: true});
  },
  'click .notSureDelete': function(e, t) {
    Session.set("selectedPost", null);
    Session.set("deletingPost", null);
    $("#deletePost").modal("hide");
  },
  'click #sureDelete': function(e, t) {
    Posts.remove({_id: Session.get("deletingPost")._id});
    Session.set("deletingPost", null);
    $("#deletePost").modal("hide");
  },
  'click .notTag': function(e, t) {
    $("#addTagModal").modal("hide");
  },
  'click .addTag': function(e, t) {
    $("#addTagModal").modal({show: true});
  },
  'click #tags': function(e, t) {
    var sportTags = $("#sportTag").val().split(";"),
      tourTags = $("#tourTag").val().split(";"),
      teamTags = $("#teamTag").val().split(";"),
      otherTags = $("#otherTag").val().split(";"),
      tags = [];
    $(".selectedTag").each(function(i) {
      if (this.checked) {
        tags.push(Tags.findOne(this.id).title);
      };
    });
    for (var i = 0; i < sportTags.length; i++) {
      if (sportTags[i] != "") {
        tags.push(sportTags[i]);
        Tags.insert({title: sportTags[i], tagType: 0});
      };
    };
    for (var i = 0; i < tourTags.length; i++) {
      if (tourTags[i] != "") {
        tags.push(tourTags[i]);
        Tags.insert({title: tourTags[i], tagType: 1});
      };
      
    };
    for (var i = 0; i < teamTags.length; i++) {
      if (teamTags[i] != "") {
        tags.push(teamTags[i]);
        Tags.insert({title: teamTags[i], tagType: 2});
      };
    };
    for (var i = 0; i < otherTags.length; i++) {
      if (otherTags[i] != "") {
        tags.push(otherTags[i]);
        Tags.insert({title: otherTags[i], tagType: 3});
      };
    };
    var post = Session.get("selectedPost");
    if (post) {
      for (var i = 0; i < Session.get("addTags").length; i++) {
        tags.push(Session.get("addTags")[i]);
      };
    }
    Session.set("addTags", tags);
    $("#addTagModal").modal("hide");
  },
  'click .isTrue': function(e, t) {
    var post_id = this._id;
    Posts.update(post_id, {$set: {isTrue: true}});
  },
  'click .notTrue': function(e, t) {
    var post_id = this._id;
    Posts.update(post_id, {$set: {isTrue: false}});
  },
  'click .eraseTrue': function(e, t) {
    var post_id = this._id;
    Posts.update(post_id, {$unset: {isTrue: ""}});
  }
});


Template.editPostPanel.rendered = function() {
  $( 'textarea.editable' ).ckeditor();
  $('#datetimepicker').datetimepicker({
    format: 'dd-MM-yyyy hh:mm'
  });
};

Template.editPostPanel.helpers({
  'post': function() {
    return Session.get("selectedPost");
  },
  'gameDate': function() {
    var post = Session.get("selectedPost");
    if (post) {
      return moment(post.gameDate).format("DD-MM-YYYY HH:mm");
    } else {
      return "";
    }
  },
  'tags': function() {
    return Tags.find({title: {$in: Session.get("addTags")}}, {sort: {tagType: 1}});
  },
  'colorTag': function() {
    if (this.tagType == 0) {
      return "#0B610B";
    } else if (this.tagType == 1) {
      return "#0B0B61";
    } else if (this.tagType == 2) {
      return "#868A08";
    } else {
      return "#2E2E2E";
    }
  }
});

Template.editPostPanel.events({
  'click .addPost': function(e, t) {
    var title = $('#inputTitle').val(),
      content = $(".editable").val(),
      gameDate = moment($("#gameDate").val(), "DD-MM-YYYY H:mm").toDate(),
      tags = [],
      post = Session.get("selectedPost");
    if (post) {
      Posts.update({_id: post._id}, {$set: {title: title, content: content, gameDate: gameDate, tags: Session.get("addTags")}});
    } else {
      Posts.insert({title: title, content: content, tags: Session.get("addTags")});
    };
    Session.set("addPost", false);
    Session.set("selectedPost", null);
  },
  'click .cancel': function(e, t) {
    Session.set("addPost", false);
    Session.set("selectedPost", null);
  },
  'click .deleteTag': function(e, t) {
    var tags = Session.get("addTags"),
      newtags = [];
    for (var i = 0; i < tags.length; i++) {
      if (tags[i] != this.title) {
        newtags.push(tags[i]);
      }
    }
    Session.set("addTags", newtags);
  }
});