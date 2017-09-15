var React = require("react");
var newsAdd = require('collection/newsAdd');
var showMessage = require("util/validcheck").showMessage;

var Add = React.createClass({
	getInitialState: function() {
		return {
			newsAdd: new newsAdd(),
			newsTitle:"",
			newsContent:"",
			newsType:"",
			showMenu:false
		};
	},
	componentDidMount() {
		this.state.newsAdd.on("newsAddDone", function() {
			this.props.close();
			this.props.option.ok.callback();
		}.bind(this));
	},
	addNews: function() {
		var newsType=this.state.newsType;
		var newsTitle=this.state.newsTitle;
		var newsContent=this.state.newsContent;
		if(newsTitle==""){
			showMessage("标题不能为空");
			return;
		}
		if(newsType==""){
			showMessage("类型不能为空");
			return;
		}
		if(newsContent==""){
			showMessage("内容不能为空");
			return;
		}
		this.state.newsAdd.newsAdd({
			loadingFlag: true,
			param:{
				loginUserId:'',
				newsType:newsType,
				newsTitle:newsTitle,
				newsContent:newsContent
			}
		});
	},
	titleChange:function (e) {
		this.setState({
			newsTitle:e.target.value
		})
	},
	contentChange:function (e) {
		this.setState({
			newsContent:e.target.value
		})
	},
	//显示或隐藏下拉多选框
	showClickHandler: function() {
		this.setState({
			showMenu: !this.state.showMenu
		});
	},
	newsTypeChange:function (type) {
		this.setState({
			"newsType":type,
			showMenu: !this.state.showMenu
		})
	},
	closeHandler: function() {
		this.props.close();
	},
	cancelHandler: function() {
		this.props.close();
	},
	okHandler: function() {
		this.addNews();
	},
	render: function() {
		var newsTypeName="";
		switch (Number(this.state.newsType)){
			case 1:
				newsTypeName = "系统公告";
				break;
			case 2:
				newsTypeName = "管理通知";
				break;
			case 3:
				newsTypeName = "升级公告";
				break;
			default:
				newsTypeName = "";
		}
		return (
			<div className="dialog-confirm releasenewmsg">
				<div className="dialog-hd clearfix">
					<h2>发布新消息</h2>
					<span className="close" onClick={this.closeHandler}>×</span>
				</div>
				<div className="dialog-bd">
					<ul className="ulform mt-10 clearfix">
						<li className="clearfix">
							<div className="name fl">标题</div>
							<div className="substance fl">
								<input placeholder="请输入..." type="text"  value={this.state.newsTitle} onChange={this.titleChange}/>
							</div>
						</li>
						<li className="clearfix">
							<div className="name fl">类型</div>
							<div className="substance fl">
								<div className={this.state.showMenu ? "selectbox dw pos-rel open" : "selectbox dw pos-rel"}>
									<div className="selected pos-rel cursor">
										<input className="cursor" value={newsTypeName} type="text" onClick={this.showClickHandler}/>
										<em className="pos-abs"></em>
									</div>
									<ul className="selectlist">
										<li onClick={this.newsTypeChange.bind(this, 1)}>系统公告</li>
										<li onClick={this.newsTypeChange.bind(this, 2)}>管理通知</li>
									</ul>
								</div>
							</div>
						</li>
						<li className="clearfix">
							<div className="name fl">内容</div>
							<div className="substance fl">
								<textarea value={this.state.newsContent} onChange={this.contentChange}></textarea>
							</div>
						</li>
					</ul>
				</div>
				<div className="dialog-ft">
					<span className="btn btn-create mr-10" onClick={this.okHandler}>提交</span>
					<span className="btn btn-close" onClick={this.cancelHandler}>关闭</span>
				</div>
			</div>
		);
	}
});

module.exports = Add;