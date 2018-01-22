var React = require("react");
var classNames = require("classnames/bind");
var subject = require("model/global/subject");
var TerseUI = require('terseui');
var modalHelp = TerseUI.Frame.modalHelp;
var Dialog = TerseUI.Frame.Dialog;
var editDialog = require("./edit.jsx");
var AJAX_POST = require("util/ajax").AJAX_POST;
var editPwdDialog = require("./editPwd.jsx");
/*
 * @description 菜单项
 * @props menu 菜单项要使用的数据,包括key和name两个属性
 * @props curMenuKey 当前菜单项的key
 */
var MenuItem = React.createClass({
  clickHandler: function() {
    subject.trigger("navigate",{
      path:this.props.menu.key
    });
  },
  render: function() {
    var menu = this.props.menu;
    var clsName = classNames("menu-text",{
      "active":menu.key == this.props.curMenuKey
    });

    return (
      <li className={clsName} onClick={this.clickHandler}>
        <span>{menu.name}</span>
      </li>
    );
  }
});

/*
 * @description 顶部菜单
 * @props curMenuKey 当前菜单项的key
 */
var Topbar = React.createClass({
  getInitialState:function(){
    console.log(sessionStorage);
    return {
      showLoginArea:false,
      id:sessionStorage.getItem('id'),
      login_name:sessionStorage.getItem('login_name'),
      name:sessionStorage.getItem('name'),
      email:sessionStorage.getItem('email'),
      phone:sessionStorage.getItem('phone')
    }
  },
  componentDidMount:function() {
  },
  mouseoverHandler: function() {
    this.setState({
      showLoginArea: true
    });
  },
  mouseoutHander: function() {
    this.setState({
      showLoginArea: false
    });
  },
  editDialog: function() {
    modalHelp.show({
      Dialog: editDialog,
      option: {
        ok:{
          callback:function(obj){
            //修改信息后
            modalHelp.show({
              Dialog: Dialog,
              option: {
                type: "warn",
                title: "提示",
                content: "修改用户信息成功",
                ok: {text: "好的"}
              }
            });
            // this.setState({
            //  userInfo:obj
            // })
          }.bind(this)
        }
      }
    });
  },
  withdraw:function(){
    var option={};
    option.loadingText = "正在注销中,请稍候!";
    option.url = "/auth/logout.action";
    AJAX_POST(option);
    sessionStorage.removeItem('name');
    sessionStorage.removeItem('email');
    sessionStorage.removeItem('phone');
    subject.trigger("navigate",{
        path:'login'
      });
  },
  resetPwd:function () {
    modalHelp.show({
      Dialog: editPwdDialog,
      option: {
        userId:this.state.id,
        loginname:this.state.login_name,
        ok:{
          callback:function(){
            //修改密码后
            modalHelp.show({
              Dialog: Dialog,
              option: {
                type: "warn",
                title: "提示",
                content: "修改密码成功",
                ok: {text: "好的"}
              }
            });
          }.bind(this)
        }
      }
    });
  },
	render: function() {
    var loginAreaCls = classNames("login-area", "fl", "pos-rel",{
      "active":this.state.showLoginArea
    });
    var barContentCls = classNames({
      "bar-content":!!this.props.isFixedWidth
    })
    var userName = sessionStorage.getItem('bsCurrentUser') || '测试用户';
    var menus = window.JSON.parse(sessionStorage.getItem('bsMenus'));
    // console.log(sessionStorage);
		return (
      <div className="topbar rent clearfix">
        <div className={barContentCls}>
          <h1 className="logo fl"></h1>
          <ul className="nav fl">
            {menus.map(function(menu,index){
              return <MenuItem key={index} menu={menu} curMenuKey={this.props.curMenuKey} />
            }.bind(this))}
          </ul>
          <div className="fr">
            <span className="fl mt-10"><img className="fl radius topheader" src={require( "../../../images/head.jpg")} /></span>
            <div className={loginAreaCls} onMouseOver={this.mouseoverHandler} onMouseOut={this.mouseoutHander}>
              <div className="panel">
                <span className="name">hi&nbsp;,&nbsp;{this.state.name}</span>
                <b className="icon-arrow"></b>
              </div>
              <div className="user-list">
                <div className="namecard clearfix">
                  <img className="fl radius w108 mr-15" src={require( "../../../images/head.jpg")} />
                  <p>
                   <span className="title ellipsis">hi,{this.state.name}!</span>
                   <span className="ellipsis">姓名：{this.state.name}</span>
                   <span className="ellipsis">E-mail：{this.state.email}</span>
                   <span className="ellipsis">电话：{this.state.phone}</span>
                  </p>
                </div>
                <div className="ope">
                  <span onClick={this.resetPwd}>修改密码</span>
                  <span onClick={this.editDialog}>编辑资料</span>
                  <span onClick={this.withdraw}>注销</span>
                </div>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    );
	}
});
module.exports = Topbar;