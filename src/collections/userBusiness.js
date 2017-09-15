var Backbone = require("backbone");
var AJAX_POST = require("util/ajax").AJAX_POST;

var Model = Backbone.Model.extend({});

var List = Backbone.Collection.extend({
    model: Model,
    fetch:function(option){
        option.loadingText = "正在加载数据,请稍候!";
        option.url = "/product/getUserProductStat.action";
        option.data = {
            userId:option.param.userId,
            month:window.month,
            pagesize:"10",
            pagenow:"1"
        };
        option.success = function(data) {
            this.set(data.list);
            this.trigger("fetchDone");
        }.bind(this);
        AJAX_POST(option);
    }
});

module.exports = List;