// 编码

function encodeParam(param) {
	var ret = [];
	for (var o in param) {
		ret.push(o + "=" + param[o]);
	}
	return encodeURI(ret.join("&"));
}

// 解码

function decodeParam(param) {
	var ret = null;
	if (param && param.length > 1) {
		ret = {};
		param = decodeURI(param);
		var items = param.split('&');
		for (var i = 0; i < items.length; i++) {
			var a = items[i];
			if (a) {
				var km = a.split("=");
				ret[km[0]] = km[1];
			}
		}
	}
	return ret;
}

module.exports = {
	encodeParam: encodeParam,
	decodeParam: decodeParam
}