var Backbone = require("backbone");
var AJAX_POST = require("util/ajax").AJAX_POST;

var Model = Backbone.Model.extend({
    fetch:function(option){
        option.loadingText = "正在加载坐席信息,请稍候!";
        option.url = "/agent/getUserAgentList.action";
        option.data = {
            id:option.param.id,
            pagesize:option.param.pagesize,
            pagenow:option.param.pagenow,
            status:option.param.status
        };
        option.success = function(data) {
            this.set(data);
            this.trigger("fetchDone",data);
        }.bind(this);
        AJAX_POST(option);
    }
});

module.exports = Model;