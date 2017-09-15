var subject = require("model/global/subject");
var TEST_DATA = require("../testdata/main");
var ErrorCodeHelp = require("root/errorcode");
var TerseUI = require('terseui');

var modalHelp = TerseUI.Frame.modalHelp;
var LoadDialog = TerseUI.Frame.LoadDialog;
var Dialog = TerseUI.Frame.Dialog;
function ajax_post(option) {
	var dialogId = 0;
	if (option.loadingFlag) {
		dialogId = modalHelp.show({
			Dialog: LoadDialog,
			option: {
				text: option.loadingText
			}
		});
	}

	function success(response) {
		if (response.errorcode == 0) {
			option.success && option.success(response.data);
		} else if (response.errorcode == 4) {
			subject.trigger("navigate", {
				path: ""
			});
		} else {
			console.log(response);
			var errorMsg = response.errormsg;
			if (option.loadingFlag) {
				modalHelp.show({
					Dialog: Dialog,
					option: {
						type: "error",
						title: "提示",
						content: errorMsg,
						ok: {
							text: "关闭",
							callback: function() {
								option.fail && option.fail(response.errorcode, errorMsg);
							}
						},
						close: {
							callback: function() {
								option.fail && option.fail(response.errorcode, errorMsg);
							}
						}
					}
				});
			} else {
				option.fail && option.fail(response.errorcode, errorMsg);
			}
		}
	}

	function error(error) {
		if (option.loadingFlag) {
			// 吐司提示
		} else {
			option.error && option.error();
		}
	}

	function complete() {
		if (option.loadingFlag) {
			modalHelp.close(dialogId);
		}
		option.complete && option.complete();
	}
	if (window.isDebug) {
		console.log(option.data);
		setTimeout(function() {
			complete();
			var method = TEST_DATA[option.url];
			if (method) {
				method(option.data, success, error);
			} else {
				success({
					errorcode: 0
				});
			}
		}, 1000);
		return;
	}
	$.ajax({
		url: window.apiUrl + option.url,
		type: "POST",
		xhrFields: {
			withCredentials: true
		},
		timeout: 0,
		data: {
			param: JSON.stringify(option.data || {})
		},
		success: success,
		error: error,
		complete: complete
	});
}

function ajax_upload(option) {
	if (window.isDebug) {
		setTimeout(function() {
			option.complete && option.complete();
			option.success && option.success({
				fail: 0,
				success: 1
			});
			// option.fail();
		}, 500);
		return;
	}
	$.ajax({
		url: window.apiUrl + (option.url || "/imageManage/uploadfile.action"),
		type: "POST",
		data: option.data,
		cache: false,
		contentType: false,
		processData: false,
		xhrFields: {
			withCredentials: true
		},
		timeout: 0,
		success: function(response) {
			if (response.errorcode == 0) {
				option.success && option.success(response.data);
			} else if (response.errorcode == 4) {
				subject.trigger("navigate", {
					path: ""
				});
			} else {
				var errorMsg = ErrorCodeHelp(response.errorcode);
				option.fail && option.fail(response.errorcode, errorMsg);
			}
		},
		error: function() {
			option.error && option.error();
		},
		complete: function() {
			option.complete && option.complete();
		}
	});
}

module.exports = {
	AJAX_POST: ajax_post,
	AJAX_UPLOAD: ajax_upload
}