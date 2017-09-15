var React = require("react");
var TopUpAdd = require('collection/TopUp');
var chargeInfo = require('collection/chargeInfo');

var Add = React.createClass({
	getInitialState:function(){
		var param = this.props.option.param;
		return{
			id:param.id,
			showMenu:false,
			showMenu2:false,
			businessName:"",
			businessId:"",
			payType:"",
			price:"",
			TopUpAdd:new TopUpAdd(),
			chargeInfo:param.charge,
			userInfo:param.userInfo
		};
	},
	componentDidMount: function() {
		this.state.TopUpAdd.on("fetchDone",function(){
			this.setState({
				TopUpAdd:this.state.TopUpAdd,
				userInfo:this.state.price
			});
			this.props.close();
			location.reload();
		}.bind(this));

	},
	closeHandler: function() {
		this.props.close();
	},
	cancelHandler: function() {
		this.props.close();
	},
	okHandler: function() {
		var price = this.state.price;
		this.state.TopUpAdd.fetch({
			loadingFlag:true,
			param:{
				userId:this.state.id,
				price:price,
				desc:this.state.payType
			}
		});
	},
	businessPayChange:function (e) {
		this.setState({
			payType:e.target.value
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
					<h2>充值</h2>
					<span className="close" onClick={this.closeHandler}>×</span>
				</div>
				<div className="dialog-bd">
					<ul className="ulform clearfix">
						<li className="clearfix">
							<div className="name fl">充值金额</div>
							<div className="substance dw fl">
								<input  value={this.state.price} type="text" onChange={this.priceChange} />
							</div>
						</li>
						<li className="clearfix">
							<div className="name fl">充值描述</div>
							<div className="substance fl">
								<input className="inputh" value={this.state.payType} onChange={this.businessPayChange} type="text"/>
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