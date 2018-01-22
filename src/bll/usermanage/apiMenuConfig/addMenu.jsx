var React = require("react");
var allBusiness = require('collection/businessAll');
var userBusinessAdd = require('collection/insertMenu');

var Add = React.createClass({
	getInitialState:function(){
		return{
			name:"",
			userBusinessAdd:new userBusinessAdd(),
			allBusiness:new allBusiness()
		};
	},
	componentDidMount: function() {
		this.state.userBusinessAdd.on("fetchDone",function(){
			this.setState({
				userBusinessAdd:this.state.userBusinessAdd
			},console.log(this.state.userBusinessAdd));
			this.props.close();
			this.props.option.ok.callback();
		}.bind(this));

	// 	this.state.allBusiness.on("fetchDone",function(total){
	// 		this.setState({
	// 			allBusiness:this.state.allBusiness
	// 		});
	// 	}.bind(this));
	// 	this.getAllBusiness();
	// },
	// getAllBusiness:function(){
	// 	this.state.allBusiness.fetch({
	// 		loadingFlag:true,
	// 		param:{
	// 			loginUserId:''
	// 		}
	// 	});
	},
	closeHandler: function() {
		this.props.close();
	},
	cancelHandler: function() {
		this.props.close();
	},
	okHandler: function() {
		this.state.userBusinessAdd.fetch({
			loadingFlag:true,
			param:{
				parent_id:-1,
				name:this.state.name
			}
		});
	},
	valueChange:function(e){
		this.setState({
			name:e.target.value
		})
	},
	render: function() {
		return (
			<div className="dialog-confirm addyw">
				<div className="dialog-hd clearfix">
					<h2>输入目录名称</h2>
					<span className="close" onClick={this.closeHandler}>×</span>
				</div>
				<div className="dialog-bd" style={{"minHeight":"100px"}}>
					<input placeholder="目录名称" style={{"width":"298px"}} type="text" onChange={this.valueChange}/>
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