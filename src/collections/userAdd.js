var Backbone = require("backbone");
var AJAX_POST = require("util/ajax").AJAX_POST;

var Model = Backbone.Model.extend({
    userAddDoing:function(option){
        option.loadingText = "正在新增用户信息,请稍候!";
        option.url = "/user/addNewUser.action";
        option.data = {
            loginUserId:"85",
            login_name:option.param.userName,
            password:option.param.pwd,
            type:option.param.usertype,
            balance:"0",
            frozen:"0",
            real_name:option.param.realName,
            email:option.param.email,
            phone:option.param.phone,
            charge_type:option.param.charge_type,    
            description:option.param.desc,
            companyId:option.param.companyCode,
            company:{
                name:option.param.comName,
                phone:option.param.comPhone,
                responsor:option.param.comContacts,
                email:option.param.comEmail,
                address:option.param.comAddress,
                duty_man:option.param.comLegalPerson,
                licence_code:"123",
                description:"1"
            }
        };
        console.log(option.data);
        option.success = function(data) {
            this.set(data);
            this.trigger("userAddDone");
        }.bind(this);
        AJAX_POST(option);
    }
});

module.exports = Model;