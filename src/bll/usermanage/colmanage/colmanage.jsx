var React = require('react');
var ReactDom = require('react-dom');
var menuList = require('collection/getMenuList');
var productList = require('collection/getProductList');
var userBusiness = require('collection/userBusiness');
var subject = require("model/global/subject");
var TerseUI = require('terseui');
var modalHelp = TerseUI.Frame.modalHelp;
var Dialog = TerseUI.Frame.Dialog;
var editDialog = require("./edit.jsx");
var addDialog = require("./add.jsx");
var addDialog2 = require("./add2.jsx");
var addDialog3 = require("./add3.jsx");
var addDialog4 = require("./add4.jsx");
var addDialog5 = require("./add5.jsx");
var editDialog = require("./edit.jsx");
var editDialog2 = require("./edit2.jsx");
var editDialog3 = require("./edit3.jsx");

var InterfaceApp = React.createClass({
	getInitialState:function(){
		return{
			menuList :new menuList()
		};
	},
	componentDidMount: function() {
		this.state.menuList.on("fetchDone",function(total){
			this.setState({
				menuList:this.state.menuList
			});
		}.bind(this));
		this.getinterfaceApp();
	},
	getinterfaceApp:function(){
		this.state.menuList.fetch({
			loadingFlag:true,
			param:{
				id:this.props.option	
			}
		});
	},
	toRenderRight:function (id,name,code) {
		window.menuname=name;
		window.subItem = id;
		window.codeedit = code;
		this.props.getProductList(id);
	},
	render:function(){
		return (
			<ul>
				{this.state.menuList.map(function(item,index){
					return (
						<div key={index}>
								<div className="imfordtl txtright">
								<img className="wimg" src={require( "../../../images/file.png")} />
									<span className="wspan" onClick={this.toRenderRight.bind(this,item.get('id'),item.get('name'),item.get('code'))}>{item.get('name')}</span>
								</div>
					    </div>
					)
				}.bind(this))}
			</ul>
		)
	}
})

var Product = React.createClass({
	editClick: function() {
		modalHelp.show({
			Dialog: editDialog,
			option: {
				}
			})
		},
	editClick2: function() {
		modalHelp.show({
			Dialog: editDialog2,
			option: {
				}
			})
		},
	editClick3: function() {
		modalHelp.show({
			Dialog: editDialog3,
			option: {
				}
			})
		},
	deleteLine:function(e) {
    	e.target
		modalHelp.show({
			Dialog: addDialog5,
			option: {
				param:{
					id:$(e.target).attr("itemID"),
					menuId:window.subItem
				}
				}
			})
		},
	render:function(){
		console.log(productList);
		if(this.props.option=="0"){
		return (
				<div className="userdtl">
					<div className="basicinfo">
					<div className="wtitle1">{window.menuname}</div>
					<span className="btn white mr-10" onClick={this.editClick}>目录编辑</span>
					<span className="btn white mr-10" onClick={this.editClick2}>产品配置</span>
					<span className="btn white mr-10" onClick={this.editClick3}>删除目录</span>
				</div>
				<div className="tablearea wrighttable">
						<table>
						<tbody>
								<tr className="noline">
									<td width="100%">
									<span className="ellipsis wprotitle">产品列表</span>
									</td>
								</tr>
						{this.props.productList.map(function(item,index){
							return (			
								<td width="33%" key={index} className="wtdtd">
									<span className="ellipsis">{item.get("name")}<span className="wtext2" itemID={item.get("id")} onClick={this.deleteLine}>删除</span></span>
								</td>
							)
						}.bind(this))}						
						</tbody>
					</table>
				</div>
				</div>
		)}else{
			return(
				<div></div>)
		}
	}
})

var MenuList = React.createClass({
	toShowUserBusiness:function (e) {
		var targete = e.target.parentNode.parentNode;
		var numx = targete.getElementsByClassName('txtright').length;
		var numx2 = targete.getElementsByClassName('imfordtl2').length;
		if(numx!=0){
		for (var i = 0; i < numx; i++) {
			targete.getElementsByClassName('txtright')[0].setAttribute('class','imfordtl2');
		}
	}
		else{
		for (var i = 0; i < numx2; i++) {
			targete.getElementsByClassName('imfordtl2')[0].setAttribute('class','imfordtl txtright');
		}
	}
		
	},
	onMouseDown:function (e) {
       if(e.button ==2){
		window.colId = $(e.target).attr("itemID");
		window.colCode = $(e.target).attr("id");
		console.log(window.colCode);
		console.log(window.colId);
		var context = $("#oncontext");
	    context.css("display","block");
	    context.css("left",e.pageX+10);
	    context.css("top",e.pageY+10);
       }
	},
	render:function(){
		var menuList = this.props.option;
		return (
			<ul>
				{menuList.map(function(item,index){
					return (
						<li key={index} className="clearfix">
							<div className="userimfor fl wuserinfoxx">
							<img className="wimg" src={require( "../../../images/open.png")} />
							<img className="wimg" src={require( "../../../images/file.png")} />
								<div className="imfordtl"  itemID={item.get('id')}  onClick={this.toShowUserBusiness}>
									<span className="wspan" itemID={item.get('id')} id={item.get('code')} onMouseDown={this.onMouseDown}>{item.get('name')}</span>
								</div>
								<InterfaceApp option={item.get('id')} getProductList={this.props.getProductList}/>
							</div>
						</li>
					)
				}.bind(this))}
			</ul>
		)
	}
})

var UserCharge = React.createClass({
	getInitialState:function(){
		return{
			userName:"",//搜索值
			menuList:new menuList(),
			productList:new productList(),
			productCode:"1"
		};
	},
	componentDidMount: function() {
         document.oncontextmenu = function(e){
               e.preventDefault();
           };
		this.state.menuList.on("fetchDone",function(total){
			this.setState({
				menuList:this.state.menuList
			});
			// console.log(this.state.menuList.toArray()[0].get('id'));
			// this.getProductList(this.state.menuList.toArray()[0].get('id'));
		}.bind(this));
		this.state.productList.on("fetchDone",function(){
			this.setState({
				productList:this.state.productList,
				productCode:"0"
			});
		}.bind(this));
		this.getMenuList();
	},
	userNameChange:function (e) {
		this.setState({
			"userName":e.target.value
		})
	},
    addClick: function() {
		modalHelp.show({
			Dialog: addDialog,
			option: {
				}
			})
		},
    addClick2: function(e) {
    	e.target
		modalHelp.show({
			Dialog: addDialog2,
			option: {
				}
			})
		},
    changeCol: function(e) {
    	e.target
		modalHelp.show({
			Dialog: addDialog3,
			option: {
				}
			})
		},
	editClick: function() {
		modalHelp.show({
			Dialog: editDialog,
			option: {
				}
			})
		},
	getMenuList:function(){
		this.state.menuList.fetch({
			loadingFlag:true,
			param:{
				id:"0",
			}
		});
	},
	getProductList:function(userId){
		this.state.productList.fetch({
			loadingFlag:true,
			param:{
				userId:userId
			}
		});
	},
	contextnone:function () {
		var context = $("#oncontext");
	    context.css("display","none");
	},
	changeColor:function (e) {
		$(e.target).css("color","white");
		$(e.target).css("backgroundColor","#0085d0");
	},
	changeColor2:function (e) {
		$(e.target).css("color","#354052");
		$(e.target).css("backgroundColor","white");
	},
	deleteCol:function(e) {
    	e.target
		modalHelp.show({
			Dialog: addDialog4,
			option: {
				}
			})
		},
	render:function(){
    	return (
			<div onClick={this.contextnone}>
				 <ul id="oncontext">
				     <li className="rightli" onMouseOver={this.changeColor} onMouseOut={this.changeColor2} onClick={this.addClick}>新建一级目录</li>
				     <li className="rightli" onMouseOver={this.changeColor} onMouseOut={this.changeColor2} onClick={this.addClick2}>新建子目录</li>
				     <li className="rightli" onMouseOver={this.changeColor} onMouseOut={this.changeColor2} onClick={this.changeCol}>修改目录</li>
				     <li className="rightli" onMouseOver={this.changeColor} onMouseOut={this.changeColor2} onClick={this.deleteCol}>删除目录</li>
				 </ul>
				<div className="userlist">
					<div className="search-area ml-20 mr-20 mb-10 clearfix">
						<div className="search-box pos-relative fl wsearchbox">
							<input placeholder="请输入查询内容" className="s-text" type="text" value={this.state.userName} onChange={this.userNameChange}/>
							<span className="s-btn" onClick={this.getMenuList}></span>
							<em className="del cursor pos-absolute"></em>
						</div>
					</div>
					<MenuList option={this.state.menuList} getProductList={this.getProductList} />
				</div>
			<Product option={this.state.productCode} productList={this.state.productList}/>
      		</div>
    	)
  	}
});

module.exports = UserCharge;