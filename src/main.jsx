var React = require("react");
var ReactDom = require('react-dom');
var Backbone = require("backbone");
var AppRouter = Backbone.Router.extend({});
var TerseUI = require('terseui');
var modalHelp = TerseUI.Frame.modalHelp;

var subject = require("model/global/subject");

require("./reset.css");
require("./common.less");
require("./bll.less");


//监听navigate事件，进行菜单跳转
subject.on("navigate", function(option) {
	router.navigate(option.path, {
		trigger: true
	});
});


//在进行跳转前，进行一系列清除操作
//1. 关闭弹窗
//2. 进行权限判断
function preRoute(route){
	modalHelp.close();

	if(!route){//默认登录页面
		return true;
	}
	if(sessionStorage.getItem("bsHasLogin") !== "true"){//是否登录
		return false;
	}
	if (route === 'createuser') {
		return true;
	}
	if (route === 'createbs') {
		return true;
	}
	if (route === 'editbs') {
		return true;
	}
	if(route=='award'){
		return true;
	}
	if(route=='login'){
		return true;
	}
	if(route=='login2'){
		return true;
	}
	var menus = window.JSON.parse(sessionStorage.getItem('bsMenus'));
	return menus.some(function(menu){
		if(menu.key == route){ return true; }
		if(menu.subMenus){
			return menu.subMenus.some(function(subMenu){
				return subMenu.key == route;
			});
		}
		return false;
	});
}

var router = new AppRouter();
var moduleMap = {
	"award": require("bll/account/award/frame.jsx"),//业务详情
	"login":require("bll/login/login.jsx"),//登录页面
	"usermanage": require("bll/usermanage/usermanage/frame.jsx"),//用户管理
	"usercharge":require("bll/usermanage/usercharge/frame.jsx"),//用户业务计费
	"productcharge":require("bll/usermanage/productcharge/frame.jsx"),//产品计费详情
	"bsmanage":require("bll/bsmanage/frame.jsx"),//业务管理
	"logmanage":require("bll/logmanage/frame.jsx"),//日志管理
	"messagemanage":require("bll/messagemanage/frame.jsx"),//消息管理
	"interfacemanage":require("bll/usermanage/interfacemanage/frame.jsx"),//应用接口配置
	"colmanage":require("bll/usermanage/colmanage/frame.jsx"),//目录管理
	"serviceTest":require("bll/usermanage/serviceTest/frame.jsx"),//服务测试
	"apiMenuConfig":require("bll/usermanage/apiMenuConfig/frame.jsx"),//API目录配置
	"apiUse":require("bll/usermanage/apiUse/frame.jsx"),//API使用说明
	"apiTotalMenu":require("bll/usermanage/apiTotalMenu/frame.jsx"),//API总目录
	"createuser": require("bll/usermanage/usermanage/createuser.jsx"),//新建用户
	"createbs": require("bll/bsmanage/createbs.jsx"),//新建业务
	"editbs": require("bll/bsmanage/editbs.jsx")//编辑业务
};


router.route("*path?*", function(route, param) {
	if(!preRoute(route)){
		console.log("???");
		return;
	}
	var Frame = moduleMap[route];
	if (!Frame) {
		Frame = require("bll/login/login.jsx");
	}

	ReactDom.render(
		<Frame></Frame>,
		document.getElementById('root')
	);
});


Backbone.history.start();