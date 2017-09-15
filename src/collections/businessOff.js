var Backbone = require("backbone");
var AJAX_POST = require("util/ajax").AJAX_POST;

var Model = Backbone.Model.extend({
    businessOffDoing:function(option){
        option.loadingText = "正在下线业务信息,请稍候!";
        option.url = "/product/doOffLine.action";
        option.data = {
            id:option.param.businessId
        };
        option.success = function(data) {
            this.set(data);
            this.trigger("businessOffDone");
        }.bind(this);
        AJAX_POST(option);
    }
});

module.exports = Model;