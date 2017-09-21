var Backbone = require("backbone");
var AJAX_POST = require("util/ajax").AJAX_POST;

var Model = Backbone.Model.extend({
    getDetail:function(option){
        option.loadingText = "正在加载数据,请稍候!";
        option.url = "/product/getProductUseStat.action";
        option.data = {
            id:option.param.businessId
        };
        option.success = function(data) {
            this.set(data);
            this.trigger("getProductUseStat");
        }.bind(this);
        AJAX_POST(option);
    }
});

module.exports = Model;