var Backbone = require("backbone");
var AJAX_POST = require("util/ajax").AJAX_POST;

var Model = Backbone.Model.extend({
    fetch:function(option){
        option.loadingText = "正在删除用户信息,请稍候!";
        option.url = "/product/checkInSubscription.action";
        option.data = {
            id:option.param.businessId
        };
        option.success = function(data) {
            this.set(data);
            console.log(data);
            if(data==0){
            this.trigger("checkDone2")
        }else{
            this.trigger("showError2")
        }
        }.bind(this);
        AJAX_POST(option);
    }
});

module.exports = Model;