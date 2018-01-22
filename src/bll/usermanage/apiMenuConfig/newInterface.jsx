var React = require("react");
var TerseUI = require("terseui");
// var allBusiness = require('collection/businessAll');
// var userBusinessAdd = require('collection/userBusinessAdd');
var interfaceApp = require('collection/interfacesByMenu');
var changeInterface = require('collection/changeInterfaceMenu');
var Pagetool = TerseUI.Frame.PageTool;
var Scroll = TerseUI.Scroll;
var Add = React.createClass({
	getInitialState:function(){
		return{
			id:this.props.option.ok.menuId,
			name:"",
			interfaceName:"",
			// userBusinessAdd:new userBusinessAdd(),
			// allBusiness:new allBusiness(),
			interfaceApp:new interfaceApp(),
			changeInterface:new changeInterface(),
		};
	},
	componentDidMount: function() {
		this.state.interfaceApp.on("fetchDone",function(total){
			this.state.interfaceArray=this.state.interfaceApp.toArray();
			this.setState({
				interfaceArray:this.state.interfaceArray
			},console.log(this.state.interfaceApp.toArray(),789));
		}.bind(this));
		this.state.changeInterface.on("fetchDone",function(total){
			this.setState({
				changeArray:this.state.changeArray
			},console.log(this.state.changeApp,908));
			this.props.close();
			this.props.option.ok.callback();
		}.bind(this));

		this.getAppInfo();
	},
	getAppInfo:function(){
		this.state.interfaceApp.fetch({
			loadingFlag:true,
			param:{
				menuId:"",
				excludeMenuId:this.state.id,
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
		var interfaceArray=this.state.interfaceArray;
		var value = "",j=0;
		var insertArray=[],obj={};
		var a = document.getElementsByName("check");
		for (var i=0;i<a.length;i++ ){
			if(a[i].checked){
				// value=value+i+a[i].value + " ";
				obj={
					interfaceId:interfaceArray[i].get("id"),
					menuId:this.state.id
				}
				insertArray.push(JSON.parse(JSON.stringify(obj)));
			}
		}
		console.log(insertArray);
		this.state.changeInterface.fetch({
			loadingFlag:true,
			param:{
				changeList:insertArray
			}
		});

	},
	valueChange:function(e){
		this.setState({
			interfaceName:e.target.value
		})
	},
	test:function(index){
		// console.log($("input[type='checkbox']").is(':checked'),index,123);
	},
	choseUserName: function (value) {
        if (value.indexOf(this.state.interfaceName) == -1) {
            return false;
        }
        return true;
    },
	render: function() {
		return (
			<div className="dialog-confirm addyw" style={{"width":"550px"}}>
				<div className="dialog-hd clearfix">
					<h2>选择接口</h2>
					<span className="close" onClick={this.closeHandler}>×</span>
				</div>
				<div className="dialog-bd">
					<input placeholder="输入接口名称" type="text" style={{"width":"507px","marginBottom":"10px"}} value={this.state.interfaceName} onChange={this.valueChange}/>
					<div className="tablearea">
						<table>
							<thead>
								<tr>
									<th width="10%" className="tac">选择</th>
									<th width="55%" className="tac">接口名称</th>
									<th width="35%" className="tac">所属目录</th>								
								</tr>
							</thead>
							<tbody>
							{this.state.interfaceArray&&this.state.interfaceArray.length!=0?this.state.interfaceArray.map(function(item,index){
								// console.log(item);
								if(this.choseUserName(item.get('name'))){
								return (
										<tr key={index}>
											<td width="10%" className="tac">
												<input  type="checkbox" className="ptlc" name="check" onClick={this.test.bind(this,index)}/>
											</td>
											<td width="55%" className="tac">
												<span className="ellipsis wvisible">{item.get('name')}</span>
											</td>
											<td width="35%" className="tac">
												<span className="ellipsis wvisible">{item.get('menuName')}</span>
											</td>																
										</tr>
								)
								}
							}.bind(this)):(<tr className="tac"><td>没有找到符合你查询条件的记录</td></tr>)}						
							</tbody>					
						</table>
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