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
var AJAX_POST = require("util/ajax").AJAX_POST;
var FileUpload = require('react-fileupload');
var companyList = require('collection/companyList');

var Down = React.createClass({
	count:1,
	getInitialState:function(){
		return{
			buyBusinessIndex:[1],
			disable:true,
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
			comLicense:"",
			openBuness:"ulform mt-20 fl clearfix wclose",
			plz:"请选择",
			act:true,
			act2:true,
			companyList:new companyList(),
			companyCode:""
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
		this.state.companyList.on("fetchDone",function(){
			this.setState({
				companyList:this.state.companyList
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
		this.state.companyList.fetch({
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
		var realName = this.state.realName;
		var comEmail = this.state.comEmail;
		var phone = this.state.phone;
		var option={};
		if(this.state.act){
			var charge_type = 2;
		}
		else{
			var charge_type = 1;
		}
		if(this.state.act2){
			var usertype = 1;
		}
		else{
			var usertype = 0;
		}
        option.data = {
              login_name:userName
        };
        option.url = "/user/verifyLoginNameUnique.action";
        option.success = function(data) {
            if(data=="0"){
			showMessage("存在同名账号");
			return;
            }
        }.bind(this);
       AJAX_POST(option);
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
		if(realName==""){
			showMessage("名字不能为空");
			return;
		}
		if(email==""){
			showMessage("邮箱不能为空");
			return;
		}
		if(phone==""){
			showMessage("手机不能为空");
			return;
		}
		if(this.state.companyCode==""){
			showMessage("请选择企业信息");
			return;
		}
		if(this.state.plz=="新建企业信息"){
			if(this.state.comName==""){
				showMessage("公司名称为空");
				return;
			}
			if(this.state.comPhone==""){
				showMessage("公司号码为空");
				return;
			}
			if(this.state.comContacts==""){
				showMessage("公司联系人为空");
				return;
			}
			if(this.state.comLegalPerson==""){
				showMessage("公司法人为空");
				return;
			}
			if(this.state.comAddress==""){
				showMessage("公司地址为空");
				return;
			}
			if(this.state.comEmail=="" || !isEmail(comEmail)){
				showMessage("企业邮箱格式不正确");
				return;
			}
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
				charge_type:charge_type,
				usertype:usertype,
				comName:this.state.comName,
				comPhone:this.state.comPhone,
				comContacts:this.state.comContacts,
				comEmail:this.state.comEmail,
				comAddress:this.state.comAddress,
				comLegalPerson:this.state.comLegalPerson,
				comLicense:this.state.comLicense,
				companyCode:this.state.companyCode
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
	pathmain: function() {
		subject.trigger("navigate",{
	      path:"usermanage"
	    });
	},
	showClickHandler: function() {
		this.setState({
			showMenu: !this.state.showMenu
		});
	},
	closeBussiness:function (item) {
		this.setState({
			openBuness: "ulform mt-20 fl clearfix",
			showMenu: !this.state.showMenu,
			plz:item.get("name"),
			comName:item.get("name"),
			comPhone:item.get("duty_man"),
			comContacts:item.get("responsor"),
			comEmail:item.get("email"),
			comAddress:item.get("address"),
			comLegalPerson:item.get("duty_man"),
			comLicense:item.get("licence_code"),
			disable:"true",
			companyCode:item.get("id")
		});	
	},
	closeBussiness2:function (name) {
		this.setState({
			openBuness: "ulform mt-20 fl clearfix",
			showMenu: !this.state.showMenu,
			plz:"新建企业信息",
			comName:"",
			comPhone:"",
			comContacts:"",
			comEmail:"",
			comAddress:"",
			comLegalPerson:"",
			comLicense:"",
			disable:false,
			companyCode:"0"
		});	
	},
	closeBussiness3:function (name) {
		this.setState({
			openBuness: "ulform mt-20 fl clearfix",
			showMenu: !this.state.showMenu,
			plz:"个人用户（无企业信息）",
			comName:"",
			comPhone:"",
			comContacts:"",
			comEmail:"",
			comAddress:"",
			comLegalPerson:"",
			comLicense:"",
			disable:true,
			companyCode:"-1"
		});	
	},
	chargeType:function (e) {
		if(e.target.getAttribute('class')==""){
			this.setState({
				act: !this.state.act
			});
		}
	},
	chargeType2:function (e) {
		if(e.target.getAttribute('class')==""){
			this.setState({
				act2: !this.state.act2
			});
		}
	},
	render: function() {
var options={
            baseUrl: "http://192.168.31.120:8080/opmanage/company/uploadLicenceFile.action",
            chooseAndUpload:false,
            accept: '.png',
            fileFieldName:'file',
            uploadError : function(err){
                modalHelp.show({
                    Dialog: Dialog,
                    option: {
                        type: "error",
                        title: "提示",
                        content: err.message,
                        ok: {text: "好的"}
                    }
                });
            },
            uploadFail : function(resp){
                modalHelp.show({
                    Dialog: Dialog,
                    option: {
                        type: "error",
                        title: "提示",
                        content: resp,
                        ok: {text: "好的"}
                    }
                });
            },
            uploadSuccess: function(){
                modalHelp.show({
                    Dialog: Dialog,
                    option: {
                        type: "succeed",//error question succeed warning
                        title: "提示",
                        content: "上传成功",
                        ok: {text: "好的"}
                    }
                });
            }.bind(this)
        }
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
								<input className="w405" type="password" placeholder="请输入..." value={this.state.pwd} onChange={this.pwdChange}/>
							</div>
						</li>
						<li className="clearfix">
							<div className="name w75 fl">密码确认<span className="tip">*</span></div>
							<div className="substance dw fl">
								<input className="w405" type="password" placeholder="请输入..." value={this.state.pwdConfirm} onChange={this.pwdConfirmChange}/>
							</div>
						</li>
					</ul>
					<ul className="radiobtn wradiobtnw">
						<li className={this.state.act ? "" : "active"} itemID="1" onClick={this.chargeType}>预付费</li>
						<li className={this.state.act ? "active" : ""} itemID="2" onClick={this.chargeType}>后付费</li>
					</ul>
					<br/>
					<br/>
					<ul className="radiobtn wradiobtnw2">
						<li className={this.state.act2 ? "" : "active"} itemID="1" onClick={this.chargeType2}>普通用户</li>
						<li className={this.state.act2 ? "active" : ""} itemID="2" onClick={this.chargeType2}>开发者</li>
					</ul>
				</div>
				<div className="widthwrap">
					<div className="txtlistw50 clearfix">
						<div className="txtlistwrap pl-20">
							<p className="f16"><b>用户资料</b></p>
							<ul className="ulform mt-20 fl clearfix">

								<li className="clearfix">
									<div className="name w75 fl">姓名<span className="tip">*</span></div>
									<div className="substance fl">
										<input className="w405" type="text" placeholder="请输入..." value={this.state.realName} onChange={this.realNameChange}/>
									</div>
								</li>
								<li className="clearfix">
									<div className="name w75 fl">E-mail<span className="tip">*</span></div>
									<div className="substance fl">
										<input className="w405" type="text" placeholder="请输入..." value={this.state.email} onChange={this.emailChange}/>
									</div>
								</li>
								<li className="clearfix">
									<div className="name w75 fl">电话<span className="tip">*</span></div>
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

						<ul className="ulform clearfix">
						<li className="clearfix">
							<div className="name fl awayleft">选择业务</div>
							<div className="substance dw fl">
								<div className={this.state.showMenu ? "selectbox dw pos-rel open" : "selectbox dw pos-rel"}>
									<div className="selected pos-rel cursor">
										<input className="cursor"  type="text" onClick={this.showClickHandler} value={this.state.plz}/>
										<em className="pos-abs"></em>
									</div>
									<ul className="selectlist">
									<li onClick={this.closeBussiness3}>个人用户（无企业信息）</li>
									<li onClick={this.closeBussiness2}>新建企业信息</li>
									{this.state.companyList.map(function(item,index){
										return (
											<li key={index} onClick={this.closeBussiness.bind(this,item)}>
											{item.get("name")}
											</li>
										)
									}.bind(this))}
									</ul>
								</div>
							</div>
						</li>
						</ul>


							<ul className={this.state.openBuness}>
								<li className="clearfix">
									<div className="name w75 fl">公司名称<span className="tip">*</span></div>
									<div className="substance fl">
										<input className="w405" type="text" placeholder="请输入..." disabled={this.state.disable} onChange={this.valueChange} id="comName" value={this.state.comName}/>
									</div>
								</li>
								<li className="clearfix">
									<div className="name w75 fl">法人<span className="tip">*</span></div>
									<div className="substance fl">
										<input className="w405" type="text" placeholder="请输入..." disabled={this.state.disable} onChange={this.valueChange} id="comLegalPerson" value={this.state.comLegalPerson}/>
									</div>
								</li>
								<li className="clearfix">
								<div className="name w75 fl">执照<span className="tip">*</span></div>
						       <FileUpload options={options}>
						       
						            <button className="btn blueline" ref="chooseBtn">添加</button>
						            <button className="btn blueline" ref="uploadBtn">上传</button>
						           
						        </FileUpload>
						         <span className="bluetxt ml-10">企业执照.png</span>				
								</li>
								<li className="clearfix">
									<div className="name w75 fl">联系人<span className="tip">*</span></div>
									<div className="substance fl">
										<input className="w405" type="text" placeholder="请输入..." disabled={this.state.disable} onChange={this.valueChange} id="comContacts" value={this.state.comContacts}/>
									</div>
								</li>
								<li className="clearfix">
									<div className="name w75 fl">E-mail<span className="tip">*</span></div>
									<div className="substance dw fl">
										<input className="w405" type="text" placeholder="请输入..." disabled={this.state.disable} onChange={this.valueChange} id="comEmail" value={this.state.comEmail}/>
									</div>
								</li>
								<li className="clearfix">
									<div className="name w75 fl">电话<span className="tip">*</span></div>
									<div className="substance dw fl">
										<input className="w405" type="text" placeholder="请输入..." disabled={this.state.disable} onChange={this.valueChange} id="comPhone" value={this.state.comPhone}/>
									</div>
								</li>
								<li className="clearfix">
									<div className="name w75 fl">地址<span className="tip">*</span></div>
									<div className="substance dw fl">
										<input className="w405" type="text" placeholder="请输入..." disabled={this.state.disable} onChange={this.valueChange} id="comAddress" value={this.state.comAddress}/>
									</div>
								</li>
							</ul>
						</div>
					</div>
					<div className="winlinebtnmid">
					<div className="ml-20 mt-20 mb-40 inlineblc">
						<span className="btn xxl" onClick={this.addUser}><b className="f18">提交</b></span>
					</div>
					<div className="ml-20 mt-20 mb-40 inlineblc">
						<span className="btn xxl white wbluecolor" onClick={this.pathmain}><b className="f18">取消</b></span>
					</div>
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