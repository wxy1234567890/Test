// var Backbone = require("backbone");
// var AJAX_POST = require("util/ajax").AJAX_POST;

// var Model = Backbone.Model.extend({});

// var List = Backbone.Collection.extend({
//     model: Model,
//     fetch:function(option){
//         option.loadingText = "正在加载数据,请稍候!";
//         option.url = "/interface/checkUniqueCode.action";
//         option.data = {
//               code:option.param.code
//         };
//         option.success = function(data) {
//             this.set(data);
//             console.log(data);
//             if(data==0){
//                 this.trigger("fault");
//                 return
//             }
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
        option.url = "/interface/checkUniqueCode.action";
        option.data = option.param;
        option.success = function (data) {
            this.set(data);
            this.trigger("fetchDone", data);
            // console.log(data,999);
        }.bind(this);
        AJAX_POST(option);
    }
});
module.exports=model;