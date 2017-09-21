/**
 * Created by lenovo on 2017/9/19.
 */
var Backbone = require("backbone");
var AJAX_POST = require("util/ajax").AJAX_POST;
var model=Backbone.Model.extend({
    initialize:function () {

    },
    queryCallStatList:function (option) {
        option.loadingText="正在查询用户月使用列表！";
        option.url = "/callProduct/getUserCallStatList.action";
        option.data = option.param;
        option.success = function (data) {
            this.set(data);
            this.trigger("queryCallStatList", data);
        }.bind(this);
        AJAX_POST(option);
    }
});
module.exports=model;