App.ArtistsIndexController = Ember.ArrayController.extend({
  needs: ["artists"],

  artists: function() {
    return this.get('controllers.artists.model.artists');
  }.property('controllers.artists'),

  actions: {
    deleteArtist: function(artist) {
      artist.deleteRecord();
      artist.save();
    }
  }
});