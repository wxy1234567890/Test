var React = require('react');
var ReactDom = require('react-dom');
var TerseUI = require('terseui');
var modalHelp = TerseUI.Frame.modalHelp;
var Dialog = TerseUI.Frame.Dialog;
var Scroll = TerseUI.Scroll;
var classNames = require("classnames/bind");
var subject = require("model/global/subject");
var accessIntro = require('collection/accessIntro');

var DevLop = React.createClass({
	getInitialState:function(){
		return{
			status:0,
			accessIntro: new accessIntro(),
		};
	},
	componentDidMount: function() {

		this.state.accessIntro.on("fetchDone",function(total){
			this.setState({
				accessIntro:this.state.accessIntro
			},console.log(this.state.accessIntro.toArray()),123);
			if(this.state.accessIntro&&this.state.accessIntro.length!=0){
				// this.getAppInfo(this.state.accessIntro.toArray()[0].get('id'),this.state.accessIntro.toArray()[0].get('name'));
			}
		}.bind(this));

		this.getUserList();
	},
	getUserList:function(){
		this.state.accessIntro.fetch({
			loadingFlag:true,
			param:{}
		});
	},
	accountApplication:function(){
		this.state.status=0;
		this.setState({
			status:this.state.status
		});
	},
	interfaceTesting:function(){
		this.state.status=1;
		this.setState({
			status:this.state.status
		});
	},
	interfaceApplication:function(){
		this.state.status=2;
		this.setState({
			status:this.state.status
		});		
	},
	interfaceOpened:function(){
		this.state.status=3;
		this.setState({
			status:this.state.status
		});
	},
	render:function(){
    	return (
    		<div className="userlist2" style={{"padding":"2px 30px"}}>
				<div className="search-area clearfix" style={{"padding":"15px 0","borderBottom":"1px solid #e9e9e9"}}>
					<span className="wtitle2">经营管理平台服务测试</span>
  				</div>
  				<div className='clearfix' style={{'padding': '15px 0'}}>
					<ul className='servicebtn fl'>
						<a href="#001"><li className={this.state.status==0?'active':''} onClick={this.accountApplication}>账号申请</li></a>
						<a href="#002"><li className={this.state.status==1?'active':''} onClick={this.interfaceTesting}>接口测试</li></a>
						<a href="#003"><li className={this.state.status==2?'active':''} onClick={this.interfaceApplication}>接口申请</li></a>
						<a href="#004"><li className={this.state.status==3?'active':''} onClick={this.interfaceOpened}>接口开通</li></a>
					</ul>
				</div>
				<div className="mt-20">
					<h3 className="pt-10"><a name="001">账号申请：</a></h3>
					<p className="pt-10">注册成为开发者，需要</p>
					<h6 className="pt-10">(1)联系相关管理人员验证身份信息</h6>
					<h6 className="pt-10">(2)分配开发者账号和接口调用秘钥</h6>
					<h6 className="pt-10">(1)联系相关管理人员验证身份信息</h6>
					<h6 className="pt-10">(2)分配开发者账号和接口调用秘钥</h6>
					<h6 className="pt-10">(1)联系相关管理人员验证身份信息</h6>
					<h6 className="pt-10">(2)分配开发者账号和接口调用秘钥</h6>
					<h6 className="pt-10">(1)联系相关管理人员验证身份信息</h6>
					<h6 className="pt-10">(2)分配开发者账号和接口调用秘钥</h6>
					<h6 className="pt-10">(1)联系相关管理人员验证身份信息</h6>
					<h6 className="pt-10">(2)分配开发者账号和接口调用秘钥</h6>
				</div>
				<div className="mt-20">
					<h3 className="pt-10"><a name="002">接口调试：</a></h3>
					<h6 className="pt-10">(1)使用分配的开发者账号在平台上模拟调用接口服务完成测试</h6>
					<h6 className="pt-10">(1)使用分配的开发者账号在平台上模拟调用接口服务完成测试</h6>
					<h6 className="pt-10">(1)使用分配的开发者账号在平台上模拟调用接口服务完成测试</h6>
					<h6 className="pt-10">(1)使用分配的开发者账号在平台上模拟调用接口服务完成测试</h6>
					<h6 className="pt-10">(1)使用分配的开发者账号在平台上模拟调用接口服务完成测试</h6>
					<h6 className="pt-10">(1)使用分配的开发者账号在平台上模拟调用接口服务完成测试</h6>
					<h6 className="pt-10">(1)使用分配的开发者账号在平台上模拟调用接口服务完成测试</h6>
					<h6 className="pt-10">(1)使用分配的开发者账号在平台上模拟调用接口服务完成测试</h6>
				</div>
				<div className="mt-20">
					<h3 className="pt-10"><a name="003">接口申请：</a></h3>
					<h6 className="pt-10">(1)开发者联系相关管理人员申请需要使用的接口服务</h6>
					<h6 className="pt-10">(2)审核开发者服务开通申请</h6>
					<h6 className="pt-10">(1)开发者联系相关管理人员申请需要使用的接口服务</h6>
					<h6 className="pt-10">(2)审核开发者服务开通申请</h6>
					<h6 className="pt-10">(1)开发者联系相关管理人员申请需要使用的接口服务</h6>
					<h6 className="pt-10">(2)审核开发者服务开通申请</h6>
					<h6 className="pt-10">(1)开发者联系相关管理人员申请需要使用的接口服务</h6>
					<h6 className="pt-10">(2)审核开发者服务开通申请</h6>
					<h6 className="pt-10">(1)开发者联系相关管理人员申请需要使用的接口服务</h6>
					<h6 className="pt-10">(2)审核开发者服务开通申请</h6>
					<h6 className="pt-10">(1)开发者联系相关管理人员申请需要使用的接口服务</h6>
					<h6 className="pt-10">(2)审核开发者服务开通申请</h6>
					<h6 className="pt-10">(1)开发者联系相关管理人员申请需要使用的接口服务</h6>
					<h6 className="pt-10">(2)审核开发者服务开通申请</h6>
					<h6 className="pt-10">(1)开发者联系相关管理人员申请需要使用的接口服务</h6>
					<h6 className="pt-10">(2)审核开发者服务开通申请</h6>
					<h6 className="pt-10">(1)开发者联系相关管理人员申请需要使用的接口服务</h6>
					<h6 className="pt-10">(2)审核开发者服务开通申请</h6>
					<h6 className="pt-10">(1)开发者联系相关管理人员申请需要使用的接口服务</h6>
					<h6 className="pt-10">(2)审核开发者服务开通申请</h6>
					<h6 className="pt-10">(1)开发者联系相关管理人员申请需要使用的接口服务</h6>
					<h6 className="pt-10">(2)审核开发者服务开通申请</h6>
					<h6 className="pt-10">(1)开发者联系相关管理人员申请需要使用的接口服务</h6>
					<h6 className="pt-10">(2)审核开发者服务开通申请</h6>
				</div>
				<div className="mt-20">
					<h3 className="pt-10"><a name="004">接口开通：</a></h3>
					<h6 className="pt-10">(1)开发者申请成功后，平台为开发者提供调用接口的相应权限</h6>
					<h6 className="pt-10">(1)开发者申请成功后，平台为开发者提供调用接口的相应权限</h6>
					<h6 className="pt-10">(1)开发者申请成功后，平台为开发者提供调用接口的相应权限</h6>
					<h6 className="pt-10">(1)开发者申请成功后，平台为开发者提供调用接口的相应权限</h6>
					<h6 className="pt-10">(1)开发者申请成功后，平台为开发者提供调用接口的相应权限</h6>
					<h6 className="pt-10">(1)开发者申请成功后，平台为开发者提供调用接口的相应权限</h6>
					<h6 className="pt-10">(1)开发者申请成功后，平台为开发者提供调用接口的相应权限</h6>
					<h6 className="pt-10">(1)开发者申请成功后，平台为开发者提供调用接口的相应权限</h6>
					<h6 className="pt-10">(1)开发者申请成功后，平台为开发者提供调用接口的相应权限</h6>
					<h6 className="pt-10">(1)开发者申请成功后，平台为开发者提供调用接口的相应权限</h6>
				</div>
			</div>
    	)
  	}
});

module.exports = DevLop;