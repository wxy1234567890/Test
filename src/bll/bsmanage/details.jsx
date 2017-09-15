var React = require("react");
var useListByDay = require('collection/useListByDay');

var Details = React.createClass({


	getInitialState:function(){
		return{
			useListByDay:new useListByDay()
		};
	},
	componentDidMount: function() {
		this.state.useListByDay.on("fetchDone",function(){
			this.setState({
				useListByDay:this.state.useListByDay
			});
		}.bind(this));
		this.getUseListByDay();
	},

	getUseListByDay: function() {
		this.state.useListByDay.fetch({
			loadingFlag:true,
			param:{
			}
		});
	},
	closeHandler: function() {
		this.props.close();
	},
	cancelHandler: function() {
		this.props.close();
	},
	render: function() {
		return (
			<div className="dialog-confirm addyw addyw-h">
				<div className="dialog-hd clearfix">
					<div className='time-h fl ml-20'>
						<input type='text' placeholder='2017-06-15' className=''/>
						<span className='calendar'></span>
					</div>
					<h2 className=''>接口调用明细</h2>
					<span className="close" onClick={this.closeHandler}>×</span>
				</div>
				<div className="tablearea mt-10">
				<table>
					<thead>
						<tr>
							<th width="60%" className='thl'>接口</th>
							<th className="px-text upt" width="40%">调用次数<em className="px"></em></th>
						</tr>
					</thead>
				</table>
				</div>
				<div className="tablearea mb-20">
					<table>
						<tbody>
							{this.state.useListByDay.map(function(item,index){
								return (
									<tr key={index}>
										<td width="60%" className='text-l'>
											<span className="ellipsis">{item.get('name')}</span>
										</td>
										<td width="40%" className='text-r'>
											<span className="ellipsis">{item.get('totalUse')}</span>
										</td>
									</tr>
										)
							}.bind(this))}
						</tbody>
					</table>
				</div>




				
				<div className="dialog-ft">
					
					<span className="btn btn-close" onClick={this.cancelHandler}>关闭</span>
				</div>
			</div>
		);
	}
});

module.exports = Details;