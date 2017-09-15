var React = require("react");
var TerseUI = require('terseui');
var modalHelp = TerseUI.Frame.modalHelp;
var Dialog = TerseUI.Frame.Dialog;
var userInfoUpdate = require('collection/userInfoUpdate');
var isEmail = require("util/validcheck").emailCheck;
var showMessage = require("util/validcheck").showMessage;

var Edit = React.createClass({
	getInitialState: function() {
		var param = this.props.option.param;
		return {
			userInfoUpdate: new userInfoUpdate(),
			id:param.id,
			passWord:param.passWord,
			company_id:param.company_id,
			balance:param.balance,
			frozen:param.frozen,
			type:param.type,
			chargeType:param.chargeType,
			userName:param.userName,
			realName:param.realName,
			userEmail:param.userEmail,
			userPhone:param.userPhone,
			userDesc:param.userDesc,
			comName:param.comName,
			comPhone:param.comPhone,
			comContacts:param.comContacts,
			comEmail:param.comEmail,
			comAddress:param.comAddress,
			comLegalPerson:param.comLegalPerson,
			comLicense:param.comLicense
		};
	},
	componentDidMount: function() {
		this.state.userInfoUpdate.on("userInfoUpdateDone", function() {
			var obj ={
				id:this.state.id,
				passWord:this.state.passWord,
				company_id:this.state.company_id,
				type:this.state.type,
				charge_type:this.state.chargeType,
				userName:this.state.userName,
				realName:this.state.realName,
				userEmail:this.state.userEmail,
				userPhone:this.state.userPhone,
				userDesc:this.state.userDesc,
				comName:this.state.comName,
				comPhone:this.state.comPhone,
				comContacts:this.state.comContacts,
				comEmail:this.state.comEmail,
				comAddress:this.state.comAddress,
				comLegalPerson:this.state.comLegalPerson
			};
			this.props.close();
			//下面这行的作用就是在成功修改信息后显示提示信息并且刷新state
			this.props.option.ok.callback(obj);
		}.bind(this));
	},
	userInfoUpdate: function() {
		if(this.state.userEmail!="" && !isEmail(this.state.userEmail)){
			showMessage("邮箱格式不正确");
			return;
		}
		this.state.userInfoUpdate.userInfoUpdateDoing({
			loadingFlag: true,
			param:{
				userId:this.state.id,
				company_id:this.state.company_id,
				userName:this.state.userName,
				passWord:this.state.passWord,
				balance:this.state.balance,
				frozen:this.state.frozen,
				type:this.state.type,
				chargeType:this.state.chargeType,
				realName:this.state.realName,
				userEmail:this.state.userEmail,
				userPhone:this.state.userPhone,
				userDesc:this.state.userDesc,
				comName:this.state.comName,
				comPhone:this.state.comPhone,
				comContacts:this.state.comContacts,
				comEmail:this.state.comEmail,
				comAddress:this.state.comAddress,
				comLegalPerson:this.state.comLegalPerson
			}
		});
	},
	realNameChange:function (e) {
		this.setState({
			realName:e.target.value
		})
	},
	typeChange:function (e) {
		this.setState({
			type:!this.state.type
		})
	},
	chargeTypeChange:function (e) {
		this.setState({
			chargeType:!this.state.chargeType
		})
	},
	userNameChange:function (e) {
		this.setState({
			userName:e.target.value
		})
	},
	passWordChange:function (e) {
		this.setState({
			passWord:e.target.value
		})
	},
	balanceChange:function (e) {
		this.setState({
			balance:e.target.value
		})
	},
	forzenChange:function (e) {
		this.setState({
			frozen:e.target.value
		})
	},
	userDescChange:function (e) {
		this.setState({
			userDesc:e.target.value
		})
	},
	emailChange:function (e) {
		this.setState({
			userEmail:e.target.value
		})
	},
	phoneChange:function (e) {
		this.setState({
			userPhone:e.target.value
		})
	},
	valueChange:function (e) {
		var id = e.target.id;
		var value = e.target.value;
		if(id=="userDesc"){
			this.setState({userDesc:value})
		}else if(id=="comName"){
			this.setState({comName:value})
		}else if(id=="comPhone"){
			this.setState({comPhone:value})
		}else if(id=="comContacts"){
			this.setState({comContacts:value})
		}else if(id=="comEmail"){
			this.setState({comEmail:value})
		}else if(id=="comAddress"){
			this.setState({comAddress:value})
		}else if(id=="comLegalPerson"){
			this.setState({comLegalPerson:value})
		}else if(id=="comLicense"){
			this.setState({comLicense:value})
		}
	},
	closeHandler: function() {
		this.props.close();
	},
	cancelHandler: function() {
		this.props.close();
	},
	okHandler: function() {
		this.userInfoUpdate();
	},
	render: function() {
		return (
			<div className="dialog-confirm releasenewmsg weditdia">
				<div className="dialog-hd clearfix">
					<h2>修改资料</h2>
					<span className="close" onClick={this.closeHandler}>×</span>
				</div>
				<div className="dialog-bd">
				<p className="f14 mb-15"><b>用户资料</b></p>
					<ul className="ulform mt-10 clearfix">
						<li className="clearfix">
							<div className="name fl">登录名</div>
							<div className="substance fl">
								<input type="text"  value={this.state.userName} onChange={this.userNameChange} disabled="true"/>
							</div>
						</li>
						<li className="clearfix">
							<div className="name fl">密码</div>
							<div className="substance fl">
								<input type="password" value={this.state.passWord}  disabled="true" onChange={this.passWordChange}/>
							</div>
						</li>
						<li className="clearfix">
							<div className="name fl">姓名</div>
							<div className="substance fl">
								<input type="text" value={this.state.realName} onChange={this.realNameChange}/>
							</div>
						</li>
						<li className="clearfix">
							<div className="name fl">号码</div>
							<div className="substance fl">
								<input type="text" value={this.state.userPhone} onChange={this.phoneChange}/>
							</div>
						</li>
						<li className="clearfix">
							<div className="name fl">邮箱</div>
							<div className="substance fl">
								<input type="text" value={this.state.userEmail} onChange={this.emailChange}/>
							</div>
						</li>
						<li className="clearfix">
							<div className="name fl">用户类型</div>
							<div className="substance fl">
								<input type="text" value={this.state.type?"普通用户":"开发者"} onClick={this.typeChange} />
							</div>
						</li>
						<li className="clearfix">
							<div className="name fl">计费类型</div>
							<div className="substance fl">
								<input type="text"  value={this.state.chargeType?"预付费用户":"后付费用户"} onClick={this.chargeTypeChange}/>
							</div>
						</li>
						<li className="clearfix">
							<div className="name fl">账户资金</div>
							<div className="substance fl">
								<input type="text" value={this.state.balance}  disabled="true" onChange={this.balanceChange}/>
							</div>
						</li>
						<li className="clearfix">
							<div className="name fl">冻结金额</div>
							<div className="substance fl">
								<input type="text" value={this.state.frozen} disabled="true"  onChange={this.frozenChange}/>
							</div>
						</li>
						<li className="clearfix">
							<div className="name fl">描述</div>
							<div className="substance fl">
								<input type="text" id="userDesc" value={this.state.userDesc} onChange={this.userDescChange}/>
							</div>
						</li>
					</ul>
					<p className="f14 mt-30 mb-15"><b>企业资料</b></p>
					<ul className="ulform mt-10 clearfix">
						<li className="clearfix">
							<div className="name fl">公司名称</div>
							<div className="substance fl">
								<input type="text" id="comName" value={this.state.comName}  onChange={this.valueChange}/>
							</div>
						</li>
						<li className="clearfix">
							<div className="name fl">法人</div>
							<div className="substance fl">
								<input type="text" id="comLegalPerson" value={this.state.comLegalPerson}  onChange={this.valueChange}/>
							</div>
						</li>
						<li className="clearfix">
							<div className="name fl">执照</div>
							<div className="substance fl">
								<input type="text" id="comLicense" value={this.state.comLicense} onChange={this.valueChange}/>
							</div>
						</li>
						<li className="clearfix">
							<div className="name fl">联系人</div>
							<div className="substance fl">
								<input type="text" id="comContacts" value={this.state.comContacts} onChange={this.valueChange}/>
							</div>
						</li>
						<li className="clearfix">
							<div className="name fl">email</div>
							<div className="substance fl">
								<input type="text" id="comEmail" value={this.state.comEmail} onChange={this.valueChange}/>
							</div>
						</li>
						<li className="clearfix">
							<div className="name fl">电话</div>
							<div className="substance fl">
								<input type="text" id="comPhone" value={this.state.comPhone} onChange={this.valueChange}/>
							</div>
						</li>
						<li className="clearfix">
							<div className="name fl">地址</div>
							<div className="substance fl">
								<input type="text" id="comAddress" value={this.state.comAddress} onChange={this.valueChange}/>
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

module.exports = Edit;