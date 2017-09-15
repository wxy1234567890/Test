var Backbone = require("backbone");
var AJAX_POST = require("util/ajax").AJAX_POST;

var Model = Backbone.Model.extend({
    fetch:function(option){
        option.loadingText = "正在新增业务信息,请稍候!";
        option.url = "/menu/deleteMenuProduct.action";
        option.data = {
            menuId:option.param.id,
            productId:option.param.productId
        };
        option.success = function(data) {
            this.set(data);
            this.trigger("fetchDone");
        }.bind(this);
        AJAX_POST(option);
    }
});

module.exports = Model;