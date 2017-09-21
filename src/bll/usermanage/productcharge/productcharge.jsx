var React = require('react');
var TerseUI = require('terseui');
var Scroll = TerseUI.Scroll;
var modalHelp = TerseUI.Frame.modalHelp;
var Dialog = TerseUI.Frame.Dialog;
var Select = TerseUI.Select;
var addDialog = require("./add.jsx");
var subject = require("model/global/subject");
var projectList = require('collection/projectList');
var userInfo = require('collection/userInfo');
var userList = require('collection/wuserList');
var userDelete = require('collection/userDelete');
var userFreeze = require('collection/userFreeze');
var editPwdDialog = require("./editPwd.jsx");
var editUserDialog = require("./editUser.jsx");
var getY_M = require("util/validcheck").getY_M;
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
								<th width="15%">用户名ID</th>
								<th width="15%">用户名</th>
								<th width="15%">计费坐席数</th>
								<th width="15%">呼叫总时长</th>
								<th width="15%">总费用(元)</th>
								<th width="25%">开通时间</th>
							</tr>
						</thead>
						<tbody>
						{userList.map(function(item,index){
							console.log(item);
							return (
							<tr key={index}>
								<td width="15%">
									<span className="ellipsis wcursor wvisible">{item.get('id')}</span>
								</td>
								<td width="15%" onClick={this.toDetail.bind(this,item.get("id"))}>
									<span className="ellipsis wcursor wvisible">{item.get('real_name')}</span>
								</td>
								<td width="15%">
									<span className="ellipsis wcursor wvisible">{item.get('seatCount')}</span>
								</td>
								<td width="15%">
									<span className="ellipsis wcursor wvisible">{item.get('callTime')}</span>
								</td>
								<td width="15%">
									<span className="ellipsis wcursor wvisible" >{item.get('totalConsume')==0?"0(套餐内计费)":item.get('totalConsume')}</span>
								</td>								
								<td width="25%">
									<span className="ellipsis wcursor wvisible">{item.get('create_time')}</span>
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
	toShowUserList:function (productId,productName,productType) {
		//调用父类中方法
		this.props.getUserList(productId,productName,productType);
	},
	render: function() {
		var projectList = this.props.option;
		return(
			<ul>
				{projectList.map(function(item,index){
					return (
						<li key={index} className="clearfix" onClick={this.toShowUserList.bind(this,item.get('id'),item.get('name'),item.get('type'))}>
							<div className="userimfor fl">
								<img className="fl radius v-m" src={item.get('type') == 1?require( "../../../images/pic1.png"):require( "../../../images/call1.png")} />
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
			userDelete:new userDelete(),
			count:0
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
	getUserList:function(id,name,type){
		this.state.name=name;
		this.state.status=type;
		this.setState({
			name:this.state.name,
			status:this.state.status
		});
		window.proid = id; 
		this.state.userList.fetch({
			loadingFlag:true,
			param:{
				userId:id
			}
		});
	},
	search:function (e) {
		window.month=e.target.value;
		this.getUserBusiness(userId);
	},
	render: function() {
		if(this.state.count==0){
		this.state.count++;
		window.month=getY_M(0);
		}
		var dateArray = [getY_M(0),getY_M(-1),getY_M(-2),getY_M(-3),getY_M(-4)];
		console.log(this.state.projectList.models[0],456);
		console.log(this.state.projectList,789);
		var getName=this.state.projectList.toArray()[0];
		console.log(getName);
		return (
			<div style={{"height":"545px"}}>
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
				<div className="wtitle1">{this.state.name?this.state.name:'暂无数据'}</div>
				<div className="tit">
					<Select ref="monthRef" label="选择月" labelWidth="45px" onChange={this.changeSelect}>
						{
							dateArray.map(function(item,index){
								return <option key={index} value={item}>{item}</option>
							}.bind(this))
						}
					</Select>
				</div>
				<UserList option={this.state.userList} />
				</div>
      		</div>
		)
	}
});
module.exports = UserManage;