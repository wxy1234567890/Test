var React = require('react');
var userList = require('collection/userList');
var userBusiness = require('collection/userBusiness');
var subject = require("model/global/subject");
var TerseUI = require("terseui");
var laydate = require("laydate");
var PageTool = TerseUI.Frame.PageTool;
var modalHelp = TerseUI.Frame.modalHelp;
var Dialog = TerseUI.Frame.Dialog;
var DataGrid = TerseUI.Frame.DataGrid;
var Dialogdtl = require("./dtl.jsx");
var huokeList = require('collection/HuokeDayList');
var huokeList2 = require('collection/HuokeMonthList2');
var awardDetail = require('collection/AwardDetail');
var Select = TerseUI.Select;
var FormGroup = TerseUI.FormGroup;
var echarts = require("echarts");
var token = require("./token");

var UserB = React.createClass({
	render:function(){
		var typeName = ["预付费","先付费"];
		var userBusiness = this.props.option;
		return (
				<ul>
				{userBusiness.map(function(item,index){
					if(window.proid == item.get('id')){
					return (							
							<p className='fl' key={index}>
								<span className="f18" style={{"display":"inline-block","height":"24px","margin":"20px","fontWeight":600}}>{item.get('name')?item.get('name'):'暂无数据'}<span className='prepaid'>（{typeName[item.get('productType')]}）</span></span>
							</p>
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

var Item = React.createClass({
    getInitialState: function () {
        return {
            status: 0,
        }
    },
    render: function () {
        var model = this.props.option.item;
        return (
            <tr>
                <td width="20%">
		        	<span className="ellipsis" title={model.get("seatingDecode")}>
			        	<b className="f14 deepgray">
				         	{model.get("seatingDecode")}
				        </b>
			        </span>
                </td>
                <td width="20%">
		        	<span className="ellipsis" title={model.get("callTime")}>
			         	{model.get("callTime")}
			        </span>
                </td>
                <td width="20%">
                    <div className="select-div ellipsis" title={model.get("logicalGroup")}>
						<span>
							{model.get("logicalGroup")}
						</span>
                    </div>
                </td>
                <td width="20%">
		        	<span className="ellipsis" title={model.get("seatingCharge")}>
			         	{model.get("seatingCharge")}
			        </span>
                </td>
                <td width="20%">
		        	<span className="ellipsis" title={model.get("updateTime")}>
			         	{model.get("updateTime")}
			        </span>
                </td>
            </tr>
        );
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
		var exectime = new  Date(), month=parseInt(exectime.getMonth())+1;
		return {
			exectime:exectime.getFullYear()+"-"+month+"-"+exectime.getDate(),
			exectime: exectime,
			tabType:2,//1-图表显示 2-表格显示
			huokeList2: new huokeList2(),
			huokeList:new huokeList(),
			userBusiness:new userBusiness(),
			huokelistarr:[],
			interfaceNumOrder:true,
			useCountOrder:true,
			// seatingModel: new SeatingModel(),
			// userid:this.props.option.userId,
			// userid:this.props.option.userId,
			// username:this.props.option.username,
			pageIndex: 1,
            pageSize: 10,
            filter: "",
            flag: false,
            agentList:[],
            status:'0',
            total:10
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
	pageClick: function () {
        var NUM = this.state.pageNum;
        var starP = (NUM - 1) * 10;
        var stopP = NUM * 10;
        this.state.pageColl = this.state.pageCollT.slice(starP,stopP);
        this.setState({
            pageColl: this.state.pageColl
        }, function () {
            console.log(this.state.pageColl);
        })
    },
	componentDidMount: function() {
		this.tokenEvents = {
            "page": this.huokeList2(),
        };
        token.on(this.tokenEvents);
		this.myChart = echarts.init(this.refs.alarmchart);

		this.huokeList2();
		this.huokeList();

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
		if (this.state.huokeList.length==0) {
			$(".wrighttable2").hide();
		}
		else{
			$(".wrighttable2").show();
		}
	},
	componentWillUnmount:function(){
		this.unmount = true;
        token.off(this.tokenEvents);
        token.clear();
		this.state.huokeList2.off("fetchDone");
		this.state.huokeList.off("fetchDone");
	},
	huokeList:function(){
		this.state.huokeList.on("fetchDone",function(){
			this.setState({
				huokeList:this.state.huokeList
			});
			this.initChart();
			
		var myChart1 = echarts.init(document.getElementById('wechart1'));
        //指定图表的配置项和数据
 		myChart1.setOption({
					title : {
				       text: '总概述',
				       textStyle: {
		               fontWeight: 600,
		            },
				       x:'left'
				   },
				    tooltip: {
				        trigger: 'item',
        				formatter: "{a} <br/>{b} ({d}%)"
				    },
				    series: [
				        {
				            name:'访问来源',
				            type:'pie',
				            selectedMode: 'single',
				            radius : '60%',
				            center: ['40%', '50%'],
				            label: {
				                normal: {
				                show:true,
				                }
				            },
				            labelLine: {
				                show:true,
				            },
				            data:[
				                {value:335, name:'坐席数：335个',selected:true},
				                {value:679, name:'总时长：679小时'},
				                {value:1548, name:'总费用：1548元'}
				            ],
				            color: ['#0ec3b4','#1cbf28','#0085d0']
				        },
				    ]				
				}
			)
		}.bind(this));
	},
	huokeList2:function(){		
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
					title : {
					       text: '总概述',
					       textStyle: {
			               fontWeight: 600,
			            },
					       x:'left'
					   },
				    tooltip: {
				        trigger: 'item',
        				formatter: "{a} <br/>{b} ({d}%)"
				    },
				    series: [
				        {
				            name:'访问来源',
				            type:'pie',
				            selectedMode: 'single',
				            radius : '60%',
				            center: ['40%', '50%'],
				            label: {
				                normal: {
				                show:true,
				                }
				            },
				            labelLine: {
				                show:true,
				            },
				            data:[
				                {value:335, name:'坐席数：335个',selected:true},
				                {value:679, name:'总时长：679小时'},
				                {value:1548, name:'总费用：1548元'}
				            ],
				            color: ['#0ec3b4','#1cbf28','#0085d0']
				        },
				    ]
				}
			)
		}.bind(this));
	},
	eventListener:function (type, param) {
        if (type == "page") {
            this.state.pageSize = param;
            this.setState({
                pageSize: this.state.pageSize
            });
            token.trigger('page');
        }
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
	},
	dayInfo:function(){
		this.state.status = '1';
		this.setState({
			status: '1'
		});
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
	render:function(){
		var headOpt = [{
            key: 'seatingDecode',
            name: '坐席编码',
            width: '20%'
        }, {
            key: 'callTime',
            name: '呼叫时长',
            width: '20%',
        },{
            key: 'logicalGroup',
            name: '逻辑分组',
            width: '20%'
        },  {
            key: 'seatingCharge',
            name: '坐席费用',
            width: '20%',
        },{
            key: 'updateTime',
            name: '更新时间',
            width: '20%'
        },];
		var pageInfo = {
			pageIndex: this.state.pageIndex,
			pageSize: this.state.pageSize,
			total: this.state.total
		};
		var style1={"height":"64px","width":"300px"}, style2={"width":"583px","height":"400px"},style3={"marginTop":"-406px"},style4={"fontWeight":800,"margin":"10px 20px"};
		var style5={"display":"inline-block","width":"45px"},style6={"width":"240px"};
		//获取当前月份及前五个月份的集合
		var dateArray = [this.getY_M(0),this.getY_M(-1),this.getY_M(-2),this.getY_M(-3),this.getY_M(-4)];
		this.pxStyle();
    	return (    		
			<div className="rightcon pro-dtl">
				<div className="userinfo" style={style1}>
					<UserB option={this.state.userBusiness}/>
				</div>
				<div className="oper clearfix">
					<div className="navigate">
							<span className={this.state.status =='0' ?"fl active":"fl"} onClick={this.monthInfo}>按月查看</span>
							<span className={this.state.status =='1' ?"fl active":"fl"} onClick={this.dayInfo}>按天查看</span>							
					</div>					
				</div>
				<div className={this.state.status =='1' ?"hide":""}>
					<div className="oper clearfix">
							<div className="tit fl">
								<Select className="ml-20" ref="monthRef" label="选择月" labelWidth="45px" onChange={this.changeSelect}>
									{
										dateArray.map(function(item,index){
											return <option key={index} value={item}>{item}</option>
										}.bind(this))
									}
								</Select>
							</div>
					</div>
					<div id="wechart" className="ml-20"> </div>					
					<div className="tablearea wrighttable2" style={style3}>
							<p className="f16" style={style4}>坐席详情</p>
							<div className="pos-rel dialogdatagrid trdialog">
	                        <DataGrid
	                            headOpt={headOpt}
	                            list={this.state.huokeList2}
	                            itemCls={Item}
	                            pageInfo={pageInfo}
	                            eventListener={this.eventListener}/>
	                    	</div>
					</div>
				</div>
				<div className={this.state.status =='0' ?"hide":""}>
					<div className="oper clearfix">
						<div className="tit fl mb-12">
							<label className="ml-20 mr-10" style={style5}>选择天</label>
							<input id="start" className="timeinput cursor" type="text" placeholder="请输入查询时间" style={style6}
                               onChange={this.createtimeChangeHandler}
                               onClick={this.onDatetimeClick.bind(this, "start")}
                               ref="timeRef"/>									
						</div>
					</div>
					<div id="wechart1" className="ml-20" ref="alarmchart" style={style2}></div>
					<div className="tablearea wrighttable2" style={style3}>
							<p className="f16" style={style4}>坐席详情</p>
							<div className="pos-rel dialogdatagrid trdialog">
	                        <DataGrid
	                            headOpt={headOpt}
	                            list={this.state.huokeList}
	                            itemCls={Item}
	                            pageInfo={pageInfo}
	                            eventListener={this.eventListener}/>
	                    	</div>
					</div>
				</div>
			</div>
		)
  	}
});

module.exports = UserCharge;