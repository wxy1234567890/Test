// var Backbone = require("backbone");
// var AJAX_POST = require("util/ajax").AJAX_POST;

// var Model = Backbone.Model.extend({});

// var List = Backbone.Collection.extend({
//     model: Model,
//     fetch:function(option){
//         option.loadingText = "正在加载数据,请稍候!";
//         option.url = "/application/insert.action";
//         option.data = option.param;
//         console.log(option.data);
//         option.success = function(data) {
//             // console.log(data);
//             this.set(data);
//             this.trigger("fetchDone");
//         }.bind(this);
//         AJAX_POST(option);
//     }
// });

// module.exports = List;
var Backbone = require("backbone");
var AJAX_POST = require("util/ajax").AJAX_POST;
var model=Backbone.Model.extend({
    initialize:function () {

    },
    fetch:function (option) {
        option.loadingText="正在加载数据,请稍候!";
        option.url = "/application/insert.action";
        option.data = option.param;
        option.success = function (data) {
            this.set(data);
            this.trigger("fetchDone", data);
            // console.log(data,888);
        }.bind(this);
        AJAX_POST(option);
    }
});
module.exports=model;