var React = require('react');
var TerseUI = require('terseui');
var Scroll = TerseUI.Scroll;
var modalHelp = TerseUI.Frame.modalHelp;
var Dialog = TerseUI.Frame.Dialog;
var addDialog = require("./add.jsx");
var subject = require("model/global/subject");
var projectList = require('collection/projectList');
var userInfo = require('collection/userInfo');
var userList = require('collection/wuserList');
var userDelete = require('collection/userDelete');
var userFreeze = require('collection/userFreeze');
var editPwdDialog = require("./editPwd.jsx");
var editUserDialog = require("./editUser.jsx");

//用户列表
var UserList = React.createClass({
	toDetail:function (userId) {
		window.userId = userId; 
		console.log(window.proid);
		console.log(window.userId);
		subject.trigger("navigate",{
			path:'award'
		});
	},
	render: function() {
		var userList = this.props.option;
		return(
				<div className="tablearea">
						<table>
						<thead>
							<tr>
								<th width="33%">用户名</th>
								<th width="33%">计费(元)</th>
								<th width="33%">计费时间</th>
							</tr>
						</thead>
						<tbody>
						{userList.map(function(item,index){
							console.log(item);
							return (
							<tr key={index}>
								<td width="33%" onClick={this.toDetail.bind(this,item.get("id"))}>
									<span className="ellipsis wcursor">{item.get('real_name')}</span>
								</td>
								<td width="33%">
									<span className="ellipsis">{item.get('totalConsume')==0?"0(套餐内计费)":item.get('totalConsume')}</span>
								</td>								
								<td width="33">
									<span className="ellipsis wvisible">{item.get('create_time')}</span>
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
//产品列表
var ProjectList = React.createClass({
	toShowUserList:function (productId) {
		//调用父类中方法
		this.props.getUserList(productId);
	},
	render: function() {
		var projectList = this.props.option;
		return(
			<ul>
				{projectList.map(function(item,index){
					return (
						<li key={index} className="clearfix" onClick={this.toShowUserList.bind(this,item.get('id'))}>
							<div className="userimfor fl">
								<img className="fl radius v-m" src={require( "../../../images/pic1.png")} />
								<div className="imfordtl">
									<span className="name ellipsis">{item.get('name')}</span>
									<span>使用费用：{item.get('useCharge')}元</span>
								</div>
							</div>
						</li>
					)
				}.bind(this))}
			</ul>
		)
	}
})

var UserManage = React.createClass({
	addClick: function() {
		modalHelp.show({
			Dialog: addDialog,
			option: {
				ok: {
					callback:function(){
						this.getProjectList();
					}.bind(this)
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
			projectList:new projectList(),
			userList:new userList(),
			userBaseInfo:{},
			userBusinessList:[],
			userFreeze:new userFreeze(),
			userDelete:new userDelete()
		};
	},
	componentDidMount: function() {
		this.state.projectList.on("fetchDone",function(){
			this.setState({
				projectList:this.state.projectList
			});
			this.getUserList(this.state.projectList.toArray()[0].get('id'));
		}.bind(this));
		this.state.userList.on("fetchDone",function(){
			this.setState({
				userList:this.state.userList
			});
		}.bind(this));
		this.getProjectList();
	},
	userNameChange:function (e) {
		this.setState({
			"userName":e.target.value
		})
	},
	getProjectList:function(){
		this.state.projectList.fetch({
			loadingFlag:true,
			param:{
				loginUserId:""
			}
		});
	},
	getUserList:function(id){
		window.proid = id; 
		this.state.userList.fetch({
			loadingFlag:true,
			param:{
				userId:id
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
							<span className="s-btn" onClick={this.getProjectList}></span>
							<em className="del cursor pos-absolute"></em>
						</div>
					</div>
					<ProjectList option={this.state.projectList} getUserList={this.getUserList}/>
				</Scroll>
				<div className="userdtl">
				<div className="wtitle1">应用接口管理</div>
				<UserList option={this.state.userList} />
				</div>
      		</div>
		)
	}
});
module.exports = UserManage;