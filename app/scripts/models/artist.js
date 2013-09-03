App.Practice = DS.Model.extend({
  name: DS.attr('string')
});

App.Artist = DS.Model.extend({
  first_name: DS.attr('string'),
  last_name: DS.attr('string'),
  practices: DS.hasMany('practice')
});