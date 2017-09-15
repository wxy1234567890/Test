var React = require("react");
var TerseUI = require("terseui");
var PageTool = TerseUI.Frame.PageTool;
var modalHelp = TerseUI.Frame.modalHelp;
var Dialog = TerseUI.Frame.Dialog;
var Dialogdtl = require("./dtl.jsx");
var huokeList = require('collection/HuokeMonthList');
var awardDetail = require('collection/AwardDetail');
var Select = TerseUI.Select;
var FormGroup = TerseUI.FormGroup;
var echarts = require("echarts");

var Datagrid = React.createClass({
	Dialogdtl: function(time) {
		modalHelp.show({
			Dialog: Dialogdtl,
			option: {
				param:{
					time:time
				},
				ok:{},
        		cancel:{}
			}
		});
	},
	render: function() {
		var item = this.props.option;
		return (
			<tr>
				<td width="30%">
					<span className="ellipsis ch-blue cursor" onClick={this.Dialogdtl.bind(this,item.get('date'))}>{item.get('date')}</span>
				</td>
				<td width="30%">
					<span className="ellipsis">{item.get('phoneCount')}</span>
				</td>
				<td width="30%">
					<span className="ellipsis">{item.get('smsCount')}</span>
				</td>
				<td width="10%">
					<span className="ellipsis ch-blue">下载详单</span>
				</td>
			</tr>
		)
	}
});
var Survey = React.createClass({
	getInitialState: function() {
		return {
			awardDetail2: new awardDetail()
		}
	},
	componentDidMount: function() {
		//监听加载获客专家概况
		this.state.awardDetail2.on("fetchDone2",function(){
			this.setState({
				awardDetail2:this.state.awardDetail2
			});
		}.bind(this));
	},
	componentWillUnmount:function(){
		this.state.awardDetail2.off("fetchDone2");
	},
	componentWillReceiveProps:function(nextProps){
		if(nextProps.option!=this.props.option){
			this.findDetail(nextProps.option);
		}
	},
	findDetail: function(month){
		this.state.awardDetail2.fetch({
			loadingFlag:true,
			param:{
				userId:'',
				month:month
			}
		});
	},
	render: function() {
		var awardDetail = this.state.awardDetail2;
		return (
			<div className="dtl">
				<p className="name">获客专家</p>
				<div className="left-data">
					<p className="mb-5">购买总计 / 发送总计 / 当月发送(条)</p>
					<p><b>{awardDetail.get('allCount')}</b><em></em><b>{awardDetail.get('allUseCount')}</b><em></em><b>{awardDetail.get('monthUseCount')}</b></p>
					<p className="other mt-10">当前状态：{awardDetail.get('status')}</p>
					<p className="other">付费类型：--</p>
					<p className="other">开通日期：{awardDetail.get('buyDate')}</p>
					<p className="other">所属企业：--</p>
				</div>
			</div>
		)
	}
});
var Award = React.createClass({
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
			tabType:1,//1-图表显示 2-表格显示
			huokeList2: new huokeList()
		}
	},
	getOption: function() {
		this.option = {
			tooltip: {
                trigger: 'axis',
                enterable:true,//可悬停
                position: function (pt) {
                    return [pt[0], '20%'];
                },
				axisPointer:{
					type:'line',
					lineStyle:{
						color:'#4fc277',
						width:2
					}
				}
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
				splitLine:{
					show:true
				},
                data: []
            },
            yAxis: {
                type: 'value',
				splitLine:{
					show:true
				}
            },
            series: [{
                name:'发送号码',
                type:'line',
                smooth: true,
				//折线拐点标志的样式
				itemStyle: {
					normal: {
						color:'#4fc277',//圈颜色
						lineStyle:{
							color:'#a6e0ba'//折线颜色
						}
					}
				},
				areaStyle: {
					normal: {
						color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
							offset: 0, color: '#a6e0ba' // 0% 处的颜色
						}, {
							offset: 1, color: '#ebf8f0' // 100% 处的颜色
						}], false)
					}
				},
                data: []
            },{
                name:'发送条数',
                type:'line',
                smooth: true,
				itemStyle: {
					normal: {
						color:'#4fc277',
						lineStyle:{
							color:'#a6e0ba'
						}
					}
				},
				areaStyle: {
					normal: {
						color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
							offset: 0, color: '#a6e0ba'
						}, {
							offset: 1, color: '#ebf8f0'
						}], false)
					}
				},
                data: []
            }]
		};
	},
	// 加载图表数据
	initChart: function() {
		var date = [];
        var data1 = [];
        var data2 = [];

		this.state.huokeList2.map(function(item){
			date.push(item.get('date'));
			data1.push(item.get('phoneCount'));
			data2.push(item.get('smsCount'));
		}.bind(this));

		this.option.xAxis.data = date;
		this.option.series[0].data = data1;
		this.option.series[1].data = data2;
		this.myChart.setOption(this.option);
		this.myChart.on('click', function (params) {
            modalHelp.show({
				Dialog: Dialogdtl,
				option: {
					param:{
						time:params.name
					},
					ok:{},
        			cancel:{}
				}
			});
        });
	},
	componentDidMount: function() {
		this.myChart = echarts.init(this.refs.alarmchart);
		this.getOption();

		//监听加载列表操作
		this.state.huokeList2.on("fetchDone",function(){
			//成功后触发
			this.setState({
				huokeList2:this.state.huokeList2
			});
			this.initChart();
		}.bind(this));
		this.monthValue=this.refs.monthRef.getValue();
		this.findList(this.monthValue);
	},
	componentWillUnmount:function(){
		this.state.huokeList2.off("fetchDone");
	},
	findList: function(month){
		var useCountOrder = "";
		var interfaceCountOrder = "";
		var dayOrder = "1";
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
				userId:'',
				month:month,
				useCountOrder:useCountOrder,
				interfaceCountOrder:interfaceCountOrder,
				dayOrder:dayOrder
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
	render: function() {
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
				<div className="userinfo">
					<img src={require("../../../images/pic4.png")} />
					<Survey option={this.monthValue}/>
				</div> 
				<div className="oper clearfix">
					<div className="tit fl">
						<div>
							<Select ref="monthRef" label="月账单查看" labelWidth="100px" onChange={this.changeSelect}>
								{
									dateArray.map(function(item){
										return <option value={item}>{item}</option>
									}.bind(this))
								}
							</Select>
						</div>
					</div>
					<p className="fr mt-5"><span className="btn white line s">下载账单</span></p>
				</div>   
				<div className="rightbody">
					<p className="title clearfix">
						<span className="name fl"><b className="f16">时间分析</b></span>
						<ul className="radiobtn fr">
							<li className={this.state.tabType==1 ? "active" : ""} onClick={this.changeTab.bind(this,1)}>图表显示</li>
							<li className={this.state.tabType==2 ? "active" : ""} onClick={this.changeTab.bind(this,2)}>表格显示</li>
						</ul>
					</p>
					<div className={this.state.tabType==1 ? "char mt-20" : "char mt-20 hide"} ref="alarmchart" style={{height: 400, width: "100%"}}></div>
					<div className={this.state.tabType==2 ? "tablediv mt-20" : "tablediv mt-20 hide"}>
						<div className="tablearea">
							<table>
								<tbody>
									<tr>
										<th width="30%" className={this.datePxStyle} onClick={this.px.bind(this,'1')}>
											<span className="ellipsis">日期<em className="px"></em></span>
										</th>
										<th width="30%" className={this.interfaceCountPxStyle} onClick={this.px.bind(this,'2')}>
											<span className="ellipsis">发送号码<em className="px"></em></span>
										</th>
										<th width="30%" className={this.useCountPxStyle} onClick={this.px.bind(this,'3')}>
											<span className="ellipsis">发送条数<em className="px"></em></span>
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
										this.state.huokeList2.map(function(item){
											return <Datagrid key={"mystore-"+item.id} option={item} />
										}.bind(this))
									}
								</tbody>
							</table>
						</div>
					</div>
				</div>  
	  		</div>
		);
	}
});

module.exports = Award;