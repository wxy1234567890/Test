var Backbone = require("backbone");
var AJAX_POST = require("util/ajax").AJAX_POST;

var Model = Backbone.Model.extend({
    businessUpdateDoing:function(option){
        option.loadingText = "正在修改业务信息,请稍候!";
        option.url = "/business/businessUpdate.action";
        option.data = {
            businessId:option.param.businessId,
            businessDesc:option.param.businessDesc,
            businessPrice:option.param.businessPrice
        };
        option.success = function(data) {
            this.set(data);
            this.trigger("businessUpdateDone");
        }.bind(this);
        AJAX_POST(option);
    }
});

module.exports = Model;