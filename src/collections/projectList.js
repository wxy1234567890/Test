var Backbone = require("backbone");
var AJAX_POST = require("util/ajax").AJAX_POST;

var Model = Backbone.Model.extend({});

var List = Backbone.Collection.extend({
    model: Model,
    fetch:function(option){
        option.loadingText = "正在加载数据,请稍候!";
        option.url = "/product/getProductList.action";
        option.data = {
           type:"0"
        };
        option.success = function(data) {
            // console.log(data,123);
            this.set(data.list);
            this.trigger("fetchDone",data);
        }.bind(this);
        AJAX_POST(option);
    }
});

module.exports = List;