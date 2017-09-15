var React = require("react");
var TopBar = require("bll/components/topbar/topbar.jsx");
var TerseUI = require('terseui');
var Updown = TerseUI.Frame.UpDown;

var MessageManage = require("./messagemanage.jsx");

var Frame = React.createClass({
  render:function(){
    var top = <TopBar curMenuKey="messagemanage" isFixedWidth={false}/>;
    var down = <MessageManage />;
    return (
      <Updown up={top} down={down} topheight={"56px"} needMinWidth={false} />
    );
  }
});

module.exports = Frame;