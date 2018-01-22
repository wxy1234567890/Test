var Backbone = require("backbone");
var AJAX_POST = require("util/ajax").AJAX_POST;

var Model = Backbone.Model.extend({
    bsAddDoing:function(option){
        option.loadingText = "正在新增业务信息,请稍候!";
        option.url = "/product/edit.action";
        option.data = {
            id:window.businessInfo.id,
            name:option.param.name,
            type:option.param.type,
            code:option.param.code,
            charge_type:option.param.charge_type,
            user_restrict:option.param.user_restrict,
            use_limit:option.param.use_limit,
            bundle_price:option.param.bundle_price,
            out_bundle_use:option.param.out_bundle_use,
            charge_date:option.param.charge_date,
            interfaceJSONArrStr:option.param.interfaceJSONArrStr,
            description:option.param.description
        };
        option.success = function(data) {
            this.set(data);
            this.trigger("bsAddDone");
        }.bind(this);
        AJAX_POST(option);
    }
});

module.exports = Model;