CinemaPeeps.ArtistsRoute = Ember.Route.extend({
  model: function() {
    var promises = [this.store.find('artist'), this.store.find('practice')];
    var promise = new Ember.RSVP.Promise(function(resolve, reject){
      Ember.RSVP.all(promises)
        .then(function(collections) {
          resolve({
            artists: collections[0],
            practices: collections[1]
          });
        }, function(error) {
        });
    });
    return promise;
  },

  renderTemplate: function() {
    this.render({ outlet: 'artists' });
  }
});