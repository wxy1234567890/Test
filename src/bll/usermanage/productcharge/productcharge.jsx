var React = require('react');
var TerseUI = require('terseui');
var Scroll = TerseUI.Scroll;
var modalHelp = TerseUI.Frame.modalHelp;
var Dialog = TerseUI.Frame.Dialog;
var Select = TerseUI.Select;
var Pagetool = TerseUI.Frame.PageTool;
var addDialog = require("./add.jsx");
var subject = require("model/global/subject");
var projectList = require('collection/projectList');
var userInfo = require('collection/userInfo');
var userList = require('collection/wuserList');
var calluserList = require('collection/calluserList');
var userDelete = require('collection/userDelete');
var userFreeze = require('collection/userFreeze');
var editPwdDialog = require("./editPwd.jsx");
var editUserDialog = require("./editUser.jsx");
var getY_M = require("util/validcheck").getY_M;
//智呼类产品列表
var CallUserList = React.createClass({
	pagesize: 10,
    pagenow: 1,
    getInitialState: function () {	
        return {
        	feeOrder:0,
        }
    },
	toDetail:function (userId,proid,protype) {
		var whref=window.location.href.split("#");
		window.open(whref[0]+"#award"+"?proid="+proid+"&protype="+protype+"&useid="+userId,'_self');
		// subject.trigger("navigate",{
		// 	path:'award'
		// });
	},
	toatlAplay:function () {
		if(this.state.feeOrder==0){
			this.state.feeOrder=1;
		}else if(this.state.feeOrder==1){
          	this.state.feeOrder=2;
     	}else {
         	this.state.feeOrder=1;
     	}
      	this.props.getUserList1(this.state.feeOrder);
    },
    pageTo: function (page) {
        this.pagenow = page;
        this.props.getUserList3(this.pagenow,this.pagesize);
    },
	render: function() {
		var topDown="px-text";
		if(this.state.feeOrder==0){
			topDown="px-text";
		}else if(this.state.feeOrder==1){
            topDown="px-text downt";
        }else{
        	topDown="px-text upt";
        }    
        var option = this.props.option;    
		var calluserList = option.option1, total = option.option2, proid = option.option3, protype = option.option4;
		var pageInfo = {
				pageIndex: this.pagenow,
				pageSize: this.pagesize,
				total: total
		};

		return(<div>
				<div className="tablearea">
					<table>
						<thead>
							<tr>
								<th width="20%">用户名</th>
								<th width="20%">计费坐席数</th>
								<th width="15%">呼叫总时长</th>
								<th width="15%" className={topDown} onClick={this.toatlAplay}>总费用(元)<em className="px"></em></th>
								<th width="30%">开通时间</th>
							</tr>
						</thead>
						<tbody>
						{calluserList&&calluserList.length!=0?calluserList.map(function(item,index){
							// console.log(item);
							console.log(calluserList);
							return (
							<tr key={index}>
								<td width="20%" onClick={this.toDetail.bind(this,item.get("userId"),proid,protype)}>
									<span className="ellipsis wcursor wvisible">{item.get('realName')}</span>
								</td>
								<td width="20%" onClick={this.toDetail.bind(this,item.get("userId"),proid,protype)}>
									<span className="ellipsis wcursor wvisible">{item.get('agentCount')}</span>
								</td>
								<td width="15%" onClick={this.toDetail.bind(this,item.get("userId"),proid,protype)}>
									<span className="ellipsis wcursor wvisible">{item.get('callTimeSum')}</span>
								</td>
								<td width="15%" onClick={this.toDetail.bind(this,item.get("userId"),proid,protype)}>
									<span className="ellipsis wcursor wvisible" >{item.get('totalFee')==0?"0(套餐内计费)":item.get('totalFee')}</span>
								</td>								
								<td width="30%" onClick={this.toDetail.bind(this,item.get("userId"),proid,protype)}>
									<span className="ellipsis wcursor wvisible">{item.get('subsDate')}</span>
								</td>								
							</tr>
							)
						}.bind(this)):(<tr className="tac"><td>没有找到符合你查询条件的记录</td></tr>)}						
						</tbody>
					</table>
				</div>			
	            <div className="pagebar mt-20">
                    <div className="pagetool">
                        <Pagetool option={pageInfo} onPageTo={this.pageTo}/>
                    </div>
                </div>
	        </div>
		)
	}
})
//接口类产品列表
var UserList = React.createClass({
	pagesize: 10,
    pagenow: 1,
    getInitialState: function () {
        return {
        	feeOrder:0,
        }
    },
	toDetail:function (userId,proid,protype) {
		var whref=window.location.href.split("#");
		window.open(whref[0]+"#award"+"?proid="+proid+"&protype="+protype+"&useid="+userId,'_self');
		// subject.trigger("navigate",{
		// 	path:'award'
		// });
	},
	toatlAplay:function () {
		if(this.state.feeOrder==0){
			this.state.feeOrder=1;
		}else if(this.state.feeOrder==1){
          	this.state.feeOrder=2;
      	}else {
          	this.state.feeOrder=1;
      	}
      	this.props.getUserList2(this.state.feeOrder);
    },
    pageTo: function (page) {
        this.pagenow = page;
        this.props.getUserList4(this.pagenow,this.pagesize);
    },
	render: function() {
		var topDown="px-text";
		if(this.state.feeOrder==0){
			topDown="px-text";
		}else if(this.state.feeOrder==1){
            topDown="px-text downt";
        }else{
        	topDown="px-text upt";
        }
		var option = this.props.option;    
		var userList = option.option1, total = option.option2, proid = option.option3, protype = option.option4;
		var pageInfo = {
				pageIndex: this.pagenow,
				pageSize: this.pagesize,
				total: total
		};
		return(<div>
				<div className="tablearea">
						<table>
						<thead>
							<tr>
								<th width="33%">用户名</th>
								<th width="33%" className={topDown} onClick={this.toatlAplay}>计费(元)<em className="px"></em></th>
								<th width="34%">计费时间</th>
							</tr>
						</thead>
						<tbody>
						{userList&&userList.length!=0?userList.map(function(item,index){
							// console.log(item);
							return (
							<tr key={index}>
								<td width="33%" onClick={this.toDetail.bind(this,item.get("user_id"),proid,protype)}>
									<span className="ellipsis wcursor">{item.get('real_name')}</span>
								</td>
								<td width="33%">
									<span className="ellipsis">{item.get('totalConsume')==0?"0(套餐内计费)":item.get('totalConsume')}</span>
								</td>								
								<td width="34">
									<span className="ellipsis wvisible">{item.get('create_time')}</span>
								</td>								
							</tr>
							)
						}.bind(this)):(<tr className="tac"><td>没有找到符合你查询条件的记录</td></tr>)}						
						</tbody>
					</table>
				</div>
			<div className="pagebar mt-20">
                <div className="pagetool">
                    <Pagetool option={pageInfo} onPageTo={this.pageTo}/>
                </div>
            </div>
        </div>
		)
	}
})
//产品列表
var ProjectList = React.createClass({
	getInitialState: function () {	
        return {
			userName:''
        }
    },
	toShowUserList:function (productId,productName,productType) {
		//调用父类中方法
		this.props.getUserList(productId,productName,productType);
	},
    choseUserName: function (value) {
        if (value.indexOf(this.state.userName) == -1) {
            return false;
        }
        return true;
    },
	render: function() {
		var option = this.props.option; 
		var projectList = option.option1;
		this.state.userName = option.option2;
		return(
			<ul>
				{projectList?projectList.map(function(item,index){
					if(this.choseUserName(item.get('name'))){
						return (
							<li key={index} className="clearfix" onClick={this.toShowUserList.bind(this,item.get('id'),item.get('name'),item.get('type'))}>
								<div className="userimfor fl">
									<img className="fl radius v-m" src={item.get('type') == 0?require( "../../../images/pic1.png"):require( "../../../images/call1.png")} />
									<div className="imfordtl">
										<span className="name ellipsis">{item.get('name')}</span>
										<span>使用费用：{item.get('bundle_price')?item.get('bundle_price'):'0'}元</span>
									</div>
								</div>
							</li>
						)
					}
				}.bind(this)):<li className="tac">没有更多了</li>}
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
			month:getY_M(0),
			feeOrder:0,
			pagenow:1,
			pagesize:10,
			userName:"",//搜索值
			projectList:new projectList(),
			userList:new userList(),
			calluserList:new calluserList(),
			userBaseInfo:{},
			userBusinessList:[],
			userFreeze:new userFreeze(),
			userDelete:new userDelete(),
			count:0,
			status:-1
		};
	},
	componentDidMount: function() {
		this.state.projectList.on("fetchDone",function (data){
			this.setState({
				projectList:this.state.projectList,
			});
			this.getUserList(this.state.projectList.toArray()[0].get('id'),this.state.projectList.toArray()[0].get('name'),this.state.projectList.toArray()[0].get('type'));
		}.bind(this));
		this.state.userList.on("fetchDone",function (data){
			this.state.total2=data;
			this.setState({
				userList:this.state.userList,
				total2:this.state.total2
			});
		}.bind(this));
		this.state.calluserList.on("fetchDone",function (data){
			this.state.total1=data;
			this.setState({
				calluserList:this.state.calluserList,
				total1:this.state.total1
			});
		}.bind(this));
		this.getProjectList();
	},
	userNameChange:function (e) {
		this.state.userName=e.target.value;
		this.setState({
			// "userName":e.target.value
			userName:this.state.userName
		});
	},
	getProjectList:function(){
		this.state.projectList.fetch({
			loadingFlag:true,
			param:{
				loginUserId:""
			}
		});
	},
	userList:function(){
		this.state.userList.fetch({
			loadingFlag:true,
			param:{
				productId:this.state.id,
				pagesize:this.state.pagesize,
	            pagenow:this.state.pagenow,
	            month:this.state.month,
				feeOrder:this.state.feeOrder,
			}
		});
	},
	calluserList:function(){
		this.state.calluserList.fetch({
			loadingFlag:true,
			param:{
				id:this.state.id,
	            pagesize:this.state.pagesize,
	            pagenow:this.state.pagenow,
	            month:this.state.month,
	            feeOrder:this.state.feeOrder
			}
		});
	},
	getUserList:function(id,name,type){
		this.state.id=id;
		this.state.name=name;
		this.state.status=type;
		this.setState({
			id:this.state.id,
			name:this.state.name,
			status:this.state.status
		});
		if(this.state.status==0){
			this.userList();
		}else if(this.state.status==1){
			this.calluserList();
		}
	},
	getUserList1:function(feeOrder){
		this.state.feeOrder=feeOrder;
		this.setState({
			feeOrder:this.state.feeOrder
		});
		this.calluserList();
	},
	getUserList2:function(feeOrder){
		this.state.feeOrder=feeOrder;
		this.setState({
			feeOrder:this.state.feeOrder
		});
		this.userList();
	},
	getUserList3:function(pagenow,pagesize){
		this.state.pagenow=pagenow;
		this.state.pagesize=pagesize;
		this.setState({
			pagesize:this.state.pagesize,
			pagenow:this.state.pagenow
		});
		this.calluserList();
	},
	getUserList4:function(pagenow,pagesize){
		this.state.pagenow=pagenow;
		this.state.pagesize=pagesize;
		this.setState({
			pagesize:this.state.pagesize,
			pagenow:this.state.pagenow
		});
		this.userList();
	},
	changeSelectUser:function (e) {
		this.state.month=e.target.value;
		this.userList();
	},
	changeSelectCall:function (e) {
		this.state.month=e.target.value;
		this.calluserList();
	},
	render: function() {
		if(this.state.count==0){
		this.state.count++;
		}
		var optionInfo = {
				option1:this.state.calluserList,
				option2:this.state.total1,
				option3:this.state.id,
				option4:this.state.status
		};
		var optionTotal = {
				option1:this.state.userList,
				option2:this.state.total2,
				option3:this.state.id,
				option4:this.state.status
		};
		var dateArray = [getY_M(0),getY_M(-1),getY_M(-2),getY_M(-3),getY_M(-4)];
		var optionProject = {
			option1:this.state.projectList,
			option2:this.state.userName
		};
		return (
			<div className="userlist">
				<Scroll className="leftcon">
					<div className="search-area ml-20 mr-20 mb-10 clearfix">
						<div className="search-box w220 pos-relative fl">
							<input placeholder="请输入查询内容" className="s-text" type="text" value={this.state.userName} onChange={this.userNameChange}/>
							<span className="s-btn"></span>
							<em className="del cursor pos-absolute"></em>
						</div>
					</div>
					<ProjectList option={optionProject} getUserList={this.getUserList} />
				</Scroll>
				<div className={this.state.status==1||this.state.projectList.length==0?'hide userdtl':'userdtl'}>
					<div className="wtitle1">{this.state.name?this.state.name:'暂无数据'}</div>
					<div className="tit">
						<div className='padding0'>
						<Select ref="monthRef" label="选择月" labelWidth="45px" onChange={this.changeSelectUser}>
							{
								dateArray.map(function(item,index){
									return <option key={index} value={item}>{item}</option>
								}.bind(this))
							}
						</Select>
						</div>
					</div>
					<UserList option={optionTotal} getUserList2={this.getUserList2} getUserList4={this.getUserList4}/>					
				</div>
				<div className={this.state.status==0||this.state.projectList.length==0?'hide userdtl':'userdtl'}>
					<div className="wtitle1">{this.state.name?this.state.name:'暂无数据'}</div>
					<div className="tit">
						<div className='padding0'>
						<Select ref="monthRef" label="选择月" labelWidth="45px" onChange={this.changeSelectCall}>
							{
								dateArray.map(function(item,index){
									return <option key={index} value={item}>{item}</option>
								}.bind(this))
							}
						</Select>
						</div>
					</div>					
					<CallUserList option={optionInfo} getUserList1={this.getUserList1} getUserList3={this.getUserList3}/>
				</div>
      		</div>
		)
	}
});
module.exports = UserManage;