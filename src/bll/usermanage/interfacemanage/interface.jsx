var React = require('react');
var ReactDom = require('react-dom');
var classNames = require("classnames/bind");
var userList = require('collection/appList');
var userBusiness = require('collection/userBusiness');
var interfaceApp = require('collection/interfaceApp');
var appInfo = require('collection/appInfo');
var subject = require("model/global/subject");
var TerseUI = require('terseui');
var modalHelp = TerseUI.Frame.modalHelp;
var Dialog = TerseUI.Frame.Dialog;
var Scroll = TerseUI.Scroll;
var editDialog = require("./edit.jsx");
var editAppDialog = require("./editApp.jsx");
var addDialog = require("./add.jsx");
var newDialog = require("./new.jsx");
var searchInterface = require('collection/getInterfaceList');
var interfaceList = require('collection/AppInterfaceList');
var getDetail = require('collection/interfaceDetail');
var getArgsList = require('collection/getArgsList');


var InterfaceList = React.createClass({
	render: function() {
		var interfaceList = this.props.option;
		var lable = this.props.lableo;
		if(lable.table17=="1"){
			var arr = ["name","argsNum","pre_auth","description"];
			var arg1 = "需要";
			var arg2 = "不需要"; 
		}
		else{
			var arg1 = "可以";
			var arg2 = "不可以"; 
			var arr = ["name","explanation","not_null","create_time"]
		}
		return(
				<div className="tablearea wrighttable">
					<table>
						<thead>
							<tr>
								<th width="24%">{lable.table12}</th>
								<th width="25%">{lable.table13}</th>
								<th width="25%">{lable.table14}</th>
								<th width="25%">{lable.table15}</th>
							</tr>
						</thead>
						<tbody>
						{interfaceList.map(function(item,index){
							return (
								<tr key={index}>
								<td width="24%">
									<span className="ellipsis">{item.get(arr[0])}</span>
								</td>
								<td width="25%">
									<span className="ellipsis">{item.get(arr[1])}</span>
								</td>							
								<td width="25%">
									<span className="ellipsis">{item.get(arr[2])==0?arg2:arg1}</span>
								</td>						
								<td width="25%">
									<span className="ellipsis">{item.get(arr[3])}</span>
								</td>
								</tr>
							)
						}.bind(this))}	
						</tbody>
					</table>
				</div>
		)
	}
})

var InterfaceApp = React.createClass({
	getInitialState:function(){
		return{
			flag:-1,
			interfaceApp :new interfaceApp()
		};
	},
	componentDidMount: function() {
		this.state.interfaceApp.on("fetchDone",function(total){
			this.setState({
				interfaceApp:this.state.interfaceApp
			});
		}.bind(this));
		this.getinterfaceApp();
	},
	getinterfaceApp:function(){
		this.state.interfaceApp.fetch({
			loadingFlag:true,
			param:{
				id:this.props.option
			}
		});
	},
	toRenderRight:function (id,index) {
		this.state.flag=index;
		this.setState({
			flag:this.state.flag
		});
		this.props.getDetail(id);
	},
	render:function(){
		return (
			<ul id="interfacelist">
				{this.state.interfaceApp.map(function(item,index){
					return (
						<div key={index}>
							<div className="imfordtl" style={{"marginTop":"10px"}}>
								<span className={this.state.flag==index?"wspan1":"wspan2"} onClick={this.toRenderRight.bind(this,item.get('id'),index)}>{item.get('name')}</span>
							</div>
					    </div>
					)
				}.bind(this))}
			</ul>
		)
	}
})

var UserList = React.createClass({
	// toShowUserBusiness:function (e) {
	// 	var targete = e.target;
	// 	var numx = targete.getElementsByClassName('txtright').length;
	// 	if(numx!=0){
	// 	for (var i = 0; i < numx; i++) {
	// 		targete.getElementsByClassName('txtright')[0].setAttribute('class','imfordtl2');
	// 	}
	// }	
	// },
	getInitialState:function(){
		return{
			status:-1,
			flag:1,
			userName:''
		};
	},
    choseUserName: function (value) {
        if (value.indexOf(this.state.userName) == -1) {
            return false;
        }
        return true;
    },
	showAppInfo:function (index,e) {
		// if($(".table18,.table11").css("display")=="none"){
		// 	$(".table18,.table11").css("display","inline-block");
		// }
		// if($(".changeimg").css("transform")=="rotate(90deg)"){
		// 	$(".changeimg").css("transform","rotate(0deg)");
		// }else{
		// 	$(".changeimg").css("transform","rotate(90deg)");
		// }
		// console.log(index)
		// var targete = e.target.parentNode.parentNode;
		// var numx = targete.getElementsByClassName('txtright').length;
		// var numx2 = targete.getElementsByClassName('imfordtl2').length;
		// if(numx!=0){
		// 	for (var i = 0; i < numx; i++) {
		// 		targete.getElementsByClassName('txtright')[0].setAttribute('class','imfordtl2');
		// 	}
		// }else{
		// 	for (var i = 0; i < numx2; i++) {
		// 		targete.getElementsByClassName('imfordtl2')[0].setAttribute('class','txtright');
		// 	}
		// }
		// var imgChild = e.target.parentNode.parentNode.childNodes[0];
		// console.log(e.target.parentNode.parentNode,e.target.parentNode.parentNode.childNodes,imgChild);
		// if(imgChild.getAttribute('class')=='wimg1'){
		// 	imgChild.setAttribute('class','wimg2');
		// }else{
		// 	imgChild.setAttribute('class','wimg1');
		// }
		if(this.state.status==index){
			this.state.status=-1;
			this.setState({
				status:this.state.status
			});
		}else{
			this.state.status=index;
			this.setState({
				status:this.state.status
			});
		}
		var targete1 = e.target;
		var id = targete1.getAttribute("itemID");
		this.props.getAppInfo(id);
	},
	render:function(){
		var option = this.props.option; 
		var userList = option.option1;
		this.state.userName = option.option2;
		return (
			<ul>
				{userList.map(function(item,index){
					if(this.choseUserName(item.get('name'))){
					return (
						<li key={index} className="clearfix">
							<div className="userimfor fl wuserinfoxx">
								<img className={this.state.status==index?"wimg2":"wimg1"} src={require( "../../../images/open.png")}/>
								<div className="imfordtl"  itemID={item.get('id')}  onClick={this.showAppInfo.bind(this,index)}>
									<span className="wspan" itemID={item.get('id')}>{item.get('name')}</span>
								</div>
								<div className={this.state.status==index?"imfordtl2":"txtright"}>
									<InterfaceApp option={item.get('id')} getDetail={this.props.getDetail}/>
								</div>
							</div>
						</li>
					)
					}
				}.bind(this))}
			</ul>
		)
	}
})

var DevLop = React.createClass({
	getInitialState:function(){
		return{
			userName:"",//搜索值
			userList:new userList(),
			userBusiness:new userBusiness(),
			appInfo:new appInfo(),
			interfaceList:new interfaceList(),
			getDetail:new getDetail(),
			getArgsList:new getArgsList(),
			searchInterface:new searchInterface(),
			appandinterface:true,
			lable:{
				table0:"",
				table1:"",
				table2:"",
				table3:"",
				table4:"",
				table5:"",
				table6:"",
				table7:"",
				table8:"",
				table9:"",
				table10:"",
				table11:"",
				table12:"",
				table13:"",
				table14:"",
				table15:"",
				table16:"",
			},
			lable2:{
				table1:"",
				table2:"",
				table3:"",
				table4:"",
				table5:"",
				table6:"",
				table7:""
			}
		};
	},
	componentDidMount: function() {
		this.state.userList.on("fetchDone",function(total){
			this.setState({
				userList:this.state.userList
			});
			this.getAppInfo(this.state.userList.toArray()[0].get('id'));
		}.bind(this));
		this.state.appInfo.on("fetchDone",function(){
			this.setState({
				appInfo:this.state.appInfo,
				lable:{
					table0:this.state.appInfo.attributes.name,
					table1:"创建日期",
					table2:"接口数量",
					table3:"应用code",
					table4:"应用负责人",
					table5:"负责人电话",
					table6:"负责人邮箱",
					table7:"应用描述",
					table8:"编辑应用",
					table9: "删除应用",
					table10:"应用接口管理",
					table11:"新建接口",
					table12:"接口中文名称",
					table13:"参数数量",
					table14:"是否需要预验证",
					table15:"描述",
					table16:"操作",
					table17:"1",
					table18:"新建应用"
				},
				lable2:{
					table1:this.state.appInfo.attributes.create_time,
					table2:this.state.appInfo.attributes.interfaceNum,
					table3:this.state.appInfo.attributes.code,
					table4:this.state.appInfo.attributes.responsor,
					table5:this.state.appInfo.attributes.responsor_tel,
					table6:this.state.appInfo.attributes.responsor_email,
					table7:this.state.appInfo.attributes.description
				}
			});
		}.bind(this));
		this.state.interfaceList.on("fetchDone",function(){
			this.setState({
				interfaceList:this.state.interfaceList
			});
		}.bind(this));
		this.state.searchInterface.on("fetchDone",function(){

		UserList = React.createClass({
			toRenderRight:function (id) {
				this.props.getDetail(id);
			},
			render:function(){
				var searchInterface = this.props.option;
				return (
					<ul>
						{searchInterface.map(function(item,index){
							return (
								<li key={index} className="clearfix" onClick={this.toShowUserBusiness}>
									<div className="userimfor fl wuserinfoxx">
									<img className="wimg" src={require( "../../../images/icon-detail-active.png")} />
										<div className="imfordtl">
											<span className="wspan" itemID={item.get('id')} onClick={this.toRenderRight.bind(this,item.get('id'))}>{item.get('name')}</span>
										</div>
									</div>
								</li>
							)
						}.bind(this))}
					</ul>
				)
			}
		})
			this.setState({
				userList:this.state.searchInterface
			});
		}.bind(this));
		this.state.getDetail.on("fetchDone",function(){
			this.setState({
				getDetail:this.state.getDetail,
				lable:{
					table0:this.state.getDetail.attributes.name,
					table1:"创建日期",
					table2:"内部调用URL",
					table3:"外部调用URL",
					table4:"外部调用KEY",
					table5:"外部API Code",
					table6:"接口描述",
					table8:"编辑接口",
					table9:"删除接口",
					table10:"参数配置管理",
					table11:"新建配置",
					table12:"对内参数",
					table13:"参数说明",
					table14:"是否可以为空",
					table15:"创建日期",
					table16:"操作",
					table17:"0",
					table18:""
				},
				lable2:{
					table1:this.state.getDetail.attributes.create_time,
					table2:this.state.getDetail.attributes.in_url_address,
					table3:this.state.getDetail.attributes.out_url_address,
					table4:this.state.getDetail.attributes.key,
					table5:this.state.getDetail.attributes.code,
					table6:this.state.getDetail.attributes.description
				}
			});
			if(this.state.lable.table18==""){
				$(".table18,.table11").css("display","none");
			}
		this.state.getArgsList.on("fetchDone",function(){
			this.setState({
				getArgsList:this.state.getArgsList
			});
		}.bind(this));
		}.bind(this));
		this.getUserList();
	},
	addClick: function() {
		window.appInfo = this.state.appInfo;
		modalHelp.show({
			Dialog: addDialog,
			option: {

				}
			})
		},
	newClick: function() {
		modalHelp.show({
			Dialog: newDialog,
			option: {
				}
			})
		},
	editClick: function() {
		if(this.state.lable.table8=="编辑应用"){
			window.appInfo = this.state.appInfo;
		modalHelp.show({
			Dialog: editAppDialog,
			option: {
				getInfo:this.state.getDetail
				}
			})
	}
	else{
		modalHelp.show({
			Dialog: editDialog,
			option: {
				getInfo:this.state.getDetail,
				getArgsList:this.state.getArgsList
				}
			})
		}
	},
	getUserList:function(){
		this.state.userList.fetch({
			loadingFlag:true,
			param:{
				loginUserId:"",
				userName:this.state.userName
			}
		});
	},
	getAppInfo:function(userId){
		if(!this.state.appandinterface){
			this.setState({
				appandinterface:true
			});
		}
		this.state.interfaceList.fetch({
			loadingFlag:true,
			param:{
				id:userId
			}
		});
		this.state.appInfo.fetch({
			loadingFlag:true,
			param:{
				id:userId
			}
		});
	},
	getInterDetail:function(userId){
		if(this.state.appandinterface){
			this.setState({
				appandinterface:false
			});
		}
		this.state.getDetail.fetch({
			loadingFlag:true,
			param:{
				interid:userId
			}
		});
		this.state.getArgsList.fetch({
			loadingFlag:true,
			param:{
				interid:userId
			}
		});
	},
	searchInterface:function(userId){
		this.state.searchInterface.fetch({
			loadingFlag:true,
			param:{
				userName:this.state.userName
			}
		});
	},
	userNameChange:function(e){
		this.setState({
			userName:e.target.value
		})
	},
	render:function(){
		var optionInfo = {
			option1:this.state.userList,
			option2:this.state.userName
		};
		var appInfo = this.state.appInfo.attributes;
    	return (
    		<div className="userlist">
				<Scroll className="leftcon">
					<div className="search-area ml-20 mr-20 mb-10 clearfix">
						<div className="search-box pos-relative fl wsearchbox">
							<input placeholder="请输入查询内容" className="s-text" type="text" value={this.state.userName} onChange={this.userNameChange}/>
							<span className="s-btn"></span>
							<em className="del cursor pos-absolute"></em>
						</div>
					</div>
					<UserList option={optionInfo} getAppInfo={this.getAppInfo}   getDetail={this.getInterDetail} searchInterface={this.state.searchInterface}/>
				</Scroll>
				<div className="wright userdtl" id="wright">
					<div className="wtitle1">{this.state.lable.table0?this.state.lable.table0:"暂无数据"}</div>
					<span className="btn white mr-10 table18" onClick={this.newClick}>{this.state.lable.table18?this.state.lable.table18:"暂无数据"}</span>
					<span className="btn white mr-10" onClick={this.editClick}>{this.state.lable.table8?this.state.lable.table8:"暂无数据"}</span>
					<span className="btn white mr-10" style={{"display":"none"}}>{this.state.lable.table9?this.state.lable.table9:"暂无数据"}</span>
					<div className="txtlistwrap clearfix wtxt">
						<ul className="infor-ul fl  winfor">
							<li className="clearfix">
								<span className="name fl">{this.state.lable.table1?this.state.lable.table1:"暂无数据"}</span>
								<span className="key fr ellipsis">{this.state.lable2.table1?this.state.lable2.table1:"暂无数据"}</span>
							</li>
							<li className="clearfix">
								<span className="name fl">{this.state.lable.table2?this.state.lable.table2:"暂无数据"}</span>
								<span className="key fr ellipsis">{this.state.lable2.table2?this.state.lable2.table2:"暂无数据"}</span>
							</li>
							<li className="clearfix">
								<span className="name fl">{this.state.lable.table3?this.state.lable.table3:"暂无数据"}</span>
								<span className="key fr ellipsis">{this.state.lable2.table3?this.state.lable2.table3:"暂无数据"}</span>
							</li>
							<li className="clearfix">
								<span className="name fl">{this.state.lable.table4?this.state.lable.table4:"暂无数据"}</span>
								<span className="key fr ellipsis">{this.state.lable2.table4?this.state.lable2.table4:"暂无数据"}</span>
							</li>
							<li className="clearfix">
								<span className="name fl">{this.state.lable.table5?this.state.lable.table5:"暂无数据"}</span>
								<span className="key fr ellipsis">{this.state.lable2.table5?this.state.lable2.table5:"暂无数据"}</span>
							</li>
							<li className="clearfix">
								<span className="name fl">{this.state.lable.table6?this.state.lable.table6:"暂无数据"}</span>
								<span className="key fr ellipsis">{this.state.lable2.table6?this.state.lable2.table6:"暂无数据"}</span>
							</li>
							<li className="clearfix">
								<span className="name fl">{this.state.lable.table7?this.state.lable.table7:"暂无数据"}</span>
								<span className="key fr ellipsis">{this.state.lable2.table7?this.state.lable2.table7:"暂无数据"}</span>
							</li>
						</ul>
					</div>
					<div className="wtitle1">{this.state.lable.table10?this.state.lable.table10:"暂无数据"}</div>
					<span className="btn white mr-10 table11" onClick={this.addClick}>{this.state.lable.table11?this.state.lable.table11:"暂无数据"}</span>
					<InterfaceList option={this.state.appandinterface?this.state.interfaceList:this.state.getArgsList} lableo={this.state.lable}/>
				</div>
			</div>
    	)
  	}
});

module.exports = DevLop;