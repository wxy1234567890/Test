var Backbone = require("backbone");
var AJAX_POST = require("util/ajax").AJAX_POST;

var Model = Backbone.Model.extend({
    userInfoUpdateDoing:function(option){
        option.loadingText = "正在修改用户信息,请稍候!";
        option.url = "/user/editUser.action";
        option.data = {
            id:option.param.userId,
            real_name:option.param.real_name,
            type:option.param.type,
            charge_type:option.param.chargeType,
            real_name:option.param.realName,
            description:option.param.userDesc,
            company_id:option.param.company_id,
            company:{
               name: option.param.comName,
               duty_man: option.param.comLegalPerson,
               responsor: option.param.comContacts,
               phone: option.param.comPhone,
               email:option.param.comEmail,
               address:option.param.comAddress,
               licence_code:"l12345",
               description:"描述信息"
             }
        };
        option.success = function(data) {
            this.set(data);
            this.trigger("userInfoUpdateDone");
        }.bind(this);
        AJAX_POST(option);
    }
});

module.exports = Model;