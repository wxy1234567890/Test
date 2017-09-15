var React = require('react');
var TopBar = require("bll/components/topbar/topbar.jsx");
var TerseUI = require('terseui');
var Updown = TerseUI.Frame.UpDown;
var LeftRight = TerseUI.Frame.LeftRight;
var LeftMenu = require("bll/components/leftmenu/leftmenu.jsx");
var UserCharge = require("./award2.jsx");

var Down = React.createClass({
  render:function(){
    var left = <LeftMenu curMenuKey="usermanage" curSubMenuKey="usercharge" />;
    var right = <UserCharge />
    return (
        <LeftRight left={left} right={right}/>
    );
  }
});

var Frame = React.createClass({
  render:function(){
    var top = <TopBar curMenuKey="usermanage" />;
    var down = <Down />;
    return (
        <Updown up={top} down={down} topheight={"56px"} />
    );
  }
});

module.exports = Frame;