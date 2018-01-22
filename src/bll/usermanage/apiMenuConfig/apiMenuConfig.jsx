var React = require('react');
var ReactDom = require('react-dom');
var TerseUI = require('terseui');
var modalHelp = TerseUI.Frame.modalHelp;
var Dialog = TerseUI.Frame.Dialog;
var Scroll = TerseUI.Scroll;
var classNames = require("classnames/bind");
var subject = require("model/global/subject");
var userList = require('collection/menuList');
var interfaceApp = require('collection/interfacesByMenu');
var deleteInterface = require('collection/deleteMenuInterface');
var changeInterface = require('collection/changeInterfaceMenu');
var addDialog = require("./addMenu.jsx");
var newDialog = require("./newInterface.jsx");

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
				menuId:this.props.option,
				excludeMenuId:"",
			}
		});
	},
	toRenderRight:function (id,name,index,e) {
		// console.log(e.target)
		this.state.flag=index;
		this.setState({
			flag:this.state.flag
		});
		this.props.getDetail(id,name);
	},
	render:function(){
		return (
			<ul id="interfacelist">
				{this.state.interfaceApp.map(function(item,index){
					return (
						<div key={index} className="imfordtl" style={{"marginTop":"10px"}}>	
							<span className={this.state.flag==index?"wspan1":"wspan2"} onClick={this.toRenderRight.bind(this,item.get('id'),item.get('name'),index)}>{item.get('name')}</span>
						</div>
					)
				}.bind(this))}
			</ul>
		)
	}
})

var UserList = React.createClass({
	getInitialState:function(){
		return{
			status:-1,
			flag:1,

		};
	},
	showAppInfo:function (index,name,e) {
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
		this.props.getAppInfo(id,name);
	},
	render:function(){
		var userList = this.props.option;
		return (
			<ul>
				{userList.map(function(item,index){
					return (
						<li key={index} className="clearfix">
							<div className="userimfor fl wuserinfoxx">
								<img className={this.state.status==index?"wimg2":"wimg1"} src={require( "../../../images/open.png")}/>
								<div className="imfordtl"  itemID={item.get('id')}  onClick={this.showAppInfo.bind(this,index,item.get('name'))}>
									<span className="wspan" itemID={item.get('id')}>{item.get('name')}</span>
								</div>
								<div className={this.state.status==index?"imfordtl2":"txtright"}>
								<InterfaceApp option={item.get('id')} getDetail={this.props.getDetail}/>
								</div>							
							</div>
						</li>
					)
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
			interfaceApp :new interfaceApp(),
			deleteInterface:new deleteInterface(),
			changeInterface:new changeInterface(),
			appandinterface:0,
			menuName:"",
			menuId:"",
			interfaceName:"",
			interfaceId:"",
			interfaceArray:[],
			flag:false,
			interfaceSearch:"",
		};
	},
	componentDidMount: function() {
		this.state.userList.on("fetchDone",function(total){
			this.setState({
				userList:this.state.userList
			});
			if(this.state.userList&&this.state.userList.length!=0){
				this.getAppInfo(this.state.userList.toArray()[0].get('id'),this.state.userList.toArray()[0].get('name'));
			}
		}.bind(this));

		this.state.interfaceApp.on("fetchDone",function(total){
			this.state.interfaceArray=this.state.interfaceApp.toArray();
			this.setState({
				interfaceArray:this.state.interfaceArray
			});
		}.bind(this));

		this.state.deleteInterface.on("fetchDone",function(total){
			this.setState({
				deleteArray:this.state.deleteArray
			});
			// this.getUserList();
			location.reload();
		}.bind(this));

		this.state.changeInterface.on("fetchDone",function(total){
			this.setState({
				changeArray:this.state.changeArray
			});
			// this.getUserList();
			location.reload();
		}.bind(this));

		this.getUserList();

	},
	getUserList:function(){
		this.state.userList.fetch({
			loadingFlag:true,
			param:{
				parentId:-1,
			}
		});
	},
	addMenuClick: function() {
		modalHelp.show({
			Dialog: addDialog,
			option: {
				ok: {
					callback:function(){
						this.getUserList();
						// location.reload();
					}.bind(this)
				}
			}
			})
	},
	addInterfaceClick:function(){
		modalHelp.show({
			Dialog: newDialog,
			option: {
				ok: {
					menuId:this.state.menuId,
					callback:function(){
						// this.getUserList();
						location.reload();
					}.bind(this)
				}
				}
			})
	},
	getAppInfo:function(userId,name){
		this.state.appandinterface=0;
		this.setState({
			appandinterface:0
		});
		// console.log(this.state.appandinterface)
		this.state.menuName=name;
		this.state.menuId=userId;
		this.setState({
			menuName:this.state.menuName,
			menuId:this.state.menuId,
		})
		this.state.interfaceApp.fetch({
			loadingFlag:true,
			param:{
				menuId:userId,
				excludeMenuId:"",
			}
		});
	},
	getInterDetail:function(userId,name){
		this.state.appandinterface=1;
		this.setState({
			appandinterface:1
		});
		// console.log(this.state.appandinterface,userId,name);
		this.state.interfaceName=name;
		this.state.interfaceId=userId;
		this.setState({
			interfaceName:this.state.interfaceName,
			interfaceId:this.state.interfaceId,
		})

	},
	deletClick:function(id){
		modalHelp.show({
            Dialog: Dialog,
            option: {
                type: "question",
                title: "提示",
                content: <div className="v-t"><p className="title">您确定删除吗?</p><p className="txt">删除后无法恢复</p></div>,
                ok: {
                    text: "确定",
                    callback: function () {
                        var option = {
                            loadingFlag: true,
                            param: {
                                menuId: this.state.menuId,
                                interfaceId:id
                            }
                        };
                        this.state.deleteInterface.fetch(option);
                    }.bind(this)
                },
                cancel: {
                    text: "取消"
                }
            }
        });
	},
	moveOn:function(){
		this.state.flag=true;
		this.setState({
			flag:true
		});
	},
	moveOut:function(){
		this.state.flag=false;
		this.setState({
			flag:false
		});
	},
	changeClick:function(id){
		var obj={},insertArray=[];
		obj={
			interfaceId:this.state.interfaceId,
			menuId:id
		}
		insertArray.push(JSON.parse(JSON.stringify(obj)));
		this.state.changeInterface.fetch({
			loadingFlag:true,
			param:{
				changeList:insertArray
			}
		});
	},
	choseUserName: function (value) {
        if (value.indexOf(this.state.interfaceSearch) == -1) {
            return false;
        }
        return true;
    },
    searchHandler:function(e){
		this.setState({
			interfaceSearch:e.target.value
		})
    },
	render:function(){
    	return (
    		<div className="userlist">
				<Scroll className="leftcon">
					<div className="search-area ml-20 mr-20 mb-10 clearfix tac">
						<span className="btn white mr-10" onClick={this.addMenuClick}><span className="pr-5">+</span>添加目录</span>
					</div>
					<UserList option={this.state.userList} getAppInfo={this.getAppInfo}   getDetail={this.getInterDetail}/>
				</Scroll>
				<div className={this.state.appandinterface==0?"wright userdtl":"hide"}>
					<div className="search-area clearfix" style={{"padding":"15px 0 15px 15px","borderBottom":"1px solid #e9e9e9"}}>
						<span className="btn green fr">搜索</span>
  						<div className="search-box w160 pos-relative fr mr-5">
  							<input placeholder="请输入查询内容" className="s-text" type="text" value={this.state.interfaceSearch} onChange={this.searchHandler} />
  							<span className="s-btn"></span>
  						</div>
  						<span className="btn green mr-5 fr">导入接口文件</span>
  						<span className="btn green mr-5 fr">接口模板文件下载</span>
  					</div>
  					<div className="wtitle1">
  						{this.state.menuName?this.state.menuName:"暂无数据"}
  					</div>
  					<div className="search-area mb-10 clearfix">
						<span className="btn white mr-10" onClick={this.addInterfaceClick.bind(this,this.state.menuId)}><span className="pr-5">+</span>添加接口</span>
					</div>
					<div className="clearfix">
						{this.state.interfaceArray&&this.state.interfaceArray.length!=0?this.state.interfaceArray.map(function(item,index){
							if(this.choseUserName(item.get('name'))){
							return(
									<div key={index} className="fl wbcf"><span>{item.get("name")}</span><em onClick={this.deletClick.bind(this,item.get("id"))} style={{"backgroundColor":"#f5f5f5"}}></em></div>
								)
							}
						}.bind(this)):"暂无数据"}
					</div>
				</div>
				<div className={this.state.appandinterface==1?"wright userdtl":"hide"}>
					<div className="search-area clearfix" style={{"padding":"15px 0 15px 15px","borderBottom":"1px solid #e9e9e9"}}>
						<span className="btn green fr">搜索</span>
  						<div className="search-box w160 pos-relative fr mr-5">
  							<input placeholder="请输入查询内容" className="s-text" type="text" value={this.state.search} onChange={this.searchHandler} />
  							<span className="s-btn"></span>
  						</div>
  					</div>
  					<div className="clearfix">
						<div className="wtitle1 fl">
							{this.state.interfaceName?this.state.interfaceName:"暂无数据"}
							<span className="btn white ml-10 pright" onMouseOver={this.moveOn} onMouseOut={this.moveOut}>移动到目录<span className="ml-5">{">"}</span></span>						
						</div>
						<div className={this.state.flag==true?"fl":"hide"} style={{"marginTop":"12px"}}>
							<div className="clearfix pos-abs bpl">
							{this.state.userList&&this.state.userList.length!=0?this.state.userList.map(function(item,index){
								return(
										<div key={index} className="whiteMove" onMouseOver={this.moveOn} onMouseOut={this.moveOut} onClick={this.changeClick.bind(this,item.get("id"))}>{item.get("name")}</div>
									)
							}.bind(this)):"暂无数据"}
							</div>
						</div>
					</div>
					<textarea className="areaChange" placeholder="接口说明，描述"></textarea>				
				</div>
			</div>
    	)
  	}
});

module.exports = DevLop;