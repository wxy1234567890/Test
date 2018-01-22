var React = require('react');
var userList = require('collection/userList');
var userBusiness = require('collection/userBusiness');
var subject = require("model/global/subject");
var TerseUI = require("terseui");
var laydate = require("laydate");
var modalHelp = TerseUI.Frame.modalHelp;
var Dialog = TerseUI.Frame.Dialog;
var DataGrid = TerseUI.Frame.DataGrid;
var Pagetool = TerseUI.Frame.PageTool;
var Scroll = TerseUI.Scroll;
var Dialogdtl = require("./dtl.jsx");
var huokeList = require('collection/HuokeDayList');
var huokeList2 = require('collection/HuokeMonthList2');
var ProductByMonth = require('collection/productByMonth');
var ProductByDay = require('collection/productByDay');
var AgentDayDetail = require('collection/agentDayDetail');
var AgentDayDetailDialog = require('./dayDetailDialog.jsx');
var AgentFeeRecord = require('collection/AgentFeeRecord');
var Select = TerseUI.Select;
var FormGroup = TerseUI.FormGroup;
var echarts = require("echarts");
var token = require("./token");
var getY_M = require("util/validcheck").getY_M;
//智呼类产品坐席数，总时长，总费用
var UserB = React.createClass({
	
	getInitialState:function(){
		var wserach=window.location.hash.split("=");
		var proid=wserach[1].split("&")[0];
		var protype=wserach[2].split("&")[0];
		var userId=wserach[3];
		return{
			proid:proid,//搜索值
		};
	},
	render:function(){
		// var typeName = ["预付费","先付费"];
		var userBusiness = this.props.option;
		var style7={"display":"inline-block","height":"24px","margin":"20px","fontWeight":600};
		return (
				<div>
				{userBusiness.map(function(item,index){
					if(this.state.proid == item.get('id')){
					return (							
							<div className='w-100' key={index}>
								<span className="f18" style={style7}>{item.get('name')?item.get('name'):'暂无数据'}<span className='prepaid'></span></span>								
								<div className='w-100'>
								<div className='people fl'>
									<em></em>
									<ul className='fl bl'>
										<li className="f18 fw">{item.get('agentCount')?item.get('agentCount'):'暂无数据'}</li>
										<li>开通坐席数（人）</li>
									</ul>
								</div>
								<div className='clock fl'>
									<em></em>
									<ul className='fl bl'>
										<li className="f18 fw">{item.get('callTimeSum')?item.get('callTimeSum'):'暂无数据'}</li>
										<li>呼叫总时长（分钟）</li>
									</ul>
								</div>
								<div className='money fl'>
									<em></em>
									<ul className='fl bl'>
										<li className="f18 fw">{item.get('totalFee')?item.get('totalFee'):'暂无数据'}</li>
										<li>消费总金额（元）</li>
									</ul>
								</div>
								</div>
							</div>
					)}
				}.bind(this))}
				</div>
		)
	}
})
//接口类产品
var UserBB = React.createClass({
	getInitialState:function(){
		var wserach=window.location.hash.split("=");
		var proid=wserach[1].split("&")[0];
		var protype=wserach[2].split("&")[0];
		var userId=wserach[3];
		return{
			proid:proid,//搜索值
		};
	},
	render:function(){
		// var typeName = ["预付费","先付费"];
		var userBusiness = this.props.option;
		return (
				<ul>
					{userBusiness.map(function(item,index){
						if(this.state.proid == item.get('id')){
						return (
							<li key={index} className='lione rightli fl wtopli'>
								<img className="fl" src={require(  "../../../images/pic1.png")} />
								<p className='fl'>
									<span className='name f16'>{item.get('name')?item.get('name'):'暂无数据'}<span className='prepaid'></span></span>
									<span className='billing f12'>购买总计/消费总计/当月消费（条）</span>
									<span className='num f24'>{item.get('subsTotal')}/{item.get('useTotal')}/{item.get('useCount')}</span>
									<span className='billing f12'>当前状态：开通</span>
									<span className='billing f12'>付费类型：预付费</span>
									<span className='billing f12'>开通日期：2016.12.30</span>
									<span className='billing f12'>所属企业：亚信科技</span>
								</p>
							</li>
						)}
					}.bind(this))}
			</ul>
		)
	}
})

var Datagrid1 = React.createClass({
	getInitialState:function(){
		var wserach=window.location.hash.split("=");
		var proid=wserach[1].split("&")[0];
		var protype=wserach[2].split("&")[0];
		var userId=wserach[3];
		return{
			proid:proid,//搜索值
			userId:userId,
			month:getY_M(0)
		};
	},
	render: function() {
		var item = this.props.option;
		var downobj = {userId:this.state.userId,productId:this.state.proid,month:this.state.month};
		var downarr = encodeURIComponent(JSON.stringify(downobj));
		var download = "http://132.228.28.82:8080/opmanage/interfaceUse/downLoadInterfaceUseListByMonthByDay.action?param="+downarr;
		return (
			<tr>
				<td width="30%">
					<span className="ellipsis ch-blue cursor">{item.get('create_time')}</span>
				</td>
				<td width="30%">
					<span className="ellipsis">{item.get('useInterfaceNum')}</span>
				</td>
				<td width="30%">
					<span className="ellipsis">{item.get('useCount')}</span>
				</td>
				<td width="10%">
					<span className="ellipsis ch-blue"><a href={download}>下载账单</a></span>
				</td>
			</tr>
		)
	}
});

var Datagrid2 = React.createClass({
	getInitialState:function(){
		var wserach=window.location.hash.split("=");
		var proid=wserach[1].split("&")[0];
		var protype=wserach[2].split("&")[0];
		var userId=wserach[3];
		return{
			proid:proid,//搜索值
			userId:userId,
			month:getY_M(0),
			protype:protype,
		};
	},
	render: function() {
		var item = this.props.option;
		var downobj = {userId:this.state.userId,productId:this.state.proid,month:this.state.month};
		var downarr = encodeURIComponent(JSON.stringify(downobj));
		var download = "http://132.228.28.82:8080/opmanage/interfaceUse/downLoadInterfaceUseListByMonth.action?param="+downarr;
		return (
				<tr>
					<td width="25%">
						<span className="ellipsis ch-blue cursor">{item.get('name')}</span>
					</td>
					<td width="25%">
						<span className="ellipsis">{item.get('11')}</span>
					</td>
					<td width="25%">
						<span className="ellipsis">{item.get('useCount')}</span>
					</td>								
					<td width="25%">
						<span className="ellipsis ch-blue"><a href={download}>下载账单</a></span>
					</td>
				</tr>
		)
	}
});

//智呼类产品指定月份坐席统计
var ProductByMonthList = React.createClass({
	pagesize: 10,
    pagenow: 1,
    getInitialState: function () {	
        return {
        	feeOrder:0,
        	callLengthOrder:0,
        	topDown1:"px-text",
        	topDown2:"px-text",
        }
    },
	toDetail:function (agentId,codeName) {
		this.props.getCodeList(agentId,codeName);
	},
	totalTime:function () {
		this.state.feeOrder=0; 
		this.state.topDown2="px-text";
		if(this.state.callLengthOrder==0){
			this.state.callLengthOrder=1;
		}else if(this.state.callLengthOrder==1){
          	this.state.callLengthOrder=2;
      	}else {
          	this.state.callLengthOrder=1;
      	}
      	if(this.state.callLengthOrder==2){
        	this.state.topDown1="px-text upt";
        }else if(this.state.callLengthOrder==1){
        	this.state.topDown1="px-text downt";
        }
      	this.props.getUserList1(this.state.feeOrder,this.state.callLengthOrder);
    },
    totalFee:function () {  
    	this.state.callLengthOrder=0;
    	this.state.topDown1="px-text";
    	if(this.state.feeOrder==0){
    		this.state.feeOrder=1;
    	}else if(this.state.feeOrder==1){
          	this.state.feeOrder=2;
      	}else {
          	this.state.feeOrder=1;
      	}
    	if(this.state.feeOrder==2){
            this.state.topDown2="px-text upt";
        }else if(this.state.feeOrder==1){
        	this.state.topDown2="px-text downt";
        }
      	this.props.getUserList1(this.state.feeOrder,this.state.callLengthOrder);
    },
    pageTo: function (page) {
        this.pagenow = page;
        this.props.getUserList3(this.pagenow,this.pagesize);
    },
	render: function() {        
        var option = this.props.option;    
		var productByMonth = option.option1, total = option.option2, proid = option.option3, protype = option.option4, userId = option.option5;
		var pageInfo = {
				pageIndex: this.pagenow,
				pageSize: this.pagesize,
				total: total
		};
		return(<div className="clearfix">
				<div className="tablearea">
					<table>
						<thead>
							<tr>
								<th width="15%">坐席编码</th>
								<th width="23%" className={this.state.topDown1} onClick={this.totalTime}>呼叫时长（分钟）<em className="px"></em></th>
								<th width="15%">逻辑分组</th>
								<th width="23%" className={this.state.topDown2} onClick={this.totalFee}>坐席费用（元）<em className="px"></em></th>
								<th width="24%">更新时间</th>
							</tr>
						</thead>
						<tbody>
						{productByMonth&&productByMonth.length!=0?productByMonth.map(function(item,index){
							// console.log(item);
							return (
							<tr key={index}>
								<td width="15%" onClick={this.toDetail.bind(this,item.get("id"),item.get("code"))}>
									<span className="ellipsis wcursor wvisible">{item.get('code')}</span>
								</td>
								<td width="23%" onClick={this.toDetail.bind(this,item.get("id"),item.get("code"))}>
									<span className="ellipsis wcursor wvisible">{item.get('callTimeSum')}</span>
								</td>
								<td width="15%" onClick={this.toDetail.bind(this,item.get("id"),item.get("code"))}>
									<span className="ellipsis wcursor wvisible">{item.get('groupId')}</span>
								</td>
								<td width="23%" onClick={this.toDetail.bind(this,item.get("id"),item.get("code"))}>
									<span className="ellipsis wcursor wvisible">{item.get('totalFee')}</span>
								</td>								
								<td width="24%" onClick={this.toDetail.bind(this,item.get("id"),item.get("code"))}>
									<span className="ellipsis wcursor wvisible">{item.get('updateDate')}</span>
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
//智呼类产品指定坐席编码日坐席统计
var ProductByDayList = React.createClass({
	pagesize: 10,
    pagenow: 1,
    getInitialState: function () {	
        return {
        	feeOrder:0,
        	callLengthOrder:0,
        	topDown1:"px-text",
        	topDown2:"px-text",
        }
    },
	toDetail:function (day,proid,userId,codeName,agentId) {
		console.log(day,proid,userId,codeName,agentId);
		if(agentId){
			modalHelp.show({
				Dialog:AgentDayDetailDialog,
				option:{
					id:proid,
					userId:userId,
					codeName:codeName,
					agentId:agentId,
					day:day,
					ok:{
						callback:function(){
							
						}.bind(this)
					}
				}
			});
		}else{
			this.props.getHourList(day);
		}
	},
	totalTime:function () {
		this.state.feeOrder=0;
		this.state.topDown2="px-text";
		if(this.state.callLengthOrder==0){
			this.state.callLengthOrder=1;
		}else if(this.state.callLengthOrder==1){
          	this.state.callLengthOrder=2;
      	}else {
          	this.state.callLengthOrder=1;
      	}
      	if(this.state.callLengthOrder==2){
        	this.state.topDown1="px-text upt";
        }else if(this.state.callLengthOrder==1){
        	this.state.topDown1="px-text downt";
        }
        if(this.props.getUserList2){
      		this.props.getUserList2(this.state.feeOrder,this.state.callLengthOrder);
        }else if(this.props.getUserList5){
        	this.props.getUserList5(this.state.feeOrder,this.state.callLengthOrder);
        }
    },
    totalFee:function () {
    	this.state.callLengthOrder=0; 
    	this.state.topDown1="px-text";
    	if(this.state.feeOrder==0){
    		this.state.feeOrder=1;
    	}else if(this.state.feeOrder==1){
          	this.state.feeOrder=2;
      	}else {
          	this.state.feeOrder=1;
      	}
    	if(this.state.feeOrder==2){
            this.state.topDown2="px-text upt";
        }else if(this.state.feeOrder==1){
        	this.state.topDown2="px-text downt";
        }
        if(this.props.getUserList2){
      		this.props.getUserList2(this.state.feeOrder,this.state.callLengthOrder);
        }else if(this.props.getUserList5){
        	this.props.getUserList5(this.state.feeOrder,this.state.callLengthOrder);
        }
    },
    pageTo: function (page) {
        this.pagenow = page;
        if(this.props.getUserList4){
        	this.props.getUserList4(this.pagenow,this.pagesize);
        }else if(this.props.getUserList6){
        	this.props.getUserList6(this.pagenow,this.pagesize);
        }
    },
	render: function() {
		if(this.props.option){
	        var option = this.props.option;    
			var productByDay = option.option1, total = option.option2, proid = option.option3, protype = option.option4, userId = option.option5, codeName = option.option6, agentId = option.option7;			
		}
		if(this.props.option1){
			var option = this.props.option1;
			var productByDay = option.option1, total = option.option2, proid = option.option3, protype = option.option4, userId = option.option5;			
		}
		var pageInfo = {
				pageIndex: this.pagenow,
				pageSize: this.pagesize,
				total: total
		};
		return(<div className="clearfix">
				<div className="tablearea">
					<table>
						<thead>
							<tr>
								<th width="33%">日期</th>
								<th width="33%" className={this.state.topDown1} onClick={this.totalTime}>呼叫时长（分钟）<em className="px"></em></th>
								<th width="34%" className={this.state.topDown2} onClick={this.totalFee}>坐席费用（元）<em className="px"></em></th>
							</tr>
						</thead>
						
						<tbody>
						{productByDay&&productByDay.length!=0?productByDay.map(function(item,index){
							// console.log(item);
							return (
							<tr key={index}>
								<td width="33%" onClick={this.toDetail.bind(this,item.get("day"),proid,userId,codeName,agentId)}>
									<span className="ellipsis wcursor wvisible">{item.get('day')}</span>
								</td>
								<td width="33%" onClick={this.toDetail.bind(this,item.get("day"),proid,userId,codeName,agentId)}>
									<span className="ellipsis wcursor wvisible">{item.get('totalCallLength')}</span>
								</td>
								<td width="34%" onClick={this.toDetail.bind(this,item.get("day"),proid,userId,codeName,agentId)}>
									<span className="ellipsis wcursor wvisible">{item.get('totalCallFee')}</span>
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
//智呼类产品指定日期坐席详情
var ProductByHourList = React.createClass({
	pagesize: 10,
    pagenow: 1,
    getInitialState: function () {	
        return {
        	feeOrder:0,
        	callLengthOrder:0,
        	topDown1:"px-text",
        	topDown2:"px-text",
        }
    },
	totalTime:function () {
		this.state.feeOrder=0;
		this.state.topDown2="px-text";
		if(this.state.callLengthOrder==0){
			this.state.callLengthOrder=1;
		}else if(this.state.callLengthOrder==1){
          	this.state.callLengthOrder=2;
      	}else {
          	this.state.callLengthOrder=1;
      	}
      	if(this.state.callLengthOrder==2){
        	this.state.topDown1="px-text upt";
        }else if(this.state.callLengthOrder==1){
        	this.state.topDown1="px-text downt";
        }
      	this.props.getUserList7(this.state.feeOrder,this.state.callLengthOrder);
    },
    totalFee:function () {
    	this.state.callLengthOrder=0; 
    	this.state.topDown1="px-text";
    	if(this.state.feeOrder==0){
    		this.state.feeOrder=1;
    	}else if(this.state.feeOrder==1){
          	this.state.feeOrder=2;
      	}else {
          	this.state.feeOrder=1;
      	}
    	if(this.state.feeOrder==2){
            this.state.topDown2="px-text upt";
        }else if(this.state.feeOrder==1){
        	this.state.topDown2="px-text downt";
        }
        this.props.getUserList7(this.state.feeOrder,this.state.callLengthOrder);
    },
    pageTo: function (page) {
        this.pagenow = page;
        this.props.getUserList8(this.pagenow,this.pagesize);
    },
	render: function() {
		if(this.props.option){
	        var option = this.props.option;    
			var productByHour = option.option1, total = option.option2, proid = option.option3, protype = option.option4, userId = option.option5;			
		}
		var pageInfo = {
				pageIndex: this.pagenow,
				pageSize: this.pagesize,
				total: total
		};
		return(<div className="clearfix">
				<div className="tablearea">
					<table>
						<thead>
							<tr>
								<th width="23%">时间</th>
								<th width="20%">坐席编码</th>
								<th width="28%" className={this.state.topDown1} onClick={this.totalTime}>呼叫时长（分钟）<em className="px"></em></th>
								<th width="29%" className={this.state.topDown2} onClick={this.totalFee}>坐席费用（元）<em className="px"></em></th>
							</tr>
						</thead>
						
						<tbody>
						{productByHour&&productByHour.length!=0?productByHour.map(function(item,index){
							// console.log(item);
							return (
							<tr key={index}>
								<td width="23%">
									<span className="ellipsis wvisible">{item.get('callTime')}</span>
								</td>
								<td width="20%">
									<span className="ellipsis wvisible">{item.get('agentCode')}</span>
								</td>
								<td width="28%">
									<span className="ellipsis wvisible">{item.get('totalCallLength')}</span>
								</td>
								<td width="29%">
									<span className="ellipsis wvisible">{item.get('totalCallFee')}</span>
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

var UserCharge = React.createClass({
	datePx:1,//0-不排序 1-升序 2-降序
	interfaceCountPx:0,
	useCountPx:0,
	datePxStyle:'',
	interfaceCountPxStyle:'',
	useCountPxStyle:'',
	// myChart:{},
	myChart1:{},
	monthValue:'',
	getInitialState: function() {    
		var exectime = new  Date(), month=(exectime.getMonth()+1) > 9 ? (exectime.getMonth()+1) : "0" + (exectime.getMonth()+1), day=(exectime.getDate()) > 9 ? (exectime.getDate()) : "0" + (exectime.getDate());
		var wserach=window.location.hash.split("=");
		var proid=wserach[1].split("&")[0];
		var protype=wserach[2].split("&")[0];
		var userId=wserach[3];
		return {
			proid:proid,
			userId:userId,
			month:getY_M(0),
			month1:getY_M(0),
			protype:protype,
			exectime:exectime.getFullYear()+"-"+month+"-"+day,
			tabType:2,//1-图表显示 2-表格显示
			huokeList2: new huokeList2(),
			huokeList:new huokeList(),
			userBusiness:new userBusiness(),
			productByMonth:new ProductByMonth(),
			productByDay:new ProductByDay(),
			productByDay1:new ProductByDay(),
			// productByHour:new AgentDayDetail(),
			productByHour:new AgentFeeRecord(),
			huokelistarr:[],
			interfaceNumOrder:true,
			useCountOrder:true,
			pagenow3: 1,
            pagesize3: 10,
            feeOrder1:0,
            callLengthOrder1:0,
            pagenow4: 1,
            pagesize4: 10,
            feeOrder2:0,
            callLengthOrder2:0,
            pagenow6: 1,
            pagesize6: 10,
            feeOrder5:0,
            callLengthOrder5:0,
            pagenow8: 1,
            pagesize8: 10,
            feeOrder7:0,
            callLengthOrder7:0,
            filter: "",
            flag: false,
            status:'0',
		}
	},
	componentDidMount: function() {
  		this.listEvents = {
            "fetchDone": this.afterproductByMonth
        };
        this.state.productByMonth.on(this.listEvents);
        this.listEvents = {
            "fetchDone": this.afterproductByDay
        };
        this.state.productByDay.on(this.listEvents);
        this.listEvents = {
            "fetchDone": this.afterproductByDay1
        };
        this.state.productByDay1.on(this.listEvents); 
        this.listEvents = {
            "fetchDone": this.afterQueryProductByHour
        };
        this.state.productByHour.on(this.listEvents);               
		this.myChart1 = echarts.init(this.refs.alarmchart1);
		this.monthValue=this.refs.monthRef.getValue();		
		this.state.userBusiness.on("fetchDone",function(){
			this.setState({
				userBusiness:this.state.userBusiness
			});
		}.bind(this));
		if(this.state.protype==0){
			this.userBusiness();
			this.huokeList3();
			this.huokeList4();		
			this.findList(this.monthValue);			
		}else if(this.state.protype==1){
			this.userBusiness();
			this.productByMonth();
			// this.productByDay();
		}
		if (this.state.huokeList2.length==0) {
			$(".wrighttable2").hide();
		}
		else{
			$(".wrighttable2").show();
		}
		if (this.state.huokeList.length==0) {
			$(".wrighttable2").hide();
		}
		else{
			$(".wrighttable2").show();
		}
	},
	componentWillUnmount:function(){
		this.unmount = true;
        // token.off(this.tokenEvents);
        token.clear();
		this.state.huokeList2.off("fetchDone");
		this.state.huokeList.off("fetchDone");
		// this.state.callhuokeList.off("fetchDone");
		this.state.productByMonth.off("fetchDone");
		// this.state.productByDay.off("fetchDone");
	},
	productByMonth:function(){
		this.state.productByMonth.fetch({
			loadingFlag:true,
			param:{
				id:this.state.proid,
				userId:this.state.userId,
				month:this.state.month,
				pagesize:this.state.pagesize3,
				pagenow:this.state.pagenow3,
				feeOrder: this.state.feeOrder1,
				callLengthOrder:this.state.callLengthOrder1
			}
		});
	},
	afterproductByMonth:function(data){
		this.state.total1=data;
		this.setState({
				productByMonth:this.state.productByMonth,
				total1:this.state.total1
			});
		if(this.state.productByMonth&&this.state.productByMonth.length!=0){
			this.getCodeList(this.state.productByMonth.toArray()[0].get('id'),this.state.productByMonth.toArray()[0].get('code'));
		}
	},
	productByDay:function(){
		this.state.productByDay.fetch({
			loadingFlag:true,
			param:{
				id:this.state.proid,
				userId:this.state.userId,
				agentId:this.state.agentId,
				month:this.state.month,
				pagesize:this.state.pagesize4,
				pagenow:this.state.pagenow4,
				feeOrder: this.state.feeOrder2,
				callLengthOrder:this.state.callLengthOrder2
			}
		});
	},
	productByDay1:function(){
		this.state.productByDay1.fetch({
			loadingFlag:true,
			param:{
				id:this.state.proid,
				userId:this.state.userId,
				agentId:'',
				month:this.state.month1,
				pagesize:this.state.pagesize6,
				pagenow:this.state.pagenow6,
				feeOrder: this.state.feeOrder5,
				callLengthOrder:this.state.callLengthOrder5
			}
		});
	},
	afterproductByDay:function(data){
		// console.log(data,this.state.productByDay);
		this.state.total2=data;
		this.setState({
				productByDay:this.state.productByDay,
				total2:this.state.total2
			});
	},
	afterproductByDay1:function(data){
		// console.log(data,this.state.productByDay);
		this.state.total5=data;
		this.setState({
				productByDay1:this.state.productByDay1,
				total5:this.state.total5
			});
		if(this.state.productByDay1&&this.state.productByDay1.length!=0){
			this.getHourList(this.state.productByDay1.toArray()[0].get('day'));
		}
	},
	productByHour:function(){
    	this.state.flag = false;
        this.state.productByHour.fetch({
            loadingFlag: true,
            param: {
                id:this.state.proid,
                userId:this.state.userId,
                // agentId:'',
                day:this.state.day,
                pagesize:this.state.pagesize8,
                pagenow:this.state.pagenow8,
                feeOrder:this.state.feeOrder7,
                callLengthOrder:this.state.callLengthOrder7
            }
        });		
	},
	afterQueryProductByHour:function(data){
		this.state.total4=data;
		this.setState({
				productByHour:this.state.productByHour,
				total4:this.state.total4
			}); 		
	},
	getCodeList:function(agentId,codeName){
		this.state.agentId=agentId;
		this.state.codeName=codeName;
		this.setState({
			agentId:this.state.agentId,
			codeName:this.state.codeName
		});
		this.productByDay();
	},
	getHourList:function(day){
		this.state.day=day;
		this.setState({
			day:this.state.day
		});
		this.productByHour();
	},
	getUserList1:function(feeOrder,callLengthOrder){
		this.state.feeOrder1=feeOrder;
		this.state.callLengthOrder1=callLengthOrder;
		this.setState({
			feeOrder1:this.state.feeOrder1,
			callLengthOrder1:this.state.callLengthOrder1
		});
		this.productByMonth();		
	},
	getUserList3:function(pagenow,pagesize){
		this.state.pagenow3=pagenow;
		this.state.pagesize3=pagesize;
		this.setState({
			pagesize3:this.state.pagesize3,
			pagenow3:this.state.pagenow3
		});
		this.productByMonth();		
	},
	getUserList2:function(feeOrder,callLengthOrder){
		this.state.feeOrder2=feeOrder;
		this.state.callLengthOrder2=callLengthOrder;
		this.setState({
			feeOrder2:this.state.feeOrder2,
			callLengthOrder2:this.state.callLengthOrder2
		});
		this.productByDay();		
	},
	getUserList4:function(pagenow,pagesize){
		this.state.pagenow4=pagenow;
		this.state.pagesize4=pagesize;
		this.setState({
			pagesize4:this.state.pagesize4,
			pagenow4:this.state.pagenow4
		});
		this.productByDay();		
	},
	getUserList5:function(feeOrder,callLengthOrder){
		this.state.feeOrder5=feeOrder;
		this.state.callLengthOrder5=callLengthOrder;
		this.setState({
			feeOrder5:this.state.feeOrder5,
			callLengthOrder5:this.state.callLengthOrder5
		});
		this.productByDay1();		
	},
	getUserList6:function(pagenow,pagesize){
		this.state.pagenow6=pagenow;
		this.state.pagesize6=pagesize;
		this.setState({
			pagesize6:this.state.pagesize6,
			pagenow6:this.state.pagenow6
		});
		this.productByDay1();		
	},
	getUserList7:function(feeOrder,callLengthOrder){
		this.state.feeOrder7=feeOrder;
		this.state.callLengthOrder7=callLengthOrder;
		this.setState({
			feeOrder7:this.state.feeOrder7,
			callLengthOrder7:this.state.callLengthOrder7
		});
		this.productByHour();		
	},
	getUserList8:function(pagenow,pagesize){
		this.state.pagenow8=pagenow;
		this.state.pagesize8=pagesize;
		this.setState({
			pagesize8:this.state.pagesize8,
			pagenow8:this.state.pagenow8
		});
		this.productByHour();		
	},
	huokeList3:function(){
		this.state.huokeList2.on("fetchDone",function(){
			this.setState({
				huokeList2:this.state.huokeList2
			});
		var data0 = [], data1 = [];
		this.state.huokeList2.map(function(item){
			data0.push(item.get('name'));
			data1.push({value:item.get('useCount'),name:item.get('name')});
		}.bind(this));

		var myChart2 = echarts.init(document.getElementById('wechart2'));
        function turnarr(arr){
        	if(arr.length==0){
        		data0=["数据暂无"];
        		data1=[{value:1,name:"数据暂无"}];
        	}
        }
        turnarr(data0);
		myChart2.setOption({
				    tooltip: {
				        trigger: 'item',
				        formatter: "{a} <br/>{b}: {c} ({d}%)"
				    },
				    color:['#0dc98a', '#5da2ca','#2f4554','#d48265'],  
				    legend: {
				        orient: 'vertical',
				        x: 'left',
				        data:data0
				    },
				    series: [
				        {
				            name:'访问来源',
				            type:'pie',
				            radius: ['50%', '70%'],
				            avoidLabelOverlap: false,
				            label: {
				                normal: {
				                    show: false,
				                    position: 'center'
				                },
				                emphasis: {
				                    show: true,
				                    textStyle: {
				                        fontSize: '30',
				                        fontWeight: 'bold'
				                    }
				                }
				            },
				            labelLine: {
				                normal: {
				                    show: false
				                }
				            },
				            data:data1
				        }
				    ]
				}
			)
		}.bind(this));
	},
	huokeList4:function(){
		this.state.huokeList.on("fetchDone",function(){
			this.setState({
				huokeList:this.state.huokeList
			});
		var data2 = [], data3 = [], data4 = [];
		this.state.huokeList.map(function(item){
			data2.push(item.get('create_time'));
			data3.push(item.get('useCount'));
			data4.push(item.get('useInterfaceNum'));				          
		}.bind(this));
		var myChart1 = echarts.init(document.getElementById('wechart3'));
        // 指定图表的配置项和数据
 		myChart1.setOption({
				    tooltip : {
				        trigger: 'axis',
				        axisPointer: {
				            type: 'cross',
				            label: {
				                backgroundColor: '#6a7985'
				            }
				        }
				    },
				    legend: {
					data:['使用次数','使用接口数']
				    },
				    grid: {
				        left: '6%',
				        right: '10%',
				        bottom: '5%',
				        containLabel: true
				    },
				    xAxis : [
				        {
				            type : 'category',
				            boundaryGap : false,
				            data : data2
				        }
				    ],
				    yAxis : [
				        {
				            type : 'value'
				        }
				    ],
				    series : [
				        {
				            name:'使用次数',
				            type:'line',
				            stack: '总量',
				            areaStyle: {normal: {}},
				            data:data3
				        },
				        {
				            name:'使用接口数',
				            type:'line',
				            stack: '总量',
				            areaStyle: {normal: {}},
				            data:data4
				        }
				    ]
				}
			)
		}.bind(this));
	},
	findList: function(month){
		this.state.month=month;
		this.setState({
			month:this.state.month
		});
		var useCountOrder = "";
		var interfaceCountOrder = "";
		var dayOrder = "1";
		var list1="asc";
		var list2="asc";
		if(this.state.interfaceNumOrder){
			var list1 = "asc";
		}else{
			var list1 = "desc";
		}
		if(this.state.useCountOrder){
			var list2 = "asc";
		}else{
			var list2 = "desc";
		}
		switch(this.useCountPx) {
			case 1:
				useCountOrder="1";
				break;
			case 2:
				useCountOrder="2";
				break;
			default:
				useCountOrder="";
		}
		switch(this.interfaceCountPx) {
			case 1:
				interfaceCountOrder="1";
				break;
			case 2:
				interfaceCountOrder="2";
				break;
			default:
				interfaceCountOrder="";
		}
		switch(this.datePx) {
			case 1:
				dayOrder="1";
				break;
			case 2:
				dayOrder="2";
				break;
			default:
				dayOrder="";
		}
		this.setState({
			productId:this.state.productid,
			userId:this.state.userId
		});
		this.state.huokeList2.fetch({
			loadingFlag:true,
			param:{
				id:this.state.proid,
				userId:this.state.userId,
				month:this.state.month,
				pagesize:"10",
          		pagenow:"1"         
			}
		});
		this.state.huokeList.fetch({
			loadingFlag:true,
			param:{
				id:this.state.proid,
				userId:this.state.userId,
				month:this.state.month,
				interfaceNumOrder:list1,
				useCountOrder:list2,
				pagesize:'10',
      			pagenow:'1'      
			}
		});	
	},
	userBusiness:function(){
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
	changeTab:function(type){
		this.setState({
			tabType:type
		})
	},
	changeSelect:function(e){
		this.monthValue=e.target.value;
		this.state.month=e.target.value;
		this.findList(this.monthValue);
	},
	changeSelectMon:function(e){
		this.state.month=e.target.value;
		this.productByMonth();
	},
	changeSelectMon1:function(e){
		this.state.month1=e.target.value;
		this.productByDay1();
	},
	getY_M:function(n){
		var y = new Date().getFullYear();
		var m = new Date().getMonth()+1;
		m += n;
		y += parseInt(m / 12);
		m %= 12;
		if(m < 1){
			y--;
			m = 12 + m;
		}
		return y + "-" + ((m < 10) ? ("0" + m) : m);
	},
	px:function(type){
		if(type==1){
			this.interfaceCountPx=0;
			this.useCountPx=0;
			switch (this.datePx) {
				case 0:
					this.datePx = 1;
					break;
				case 1:
					this.datePx = 2;
					break;
				case 2:
					this.datePx = 1;
					break;
			}
			this.findList(this.monthValue);
		} else if(type==2){
			this.datePx=0;
			this.setState({
				interfaceNumOrder:!this.state.interfaceNumOrder
			});
			this.useCountPx=0;
			switch (this.interfaceCountPx){
				case 0:
					this.interfaceCountPx = 1;
					break;
				case 1:
					this.interfaceCountPx = 2;
					break;
				case 2:
					this.interfaceCountPx = 1;
					break;
			}
			this.findList(this.monthValue);
		} else if(type==3){
			this.setState({
				useCountOrder:!this.state.useCountOrder
			});
			this.datePx=0;
			this.interfaceCountPx=0;
			switch (this.useCountPx){
				case 0:
					this.useCountPx = 1;
					break;
				case 1:
					this.useCountPx = 2;
					break;
				case 2:
					this.useCountPx = 1;
					break;
			}
			this.findList(this.monthValue);
		}
	},
	pxStyle:function(){
		switch (this.datePx){
			case 0:
				this.datePxStyle='px-text';
				break;
			case 1:
				this.datePxStyle='px-text upt';
				break;
			case 2:
				this.datePxStyle='px-text downt';
				break;
		}
		switch (this.interfaceCountPx){
			case 0:
				this.interfaceCountPxStyle='px-text';
				break;
			case 1:
				this.interfaceCountPxStyle='px-text upt';
				break;
			case 2:
				this.interfaceCountPxStyle='px-text downt';
				break;
		}
		switch (this.useCountPx){
			case 0:
				this.useCountPxStyle='px-text';
				break;
			case 1:
				this.useCountPxStyle='px-text upt';
				break;
			case 2:
				this.useCountPxStyle='px-text downt';
				break;
		}
	},
	componentDidUpdate: function() {
		if (this.state.huokeList2.length==0) {
			$(".wrighttable2").hide();
		}
		else{
			$(".wrighttable2").show();
		}
		if (this.state.huokeList.length==0) {
			$(".wrighttable2").hide();
		}
		else{
			$(".wrighttable2").show();
		}
	},
	monthInfo:function(){
		this.state.status = '0';
		this.setState({
			status: '0'
		});
		this.productByMonth();
	},
	dayInfo:function(){
		this.state.status = '1';
		this.setState({
			status: '1'
		});
		this.productByDay1();
	},
	onDatetimeClick: function (id) {
        var self = this;
        var obj = {
            elem: "#" + id,
            format: 'YYYY-MM-DD',
            min: '1999-06-16', //最大日期
            max: '2099-06-16', //最大日期
            istime: true,
            istoday: false,
            choose: function (datas) {
                self.createtimeChangeHandler(datas);
            }
        };
        laydate(obj);
    },
    createtimeChangeHandler: function (event) {
        this.state.exectime = event;
        this.setState({
            exectime: this.state.exectime,
        }, function () {
            console.log(this.state.exectime)
        });
    },
    refresh: function() {
		if (!this.unmount) {
			this.setState({
				a: 1
			});
		}
	},
	render:function(){
		// console.log(this.state.productByDay1,this.state.total5);
		var style1={"height":"64px","width":"100%"}, style2={"width":"583px","height":"400px"},style3={"marginTop":"-406px"},style4={"fontWeight":800,"margin":"10px 20px"};
		var style5={"display":"inline-block","width":"45px"},style6={"width":"240px"};
		//获取当前月份及前五个月份的集合
		var dateArray = [getY_M(0),getY_M(-1),getY_M(-2),getY_M(-3),getY_M(-4)];
		var optionTotal = {
				option1:this.state.productByMonth,
				option2:this.state.total1,
				option3:this.state.proid,
				option4:this.state.protype,
				option5:this.state.userId
		};
		var optionInfo={
				option1:this.state.productByMonth.length!=0?this.state.productByDay:'',
				option2:this.state.productByMonth.length!=0?this.state.total2:'',
				option3:this.state.proid,
				option4:this.state.protype,
				option5:this.state.userId,
				option6:this.state.productByMonth.length!=0?this.state.codeName:'',
				option7:this.state.productByMonth.length!=0?this.state.agentId:'',
		};
		var optionDayInfo={
				option1:this.state.productByDay,
				option2:this.state.total3,
				option3:this.state.proid,
				option4:this.state.protype,
				option5:this.state.userId			
		};
		var optionDayInfo1={
				option1:this.state.productByDay1,
				option2:this.state.total5,
				option3:this.state.proid,
				option4:this.state.protype,
				option5:this.state.userId			
		};		
		var optionHourInfo={
				option1:this.state.productByDay1.length!=0?this.state.productByHour:'',
				option2:this.state.productByDay1.length!=0?this.state.total4:'',
				option3:this.state.proid,
				option4:this.state.protype,
				option5:this.state.userId			
		};
		var downobj1 = {id:this.state.proid,userId:this.state.userId,month:this.state.month};
		var downarr1 = encodeURIComponent(JSON.stringify(downobj1));
		var download1 = window.apiUrl+"/file/downLoadAgentStatByProductByMonth.action?param="+downarr1;
		var downobj2 = {id:this.state.proid,userId:this.state.userId,agentId:this.state.agentId,month:this.state.month};
		var downarr2 = encodeURIComponent(JSON.stringify(downobj2));
		var download2 = window.apiUrl+"/file/downloadCallProductDayStat.action?param="+downarr2;
		var downobj3 = {id:this.state.proid,userId:this.state.userId,month:this.state.month};
		var downarr3 = encodeURIComponent(JSON.stringify(downobj3));
		var download3 = window.apiUrl+"/file/downloadCallProductDayStat.action?param="+downarr3;
		var downobj4 = {id:this.state.proid,userId:this.state.userId,day:this.state.day};
		var downarr4 = encodeURIComponent(JSON.stringify(downobj4));
		var download4 = window.apiUrl+"/file/downloadCallProductHourStat.action?param="+downarr4;
		this.pxStyle();
    	return ( <div>
    		<div className={this.state.protype==1?'':'hide'}>   		
				<div className="rightcon pro-dtl">
					<div className="userinfo" style={style1}>
						<UserB option={this.state.userBusiness}/>
					</div>
					<div className="oper clearfix">
						<div className="navigate">
							<span className={this.state.status =='0' ?"fl active":"fl"} onClick={this.monthInfo}>月详情</span>
							<span className={this.state.status =='1' ?"fl active":"fl"} onClick={this.dayInfo}>日详情</span>							
						</div>					
					</div>
					<div className={this.state.status =='1' ?"hide":""}>
						<div className="oper clearfix">
							<div className="tit fl">
								<Select className="ml-20" ref="monthRef" label="选择月" labelWidth="55px" onChange={this.changeSelectMon}>
									{
										dateArray.map(function(item,index){
											return <option key={index} value={item}>{item}</option>
										}.bind(this))
									}
								</Select>
							</div>
						</div>
						<div className="clearfix" style={{"width":"100%"}}>
							<div className="fl" style={{"width":"60%","margin":"0 20px"}}>
								<div className="clearfix mb-10">
									<h2 className="fl">月总表</h2>
									<p className="fr downloading" style={{"width":"6%"}}><a href={download1}><em></em>下载</a></p>
								</div>
								<ProductByMonthList option={optionTotal} getUserList1={this.getUserList1} getUserList3={this.getUserList3} getCodeList={this.getCodeList}/>							
							</div>
							<div className="fl" style={{"width":"35%"}}>
								<div className="clearfix mb-10">
									<h2 className="fl">{this.state.productByMonth.length!=0?this.state.codeName:''}月详单</h2>
									<p className="fr downloading" style={{"width":"10%"}}><a href={download2}><em></em>下载</a></p>
								</div>							
								<ProductByDayList option={optionInfo} getUserList2={this.getUserList2} getUserList4={this.getUserList4}/>
							</div>	
						</div>													
					</div>
					<div className={this.state.status =='0' ?"hide":""}>
						<div className="oper clearfix">
							<div className="tit fl">
								<Select className="ml-20" ref="monthRef" label="选择月" labelWidth="55px" onChange={this.changeSelectMon1}>
									{
										dateArray.map(function(item,index){
											return <option key={index} value={item}>{item}</option>
										}.bind(this))
									}
								</Select>
							</div>
						</div>
						<div className="clearfix" style={{"width":"100%"}}>
							<div className="fl" style={{"width":"45%","margin":"0 20px"}}>
								<div className="clearfix mb-10">
									<h2 className="fl">日总表</h2>
									<p className="fr downloading" style={{"width":"10%"}}><a href={download3}><em></em>下载</a></p>
								</div>
								<ProductByDayList option1={optionDayInfo1} getUserList5={this.getUserList5} getUserList6={this.getUserList6} getHourList={this.getHourList}/>								
							</div>
							<div className="fl" style={{"width":"50%"}}>
								<div className="clearfix mb-10">
									<h2 className="fl">{this.state.productByDay1.length!=0?this.state.day:''}坐席详情</h2>
									<p className="fr downloading" style={{"width":"10%"}}><a href={download4}><em></em>下载</a></p>
								</div>							
								<ProductByHourList option={optionHourInfo} getUserList7={this.getUserList7} getUserList8={this.getUserList8}/>
							</div>	
						</div>							
					</div>
				</div>
			</div>
			<div className={this.state.protype==0?'':'hide'}>
				<div className="rightcon pro-dtl">
					<div className="userinfo wuserinfo">
						<UserBB option={this.state.userBusiness}/>
					</div>
					<div className="ml-20 mr-20">
						<div className="oper clearfix">
							<div className="tit fl">
								<div>
									<Select ref="monthRef" label="月账单查看" labelWidth="100px" onChange={this.changeSelect}>
										{
											dateArray.map(function(item,index){
												return <option key={index} value={item}>{item}</option>
											}.bind(this))
										}
									</Select>
								</div>
							</div>
							<p className="fr mt-5"><span className="btn white line s">下载账单</span></p>
						</div>
						<div id="wechart2" style={style2}> </div>
						<div className="tablearea wrighttable2" style={{"marginTop":"-350px"}}>
								<table>
								<thead>
									<tr>
										<th width="25%">接口名称</th>
										<th width="25%">百分比</th>
										<th width="25%">条数</th>
										<th width="25%">操作</th>
									</tr>
								</thead>
									<tbody>
									{
										this.state.huokeList2.map(function(item,index){
											return <Datagrid2 key={index} option={item} />
										}.bind(this))
									}
									</tbody>
							</table>
						</div>
						<div className="rightbody">
							<div className="title clearfix">
								<span className="name fl"><b className="f16">时间分析</b></span>
								<ul className="radiobtn fr">
									<li className={this.state.tabType==1 ? "active" : ""} onClick={this.changeTab.bind(this,1)}>图表显示</li>
									<li className={this.state.tabType==2 ? "active" : ""} onClick={this.changeTab.bind(this,2)}>表格显示</li>
								</ul>
							</div>
							<div id="wechart3" className={this.state.tabType==1 ? "char mt-20" : "char mt-20 hide"} ref="alarmchart1" style={{"height": "400px", "width": "1100px"}}></div>
							<div className={this.state.tabType==2 ? "tablediv mt-20" : "tablediv mt-20 hide"}>
								<div className="tablearea">
									<table>
										<tbody>
										<tr>
											<th width="30%" className="px-text" onClick={this.px.bind(this,'1')}>
												<span className="ellipsis">日期<em className="px"></em></span>
											</th>
											<th width="30%" className="px-text" onClick={this.px.bind(this,'2')}>
												<span className="ellipsis">使用接口数<em className="px"></em></span>
											</th>
											<th width="30%" className="px-text" onClick={this.px.bind(this,'3')}>
												<span className="ellipsis">使用次数<em className="px"></em></span>
											</th>
											<th width="10%">
												<span className="ellipsis">操作</span>
											</th>
										</tr>
										</tbody>
									</table>
								</div>
								<div className="tablearea plr20">
									<table>
										<tbody>
										{
											this.state.huokeList.map(function(item,index){
												return <Datagrid1 key={index} option={item} />
											}.bind(this))
										}
										</tbody>
									</table>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		)
  	}
});

module.exports = UserCharge;