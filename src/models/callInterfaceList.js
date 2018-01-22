var Backbone = require("backbone");
var AJAX_POST = require("util/ajax").AJAX_POST;
var model=Backbone.Model.extend({
    initialize:function () {

    },
    fetch:function (option) {
        option.loadingText="正在加载数据,请稍候!";
        option.url = "/serviceTest/getServiceList.action";
        option.data = option.param;
        option.success = function (data) {

            this.set(data);
            this.trigger("fetchDone", data);
        }.bind(this);
        AJAX_POST(option);
    }
});
module.exports=model;