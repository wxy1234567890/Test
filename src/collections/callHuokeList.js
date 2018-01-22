var Backbone = require("backbone");
var AJAX_POST = require("util/ajax").AJAX_POST;
var Model = Backbone.Model.extend({
    initialize:function () {

    },
    fetch:function(option){
        option.loadingText = "正在加载数据,请稍候!";
        option.url = "/callProduct/getAgentStatByProduct.action";
        // option.data = {
        //   id:option.param.id,
        //   // userId:window.userId,
        //   month:option.param.month,
        //   pagesize:"10",
        //   pagenow:"1",
        //   feeOrder: "1"
        // };
        option.data = option.param;
        option.success = function(data) {
            // console.log(data);
            this.set(data);
            this.trigger("fetchDone",data);
        }.bind(this);
        AJAX_POST(option);
    }
});

module.exports = Model;