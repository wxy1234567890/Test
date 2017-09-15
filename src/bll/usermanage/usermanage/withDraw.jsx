var React = require("react");
var colAdd = require('collection/colADD5');
var Add = React.createClass({
	getInitialState:function(){
		return{
			showMenu:false,
			showMenu2:false,
			code:"",
			name:"",
			addItem:new colAdd()
		};
	},
	componentDidMount: function() {
	},
	getAllBusiness:function(){
	},
	closeHandler: function() {
		this.props.close();
	},
	cancelHandler: function() {
		this.props.close();
	},
	okHandler: function() {
		this.state.addItem.on("fetchDone",function(){
			this.props.close();
		}.bind(this));
		this.state.addItem.fetch({
			loadingFlag:true,
			param:{
				id:window.subItem
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
	nameChange:function (e) {
		this.setState({
			name:e.target.value
		})
	},
	codeChange:function (e) {
		this.setState({
			code:e.target.value
		})
	},
	render: function() {

		return (
			<div className="dialog-confirm addyw">
				<div className="dialog-hd clearfix">
					<h2>退订</h2>
					<span className="close" onClick={this.closeHandler}>×</span>
				</div>
				<div className="diagleft wdiagleft">
				<div className="search-area ml-20 mr-20 mb-10 clearfix">
					<span className="name w85 ">是否退订产品</span>
				</div>
				</div>
				<div className="dialog-ft wdialog-ft">
					<span className="btn btn-create mr-10" >确定</span>
					<span className="btn btn-close" onClick={this.cancelHandler}>关闭</span>
				</div>
			</div>
		);
	}
});

module.exports = Add;