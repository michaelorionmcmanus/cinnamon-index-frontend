CinemaPeeps.IndexRoute = Ember.Route.extend({
  redirect: function() {
    this.transitionTo('artists');
  }
});