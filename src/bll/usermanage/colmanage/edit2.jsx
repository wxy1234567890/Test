var React = require("react");
var allBusiness = require('collection/businessAll');
var exitBusiness = require('collection/getProductList');
var colEdit = require('collection/colEdit');

var BusinessList = React.createClass({
	render: function() {
		var allBusiness = this.props.option;
		return (
			<select multiple="multiple" id="select1">
				{allBusiness.map(function(item,index){
					return (						
							<option key={index} value={index} itemID={item.get("id")}>{item.get("name")}</option>
					)
				}.bind(this))}
			</select>
		)
	}
})
var BusinessList2 = React.createClass({
	render: function() {
		var allBusiness = this.props.option;
		return (
			<select multiple="multiple" id="select2">
				{allBusiness.map(function(item,index){
					return (						
							<option key={index} value={index} itemID={item.get("id")}>{item.get("name")}</option>
					)
				}.bind(this))}
			</select>
		)
	}
})
var Add = React.createClass({
	getInitialState:function(){
		return{
			showMenu:false,
			showMenu2:false,
			allBusiness:new allBusiness(),
			exitBusiness:new exitBusiness(),
			colEdit:new colEdit(),
			payType:"",
			price:""
		};
	},
	componentDidMount: function() {
		this.state.allBusiness.on("fetchDone",function(){
			this.setState({
				allBusiness:this.state.allBusiness
			});
		}.bind(this));
		this.state.allBusiness.on("fetchDone",function(){
			this.setState({
				exitBusiness:this.state.exitBusiness
			});
		}.bind(this));
		this.getAllBusiness();
	},
	getAllBusiness:function(){
		this.state.allBusiness.fetch({
			loadingFlag:true,
			param:{
				loginUserId:""
			}
		});
		this.state.exitBusiness.fetch({
			loadingFlag:true,
			param:{
				userId:window.subItem
			}
		});
	},
	closeHandler: function() {
		this.props.close();
	},
	cancelHandler: function() {
		this.props.close();
	},
	okHandler: function() {
		var arrsum = [];
		$("#select2 option").each(function () {
			arrsum.push($(this).attr("itemID"));
		})
		this.state.colEdit.on("fetchDone",function(){
			this.props.close();
			location.reload(); 
		}.bind(this));
		this.state.colEdit.fetch({
			loadingFlag:true,
			param:{
				id:window.subItem,
				arr:arrsum
			}
		});
	},
	//显示或隐藏下拉多选框
	showClickHandler: function() {
		this.setState({
			showMenu: !this.state.showMenu
		});
	},
	businessTypeChange:function (business) {
		this.setState({
			showMenu: !this.state.showMenu
		})
	},
	showClickHandler2:function () {
		this.setState({
			showMenu2: !this.state.showMenu2
		});
	},
	businessPayChange:function (payType) {
		this.setState({
			payType:payType,
			showMenu2: !this.state.showMenu2
		})
	},
	priceChange:function (e) {
		this.setState({
			price:e.target.value
		})
	},
	addRight:function (e) {
		$('#select1 option:selected').appendTo('#select2');
	},
	addAllRight:function (e) {
		$('#select1 option').appendTo('#select2');
	},
	removeItem:function (e) {
		$('#select2 option:selected').appendTo('#select1');
	},
	removeAllItem:function (e) {
		$('#select2 option').appendTo('#select1');
					// <div className="search-box pos-relative fl wsearchbox awayleft wsea">
					// 	<input placeholder="请输入查询内容" className="s-text" type="text" value={this.state.userName} onChange={this.userNameChange}/>
					// 	<span className="s-btn" onClick={this.getUserList}></span>
					// 	<em className="del cursor pos-absolute"></em>
					// </div>
	},
	render: function() {

		return (
			<div className="dialog-confirm addif addyw">
				<div className="dialog-hd clearfix">
					<h2>添加产品</h2>
					<span className="close" onClick={this.closeHandler}>×</span>
				</div>
			<div className="diagleft">
				<div className="search-area ml-20 mr-20 mb-10 clearfix">


				<span className="title ellipsis ctlogsea">全部产品</span>
					<div className="centent">
					<BusinessList option={this.state.allBusiness} getBusinessInfo={this.getBusinessInfo}/>
						<div>
							<span id="add" onClick={this.addRight}>选中添加到右边&gt;&gt;</span>
							<br/>
							<span id="add_all" onClick={this.addAllRight}>全部添加到右边&gt;&gt;</span>
						</div>
					</div>
				</div>
				</div>
				<div className="diagright">
				<div className="search-area ml-20 mr-20 mb-10 clearfix">
					<span className="title ellipsis ctlogsea">已有产品</span>
					<div className="centent">
					<BusinessList2 option={this.state.exitBusiness}/>
						<div>
							<span id="remove" onClick={this.removeItem}>&lt;&lt;选中删除到左边</span>
							<br/>
							<span id="remove_all" onClick={this.removeAllItem}>&lt;&lt;全部删除到左边</span>
						</div>
					</div>
				</div>
				</div>
				<div className="dialog-ft">
					<span className="btn btn-create mr-10" onClick={this.okHandler}>提交</span>
					<span className="btn btn-close" onClick={this.cancelHandler}>关闭</span>
				</div>
			</div>
		);
	}
});

module.exports = Add;