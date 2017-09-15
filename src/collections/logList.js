var Backbone = require("backbone");
var AJAX_POST = require("util/ajax").AJAX_POST;

var Model = Backbone.Model.extend({});

var List = Backbone.Collection.extend({
    model: Model,
    getLogList:function(option){
        option.loadingText = "正在加载数据,请稍候!";
        option.url = "/trans/getTransList.action";
        option.data = {
            login_name:option.param.content,
            pagesize:"10",
            pagenow:"1",
            action_type:option.param.type
        };
        option.success = function(data) {
            this.set(data.list);
            this.trigger("getLogListDone",data.totalCount);
        }.bind(this);
        AJAX_POST(option);
    }
});

module.exports = List;