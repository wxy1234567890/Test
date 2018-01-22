var Backbone = require("backbone");
var AJAX_POST = require("util/ajax").AJAX_POST;

var Model = Backbone.Model.extend({
    bsAddDoing:function(option){
        option.loadingText = "正在新增业务信息,请稍候!";
        option.url = "/product/insert.action";
        option.data = option.param;
        option.success = function(data) {
            this.set(data);
            this.trigger("bsAddDone",data);
        }.bind(this);
        AJAX_POST(option);
    }
});

module.exports = Model;