var Backbone = require("backbone");
var AJAX_POST = require("util/ajax").AJAX_POST;

var Model = Backbone.Model.extend({});

var List = Backbone.Collection.extend({
    model: Model,
    fetch:function(option){
        option.loadingText = "正在加载数据,请稍候!";
        option.url = "/callProduct/getUserCallStatList.action";
        option.data = option.param;
        // option.data = {
        //     id:option.param.userId,
        //     pagesize:"10",
        //     pagenow:"1",
        //     month:option.param.month||"2017-09",
        //     feeOrder:option.param.feeOrder||"0"
        // };
        option.success = function(data) {
            this.set(data.list);
            // this.set(data.totalCount);
            this.trigger("fetchDone",data.totalCount);
        }.bind(this);
        AJAX_POST(option);
    }
});

module.exports = List;