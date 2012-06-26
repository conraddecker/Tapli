define([
  // Application.
  "app"
],

function(app) {

  var Bars = app.module();

  Bars.Model = Backbone.Model.extend({

  });

  Bars.Collection = Backbone.Collection.extend({
    model: Bars.Model,
    url: '/bars.json'
  
  });

  Bars.Views.List = Backbone.View.extend({
    template   : "bars/list",

    initialize : function() {
      this.collection.on("reset", this.render, this);
      this.collection.on("fetch", function() {
        this.$("ul").parent().html("<img src='assets/img/spinner.gif'>");
      }, this);
    },

    render: function(manage){
      //console.log(new Bars.Views.Item({collection: this.collection}));
      this.collection.each(function(repo) {
        this.insertView("ul", new Repo.Views.Item({ model: repo }));
      }, this);
      
      return manage(this).render();  

    },

    serialize: function(){
      return {
        collection: this.collection
      }
    },

    cleanup: function() {
      this.collection.off(null, null, this);
    }
  });

  Bars.Views.Item = Backbone.View.extend({
    template: "bars/list_item",
    tagName: "li",
    initialize: function(){
      this.collection.on("reset", this.render, this);
    },

    serialize: function(){
      return {
        collection: this.collection
      }       
    }

    
  });

  return Bars;

});
