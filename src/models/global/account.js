var Backbone = require("backbone");
var AJAX_POST = require("util/ajax").AJAX_POST;

var Model = Backbone.Model.extend({
  initialize: function() {},
  authLogin: function(option) {
    option.loadingText = "正在登录中,请稍候!";
    option.url = "/auth/login.action";
    option.data = {
      loginName:option.param.userName,
      password:option.param.passWord,
      validationCode:option.param.validationCode,
      login_type:0
      // role:option.param.role
    };
    option.success = function(data) {
      this.trigger("loginSuccess",data);
    }.bind(this);
    option.fail = function(data,datamess){
      this.trigger("loginFail",data,datamess);
    }.bind(this);
    option.error = function(data) {
      this.trigger("loginError",data);
    }.bind(this);
    option.complete = function(data) {
      this.trigger("loginComplete",data);
    }.bind(this);
    AJAX_POST(option);
  },
  getUserInfo:function(option){
    option.loadingText = "正在登录中,请稍候!";
    option.url = "/auth/getUserInfo.action";
    option.data = {
      sessionId:option.param.sessionId,
      userName:option.param.userName
    };
    option.success = function(data) {
      this.set("menus",data.menus);
      this.set("role",data.role);
      this.set("userName",data.userName);
      this.trigger("getUserInfoDone",data);
    }.bind(this);
    AJAX_POST(option);
  }
});
var account = new Model();
module.exports = account;