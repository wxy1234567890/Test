var React = require('react');
var userList = require('collection/userList');
var userBusiness = require('collection/userBusiness');
var subject = require("model/global/subject");
var TerseUI = require("terseui");
var PageTool = TerseUI.Frame.PageTool;
var modalHelp = TerseUI.Frame.modalHelp;
var Dialog = TerseUI.Frame.Dialog;
var Dialogdtl = require("./dtl.jsx");
var huokeList = require('collection/HuokeDayList');
var huokeList2 = require('collection/HuokeMonthList2');
var awardDetail = require('collection/AwardDetail');
var Select = TerseUI.Select;
var FormGroup = TerseUI.FormGroup;
var echarts = require("echarts");


var UserB = React.createClass({
	render:function(){
		var typeName = ["预付费","先付费"];
		var userBusiness = this.props.option;
		return (
				<ul>
				{userBusiness.map(function(item,index){
					if(window.proid == item.get('id')){
					return (
						<li key={index} className='lione rightli fl wtopli'>
							<img className="fl" src={require(  "../../../images/pic1.png")} />
							<p className='fl'>
								<span className='name f16'>{item.get('name')}<span className='prepaid'>（{typeName[item.get('type')]}）</span></span>
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

var Datagrid = React.createClass({
	render: function() {
		var item = this.props.option;
		var downobj = {userId:window.userId,productId:window.proid,month:window.month}
		var downarr = JSON.stringify(downobj);
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
	render: function() {
		var item = this.props.option;
		var downobj = {userId:window.userId,productId:window.proid,month:window.month}
		var downarr = JSON.stringify(downobj);
		var download = "http://132.228.28.82:8080/opmanage/interfaceUse/downLoadInterfaceUseListByMonth.action?param="+downarr;
		return (
				<tr>
					<td width="25%">
						<span className="ellipsis ch-blue cursor">{item.get('name')}</span>
					</td>
					<td width="23%">
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

var UserCharge = React.createClass({
	datePx:1,//0-不排序 1-升序 2-降序
	interfaceCountPx:0,
	useCountPx:0,
	datePxStyle:'',
	interfaceCountPxStyle:'',
	useCountPxStyle:'',
	myChart:{},
	monthValue:'',
	getInitialState: function() {
		return {
			tabType:2,//1-图表显示 2-表格显示
			huokeList2: new huokeList2(),
			huokeList:new huokeList(),
			userBusiness:new userBusiness(),
			huokelistarr:[],
			interfaceNumOrder:true,
			useCountOrder:true
		}
	},
	initChart2: function() {
		window.data0 = [];
		window.data1 = [];

		this.state.huokeList2.map(function(item){
			data0.push(item.get('name'));
			data1.push({value:item.get('useCount'),name:item.get('name')});
		}.bind(this));

	},
	initChart: function() {
		window.data2 = [];
		window.data3 = [];
		window.data4 = [];

		this.state.huokeList.map(function(item){
			data2.push(item.get('create_time'));
			data3.push(item.get('useCount'));
			data4.push(item.get('useInterfaceNum'));				          
		}.bind(this));

	},
	componentDidMount: function() {
		this.myChart = echarts.init(this.refs.alarmchart);
		this.state.huokeList2.on("fetchDone",function(){
			this.setState({
				huokeList2:this.state.huokeList2
			});
			this.initChart2();


		var myChart2 = echarts.init(document.getElementById('wechart'));
        // 指定图表的配置项和数据
        console.log(window.data0);
        console.log(window.data1);
        function turnarr(arr){
        	if(arr.length==0){
        		window.data0=["数据暂无"];
        		window.data1=[{value:1,name:"数据暂无"}];
        	}
        }
        turnarr(window.data0);
		myChart2.setOption({
				    tooltip: {
				        trigger: 'item',
				        formatter: "{a} <br/>{b}: {c} ({d}%)"
				    },
				    color:['#0dc98a', '#5da2ca','#2f4554','#d48265'],  
				    legend: {
				        orient: 'vertical',
				        x: 'left',
				        data:window.data0
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
				            data:window.data1
				        }
				    ]
				}
			)
		}.bind(this));

		this.state.huokeList.on("fetchDone",function(){
			this.setState({
				huokeList:this.state.huokeList
			});
			this.initChart();


		var myChart1 = echarts.init(document.getElementById('wechart1'));
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
				    toolbox: {
				        feature: {
				            saveAsImage: {}
				        }
				    },
				    grid: {
				        left: '3%',
				        right: '4%',
				        bottom: '3%',
				        containLabel: true
				    },
				    xAxis : [
				        {
				            type : 'category',
				            boundaryGap : false,
				            data : window.data2
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
				            data:window.data3
				        },
				        {
				            name:'使用接口数',
				            type:'line',
				            stack: '总量',
				            areaStyle: {normal: {}},
				            data:window.data4
				        }
				    ]
				}
			)
		}.bind(this));


		this.monthValue=this.refs.monthRef.getValue();
		this.findList(this.monthValue);

		this.state.userBusiness.on("fetchDone",function(){
			this.setState({
				userBusiness:this.state.userBusiness
			});
		}.bind(this));
		if (this.state.huokeList2.length==0) {
			$(".wrighttable2").hide();
		}
		else{
			$(".wrighttable2").show();
		}
	},
	componentWillUnmount:function(){
		this.state.huokeList2.off("fetchDone");
		this.state.huokeList.off("fetchDone");
	},
	findList: function(month){
		window.month = month;
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
		console.log(list1);
		console.log(list2);
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
		this.state.huokeList2.fetch({
			loadingFlag:true,
			param:{
				productId:window.proid,
				month:month
			}
		});

		this.state.huokeList.fetch({
			loadingFlag:true,
			param:{
				productId:window.proid,
				month:month,
				interfaceNumOrder:list1,
				useCountOrder:list2
			}
		});
		this.state.userBusiness.fetch({
			loadingFlag:true,
			param:{
				userId:window.userId,
				month:month
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
		this.findList(this.monthValue);
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
				this.datePxStyle='px-text up';
				break;
			case 2:
				this.datePxStyle='px-text down';
				break;
		}
		switch (this.interfaceCountPx){
			case 0:
				this.interfaceCountPxStyle='px-text';
				break;
			case 1:
				this.interfaceCountPxStyle='px-text up';
				break;
			case 2:
				this.interfaceCountPxStyle='px-text down';
				break;
		}
		switch (this.useCountPx){
			case 0:
				this.useCountPxStyle='px-text';
				break;
			case 1:
				this.useCountPxStyle='px-text up';
				break;
			case 2:
				this.useCountPxStyle='px-text down';
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
	},
	render:function(){
		var pageInfo = {
			pageIndex: this.pageIndex,
			pageSize: this.pageSize,
			total: this.state.total
		};
		//获取当前月份及前五个月份的集合
		var dateArray = [this.getY_M(0),this.getY_M(-1),this.getY_M(-2),this.getY_M(-3),this.getY_M(-4)];
		this.pxStyle();
    	return (

    		
			<div className="rightcon pro-dtl">
				<div className="userinfo wuserinfo">
				<UserB option={this.state.userBusiness}/>
				</div>
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
				<div id="wechart"> </div>
				<div className="tablearea wrighttable2">
						<table>
						<thead>
							<tr>
								<th width="25%">接口名称</th>
								<th width="23%">百分比</th>
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
					<div id="wechart1" className={this.state.tabType==1 ? "char mt-20" : "char mt-20 hide"} ref="alarmchart" style={{height: 400, width: 1000}}></div>
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
										return <Datagrid key={index} option={item} />
									}.bind(this))
								}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		)
  	}
});

module.exports = UserCharge;