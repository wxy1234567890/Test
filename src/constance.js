module.exports = {
	RoleType:[{
		key:'admin',
		value:1
	},{
		key:'rent',
		value:2
	}],
	InstanceType: [{
		key: "gbase",
		name: "gbase",
		value: 1
	}, {
		key: "redis",
		name: "redis",
		value: 2
	}],
	ApprState: [{
		key: "wait",
		name: "待审批",
		value: 1
	}, {
		key: "pass",
		name: "通过",
		value: 2
	}, {
		key: "refuse",
		name: "拒绝",
		value: 3
	}],
	MachineType:[{
		name:'管理',
		value:1
	},{
		name:'装载',
		value:2
	},{
		name:'计算',
		value:3
	},{
		name:'其他',
		value:4
	}],
	getDefineByValue: function(list, value) {
		for (var i = 0; i < list.length; i++) {
			if (list[i].value == value) {
				return list[i];
			}
		}
		return {}
	},
	getDefineByKey: function(list, key) {
		for (var i = 0; i < list.length; i++) {
			if (list[i].key == key) {
				return list[i];
			}
		}
		return {}
	}
}