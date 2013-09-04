App.ArtistsIndexController = Ember.ArrayController.extend({
  needs: ["artists"],

  artists: function() {
    return this.get('controllers.artists.model.artists');
  }.property('controllers.artists'),

  practices: function() {
    return this.get('controllers.artists.model.practices');
  }.property('controllers.artists.model.practices.@each'),

  actions: {
    deleteArtist: function(artist) {
      artist.deleteRecord();
      artist.save();
    }
  }
});