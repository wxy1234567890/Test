var React = require("react");
var colAdd = require('collection/colAdd3');
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
			location.reload(); 
		}.bind(this));
		this.state.addItem.fetch({
			loadingFlag:true,
			param:{
				name:this.state.name,
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
					<h2>修改目录</h2>
					<span className="close" onClick={this.closeHandler}>×</span>
				</div>
			<div className="diagleft wdiagleft">
				<div className="search-area ml-20 mr-20 mb-10 clearfix">
					<span className="name w85 ">Code<span className="tip">*</span></span>
					<div className="search-box pos-relative fl wsearchbox  wsea ">
						<input placeholder="输入Code" className="s-text" type="text" value={window.codeedit} disabled="disabled" onChange={this.codeChange}/>
						<em className="del cursor pos-absolute"></em>
					</div>
					<span className="name w85 ">目录名称<span className="tip">*</span></span>
					<div className="search-box pos-relative fl wsearchbox  wsea">
						<input placeholder="输入目录名称" className="s-text" type="text" value={this.state.name} onChange={this.nameChange}/>
						<em className="del cursor pos-absolute"></em>
					</div>
				</div>
				</div>
				<div className="dialog-ft wdialog-ft">
					<span className="btn btn-create mr-10" onClick={this.okHandler}>提交</span>
					<span className="btn btn-close" onClick={this.cancelHandler}>关闭</span>
				</div>
			</div>
		);
	}
});

module.exports = Add;