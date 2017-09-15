var React = require('react');
var TopBar = require("bll/components/topbar/topbar.jsx");
var TerseUI = require('terseui');
var modalHelp = TerseUI.Frame.modalHelp;
var Dialog = TerseUI.Frame.Dialog;
var Updown = TerseUI.Frame.UpDown;
var userAdd = require('collection/userAdd');
var subject = require("model/global/subject");
var isPasswd = require("util/validcheck").isPasswd;
var isEmail = require("util/validcheck").emailCheck;
var showMessage = require("util/validcheck").showMessage;
var allBusiness = require('collection/businessAll');
var removeByValue = require("util/validcheck").removeByValue;

var Down = React.createClass({
	count:1,
	getInitialState:function(){
		return{
			buyBusinessIndex:[1],
			allBusiness:new allBusiness(),
			userAdd:new userAdd(),
			userName:"",
			pwd:"",
			pwdConfirm:"",
			realName:"",
			email:"",
			phone:"",
			desc:"",
			comName:"",
			comPhone:"",
			comContacts:"",
			comEmail:"",
			comAddress:"",
			comLegalPerson:"",
			comLicense:""
		};
	},
	componentDidMount: function() {
		this.state.userAdd.on("userAddDone",function(){
			this.setState({
				userAdd:this.state.userAdd
			});
			//跳转到列表页面
			subject.trigger("navigate", {
				path: 'usermanage'
			});
		}.bind(this));
		this.state.allBusiness.on("fetchDone",function(){
			this.setState({
				allBusiness:this.state.allBusiness
			});
		}.bind(this));
		this.getAllBusiness();
	},
	getAllBusiness:function(){
		this.state.allBusiness.fetch({
			loadingFlag:true,
			param:{
				loginUserId:""
			}
		});
	},
	userNameChange:function (e) {
		this.setState({
			userName:e.target.value
		})
	},
	pwdChange:function (e) {
		this.setState({
			pwd:e.target.value
		})
	},
	pwdConfirmChange:function (e) {
		this.setState({
			pwdConfirm:e.target.value
		})
	},
	realNameChange:function (e) {
		this.setState({
			realName:e.target.value
		})
	},
	emailChange:function (e) {
		this.setState({
			email:e.target.value
		})
	},
	phoneChange:function (e) {
		this.setState({
			phone:e.target.value
		})
	},
	descChange:function (e) {
		this.setState({
			desc:e.target.value
		})
	},
	valueChange:function (e) {
		var id = e.target.id;
		var value = e.target.value;
		if(id=="comName"){
			this.setState({
				comName:value
			})
		}else if(id=="comPhone"){
			this.setState({
				comPhone:value
			})
		}else if(id=="comContacts"){
			this.setState({
				comContacts:value
			})
		}else if(id=="comEmail"){
			this.setState({
				comEmail:value
			})
		}else if(id=="comAddress"){
			this.setState({
				comAddress:value
			})
		}else if(id=="comLegalPerson"){
			this.setState({
				comLegalPerson:value
			})
		}else if(id=="comLicense"){
			this.setState({
				comLicense:value
			})
		}
	},
	addUser:function () {
		var userName = this.state.userName;
		var pwd = this.state.pwd;
		var pwdConfirm = this.state.pwdConfirm;
		var email = this.state.email;
		var comEmail = this.state.comEmail;
		if(userName==""){
			showMessage("账号不能为空");
			return;
		}
		if(!isPasswd(pwd)){
			showMessage("密码只能输入8-20个字母、数字、下划线");
			return;
		}
		if(pwd!=pwdConfirm){
			showMessage("新密码不一致");
			return;
		}
		if(email!="" && !isEmail(email)){
			showMessage("个人邮箱格式不正确");
			return;
		}
		if(comEmail!="" && !isEmail(comEmail)){
			showMessage("企业邮箱格式不正确");
			return;
		}


		this.state.userAdd.userAddDoing({
			loadingFlag:true,
			param:{
				loginUserId:"",
				userName:userName,
				pwd:pwd,
				realName:this.state.realName,
				email:email,
				phone:this.state.phone,
				desc:this.state.desc,
				comName:this.state.comName,
				comPhone:this.state.comPhone,
				comContacts:this.state.comContacts,
				comEmail:comEmail,
				comAddress:this.state.comAddress,
				comLegalPerson:this.state.comLegalPerson,
				comLicense:this.state.comLicense
			}
		});
	},
	//新增业务输入框
	toAddBusiness:function () {
		var _buyBusinessIndex = this.state.buyBusinessIndex;
		_buyBusinessIndex.push(this.count+1);
		this.count++;
		this.setState({
			buyBusinessIndex:_buyBusinessIndex
		})
	},
	//删除业务输入框
	toDeleteBusiness:function (value) {
		console.log("1===="+value);
		var _buyBusinessIndex = this.state.buyBusinessIndex;
		console.log("2===="+_buyBusinessIndex.valueOf());
		removeByValue(_buyBusinessIndex,value);
		console.log("3===="+_buyBusinessIndex.valueOf());
		this.setState({
			buyBusinessIndex:_buyBusinessIndex
		})
	},
	render: function() {
		return (
			<div className="widthmodule">
				<div className="widthwrap">
					<div className="navtit mt-20  pl-20">新建用户</div>
					<ul className="ulform mt-30  pl-20 clearfix">
						<li className="clearfix">
							<div className="name w75 fl">账号<span className="tip">*</span></div>
							<div className="substance dw fl">
								<input className="w405" type="text" placeholder="请输入..." value={this.state.userName} onChange={this.userNameChange} />
							</div>
						</li>
						<li className="clearfix">
							<div className="name w75 fl">密码<span className="tip">*</span></div>
							<div className="substance dw fl">
								<input className="w405" type="text" placeholder="请输入..." value={this.state.pwd} onChange={this.pwdChange}/>
							</div>
						</li>
						<li className="clearfix">
							<div className="name w75 fl">密码确认<span className="tip">*</span></div>
							<div className="substance dw fl">
								<input className="w405" type="text" placeholder="请输入..." value={this.state.pwdConfirm} onChange={this.pwdConfirmChange}/>
							</div>
						</li>
					</ul>
				</div>
				<div className="basicsuc">
					<div className="basicsucwrap">
						<div className="navtit mb-10">业务购买</div>
						{
							this.state.buyBusinessIndex.map(function(value,index){
								return (
									<div className="sucformlist clearfix" key={index}>
										<div className="selectbox dw pos-rel fl">
											<select>
												{this.state.allBusiness.map(function(item,index){
													return <option key={index} value={item.get("id")}>{item.get("name")}</option>
												}.bind(this))}
											</select>
										</div>
										<div className="selectbox dw pos-rel fl ml-10">
											<div className="selected pos-rel cursor">
												<input className="cursor" type="text" />
												<em className="pos-abs"></em>
											</div>
											<ul className="selectlist">
												<li>预付费</li>
												<li>预付费</li>
											</ul>
										</div>
										<div className="fl ml-10">
											<span>购买数量：</span>
											<input placeholder="请输入..." type="text"  />
										</div>
										<div className="fr ml-10">
											<span className="cursor bluetxt lh32" onClick={this.toDeleteBusiness.bind(this,value)}>删除</span>
										</div>
									</div>
								)
							}.bind(this))
						}
						<div>
							<span className="btn blueline mt-15" onClick={this.toAddBusiness}>添加</span>
						</div>
					</div>
				</div>	
				<div className="widthwrap">
					<div className="txtlistw50 clearfix">
						<div className="txtlistwrap pl-20">
							<p className="f16"><b>用户资料</b></p>
							<ul className="ulform mt-20 fl clearfix">

								<li className="clearfix">
									<div className="name w75 fl">姓名</div>
									<div className="substance fl">
										<input className="w405" type="text" placeholder="请输入..." value={this.state.realName} onChange={this.realNameChange}/>
									</div>
								</li>
								<li className="clearfix">
									<div className="name w75 fl">E-mail</div>
									<div className="substance fl">
										<input className="w405" type="text" placeholder="请输入..." value={this.state.email} onChange={this.emailChange}/>
									</div>
								</li>
								<li className="clearfix">
									<div className="name w75 fl">电话</div>
									<div className="substance fl">
										<input className="w405" type="text" placeholder="请输入..." value={this.state.phone} onChange={this.phoneChange}/>
									</div>
								</li>
								<li className="clearfix">
									<div className="name w75 fl">描述</div>
									<div className="substance fl">
										<textarea className="w405" value={this.state.desc} onChange={this.descChange}></textarea>
									</div>
								</li>
							</ul>
						</div>
						<div className="txtlistwrap pl-20">
							<p className="f16"><b>企业资料</b></p>
							<ul className="ulform mt-20 fl clearfix">
								<li className="clearfix">
									<div className="name w75 fl">公司名称</div>
									<div className="substance fl">
										<input className="w405" type="text" placeholder="请输入..." onChange={this.valueChange} id="comName" value={this.state.comName}/>
									</div>
								</li>
								<li className="clearfix">
									<div className="name w75 fl">法人</div>
									<div className="substance fl">
										<input className="w405" type="text" placeholder="请输入..." onChange={this.valueChange} id="comLegalPerson" value={this.state.comLegalPerson}/>
									</div>
								</li>
								<li className="clearfix">
									<div className="name w75 fl">执照</div>
									<div className="substance fl">
										<span className="btn blueline">添加</span>
										<span className="bluetxt ml-10">企业执照.png</span>
									</div>
								</li>
								<li className="clearfix">
									<div className="name w75 fl">联系人</div>
									<div className="substance fl">
										<input className="w405" type="text" placeholder="请输入..." onChange={this.valueChange} id="comContacts" value={this.state.comContacts}/>
									</div>
								</li>
								<li className="clearfix">
									<div className="name w75 fl">E-mail</div>
									<div className="substance dw fl">
										<input className="w405" type="text" placeholder="请输入..." onChange={this.valueChange} id="comEmail" value={this.state.comEmail}/>
									</div>
								</li>
								<li className="clearfix">
									<div className="name w75 fl">电话</div>
									<div className="substance dw fl">
										<input className="w405" type="text" placeholder="请输入..." onChange={this.valueChange} id="comPhone" value={this.state.comPhone}/>
									</div>
								</li>
								<li className="clearfix">
									<div className="name w75 fl">地址</div>
									<div className="substance dw fl">
										<input className="w405" type="text" placeholder="请输入..." onChange={this.valueChange} id="comAddress" value={this.state.comAddress}/>
									</div>
								</li>
							</ul>
						</div>
					</div>
					<div className="ml-20 mt-20 mb-40">
						<span className="btn xxl" onClick={this.addUser}><b className="f18">提交</b></span>
					</div>
				</div>
      		</div>
		);
	}
});

var UserManage = React.createClass({
	render: function() {
		var top = <TopBar />;
		var down = <Down />;
		return (
			<Updown up={top} down={down} topheight={"56px"} />

		)
	}
});
module.exports = UserManage;