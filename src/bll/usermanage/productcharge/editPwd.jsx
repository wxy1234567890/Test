var React = require("react");
var TerseUI = require('terseui');
var modalHelp = TerseUI.Frame.modalHelp;
var Dialog = TerseUI.Frame.Dialog;
var userPwdEdit = require('collection/userPwdEdit');
var isPasswd = require("util/validcheck").isPasswd;
var showMessage = require("util/validcheck").showMessage;

var Add = React.createClass({
	getInitialState: function() {
		return {
			userPwdEdit: new userPwdEdit(),
			oldPwd:"",
			newPwd:"",
			newPwdConfirm:""
		};
	},
	componentDidMount() {
		this.state.userPwdEdit.on("userPwdEditDone", function() {
			this.props.close();
			this.props.option.ok.callback();
		}.bind(this));
	},
	userPwdEdit: function() {
		if(this.state.oldPwd==""){
			showMessage("原密码不能为空");
			return;
		}
		if(!isPasswd(this.state.newPwd)){
			showMessage("密码只能输入8-20个字母、数字、下划线");
			return;
		}
		if(this.state.newPwd!=this.state.newPwdConfirm){
			showMessage("新密码不一致");
			return;
		}
		this.state.userPwdEdit.userPwdEditDoing({
			loadingFlag: true,
			param:{
				userId:'',
				oldPwd:this.state.oldPwd,
				newPwd:this.state.newPwd
			}
		});
	},
	oldPwdChange:function (e) {
		this.setState({
			oldPwd:e.target.value
		})
	},
	newPwdChange:function (e) {
		this.setState({
			newPwd:e.target.value
		})
	},
	newPwdConfirmChange:function (e) {
		this.setState({
			newPwdConfirm:e.target.value
		})
	},
	closeHandler: function() {
		this.props.close();
	},
	cancelHandler: function() {
		this.props.close();
	},
	okHandler: function() {
		this.userPwdEdit();
	},
	render: function() {
		var newsTypeName="";
		switch (Number(this.state.newsType)){
			case 1:
				newsTypeName = "系统公告";
				break;
			case 2:
				newsTypeName = "管理通知";
				break;
			case 3:
				newsTypeName = "升级公告";
				break;
			default:
				newsTypeName = "";
		}
		return (
			<div className="dialog-confirm releasenewmsg">
				<div className="dialog-hd clearfix">
					<h2>修改密码</h2>
					<span className="close" onClick={this.closeHandler}>×</span>
				</div>
				<div className="dialog-bd">
					<ul className="ulform mt-10 clearfix">
						<li className="clearfix">
							<div className="name2 fl">原密码<span className="tip">*</span></div>
							<div className="substance2 fl">
								<input type="password"  value={this.state.oldPwd} onChange={this.oldPwdChange}/>
							</div>
						</li>
						<li className="clearfix">
							<div className="name2 fl">新密码<span className="tip">*</span></div>
							<div className="substance2 fl">
								<input type="password"  value={this.state.newPwd} onChange={this.newPwdChange}/>
							</div>
						</li>
						<li className="clearfix">
							<div className="name2 fl">密码确认<span className="tip">*</span></div>
							<div className="substance2 fl">
								<input type="password"  value={this.state.newPwdConfirm} onChange={this.newPwdConfirmChange}/>
							</div>
						</li>
					</ul>
				</div>
				<div className="dialog-ft">
					<span className="btn btn-create mr-10" onClick={this.okHandler}>提交</span>
					<span className="btn btn-close" onClick={this.cancelHandler}>关闭</span>
				</div>
			</div>
		);
	}
});

module.exports = Add;