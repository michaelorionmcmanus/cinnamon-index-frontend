App.ArtistsNewController = Ember.ObjectController.extend({
  needs: ["artists", "artistsIndex"],
  practices: Ember.A(),

  content: Ember.Object.create(),

  practicesNames: function() {
    return this.get('controllers.artists.model.practices').map(function(item) {
      return item.get('name');
    });
  }.property('controllers.artists.model.practices'),

  addPractice: function(practiceName) {
    var controllerPractices = this.get('practices');
    // If there is already practice on this object then just exit.
    if(controllerPractices.findBy('name', practiceName)) {
      return true;
    }
    // Look for an existing practice
    var practice = this.get('controllers.artists.model.practices').findBy('name', practiceName);
    // Make a practice if one couldn't be found.
    if(!practice) {
      practice = this.store.createRecord('practice', {
        name: practiceName
      });
    }
    controllerPractices.pushObject(practice);
  },

  actions: {
    submit: function() {
      var self = this;
      var artist = this.store.createRecord('artist', {
        first_name: this.get('first_name'),
        last_name: this.get('last_name')
      });

      // First save the practices.
      var practicePromises = [];

      this.get('practices').forEach(function(practice) {
        artist.get('practices').pushObject(practice);
        if(practice.get('isNew')) {
          practicePromises.push(practice.save());
        }
      });

      var artistPromise = new Ember.RSVP.Promise(function(resolve, reject){
        if(practicePromises.length) {
          Ember.RSVP.all(practicePromises).then(function() {
            artist.save().then(function() {
              resolve();
            });
          });
        } else {
          artist.save().then(function() {
            resolve();
          });
        }
      });

      artistPromise.then(
        function() {
          self.transitionToRoute("artists");
          self.setProperties({ first_name: '', last_name: '', practices: Ember.A()});
         },
        function(error) {
          debugger;
      });
    }
  }
});