var React = require('react');
var userList = require('collection/userList');
var TerseUI = require('terseui');
var Select = TerseUI.Select;
var userBusiness = require('collection/userBusiness');
var subject = require("model/global/subject");
var getY_M = require("util/validcheck").getY_M;

//用户列表
var UserList = React.createClass({
	toShowUserBusiness:function (userId) {
		//调用父类中方法
		this.props.getUserBusiness(userId);
	},
	render: function() {
		var userList = this.props.option;
		return(
			<ul>
				{userList.map(function(item,index){
					return (
						<li key={index} className="clearfix" onClick={this.toShowUserBusiness.bind(this,item.get('id'))}>
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
var UserB = React.createClass({
	toDetail:function (proid) {
		window.proid = proid; 
		subject.trigger("navigate",{
			path:'award'
		});
	},
	render:function(){
		var typeName = ["预付费","先付费"];
		var userBusiness = this.props.option;
		return (
			<ul className='rightul pos-absolute'>
				{userBusiness.map(function(item,index){
					return (
						<li key={index} className='lione rightli fl' onClick={this.toDetail.bind(this,item.get("id"))}>
							<img className="fl" src={require(  "../../../images/pic1.png")} />
							<p className='fl'>
								<span className='name f16'>{item.get('name')}</span>
								<span className='billing f12'>购买总计/消费总计/当月消费（条）</span>
								<span className='num f24'>{item.get('subsTotal')}/{item.get('useTotal')}/{item.get('useCount')}</span>
							</p>
						</li>
					)
				}.bind(this))}
			</ul>
		)
	}
})

var UserCharge = React.createClass({
	getInitialState:function(){
		return{
			userName:"",//搜索值
			userList:new userList(),
			userBusiness:new userBusiness(),
			count:0
		};
	},
	componentDidMount: function() {
		this.state.userList.on("fetchDone",function(total){
			this.setState({
				userList:this.state.userList
			});
			this.getUserBusiness(this.state.userList.toArray()[0].get('id'));
		}.bind(this));
		this.state.userBusiness.on("fetchDone",function(){
			this.setState({
				userBusiness:this.state.userBusiness
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
	getUserBusiness:function(userId){
		window.userId = userId;
		console.log(window.month);
		this.state.userBusiness.fetch({
			loadingFlag:true,
			param:{
				userId:userId
			}
		});
	},
	search:function (e) {
		window.month=e.target.value;
		this.getUserBusiness(userId);
	},
	render:function(){
		if(this.state.count==0){
		this.state.count++;
		window.month=getY_M(0);
		}
		var dateArray = [getY_M(0),getY_M(-1),getY_M(-2),getY_M(-3),getY_M(-4)];
    	return (
			<div>
				<div className="userlist">
					<div className="search-area ml-20 mr-20 mb-10 clearfix">
						<div className="search-box pos-relative fl">
							<input placeholder="请输入查询内容" className="s-text" type="text" value={this.state.userName} onChange={this.userNameChange}/>
							<span className="s-btn" onClick={this.getUserList}></span>
							<em className="del cursor pos-absolute"></em>
						</div>
					</div>
					<UserList option={this.state.userList} getUserBusiness={this.getUserBusiness}/>
				</div>
				<div className="userdtl">
					<div className="basicinfo">
						<span className="title ellipsis">产品计费</span>
						<div className="selectboxr selectbox pos-rel fr">
						<div className="tit fl wtitmonth cursor">
						<div>
							<Select ref="monthRef" labelWidth="100px" onChange={this.search}>
								{
									dateArray.map(function(item,index){
										return <option key={index} value={item}>{item}</option>
									}.bind(this))
								}
							</Select>
						</div>
						</div>
							<ul className="selectlist">
								<li>获客专家</li>
								<li>获客专家</li>
							</ul>
						</div>
					</div>
					<UserB option={this.state.userBusiness}/>
				</div>
      		</div>
    	)
  	}
});

module.exports = UserCharge;