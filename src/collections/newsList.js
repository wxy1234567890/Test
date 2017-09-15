var Backbone = require("backbone");
var AJAX_POST = require("util/ajax").AJAX_POST;

var Model = Backbone.Model.extend({});

var List = Backbone.Collection.extend({
    model: Model,
    getNewsList:function(option){
        option.loadingText = "正在加载数据,请稍候!";
        option.url = "/message/getList.action";
        option.data = {
            title:option.param.title,
            pagesize:"10",
            pagenow:"1"
        };
        option.success = function(data) {
            this.set(data.list);
            this.trigger("getNewsListDone",data.totalCount);
        }.bind(this);
        AJAX_POST(option);
    }
});

module.exports = List;