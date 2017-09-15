var Backbone = require("backbone");
var AJAX_POST = require("util/ajax").AJAX_POST;

var Model = Backbone.Model.extend({
    businessDeleteDoing:function(option){
        option.loadingText = "正在删除业务信息,请稍候!";
        option.url = "/business/businessDelete.action";
        option.data = {
            businessId:option.param.businessId
        };
        option.success = function(data) {
            this.set(data);
            this.trigger("businessDeleteDone");
        }.bind(this);
        AJAX_POST(option);
    }
});

module.exports = Model;