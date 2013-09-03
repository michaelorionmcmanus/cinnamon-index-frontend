CinemaPeeps.ArtistsNewView = Ember.View.extend({
  didInsertElement: function() {
    var controller = this.controller;
    this.$('#typeAhead').typeahead({
      source: function(query, callback) {
        return controller.get('practicesNames');
      },
      updater: function(item) {
        controller.addPractice(item);
      }
    });

    this.$('#typeAhead').keypress(function (event) {
      if (event.which == 13) {
        var name = event.target.value;
        controller.addPractice(name);
        event.target.value = '';
        event.preventDefault();
      }
    });
  }
});