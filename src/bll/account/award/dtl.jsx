var React = require("react");
var TerseUI = require("terseui");
var DataGrid = TerseUI.Frame.DataGrid;
var smsDetailByDate = require('collection/HuokeDayList');

var headOpt = [{
	key: 'id',
	name: '号码',
	width: '240px'
}, {
	key: 'action',
	name: '发送次数',
	width: '75px',
	px: {
		self: 'name',
		rule: 'asc',
		name: 'name'
	}
}];
var Item = React.createClass({
	render: function() {
		var model = this.props.option.item;
		return (
			<tr>
        		<td width="240px" className="name">{model.get('phone')}</td>
        		<td width="75px" style={{"text-align":"right","padding-right":"20px"}}>
          			<span className="">{model.get('count')}</span>
        		</td>
      		</tr>
		);
	}
});
var Createngine = React.createClass({

	time:'',
	pageSize: 10,
	pageIndex: 1,
	orderBy:'',
	closeHandler: function() {
		this.props.close();
	},

	okHandler: function() {
		this.props.close();
	},
	focusClickHandler: function(e) {
		this.refs.focustext.focus();
	},
	getClickHandler: function(e) {
		alert(this.refs.valuetext.getValue());
	},
	validClickHandler: function(e) {
		this.refs.validtext.valid();
	},
	getInitialState: function() {
		this.time=this.props.option.param.time;
		return {
			studentCollection: new smsDetailByDate(),
			pageInfo: {
				total:0,
				pageSize:this.pageSize,
				pageIndex:this.pageIndex
			}
		};
	},
	componentDidMount() {
		this.state.studentCollection.on("fetchDone", function(total) {
			this.setState({
				studentCollection: this.state.studentCollection,
				pageInfo:{total:total, pageSize:this.pageSize, pageIndex:this.pageIndex}
			});
		}.bind(this));
		this.query();
	},
	query: function() {
		this.state.studentCollection.fetch({
			loadingFlag: true,
			param:{
				userId:'',
				day:this.time,
				pagesize:this.pageSize,
				pagenow:this.pageIndex,
				orderBy:this.orderBy
			}
		});
	},
	eventListener: function(type, param) {
		if(type=='page'){
			this.pageIndex = param;
			this.query();
		}else if(type=='pxClick'){
			this.orderBy = param.rule;
			this.query();
		}
	},
	render: function() {
		return (
			<div className="dialog-confirm d-dtl">
				<div className="dialog-hd clearfix">
					<h2>
					<input className="time-input" type="text" value={this.time} />
					短信发送详情
					</h2>
					<span className="close" onClick={this.closeHandler}>×</span>
				</div>
				<div className="dialog-bd pos-rel">
					<DataGrid
				        headOpt={headOpt}
				        list={this.state.studentCollection}
				        itemCls={Item}
				        eventListener={this.eventListener}
				        pageInfo={this.state.pageInfo}
				      />
				</div>
			</div>
		);
	}
});

module.exports = Createngine;