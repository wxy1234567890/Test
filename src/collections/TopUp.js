var Backbone = require("backbone");
var AJAX_POST = require("util/ajax").AJAX_POST;

var Model = Backbone.Model.extend({
    fetch:function(option){
        option.loadingText = "正在加载数据,请稍候!";
        option.url = "/trans/topUp.action";
        option.data = {
            id:option.param.userId,
            amount:option.param.price,
            desc:option.param.desc
        };
        console.log(option);
        option.success = function(data) {
            this.set(data);
            this.trigger("fetchDone");
        }.bind(this);
        AJAX_POST(option);
    }
});

module.exports = Model;