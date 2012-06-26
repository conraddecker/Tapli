define([
  // Libraries.
  "jquery",
  "lodash",
  "backbone",

  // Plugins.
  "plugins/backbone.layoutmanager",
  "plugins/backbone.localStorage",
  "vendor/bootstrap/js/bootstrap",

  // Rick Waldron's excellent getUserMedia normalization lib.
  "libs/navigator.getusermedia"
],

function($, _, Backbone) {

  // Localize or create a new JavaScript Template object.
  var JST = window.JST = window.JST || {};

  // Configure LayoutManager.
  Backbone.LayoutManager.configure({
    paths: {
      layout: "app/templates/layouts/",
      template: "app/templates/"
    },

    fetch: function(path) {
      path = path + ".html";

      if (!JST[path]) {
        $.ajax({ url: path, async: false }).then(function(contents) {
          JST[path] = _.template(contents);
        });
      } 
      
      return JST[path];
    }
  });

  // Keep active application instances namespaced under an app object.
  return _.extend({
    // Create a custom object with a nested Views object.
    module: function(additionalProps) {
      return _.extend({ Views: {} }, additionalProps);
    }

  // Mix Backbone.Events into the app object.
  }, Backbone.Events);

});
