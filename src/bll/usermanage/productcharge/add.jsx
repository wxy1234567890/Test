var React = require("react");
var allBusiness = require('collection/businessAll');
var userBusinessAdd = require('collection/userBusinessAdd');

var Add = React.createClass({
	getInitialState:function(){
		return{
			showMenu:false,
			showMenu2:false,
			businessName:"",
			businessId:"",
			payType:"",
			price:"",
			userBusinessAdd:new userBusinessAdd(),
			allBusiness:new allBusiness()
		};
	},
	componentDidMount: function() {
		this.state.userBusinessAdd.on("fetchDone",function(){
			this.setState({
				userBusinessAdd:this.state.userBusinessAdd
			});
			this.props.close();
			this.props.option.ok.callback();
		}.bind(this));

		this.state.allBusiness.on("fetchDone",function(total){
			this.setState({
				allBusiness:this.state.allBusiness
			});
		}.bind(this));
		this.getAllBusiness();
	},
	getAllBusiness:function(){
		this.state.allBusiness.fetch({
			loadingFlag:true,
			param:{
				loginUserId:''
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
		var businessId = this.state.businessId;
		var payType = this.state.payType;
		var price = this.state.price;

		this.state.userBusinessAdd.fetch({
			loadingFlag:true,
			param:{
				userId:'',
				businessId:businessId,
				payType:payType,
				price:price
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
			businessName:business.get("name"),
			businessId:business.get("id"),
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
	render: function() {
		return (
			<div className="dialog-confirm addyw">
				<div className="dialog-hd clearfix">
					<h2>添加业务</h2>
					<span className="close" onClick={this.closeHandler}>×</span>
				</div>
				<div className="dialog-bd">
					<ul className="ulform clearfix">
						<li className="clearfix">
							<div className="name fl">选择业务</div>
							<div className="substance dw fl">
								<div className={this.state.showMenu ? "selectbox dw pos-rel open" : "selectbox dw pos-rel"}>
									<div className="selected pos-rel cursor">
										<input className="cursor" value={this.state.businessName} type="text" onClick={this.showClickHandler}/>
										<em className="pos-abs"></em>
									</div>
									<ul className="selectlist">
										{this.state.allBusiness.map(function(item,index){
											return <li key={index} onClick={this.businessTypeChange.bind(this,item)}>{item.get("name")}</li>
										}.bind(this))}
									</ul>
								</div>
								<span className="validate-tip mt-5 hide">
									<em></em><span>成功</span>
								</span>
							</div>
						</li>
						<li className="clearfix">
							<div className="name fl">付费类型</div>
							<div className="substance fl">
								<div className={this.state.showMenu2 ? "selectbox dw pos-rel open" : "selectbox dw pos-rel"}>
									<div className="selected pos-rel cursor">
										<input className="cursor" value={this.state.payType} type="text" onClick={this.showClickHandler2}/>
										<em className="pos-abs"></em>
									</div>
									<ul className="selectlist">
										<li onClick={this.businessPayChange.bind(this,"预付费")}>预付费</li>
										<li onClick={this.businessPayChange.bind(this,"后付费")}>后付费</li>
									</ul>
								</div>
								<span className="validate-tip error-s mt-5 hide">
									<em></em><span>失败，失败原因提示</span>
								</span>
							</div>
						</li>
						<li className="clearfix">
							<div className="name fl">购买数量</div>
							<div className="substance fl">
								<input placeholder="请输入..." type="text" value={this.state.pay} onChange={this.priceChange}/>
							</div>
						</li>
					</ul>
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