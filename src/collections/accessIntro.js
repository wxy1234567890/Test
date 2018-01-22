var Backbone = require("backbone");
var AJAX_POST = require("util/ajax").AJAX_POST;

var Model = Backbone.Model.extend({});

var List = Backbone.Collection.extend({
    model: Model,
    fetch:function(option){
        option.loadingText = "正在加载数据,请稍候!";
        option.url = "/application/accessIntro.action";
        option.data = option.param;
        option.success = function(data) {
            // console.log(data);
            this.set(data);
            this.trigger("fetchDone");
        }.bind(this);
        AJAX_POST(option);
    }
});

module.exports = List;