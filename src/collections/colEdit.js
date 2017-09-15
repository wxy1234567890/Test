var Backbone = require("backbone");
var AJAX_POST = require("util/ajax").AJAX_POST;

var Model = Backbone.Model.extend({
    fetch:function(option){
        option.loadingText = "正在新增业务信息,请稍候!";
        option.url = "/menu/addProducts.action";
        option.data = {
            menuId:option.param.id,
            productJSONArrStr:option.param.arr
        };
        console.log(option.data);
        option.success = function(data) {
            this.set(data);
            this.trigger("fetchDone");
        }.bind(this);
        AJAX_POST(option);
    }
});

module.exports = Model;