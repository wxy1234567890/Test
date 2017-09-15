var React = require("react");
var Ajax = require("util/ajax");
var AJAX_POST = Ajax.AJAX_POST;
var subject = require("model/global/subject");
var account = require("model/global/account");
var Constance = require("root/constance");

require("./login.less");
var Login = React.createClass({
  getInitialState: function() {
    return {
      userName: localStorage.getItem('bsUserName') || "",
      passWord: "",
      checked: true,//是否记住账号
      loging: false,
      tips: "",
      role: localStorage.getItem('bsRole') || "rent"
    }
  },
  componentDidMount: function() {
    sessionStorage.setItem("bsHasLogin", "false");
    sessionStorage.removeItem('bsCurrentUser');
    sessionStorage.removeItem('bsSessionId');
    sessionStorage.removeItem('bsMenus');
    if (this.state.userName == '' || this.state.userName == null) {
      this.refs.userNameInput.focus();
    } else {
      this.refs.passWordInput.focus();
    }

    account.on("loginSuccess",this.loginSuccess);
    account.on("loginFail",this.loginFail);
    account.on("loginError",this.loginError);
    account.on("loginComplete",this.loginComplete);
    account.on("getUserInfoDone",this.getUserInfoDone);
  },
  componentWillUnmount:function(){
    account.off("loginSuccess",this.loginSuccess);
    account.off("loginFail",this.loginFail);
    account.off("loginError",this.loginError);
    account.off("loginComplete",this.loginComplete);
    account.off("getUserInfoDone",this.getUserInfoDone);
  },
  loginSuccess:function(data){
    if (!this.isMounted()) return;
    sessionStorage.setItem('bsCurrentUser', this.state.userName);
    // sessionStorage.setItem('bsSessionId', data.sessionId);
    sessionStorage.setItem("bsHasLogin", "true");
    if (this.state.checked) {
      //勾选记住用户
      localStorage.setItem('bsUserName', this.state.userName);
      localStorage.setItem('bsRole', this.state.role);
    } else {
      // delete cookie
      localStorage.removeItem('bsUserName');
      localStorage.removeItem('bsRole');
    }
    this.queryUserInfo();

  },
  loginFail:function(){
    this.setState({
      tips: "用户名或密码错误"
    });
  },
  loginError:function(){
    this.setState({
      tips: "网络连接失败，请稍后再试"
    });
  },
  loginComplete:function(){
    if (!this.isMounted()) return;
    this.state.loging = false;
    this.setState({
      loging: false
    });
  },
  getUserInfoDone:function(data){
    sessionStorage.setItem("bsMenus",JSON.stringify(data.menus));

    if(!data.menus || data.menus.length == 0){
      subject.trigger("navigate",{
        path:'login'
      });
    }
    else{
      subject.trigger("navigate",{
        path:data.menus[0].key
      });
    }
  },
  checkedChangeHandler: function(event) {
    this.setState({
      checked: event.target.checked
    });
  },
  replaceToChar: function(value) {
    //匹配非字母
    var patrn = /[^a-zA-Z]/;
    return value.replace(patrn, '');
  },
  replaceToCharNumberUnderline: function(value) {
    //匹配非 字母 数字 下划线
    var patrn = /[^a-zA-Z0-9_]/;
    return value.replace(patrn, '');
  },
  isUsernameLegal: function(value) {
    //匹配首字符是字母,其他是字母 数字 下划线
    var patrn = /^[a-zA-Z][a-zA-Z0-9_]*$/;
    if (patrn.exec(value) != null) {
      return true;
    }
    return false;
  },
  isPasswordLegal: function(value) {
    //匹配字母 数字 下划线
    var patrn = /^[a-zA-Z0-9_]*$/;
    if (patrn.exec(value) != null) {
      return true;
    }
    return false;
  },
  userNameChangeHandler: function(event) {
    this.state.userName = event.target.value;

    // 判断用户名合法性
    if (!this.isUsernameLegal(this.state.userName) && this.state.userName != '') {
      if (this.state.userName.length == 1) {
        //首字符为字母
        this.state.userName = this.replaceToChar(this.state.userName);
      } else {
        //其他为字母 数字、下划线
        this.state.userName = this.replaceToCharNumberUnderline(this.state.userName);
      }
      this.setState({
        userName: this.state.userName,
        tips: "用户名必须以字母开头，由字母、数字、下划线组成！"
      });
      return;
    } else {
      this.setState({
        tips: ''
      });
    }

    //判断用户名长度
    if (this.state.userName.length > 28) {
      this.state.userName = this.state.userName.substring(0, 28);
      this.setState({
        tips: "用户名最长不超过28个"
      });
    } else {
      this.setState({
        tips: ''
      });
    }

    this.setState({
      userName: this.state.userName
    });
  },
  passWordChangeHandler: function(event) {
    this.state.passWord = event.target.value;

    //判断密码长度
    if (this.state.passWord.length > 20) {
      this.state.passWord = this.state.passWord.substring(0, 20);
      this.setState({
        tips: "密码最长不超过20个"
      });
    } else {
      this.setState({
        tips: ''
      });
    }

    this.setState({
      passWord: this.state.passWord
    });
  },
  clearUserName: function() {
    this.state.userName = "";
    this.setState({
      userName: this.state.userName
    });
    this.refs.userNameInput.focus();
  },
  clearPassWord: function() {
    this.state.passWord = "";
    this.setState({
      passWord: this.state.passWord
    });
    this.refs.passWordInput.focus();
  },
  loginClick: function() {
    if (this.state.loging) {
      return;
    }

    if (this.state.userName == "") {
      this.setState({
        tips: "请输入用户名"
      });
      this.refs.userNameInput.focus();
      return;
    }
    if (this.state.passWord == "") {
      this.setState({
        tips: "请输入密码"
      });
      this.refs.passWordInput.focus();
      return;
    }

    if (!this.isUsernameLegal(this.state.userName)) {
      this.setState({
        tips: "用户名必须以字母开头，由字母、数字、下划线组成！"
      });
      this.refs.userNameInput.focus();
      return;
    }

    if (this.state.userName.length > 28) {
      this.setState({
        tips: "用户名最长不超过28个"
      });
      this.refs.userNameInput.focus();
      return;
    }

    this.state.loging = true;

    this.setState({
      tips: ""
    });
    var roleValue = Constance.getDefineByKey(Constance.RoleType, this.state.role).value;
    account.authLogin({
      param:{
        userName:this.state.userName,
        passWord:this.state.passWord,
        role:roleValue
      }
    });
  },
  queryUserInfo:function(){
    account.getUserInfo({
      loadingFlag:true,
      param:{
        sessionId:sessionStorage.getItem("bsSessionId"),
        userName:sessionStorage.getItem("bsCurrentUser")
      }
    });
  },
  changeRole: function(type) {
    this.state.role = type;
    this.setState({
      role: this.state.role
    });
  },
  dynamicEnterClick: function(type, event) {
    if (event.key == 'Enter') {
      if (type == 'userName') {
        this.refs.passWordInput.focus();
      } else if (type == 'passWord') {
        this.loginClick();
      }
    }
  },
  render: function() {
    var tips = "";
    if (this.state.tips != "") {
      tips = (<span className="error red"><em></em>{this.state.tips}</span>);
    }
    var loginSpan = (<div className="btn login-btn" onClick={this.loginClick}>登录</div>);
    if (this.state.loging) {
      loginSpan = (<div className="btn login-btn">登录中</div>);
    }
    return (
      <div className="v-login">
        <div className="top"></div>
        <div className="middle clearfix">
          <div className="middlewrap">
            <div className="left"></div>
            <div className="right">
              <h2>
              <span className={this.state.role=="rent"?"active":""} onClick={this.changeRole.bind(this,"rent")}>用户登录</span>
              <em>|</em>
              <span className={this.state.role=="admin"?"active":""} onClick={this.changeRole.bind(this,"admin")}>管理员登录</span>
              </h2>
              <div className="login-input">
                <input type="text" placeholder="请输入用户名"  value={this.state.userName}
                  onChange={this.userNameChangeHandler} ref="userNameInput"
                  onKeyPress={this.dynamicEnterClick.bind(this, 'userName')}/>
                <em onClick={this.clearUserName}></em>
                <input type="passWord" placeholder="请输入密码" className="input"
                  value={this.state.passWord} onChange={this.passWordChangeHandler}
                  ref="passWordInput"
                  onKeyPress={this.dynamicEnterClick.bind(this, 'passWord')}/>
                <em onClick={this.clearPassWord}></em>
              </div>
              <p className="tips">{tips}</p>
              {loginSpan}
              <p className="container clear">
                <span className="fl"><input type="checkbox" checked={this.state.checked}
                  onChange={this.checkedChangeHandler} />记住账号</span>
              </p>
            </div>
          </div>
        </div>
        <div className="bottom">
          <span>Copyright © 2015 asiainfo 京ICP备15007699号-1</span>
        </div>
      </div>
    );
  }
});
module.exports = Login;