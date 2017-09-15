var Backbone = require("backbone");
var AJAX_POST = require("util/ajax").AJAX_POST;

var Model = require("model/instance");

var List = Backbone.Collection.extend({
	model: Model
});

module.exports = List;