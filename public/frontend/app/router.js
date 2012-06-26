define([
  // Application.
  "app",

  // Modules    
  "modules/bars"
],

function(app, Bars) {

  // Defining the application router, you can attach sub routers here.
  var Router = Backbone.Router.extend({
    initialize: function() {
      this.bars = new Bars.Collection;
    },

    routes: {
      "": "index",
    },

    index: function() {
      this.bars.fetch();

      this.useLayout("application").setViews({
        ".bars": new Bars.Views.List({ collection: this.bars }),
      }).render();
    },

    /*take: function() {
      // Main page uses the base layout.
      this.useLayout("base").setViews({
        // Put the capture toolbar in the side bar.
        ".side-bar": new Tools.Views.Capture(),

        // Put the photo gallery into the content area.
        ".content": new Photo.Views.Take({
          collection: this.gallery
        })
      }).render();
    },

    upload: function() {
      // Main page uses the base layout.
      this.useLayout("single").setViews({
        // Put the photo gallery into the content area.
        ".content": new Photo.Views.Upload({
          collection: this.gallery
        })
      }).render();
    },

    photo: function(id) {
      // Typically we would have a Model endpoint,
      // instead of fetching the entire collection.
      this.gallery.fetch();

      // Main page uses the base layout.
      this.useLayout("single").setViews({
        // Put the standard toolbar in the side bar.
        ".side-bar": new Tools.Views.Standard(),

        // Put the photo gallery into the content area.
        ".content": new Photo.Views.Detail({ model: this.gallery.get(id) })
      }).render();
    },*/

    // Helper for specific layouts.
    useLayout: function(name) {
      // If already using this Layout, then don't re-inject into the DOM.
      if (this.layout && this.layout.options.template === name) {
        return this.layout;
      }

      if (this.layout) {
        this.layout.remove();
      }

      // Create a new Layout.
      var layout = new Backbone.Layout({
        template: name,
        className: "layout " + name,
        id: "layout"
      });

      // Insert into the DOM.
      $("#main").empty().append(layout.el);

      // Render the layout.
      layout.render();

      // Cache the reference on the Router.
      this.layout = layout;

      // Return the reference, for later usage.
      return layout;
    }
  });

  return Router;

});
