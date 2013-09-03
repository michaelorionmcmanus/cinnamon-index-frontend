CinemaPeeps.Store = DS.Store.extend({});

CinemaPeeps.ArtistSerializer = DS.RESTSerializer.extend({
  // First, restructure the top-level so it's organized by type
  serialize: function(artist, options) {
    var json = {
      first_name: artist.get('first_name'),
      last_name: artist.get('last_name'),
      practices: artist.get('practices').map(function(item) {return item.id})
    }

    return json;
  }
});




