var React = require("react");
var Ajax = require("util/ajax");
var AppRouter = Backbone.Router.extend({});
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

  var getGVerify = function (id)
  {
  
    function GVerify(options) { //创建一个图形验证码对象，接收options对象为参数
      this.options = { //默认options参数值
        id: "", //容器Id
        canvasId: "verifyCanvas", //canvas的ID
        width: "142", //默认canvas宽度
        height: "48", //默认canvas高度
        type: "blend", //图形验证码默认类型blend:数字字母混合类型、number:纯数字、letter:纯字母
        code: ""
      }
  
      if(Object.prototype.toString.call(options) == "[object Object]"){//判断传入参数类型
        for(var i in options) { //根据传入的参数，修改默认参数值
          this.options[i] = options[i];
        }
      }else{
        this.options.id = options;
      }
  
      this.options.numArr = "0,1,2,3,4,5,6,7,8,9".split(",");
      this.options.letterArr = getAllLetter();
  
      this._init();
      this.refresh();
    }
  
    GVerify.prototype = {
      /**版本号**/
      version: '1.0.0',
  
      /**初始化方法**/
      _init: function() {
        var con = document.getElementById(this.options.id);
        var canvas = document.createElement("canvas");
        /*this.options.width = con.offsetWidth > 0 ? con.offsetWidth : "100";
        this.options.height = con.offsetHeight > 0 ? con.offsetHeight : "30";*/
        canvas.id = this.options.canvasId;
        canvas.width = this.options.width;
        canvas.height = this.options.height;
        canvas.style.cursor = "pointer";
        canvas.innerHTML = "您的浏览器版本不支持canvas";
        con.appendChild(canvas);
        var parent = this;
        canvas.onclick = function(){
          parent.refresh();
        }
      },
  
      /**生成验证码**/
      refresh: function() {
        var parent = this;
        this.options.code = '';
        var canvas = document.getElementById(this.options.canvasId);
        if(canvas.getContext) {
          var ctx = canvas.getContext('2d');
        }
        ctx.textBaseline = "middle";
  
        ctx.fillStyle = randomColor(180, 240);
        ctx.fillRect(0, 0, this.options.width, this.options.height);
  
        if(this.options.type == "blend") { //判断验证码类型
          var txtArr = this.options.numArr.concat(this.options.letterArr);
        } else if(this.options.type == "number") {
          var txtArr = this.options.numArr;
        } else {
          var txtArr = this.options.letterArr;
        }
          var optionarr = {};
          optionarr.url= "/auth/getValitionCode.action";
          AJAX_POST(optionarr);
          var parent = this;
          optionarr.success = function(data) {
            console.log(data);
              window.txt = data.split('');

              for(var i = 0; i <= 3; i++) {
                parent.options.code += txt[i];
                ctx.font = '20px SimHei';
                //ctx.font = randomNum(this.options.height/2, this.options.height) + 'px SimHei'; //随机生成字体大小
                ctx.fillStyle = randomColor(50, 160); //随机生成字体颜色
                /* ctx.shadowOffsetX = randomNum(-3, 3);
                ctx.shadowOffsetY = randomNum(-3, 3);*/
                ctx.shadowBlur = randomNum(-3, 3);
                ctx.shadowColor = "rgba(0, 0, 0, 0.3)";
                var x = parent.options.width / 5 * (i+1);
                var y = parent.options.height / 2;
                var deg = randomNum(-30, 30);
                /**设置旋转角度和坐标原点**/
                ctx.translate(x, y);
                ctx.rotate(deg * Math.PI / 180);
                ctx.fillText(txt[i], 0, 0);
                /**恢复旋转角度和坐标原点**/
                ctx.rotate(-deg * Math.PI / 180);
                ctx.translate(-x, -y);
              }

          };
        /**绘制干扰线**/
        for(var i = 0; i < 4; i++) {
          ctx.strokeStyle = randomColor(40, 180);
          ctx.beginPath();
          ctx.moveTo(randomNum(0, this.options.width/2), randomNum(0, this.options.height/2));
          ctx.lineTo(randomNum(0, this.options.width/2), randomNum(0, this.options.height));
          ctx.stroke();
        }
        /**绘制干扰点**/
        for(var i = 0; i < this.options.width/4; i++) {
          ctx.fillStyle = randomColor(0, 255);
          ctx.beginPath();
          ctx.arc(randomNum(0, this.options.width), randomNum(0, this.options.height), 1, 0, 2 * Math.PI);
          ctx.fill();
        }
      },
  
      /**验证验证码**/
      validate: function(code){
        var verifyCode = code.toLowerCase();
        var v_code = this.options.code.toLowerCase();
        if(verifyCode == v_code){
          return true;
        }else{
          return false;
        }
      }
    }
  
    /**生成字母数组**/
    function getAllLetter() {
      var letterStr = "a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z";
      return letterStr.split(",");
    }
    /**生成一个随机数**/
    function randomNum(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    }
    /**生成一个随机色**/
    function randomColor(min, max) {
      var r = randomNum(min, max);
      var g = randomNum(min, max);
      var b = randomNum(min, max);
      return "rgb(" + r + "," + g + "," + b + ")";
    }
  
    return new GVerify(id);
  }


    window.verifyCode=new getGVerify("wcode");
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
    sessionStorage.removeItem("txt");
    account.off("loginSuccess",this.loginSuccess);
    account.off("loginFail",this.loginFail);
    account.off("loginError",this.loginError);
    account.off("loginComplete",this.loginComplete);
    account.off("getUserInfoDone",this.getUserInfoDone);
  },
  loginSuccess:function(data){
    if (!this.isMounted()) return;
    sessionStorage.setItem('bsCurrentUser', this.state.userName);
    sessionStorage.setItem('bsSessionId', data.sessionId);
    sessionStorage.setItem("name", data.real_name);
    sessionStorage.setItem("email", data.email);
    sessionStorage.setItem("phone", data.phone);
    sessionStorage.setItem("password", data.phone);
    sessionStorage.setItem("login_name", data.login_name);
    sessionStorage.setItem("id", data.id);
    sessionStorage.setItem("company_id", data.company_id);
    sessionStorage.setItem("charge_type", data.charge_type);
    sessionStorage.setItem("balance", data.balance);
    sessionStorage.setItem("frozen", data.frozen);
    sessionStorage.setItem("type", data.type);
    sessionStorage.setItem("bsHasLogin", "true")
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
  loginFail: function(data,datamess){
    this.setState({
      tips: datamess
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
    var codeInput = document.getElementById('codeInput').value;
    if(!(verifyCode.validate(codeInput))){
       document.getElementById('errorTips').innerHTML = "验证码错误，重新输入";
       return ;
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
        passWord:hex_md5(this.state.userName.trim() + this.state.passWord.trim()),
        validationCode:codeInput,
        role:roleValue
      }
    });
    // account.trigger("loginSuccess",{
    //     sessionId:"12345678901234567890123456789012"
    //   });
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
  changeRole: function() {
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
              <span onClick={this.changeRole.bind(this,"rent")}><a className="whref" href="../usr/index.html">用户登录</a></span>
              <em>|</em>
              <span className="active">管理员登录</span>
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
                <input type="text" name="code" id="codeInput"  className="input" placeholder="验证码"/>
                <div id="wcode" className="wcodepic" title="看不清，换一张"></div>
              </div>              
              <p className="errorTips" id="errorTips"></p>
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
          <span>Copyright © 2017 asiainfo 京ICP备15007699号-1</span>
        </div>
      </div>
    );
  }
});
module.exports = Login;