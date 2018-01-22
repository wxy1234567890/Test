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
var getDetail = require('collection/getDetail');
var updateCallDesc = require('collection/updateCallDesc');
// var deleteInterface = require('collection/deleteMenuInterface');
// var changeInterface = require('collection/changeInterfaceMenu');
// var Kindeditor = require('kindeditor');
// var addDialog = require("./addMenu.jsx");
// var newDialog = require("./newInterface.jsx");

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
	toRenderRight:function (id,name,index) {
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
						<div key={index}>
							<div className="imfordtl" style={{"marginTop":"10px"}}>	
								<span className={this.state.flag==index?"wspan1":"wspan2"} onClick={this.toRenderRight.bind(this,item.get('id'),item.get('name'),index)}>{item.get('name')}</span>
							</div>
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
			userList : new userList(),
			interfaceApp : new interfaceApp(),
			getDetail : new getDetail(),
			updateCallDesc : new updateCallDesc(),
			// deleteInterface:new deleteInterface(),
			// changeInterface:new changeInterface(),
			appandinterface:0,
			menuName:"",
			menuId:"",
			interfaceName:"",
			interfaceId:"",
			interfaceArray:[],
			getDetailArray:[],
			updateCallDescArray:[],
			flag:false,
			interfaceSearch:"",
			list:1,
			htmlValue:"",
			htmlValues:"",
			htmls:"",

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

		this.state.getDetail.on("fetchDone",function(total){
			this.state.getDetailArray=this.state.getDetail.toArray();
			this.setState({
				getDetailArray:this.state.getDetailArray
			},console.log(this.state.getDetailArray[0].get('call_desc'),1243));
			if(this.state.getDetailArray&&this.state.getDetailArray.length!=0){
				this.state.htmlValue=this.state.getDetailArray[0].get('call_desc');
				this.setState({
					htmlValue:this.state.htmlValue,
				});
			}
			this.state.htmls = window.decodeURIComponent(this.state.htmlValue);
			this.setState({
				htmls:this.state.htmls,
			});
		}.bind(this));

		this.state.updateCallDesc.on("fetchDone",function(total){
			this.state.updateCallDescArray=this.state.updateCallDesc.toArray();
			this.setState({
				updateCallDescArray:this.state.updateCallDescArray,
			},console.log(this.state.updateCallDescArray[0].get('call_desc'),67890));
			if(this.state.updateCallDescArray&&this.state.updateCallDescArray.length!=0){
				this.state.htmlValue=this.state.updateCallDescArray[0].get('call_desc');
				this.setState({
					htmlValue:this.state.htmlValue,
				});
			}
			this.state.htmls = window.decodeURIComponent(this.state.htmlValue);
			this.setState({
				htmls:this.state.htmls,
			});
		}.bind(this));

		this.getUserList();
	},
	componentWillMount:function(){
		// this.getDetail();
	},
	getUserList:function(){
		this.state.userList.fetch({
			loadingFlag:true,
			param:{
				parentId:-1,
			}
		});
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
		});
		this.getDetail();
	},
	getDetail:function(){
		this.state.getDetail.fetch({
			loadingFlag:true,
			param:{
				id:this.state.interfaceId,
			}
		});
	},
    editorClick:function(){
    	if(this.state.list==1){//编辑
    		
    		this.state.list=0;
    	}else if(this.state.list==0){//保存

    		this.state.list=1;
    		window.editor.sync();
			var htmls = document.getElementById('editor_id').value; // 原生AP
			htmls=window.encodeURIComponent(htmls);
			//ajax
			this.state.updateCallDesc.fetch({
				loadingFlag:true,
				param:{
					id:this.state.interfaceId,
					callDesc:htmls,
				}
			});
			// console.log(htmls);
			// localStorage.setItem('htmls',htmls)
    	}
    	this.setState({
    		list:this.state.list,
    	})
    },
	render:function(){
		// debugger
		console.log(this.state.htmls,77899);
		// if(window.localStorage.getItem('htmls')&&window.localStorage.getItem('htmls')!=null&&window.localStorage.getItem('htmls')!=""){
			// 	htmls=window.localStorage.getItem('htmls');
			// 	htmls= window.decodeURIComponent(htmls);
		// }	
		// if(this.state.htmlValue&&this.state.htmlValue.length!=0){
		// 	this.state.htmls = window.decodeURIComponent(this.state.htmlValue);
		// 	// this.setState({
		// 	// 	htmls:this.state.htmls
		// 	// })
		// }
		// if(this.state.updateCallDesc&&this.state.updateCallDesc.length!=0){
		// 		htmls = window.decodeURIComponent(this.state.updateCallDesc);
		// }	
		// console.log(htmls);
		if(!window.editor){
	      KindEditor.options.filterMode = false;
          window.editor = KindEditor.create('#editor_id',{
           	  items:[
						'fontname', 'fontsize', '|', 'forecolor', 'hilitecolor', 'bold', 'italic', 'underline',
						'removeformat', '|', 'justifyleft', 'justifycenter', 'justifyright', 'insertorderedlist',
						'insertunorderedlist', '|', 'table', 'link']
           });
           KindEditor.html('#editor_id',this.state.htmls) 
		}
    	return (
    		<div className="userlist">
				<Scroll className="leftcon" style={{"paddingTop":"0px"}}>
					<UserList option={this.state.userList} getAppInfo={this.getAppInfo}   getDetail={this.getInterDetail}/>					
				</Scroll>
				<div className={this.state.interfaceName?"wright userdtl":"hide"} id="wright">
					<div className="search-area clearfix" style={{"padding":"15px 0","borderBottom":"1px solid #e9e9e9"}}>
						<span className="wtitle2">{this.state.interfaceName?this.state.interfaceName:""}</span>
						<span className="btn green fr" onClick={this.editorClick}>{this.state.list==0?"保存":"编辑"}</span>
  					</div>
  					<div className={this.state.list==1?"":"hide"}>					
						<p className="mt-20">联系相关管理人员验证身份信息,分配开发者账号和接口调用秘钥,使用分配的开发者账号在平台上模拟调用接口服务完成测试</p>
						<div className="mt-40" dangerouslySetInnerHTML={{__html:this.state.htmls}} ></div>
					</div>
					<div className={this.state.list==0?"mt-40":"hide"}>
						<textarea id="editor_id" name="content" style={{"width":"868px","height":"300px"}}>
        				</textarea>
					</div>
				</div>
			</div>
    	)
  	}
});
module.exports = DevLop;