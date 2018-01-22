var React = require('react');
var userList = require('collection/userList');
var TerseUI = require('terseui');
var modalHelp = TerseUI.Frame.modalHelp;
var Dialog = TerseUI.Frame.Dialog;
var Select = TerseUI.Select;
var Pagetool = TerseUI.Frame.PageTool;
var Scroll = TerseUI.Scroll;
var userBusiness = require('collection/userBusiness');
var subject = require("model/global/subject");
var getY_M = require("util/validcheck").getY_M;

//用户列表
var UserList = React.createClass({
	getInitialState: function () {	
        return {
			userName:''
        }
    },
	toShowUserBusiness:function (userId) {
		//调用父类中方法
		this.props.getUserBusiness(userId);
	},
    choseUserName: function (value) {
        if (value.indexOf(this.state.userName) == -1) {
            return false;
        }
        return true;
    },
	render: function() {
		var option = this.props.option; 
		var userList = option.option1;
		this.state.userName = option.option2;
		return(
			<ul>
				{userList?userList.map(function(item,index){
					if(this.choseUserName(item.get('real_name'))){
						return (
							<li key={index} data-id={item.get('id')} className="clearfix" onClick={this.toShowUserBusiness.bind(this,item.get('id'))}>
								<div className="userimfor fl">
									<img className="fl radius v-m" src={require( "../../../images/head.jpg")} />
									<div className="imfordtl">
										<span className="name ellipsis">{item.get('real_name')}</span>
										<span>产品数：{item.get('subsProductCount')}个</span>
									</div>
								</div>
								<div className="fr ic-lock mt-10"></div>
							</li>
						)
					}
				}.bind(this)):<li className="tac">没有更多了</li>}
			</ul>
		)
	}
})
var UserB = React.createClass({
	toDetail:function (proid,protype) {
		var whref=window.location.href.split("#");
		var useid=this.props.useid;
		window.open(whref[0]+"#award"+"?proid="+proid+"&protype="+protype+"&useid="+useid,'_self');
	},
	render:function(){
		var style={"width":"400px","padding":"15px 0","margin":"0 10px"};
		// var typeName = ["预付费","先付费"];
		var userBusiness = this.props.option;
		// console.log(userBusiness);
		return (
			<ul className='rightul pos-absolute'>											
				{userBusiness&&userBusiness.length!=0?userBusiness.map(function(item,index){
					if(item.get('productType') == 0){
					return (
						<li key={index} style={style} className='rightli fl' onClick={this.toDetail.bind(this,item.get("id"),item.get("productType"))}>
							<span className='pic1 fl'><em></em></span>
							<p className='fl'>
								<span className='name f16'>{item.get('name')}</span>
								<span className='billing f12'>购买总计/消费总计/当月消费（条）</span>
								<span className='num f24'>{item.get('subsTotal')}/{item.get('useTotal')}/{item.get('useCount')}</span>
							</p>
						</li>
					)}else if(item.get('productType') == 1){
						return (
						<li key={index} style={style} className='rightli fl' onClick={this.toDetail.bind(this,item.get("id"),item.get("productType"))}>
							<span className='call1 fl'><em></em></span>
							<p className='fl'>
								<span className='name f16'>{item.get('name')}</span>
								<span className='billing f12'>开通坐席数/消费总金额/呼叫总时长</span>
								<span className='num f24'>{item.get('agentCount')}/{item.get('totalFee')}/{item.get('callTimeSum')}</span>
							</p>
						</li>
					)
					}
				}.bind(this)):'没有更多了'}
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
			month:getY_M(0)||"2017-09",
			count:0
		};
	},
	componentDidMount: function() {
		this.monthValue=this.refs.monthRef.getValue();
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
		this.state.userName=e.target.value;
		this.setState({
			// "userName":e.target.value
			userName:this.state.userName
		});
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
	userBusiness:function(month){
		this.state.userBusiness.fetch({
			loadingFlag:true,
			param:{
				userId:this.state.userId,
				month:this.state.month,
	            pagesize:"10",
	            pagenow:"1"
			}
		});
	},
	getUserBusiness:function(userId){
		this.state.userId = userId;		
		this.setState({
			userId:this.state.userId
		});	
		this.userBusiness();	
	},
	changeSelectSea:function (e) {
		this.state.month=e.target.value;
		this.userBusiness();
	},
	render:function(){
		if(this.state.count==0){
		this.state.count++;
		}
		var dateArray = [getY_M(0),getY_M(-1),getY_M(-2),getY_M(-3),getY_M(-4)];
		var optionInfo = {
			option1:this.state.userList,
			option2:this.state.userName
		};
    	return (
			<div className="userlist">
				<Scroll className="leftcon">
					<div className="search-area ml-20 mr-20 mb-10 clearfix">
						<div className="search-box pos-relative fl">
							<input placeholder="请输入查询内容" className="s-text" type="text" value={this.state.userName} onChange={this.userNameChange}/>
							<span className="s-btn"></span>
							<em className="del cursor pos-absolute"></em>
						</div>
					</div>
					<UserList option={optionInfo} getUserBusiness={this.getUserBusiness}/>
				</Scroll>
				<div className="userdtl">
					<div className="basicinfo">
						<span className="title ellipsis">产品计费</span>
						<div className="selectboxr selectbox pos-rel fr">
							<div className="tit">
								<div className='padding0'>
									<Select ref="monthRef" labelWidth="100px" onChange={this.changeSelectSea}>
										{
											dateArray.map(function(item,index){
												return <option key={index} value={item}>{item}</option>
											}.bind(this))
										}
									</Select>
								</div>
							</div>							
						</div>
					</div>					
					<UserB useid={this.state.userId} option={this.state.userBusiness}/>
				</div>
      		</div>
    	)
  	}
});

module.exports = UserCharge;