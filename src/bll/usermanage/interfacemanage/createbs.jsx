var React = require('react');
var TopBar = require("bll/components/topbar/topbar.jsx");
var TerseUI = require('terseui');
var Updown = TerseUI.Frame.UpDown;

var Down = React.createClass({
	render: function() {
		return (
			<div className="widthmodule">
				<div className="widthwrap">
					待增加内容
				</div>
      		</div>
		);
	}
});

var UserManage = React.createClass({
	render: function() {
		var top = <TopBar />;
		var down = <Down />;
		return (
			<Updown up={top} down={down} topheight={"56px"} />

		)
	}
});
module.exports = UserManage;