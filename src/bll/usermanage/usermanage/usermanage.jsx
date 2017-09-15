var React = require('react');
var TerseUI = require('terseui');
var Scroll = TerseUI.Scroll;
var modalHelp = TerseUI.Frame.modalHelp;
var Dialog = TerseUI.Frame.Dialog;
var addDialog = require("./add.jsx");
var chargeDialog = require("./chargeClick.jsx");
var subject = require("model/global/subject");
var userList = require('collection/userList');
var userBusinessList = require('collection/userBusinessList');
var userInfo = require('collection/userInfo');
var chargeInfo = require('collection/chargeInfo');
var companyInfo = require('collection/companyInfo');
var userDelete = require('collection/userDelete');
var userFreeze = require('collection/userFreeze');
var editPwdDialog = require("./editPwd.jsx");
var editUserDialog = require("./editUser.jsx");
var withDraw = require("./withDraw.jsx");

//用户列表
var ChargeInfo = React.createClass({
	componentDidUpdate: function() {
		if (this.props.option.length==0) {
			$(".wrighttable").hide();
		}
		else{
			$(".wrighttable").show();
		}
	},
	render: function() {
		var chargeInfo = this.props.option;
		return(
				<div className="tablearea wrighttable">
					<table>
						<thead>
							<tr>
								<th width="25%">充值时间</th>
								<th width="25%">充值人</th>
								<th width="25%">金额(元)</th>
								<th width="24%">描述</th>
							</tr>
						</thead>
						<tbody>
						{chargeInfo.map(function(item,index){
							return (
								<tr key={index}>
								<td width="25%">
									<span className="ellipsis">{item.get('create_time')}</span>
								</td>
								<td width="25%">
									<span className="ellipsis">{item.get('creator')}</span>
								</td>								
								<td width="25%">
									<span className="ellipsis">{item.get('after_balance')-item.get('pre_balance')}</span>
								</td>								
								<td width="24%">
									<span className="ellipsis">{item.get('description')}</span>
								</td>	
								</tr>
							)
						}.bind(this))}						
						</tbody>
					</table>
				</div>
		)
	}
})

//用户列表
var UserList = React.createClass({
	toShowUserInfo:function (userId,company_id) {
		//调用父类中方法
		this.props.getUserInfo(userId,company_id);
	},
	render: function() {
		var userList = this.props.option;
		return(
			<ul>
				{userList.map(function(item,index){
					return (
						<li key={index} className="clearfix" onClick={this.toShowUserInfo.bind(this,item.get('id'),item.get('company_id'))}>
							<div className="userimfor fl">
								<img className="fl radius v-m" src={require( "../../../images/head.jpg")} />
								<div className="imfordtl">
									<span className="name ellipsis">{item.get('real_name')}</span>
									<span>产品数：{item.get('subsProductCount')}</span>
								</div>
							</div>
							<div className="fr ic-lock mt-10"></div>
						</li>
					)
				}.bind(this))}
			</ul>
		)
	}
})

//业务配置
var UserB = React.createClass({
    withDraw: function(e) {
    	e.target
		modalHelp.show({
			Dialog: withDraw,
			option: {
				}
			})
		},
	componentDidMount: function() {
		// if (this.props.option.length==0) {
		// 	$(".prolist clearfix").remove();
		// 	$(".wpropei").remove();

		// }
	},
	render: function() {
		var typeName = ["预付费","后付费"];
		var userBusinessList = this.props.option;
		return(
			<ul className="prolist clearfix">
				{userBusinessList.map(function(item,index){
					return (
						<li key={index} className="wprolist">
							<p className="clearfix">
								<span className="f16 fl ellipsis">{item.get('name')}</span>
								<span className="btn white s fr" onClick={this.withDraw}>退订</span>
								<br/>
								<span className="f12 lightgray awayleft">{typeName[item.get('type')]}</span>
								<span className="f12 lightgray awayleft">创建时间：{item.get('create_time')}</span>
								<span className="f12 lightgray awayleft">续费时间：{item.get('charge_time')}</span>
							</p>
						</li>
					)
				}.bind(this))}
			</ul>
		)
	}
})
//企业信息
var UserCompany = React.createClass({
	render: function() {
		var companyInfo = this.props.option.attributes;
		return (
			<div className="txtlistwrap" id="companyInfo">
				<p className="f14"><b>企业信息</b></p>
				<ul className="infor-ul fl">
					<li className="clearfix">
						<span className="name fl">公司名称</span>
						<span className="key fr ellipsis">{companyInfo.name}</span>
					</li>
					<li className="clearfix">
						<span className="name fl">法人</span>
						<span className="key fr ellipsis">{companyInfo.duty_man}</span>
					</li>
					<li className="clearfix">
						<span className="name fl">执照</span>
						<span className="key fr ellipsis">点击查看</span>
					</li>
					<li className="clearfix">
						<span className="name fl">联系人</span>
						<span className="key fr ellipsis">{companyInfo.responsor}</span>
					</li>
					<li className="clearfix">
						<span className="name fl">E-mail</span>
						<span className="key fr ellipsis">{companyInfo.email}</span>
					</li>
					<li className="clearfix">
						<span className="name fl">电话</span>
						<span className="key fr ellipsis">{companyInfo.phone}</span>
					</li>
					<li className="clearfix">
						<span className="name fl">地址</span>
						<span className="key fr">{companyInfo.address}</span>
					</li>
				</ul>
			</div>
		)
	}
})
//用户资料
var UserInfo = React.createClass({
	render: function() {
		var userInfo = this.props.option;
		return (
			<div className="txtlistwrap">
				<p className="f14"><b>用户资料</b></p>
				<ul className="infor-ul fl">
					<li className="clearfix">
						<span className="name fl">用户名</span>
						<span className="key fr ellipsis">{userInfo.attributes.login_name}</span>
					</li>
					<li className="clearfix">
						<span className="name fl">姓名</span>
						<span className="key fr ellipsis">{userInfo.attributes.real_name}</span>
					</li>
					<li className="clearfix">
						<span className="name fl">E-mail</span>
						<span className="key fr ellipsis">{userInfo.attributes.email}</span>
					</li>
					<li className="clearfix">
						<span className="name fl">电话</span>
						<span className="key fr ellipsis">{userInfo.attributes.phone}</span>
					</li>
					<li className="clearfix">
						<span className="name fl">描述</span>
						<span className="key fr">{userInfo.attributes.description}</span>
					</li>
				</ul>
			</div>
		)
	}
})
var UserManage = React.createClass({
	addClick: function() {
		modalHelp.show({
			Dialog: addDialog,
			option: {
				ok: {
					id:this.state.userInfo.attributes.id,
					callback:function(){
						this.getUserList();
					}.bind(this)
				}
			}
		});
	},
    chargeClick: function() {
		modalHelp.show({
			Dialog: chargeDialog,
			option: {
				param:{
					id:this.state.userInfo.attributes.id,
					charge:this.state.chargeInfo,
					userInfo:this.state.userInfo
				}
			}
		});
	},
	createuser: function() {
		subject.trigger("navigate",{
	      path:"createuser"
	    });
	},
	getInitialState:function(){
		return{
			userName:"",//搜索值
			userList:new userList(),
			userInfo:new userInfo(),
			chargeInfo:new chargeInfo(),
			companyInfo:new companyInfo(),
			userBusinessList:new userBusinessList(),			
			userFreeze:new userFreeze(),
			userDelete:new userDelete()
		};
	},
	componentDidMount: function() {
		this.state.userList.on("fetchDone",function(){
			this.setState({
				userList:this.state.userList
			});
			this.getUserInfo(this.state.userList.toArray()[0].attributes.id,this.state.userList.toArray()[0].attributes.company_id);
		}.bind(this));
		this.state.userInfo.on("fetchDone",function(){
			this.setState({
				userInfo:this.state.userInfo
			});
		}.bind(this));	
		this.state.chargeInfo.on("fetchDone",function(){
			this.setState({
				chargeInfo:this.state.chargeInfo
			});
		}.bind(this));
		this.state.companyInfo.on("fetchDone",function(){
			this.setState({
				companyInfo:this.state.companyInfo
			});
		}.bind(this));
		this.state.userBusinessList.on("fetchDone",function(){
			this.setState({
				userBusinessList:this.state.userBusinessList
			});
		}.bind(this));	
		this.state.userDelete.on("userDeleteDone",function(){
			//删除指定用户后
			this.getUserList();
		}.bind(this));
		this.state.userFreeze.on("userFreezeDone",function(){
			//冻结指定用户后
			modalHelp.show({
				Dialog: Dialog,
				option: {
					type: "warn",
					title: "提示",
					content: "冻结用户账号成功",
					ok: {text: "好的"}
				}
			});
		}.bind(this));
		this.getUserList();
	},
	userNameChange:function (e) {
		this.setState({
			"userName":e.target.value
		})
	},
	getUserList:function(){
		this.state.userList.fetch({
			loadingFlag:true,
			param:{
				loginUserId:"",
				userName:this.state.userName
			}
		});
	},
	getUserInfo:function(userId,company_id){
		
		this.state.userInfo.fetch({
			loadingFlag:true,
			param:{
				userId:userId
			}
		});
		this.state.chargeInfo.fetch({
			loadingFlag:true,
			param:{
				userId:userId,
				pagesize: "10",
				pagenow: "1"
			}
		});
		if (company_id!=0) {
		document.getElementById("companyInfo").setAttribute("class","txtlistwrap")
		this.state.companyInfo.fetch({
			loadingFlag:true,
			param:{
				company_id:company_id
			}
		});
		}
		else{
			document.getElementById("companyInfo").setAttribute("class","txtlistwrap wcompany")
		}
		this.state.userBusinessList.fetch({
			loadingFlag:true,
			param:{
				userId:userId
			}
		});
	},
	freezeAccount:function (userId) {
		modalHelp.show({
			Dialog: Dialog,
			option: {
				type: "question",
				title: "确认",
				content: "确定要冻结该用户信息?",
				ok: {
					callback: function() {
						this.state.userFreeze.userFreezeDoing({
							loadingFlag:true,
							param:{
								userId:userId
							}
						});
					}.bind(this)
				},
				cancel: {
					text: "取消"
				}
			}
		});
	},
	toEditUserInfo:function () {
		modalHelp.show({
			Dialog: editUserDialog,
			option: {
				param:{
					id:this.state.userInfo.attributes.id,
					userName:this.state.userInfo.attributes.login_name,
					passWord:this.state.userInfo.attributes.password,
					type:this.state.userInfo.attributes.type,
					company_id:this.state.userInfo.attributes.company_id,
					chargeType:this.state.userInfo.attributes.charge_type,
					realName:this.state.userInfo.attributes.real_name,
					balance:this.state.userInfo.attributes.balance,
					frozen:this.state.userInfo.attributes.frozen,
					userEmail:this.state.userInfo.attributes.email,
					userPhone:this.state.userInfo.attributes.phone,
					userDesc:this.state.userInfo.attributes.description,
					comName:this.state.companyInfo.attributes.name,
					comPhone:this.state.companyInfo.attributes.phone,
					comContacts:this.state.companyInfo.attributes.responsor,
					comEmail:this.state.companyInfo.attributes.email,
					comAddress:this.state.companyInfo.attributes.address,
					comLegalPerson:this.state.companyInfo.attributes.duty_man,
					comLicense:this.state.companyInfo.attributes.licence_code
				},
				ok:{
					callback:function(obj){
						//修改信息后
						modalHelp.show({
							Dialog: Dialog,
							option: {
								type: "warn",
								title: "提示",
								content: "修改用户信息成功",
								ok: {text: "好的"}
							}
						});
						// this.setState({
						// 	userInfo:obj
						// })
					}.bind(this)
				}
			}
		});
	},
	resetPwd:function (userId) {
		modalHelp.show({
			Dialog: editPwdDialog,
			option: {
				userId:userId,
				username:this.state.userInfo.attributes.login_name,
				ok:{
					callback:function(){
						//修改密码后
						modalHelp.show({
							Dialog: Dialog,
							option: {
								type: "warn",
								title: "提示",
								content: "修改密码成功",
								ok: {text: "好的"}
							}
						});
					}.bind(this)
				}
			}
		});
	},
	deleteUser:function (userId) {
		modalHelp.show({
			Dialog: Dialog,
			option: {
				type: "question",
				title: "确认",
				content: "确定要删除该用户信息吗?",
				ok: {
					callback: function() {
						this.state.userDelete.userDeleteDoing({
							loadingFlag:true,
							param:{
								userId:userId
							}
						});
					}.bind(this)
				},
				cancel: {
					text: "取消"
				}
			}
		});
	},
	render: function() {
		return (
			<div>
				<Scroll className="userlist">
					<div className="search-area ml-20 mr-20 mb-10 clearfix">
						<div className="search-box w160 pos-relative fl">
							<input placeholder="请输入查询内容" className="s-text" type="text" value={this.state.userName} onChange={this.userNameChange}/>
							<span className="s-btn" onClick={this.getUserList}></span>
							<em className="del cursor pos-absolute"></em>
						</div>
						<span className="btn green ml-5 fl" onClick={this.createuser}>新建</span>
					</div>
					<UserList option={this.state.userList} getUserInfo={this.getUserInfo}/>
				</Scroll>
				<div className="userdtl">
					<div className="basicinfo">
						<div className="title ellipsis">{this.state.userInfo.attributes.real_name}</div>
						<div className="btnarea mb-40">
							<span className="btn white mr-10" onClick={this.freezeAccount.bind(this,this.state.userInfo.attributes.id)}>冻结账户</span>
							<span className="btn white mr-10" onClick={this.toEditUserInfo}>编辑资料</span>
							<span className="btn white mr-10" onClick={this.resetPwd.bind(this,this.state.userInfo.attributes.id)}>重置密码</span>
						</div>
					</div>
				<div className="txtlistwrap clearfix">
					<ul className="infor-ul fl  winfor">
						<li className="clearfix">
							<span className="name fl">付费类型</span>
							<span className="key fr ellipsis">{this.state.userInfo.attributes.charge_type==2?"后付费用户":"预付费用户"}</span>
						</li>
						<li className="clearfix">
							<span className="name fl">冻结状态</span>
							<span className="key fr ellipsis">{this.state.userInfo.attributes.status==0?"冻结":"未冻结"}</span>
						</li>
						<li className="clearfix">
							<span className="name fl">当前余额</span>
							<span className="key fr ellipsis">{this.state.userInfo.attributes.balance}</span>
						</li>
						<li className="clearfix">
							<span className="name fl">创建时间</span>
							<span className="key fr ellipsis">{this.state.userInfo.attributes.create_time}</span>
						</li>
						<li className="clearfix">
							<span className="name fl">用户描述</span>
							<span className="key fr ellipsis">{this.state.userInfo.attributes.description}</span>
						</li>
					</ul>
				</div>
				<div>
					<div className="titdiv clearfix mb-10 wmt wpropei">
						<span className="f14 fl"><b>产品配置</b></span>
						<span className="btn white s fr" onClick={this.addClick}>添加</span>
					</div>
					<UserB option={this.state.userBusinessList}/>
					<div className="titdiv clearfix mb-10 wmt">
						<span className="f14 fl"><b>用户充值记录</b></span>
						<span className="btn white s fr" onClick={this.chargeClick}>充值</span>
					</div>
					<ChargeInfo option={this.state.chargeInfo}/>
					<div className="txtlistw50 clearfix wover">
						<UserInfo option={this.state.userInfo}/>
						<UserCompany option={this.state.companyInfo}/>
					</div>
				</div>
      		</div>
      	</div>
		)
	}
});
module.exports = UserManage;