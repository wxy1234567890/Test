var React = require("react");
var TopBar = require("bll/components/topbar/topbar.jsx");
var TerseUI = require('terseui');
var Updown = TerseUI.Frame.UpDown;
var LogManage = require("./logmanage.jsx");

var Frame = React.createClass({
  render:function(){
    var top = <TopBar curMenuKey="logmanage" />;
    var down = <LogManage />;
    return (
      <Updown up={top} down={down} topheight={"56px"} />
    );
  }
});

module.exports = Frame;