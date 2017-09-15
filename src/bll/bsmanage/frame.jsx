var React = require("react");
var TopBar = require("bll/components/topbar/topbar.jsx");
var TerseUI = require('terseui');
var Updown = TerseUI.Frame.UpDown;
var BSManage = require("./bsmanage.jsx");

var Frame = React.createClass({
  render:function(){
    var top = <TopBar curMenuKey="bsmanage" />;
    var down = <BSManage />;
    return (
      <Updown up={top} down={down} topheight={"56px"} />
    );
  }
});

module.exports = Frame;