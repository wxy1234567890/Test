var TerseUI = require('terseui');
var modalHelp = TerseUI.Frame.modalHelp;
var Dialog = TerseUI.Frame.Dialog;

function ipCheck(str) {
	var a = str.split(".");
	if (a.length != 4) {
		return false;
	}
	for (var i = 0; i < 4; i++) {
		var b = a[i];
		if (b.length == 0) {
			return false;
		}
		b = ~~b;
		if (b < 0 || b > 255) {
			return false;
		}
	}
	return true;
}

function isEmail(str) {
	var x = /^([\w-_]+(?:\.[\w-_]+)*)@((?:[a-z0-9]+(?:-[a-zA-Z0-9]+)*)+\.[a-z]{2,6})$/i;
	if (!x.exec(str)){
		return false;
	}
	return true;
}

function isPasswd(pwd) {
	var pwdPatrn=/^(\w){8,20}$/;
	if (!pwdPatrn.exec(pwd)){
		return false
	}
	return true
}
function showMessage(message) {
	modalHelp.show({
		Dialog: Dialog,
		option: {
			type: "warn",
			title: "提示",
			content: message,
			ok: {text: "好的"}
		}
	});
}
function getY_M(n){
	var y = new Date().getFullYear();
	var m = new Date().getMonth()+1;
	m += n;
	y += parseInt(m / 12);
	m %= 12;
	if(m < 1){
		y--;
		m = 12 + m;
	}
	return y + "-" + ((m < 10) ? ("0" + m) : m);
}
function removeByValue(arr, val) {
	for(var i=0; i<arr.length; i++) {
		if(arr[i] == val) {
			arr.splice(i, 1);
			break;
		}
	}
}
module.exports = {
	removeByValue:removeByValue,
	getY_M:getY_M,
	showMessage:showMessage,
	isPasswd:isPasswd,
	ipCheck: ipCheck,
	emailCheck: isEmail
};