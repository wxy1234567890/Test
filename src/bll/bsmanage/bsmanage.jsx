var React = require("react");
var TerseUI = require('terseui');
var DataGrid = TerseUI.Frame.DataGrid;
var Select = TerseUI.Select;
var Pagetool = TerseUI.Frame.PageTool;
var Scroll = TerseUI.Scroll;
var subject = require("model/global/subject");
var modalHelp = TerseUI.Frame.modalHelp;
var Dialog = TerseUI.Frame.Dialog;
var dtlDialog = require("./details.jsx");
var allBusiness = require('collection/businessAll');
var businessInfo = require('collection/businessInfo');
var businessDelete = require('collection/businessDelete');
var businessOff = require('collection/businessOff');
var checkInSubscription = require('collection/checkInSubscription');
var checkInSubscription2 = require('collection/checkInSubscription2');
var editBusinessDialog = require("./editBusiness.jsx");
var businessMonth = require('collection/businessMonth');
var productUseStat = require('collection/productUseStat');
var configList = require('collection/configList');
var getY_M = require("util/validcheck").getY_M;
var BusinessList = React.createClass({
	toShowBusinessInfo:function (businessId) {
		//调用父类中方法
		this.props.getBusinessInfo(businessId);
	},
	render: function() {
		var allBusiness = this.props.option;
		var statusName=["冻结中","运行中"];
		return (
			<ul className="ullist">
				{allBusiness.map(function(item,index){
					return (
						<li key={index} className="clearfix cursor" onClick={this.toShowBusinessInfo.bind(this,item.get('id'))}>
							<div className="userimfor clearfix">
								<img className="fl" src={require( "../../images/pic1.png")} width="79" height="56" />
								<div className="imfordtl fl">
									<span className="name ellipsis">{item.get("name")}</span>
									<span>{statusName[item.get("status")]}</span>
								</div>
							</div>
						</li>
					)
				}.bind(this))}
			</ul>
		)
	}
})
var BusinessDetail = React.createClass({
	render: function() {
		var businessInfo = this.props.option;
		var typeName = ["预付费","后付费"];
		var typeCharge = ["包月套餐","包条数套餐","按次计费",];
		return (
			<ul className="basicinfo winfor">
				<li className="clearfix wbor-h">
					<span className='name-h f12 fl'>产品编码</span>
					<span className='info-h f10 fr'>{businessInfo.get("code")}</span>
				</li>
				<li className="clearfix wbor-h">
					<span className='name-h f12 fl'>产品类型</span>
					<span className='info-h f10 fr'>接口产品</span>
				</li>
				<li className="clearfix wbor-h">
					<span className='name-h f12 fl'>计费类型</span>
					<span className='info-h f10 fr'>{typeCharge[businessInfo.get("charge_type")]}</span>
				</li>
				<li className="wbor-h clearfix">
					<span className='name-h f12 fl'>订购价格</span>
					<span className='info-h f10 fr'>{businessInfo.get("bundle_price")}元</span>
				</li>
				<li className="clearfix wbor-h">
					<span className='name-h f12 fl'>月使用量</span>
					<span className='info-h f10 fr'>{businessInfo.get("use_limit")==-1?"无限制":businessInfo.get("use_limit")}</span>
				</li>
				<li className="clearfix wbor-h">
					<span className='name-h f12 fl'>用户限制</span>
					<span className='info-h f10 fr'>{typeName[businessInfo.get('type')]}</span>
				</li>
				<li className="clearfix wbor-h">
					<span className='name-h f12 fl'>产品描述</span>
					<span className='info-h f10 fr'>{businessInfo.get("description")}</span>
				</li>
				<li className="clearfix wbor-h">
					<span className='name-h f12 fl'>套餐外使用</span>
					<span className='info-h f10 fr'>{businessInfo.get("out_bundle_use")==0?"不支持":"支持"}</span>
				</li>
				<li className="clearfix wbor-h">
					<span className='name-h f12 fl'>产品创建时间</span>
					<span className='info-h f10 fr'>{businessInfo.get("create_time")}</span>
				</li>
			</ul>
		)
	}
})
var BusinessStatistics = React.createClass({
	toShowComAll:function (e) {
		if(e.target.parentNode.getAttribute('class')=="tableol"){
			console.log("i");
		var activenodelist =document.getElementsByClassName("active tableol");
		console.log(activenodelist);
		activenodelist[0].setAttribute('class','tableol');
		e.target.parentNode.setAttribute('class','active tableol');
		}
	},
	render: function() {
		var productUseStat = this.props.option;
		console.log(productUseStat);
		return (
			<div className='tableo-h'>
				<p className='tableol active' onClick={this.toShowComAll}>
					<span className='cap-h'>当月消费(条)</span>
					<span className='num-hys'>{productUseStat.get("monthConsume")}</span>
				</p>
				<p className='tableol' onClick={this.toShowComAll}>
					<span className='cap-h'>消费总计(条)</span>
					<span className='num-hys'>{productUseStat.get("totalConsume")}</span>
				</p>
				<p className='tableol' onClick={this.toShowComAll}>
					<span className='cap-h'>用户数(人)</span>
					<span className='num-hys'>{productUseStat.get("userCount")}</span>
				</p>
				<p className='tableol' onClick={this.toShowComAll}>
					<span className='cap-h'>购买总计(次)</span>
					<span className='num-hys'>{productUseStat.get("subsCount")}</span>
				</p>
			</div>
		)
	}
})
var BSManage = React.createClass({
	pageSize: 10,
	pageIndex: 1,
	getInitialState:function(){
		return{
			showMenu:false,
			monthStr:getY_M(0),
			searchKey:"",
			orderType: "asc",
			orderBy: "countOrder",
			businessOff:new businessOff(),
			businessDelete:new businessDelete(),
			checkInSubscription:new checkInSubscription(),
			checkInSubscription2:new checkInSubscription2(),
			allBusiness:new allBusiness(),
			businessInfo:new businessInfo(),
			businessMonth:new businessMonth(),
			productUseStat:new productUseStat(),
			configList: new configList(),
			tablename:{
				table1: "用户名",
				table2: "使用接口数",
				table3: "使用接口次数",
				table4: "操作"
			},
			pageInfo: {
				total:0,
				pageSize:this.pageSize,
				pageIndex:this.pageIndex
			}
		};
	},
	componentDidMount: function() {
		this.state.allBusiness.on("fetchDone",function(){
			this.setState({
				allBusiness:this.state.allBusiness
			});
			this.getBusinessInfo(this.state.allBusiness.toArray()[0].get('id'));
			this.getProductUseStat(this.state.allBusiness.toArray()[0].get('id'));
			this.getConfigList(this.state.allBusiness.toArray()[0].get('id'));
		}.bind(this));

		this.state.businessInfo.on("getDetailDone",function(){
			this.setState({
				businessInfo:this.state.businessInfo
			});
			window.businessInfo = this.state.businessInfo.attributes;
			this.getBusinessMonth();
		}.bind(this));

		this.state.configList.on("fetchDone",function(){
			this.setState({
				configList:this.state.configList
			});
			window.configList = this.state.configList;
			console.log(window.configList);
		}.bind(this));

		this.state.productUseStat.on("getProductUseStat",function(){
			this.setState({
				ProductUseStat:this.state.ProductUseStat
			});
		}.bind(this));

		this.state.businessDelete.on("businessDeleteDone",function(){
			//删除指定业务后，重新加载列表
			this.getAllBusiness();
		}.bind(this));

		this.state.checkInSubscription.on("checkDone",function(){
			this.state.businessOff.businessOffDoing({
						loadingFlag:true,
						param:{
							businessId:this.state.businessInfo.get("id")
			}
		})
		}.bind(this));

		this.state.checkInSubscription.on("showError",function(){
			this.showError();
		}.bind(this));

		this.state.checkInSubscription2.on("checkDone2",function(){
			subject.trigger("navigate",{
		      path:"createbs2"
		    });
		}.bind(this));

		this.state.checkInSubscription2.on("showError2",function(){
			this.showError();
		}.bind(this));

		this.state.businessOff.on("businessOffDone",function(){
			//下线指定业务后调用
		}.bind(this));

		this.state.businessMonth.on("fetchDone", function(total) {
			this.setState({
				businessMonth: this.state.businessMonth,
				pageInfo:{total:total, pageSize:this.pageSize, pageIndex:this.pageIndex}
			});
		}.bind(this));
		this.getAllBusiness();
	},
	pageTo: function(page) {
		this.pageIndex = page;
		this.getBusinessMonth();
	},
	getBusinessMonth:function (wmonth) {
		this.state.businessMonth.fetch({
			loadingFlag: true,
			param:{
				businessId:this.state.businessInfo.get('id'),
				month:wmonth,
				userName:this.state.searchKey,
				pageSize:this.pageSize,
				pageIndex:this.pageIndex,
				orderType:this.state.orderType,
				orderBy:this.state.orderBy
			}
		});
	},
	//指定业务详情
	getProductUseStat:function (businessId) {
		this.state.productUseStat.getDetail({
			loadingFlag:true,
			param:{
				businessId:businessId
			}
		});
	},
	getBusinessInfo:function (businessId) {
		this.state.businessInfo.getDetail({
			loadingFlag:true,
			param:{
				businessId:businessId
			}
		});
		this.state.productUseStat.getDetail({
			loadingFlag:true,
			param:{
				businessId:businessId
			}
		});
		this.state.configList.fetch({
			loadingFlag:true,
			param:{
				businessId:businessId
			}
		});
	},
	getConfigList:function (businessId) {
		this.state.configList.fetch({
			loadingFlag:true,
			param:{
				businessId:businessId
			}
		});
	},
	getAllBusiness:function(){
		this.state.allBusiness.fetch({
			loadingFlag:true,
			param:{
				loginUserId:""
			}
		});
	},
	orderClickHandler: function(orderName) {
		if (this.state.orderBy == orderName) {
			if (this.state.orderType == "desc") {
				this.state.orderType = "asc";
			} else {
				this.state.orderType = "desc";
			}
		} else {
			this.state.orderBy = orderName;
			this.state.orderType = "asc";
		}
		this.getBusinessMonth();
	},
	dtlDetails: function() {
		modalHelp.show({
			Dialog: dtlDialog,
			option: {
				ok: {}
			}
		});
	},
	updateBusiness: function(businessId) {
		this.state.checkInSubscription2.fetch({
			loadingFlag:true,
			param:{
				businessId:businessId
			}
		})
	},
	createbs: function() {
		subject.trigger("navigate",{
	      path:"createbs"
	    });
	},
	offBusiness:function (businessId) {
		modalHelp.show({
			Dialog: Dialog,
			option: {
				type: "question",
				title: "确认",
				content: "确定要下线该产品?",
				ok: {
					callback:function(){
						this.state.checkInSubscription.fetch({
							loadingFlag:true,
							param:{
								businessId:businessId
							}
						});
					}.bind(this)
				},
				cancel: {
					text: "取消"
				}
			}
		});
	},
	showError:function (businessId) {
		modalHelp.show({
			Dialog: Dialog,
			option: {
				type: "question",
				title: "错误",
				content: "产品被订购情况下无法进行该操作!",
				cancel: {
					text: "取消"
				}
			}
		});
	},
	updateBusiness2:function (businessId) {
		subject.trigger("navigate",{
	      path:"createbs2"
	    });
	},
	deleteBusiness:function (businessId) {
		modalHelp.show({
			Dialog: Dialog,
			option: {
				type: "question",
				title: "确认",
				content: "确定要删除该产品?",
				ok: {
					callback: function() {
						this.state.businessDelete.businessDeleteDoing({
							loadingFlag:true,
							param:{
								businessId:businessId
							}
						});
					}.bind(this)
				},
				cancel: {
					text: "取消"
				}
			}
		});
	},
	//显示或隐藏下拉多选框
	showClickHandler: function() {
		this.setState({
			showMenu: !this.state.showMenu
		});
	},
	monthChange:function (monthStr) {
		this.setState({
			monthStr:monthStr,
			showMenu: !this.state.showMenu
		});
	},
	search:function (e) {
		this.monthValue=e.target.value;
		this.getBusinessMonth(this.monthValue);
	},
	valueChange:function (e) {
		this.setState({
			searchKey:e.target.value
		})
	},
	toShowComAll:function (e) {
		if(e.target.parentNode.getAttribute('class')=="tableol"){
			console.log("i");
		var activenodelist =document.getElementsByClassName("active tableol");
		console.log(activenodelist);
		activenodelist[0].setAttribute('class','tableol');
		e.target.parentNode.setAttribute('class','active tableol');
		this.setState({
			tablename:{
				table1: "用户名",
				table2: "计费(元)",
				table3: "计费时间",
				table4: "操作"
			}
		})
		}
	},
	render: function() {
		var orderType = this.state.orderType;
		var orderBy = this.state.orderBy;
		var countOrderCss;
		var allCountOrderCss;
		if(orderBy=="countOrder"){
			allCountOrderCss = "px-text";
			if(orderType=="desc"){
				countOrderCss="px-text downt";
			}else if(orderType=="asc"){
				countOrderCss="px-text upt";
			}
		}else if(orderBy=="allCountOrder"){
			countOrderCss = "px-text";
			if(orderType=="desc"){
				allCountOrderCss="px-text downt";
			}else if(orderType=="asc"){
				allCountOrderCss="px-text upt";
			}
		}
		//获取当前月份及前五个月份的集合
		var dateArray = [getY_M(0),getY_M(-1),getY_M(-2),getY_M(-3),getY_M(-4)];
		return (
			<div className="widthmodule">
				<Scroll className="leftcon">
					<span className="btn green block"  onClick={this.createbs}>发布新产品</span>
					<BusinessList option={this.state.allBusiness} getBusinessInfo={this.getBusinessInfo}/>
				</Scroll>
				<div className="rightcon">
					<div className="basicinfo wtopw">
						<div className="title ellipsis">{this.state.businessInfo.get("name")}</div>
						<div className="btnarea mb-40">
							<span className="btn white mr-10" onClick={this.offBusiness.bind(this,this.state.businessInfo.get("id"))}>下线</span>
							<span className="btn white mr-10">预览产品</span>
							<span className="btn white mr-10" onClick={this.updateBusiness.bind(this,this.state.businessInfo.get("id"))}>编辑产品</span>
						</div>
					</div>
					<BusinessDetail option={this.state.businessInfo}/>
					<div className='table-h mt-40'>
						<div className='tableo-h'>
							<p className='tableol active' >
								<span className='cap-h'>当月消费(条)</span>
								<span className='num-hys'>{this.state.productUseStat.get("monthConsume")}</span>
							</p>
							<p className='tableol' >
								<span className='cap-h'>消费总计(条)</span>
								<span className='num-hys'>{this.state.productUseStat.get("totalConsume")}</span>
							</p>
							<p className='tableol' >
								<span className='cap-h'>用户数(人)</span>
								<span className='num-hys'>{this.state.productUseStat.get("userCount")}</span>
							</p>
							<p className='tableol' >	
								<span className='cap-h'>购买总计(次)</span>
								<span className='num-hys'>{this.state.productUseStat.get("subsCount")}</span>
							</p>
						</div>
						<div className='tableu-h'>
							<div className="tablearea">
						<div className="tit fl wtitmonth">
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
								<table>
									<thead>
									<tr>
										<th width="30%">{this.state.tablename.table1}</th>
										<th className={countOrderCss} width="30%" onClick={this.orderClickHandler.bind(this,"countOrder")}>{this.state.tablename.table2}<em className="px"></em></th>
										<th className={allCountOrderCss} width="30%" onClick={this.orderClickHandler.bind(this,"allCountOrder")}>{this.state.tablename.table3}<em className="px"></em></th>
										<th width="10%">{this.state.tablename.table4}</th>
									</tr>
									</thead>
								</table>
							</div>
							<div className="tablearea">
								<table>
									<tbody>
									{this.state.businessMonth.map(function(item,index){
										return (
											<tr key={index}>
												<td width="30%">
													<span className="ellipsis">{item.get("real_name")}</span>
												</td>
												<td width="30%">
													<span className="ellipsis">{item.get("useCount")}</span>
												</td>
												<td width="30%">
													<span className="ellipsis">{item.get("interfaceCount")}</span>
												</td>
												<td width="10%">
													<span className="ellipsis" onClick={this.dtlDetails}>
														<em className="bluetxt cursor">查看详单</em>
													</span>
												</td>
											</tr>
										)
									}.bind(this))}
									</tbody>
								</table>
							</div>
							<div className="pagebar">
								<div className="pagetool">
									<Pagetool option={this.state.pageInfo} onPageTo={this.pageTo} />
								</div>
							</div>

						</div>
					</div>
					<div className='tableu-h wbottomtable'>
							<div className="tablearea">
								<table>
									<tbody>
											<tr>
												<td width="100%">
												<span className="ellipsis wprotitle">产品接口配置</span>
												</td>
											</tr>
											<tr>
												<th width="10%">序号</th>
												<th width="30%">接口名称</th>
												<th width="30%">接口价格</th>
												<th width="30%">调用限制</th>
											</tr>
									{this.state.configList.map(function(item,index){
										return (
											<tr key={index}>
												<td width="10%">
													<span className="ellipsis">
														{index+1}
													</span>	
												</td>
												<td width="30%">
													<span className="ellipsis">{item.get("name")}</span>
												</td>
												<td width="30%">
													<span className="ellipsis">{item.get("price")}</span>
												</td>
												<td width="30%">
													<span className="ellipsis">数量:{item.get("useLimit")<0?"无限制":item.get("useLimit")+"次"}</span>
												</td>
											</tr>
										)
									}.bind(this))}
									</tbody>
								</table>
							</div>
						</div>
				</div>
			</div>
		);
	}
});
module.exports = BSManage;