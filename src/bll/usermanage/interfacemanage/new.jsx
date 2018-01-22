var React = require("react");
var TerseUI = require('terseui');
var interfaceAdd = require('collection/appAdd');
var interfaceCodeValid = require('collection/interfaceCodeValidapp');
var modalHelp = TerseUI.Frame.modalHelp;
var Dialog = TerseUI.Frame.Dialog;
var Add = React.createClass({
	getInitialState:function(){
		return{
			showMenu:false,
			showMenu2:false,
			interfaceAdd : new interfaceAdd,
			interfaceCodeValid : new interfaceCodeValid,
			name:"",
			code:"",
			app_id:"",
			in_url:"",
			out_url:"",
			key:"",
			pre_auth:"0",
			description:"",
			argsConfig:[],
			// interfaceAddList:""
		};
	},
	componentDidMount: function() {
	},
	getAllBusiness:function(){
	},
	closeHandler: function() {
		this.props.close();
	},
	cancelHandler: function() {
		this.props.close();
	},
	okHandler: function() {
		this.state.interfaceCodeValid.fetch({
			loadingFlag:true,
			param:{
				code:this.state.app_id
			}
		});
	},
	componentDidMount: function() {
		this.state.interfaceCodeValid.on("fetchDone",function(data){
			this.state.userList=data;
			this.setState({
				userList:data
			});
			if(this.state.userList==1){
				this.interfaceAdd();
			}else if(this.state.userList==0){
				modalHelp.show({
					Dialog: Dialog,
					option: {
						type: "error",
						title: "提示",
						content: "编码不唯一",
						ok: {
							text: "关闭",
							callback: function() {
								location.reload();
							}
						},
						close: {
							callback: function() {
								location.reload();
							}
						}
					}
				});
			}
		}.bind(this));
		this.state.interfaceAdd.on("fetchDone",function(data){
			// this.state.interfaceAddList=data;
			// this.setState({
			// 	interfaceAddList:data
			// });
			modalHelp.show({
				Dialog: Dialog,
				option: {
					type: "success",
					title: "提示",
					content: "新建应用成功",
					ok: {text: "好的"}
				}
			});
		}.bind(this));
	},
	interfaceAdd:function(){
		var singlearr = [];
		var singleobj = {};
		var i = 0;
		//得到参数值
        $(".line").each(function(){
        	$(this).find("input").map(function(){
        		i++;
        		if(i%3==1){
        		singleobj.name = $(this).val();
        	}
        		else if (i%3==2){
    			singleobj.desc = $(this).val();
        		}
        		else{
        			if($(this).val()=="on"){
        				$(this).val(0);
        			}
    			singleobj.nullAble = $(this).val();
        		}
        	});
        	singlearr.push(JSON.parse(JSON.stringify(singleobj)));
        })
		this.setState({
			argsConfig: singlearr
		});
		this.state.interfaceAdd.on("fetchDone",function(){
			this.props.close();
			location.reload();
		}.bind(this));
		this.state.interfaceAdd.fetch({
			loadingFlag:true,
			param:{
				name:this.state.name,
				code:this.state.app_id,
				responsor:this.state.in_url,
				phone:this.state.out_url,
				email:this.state.key,
				description:this.state.code
			}
		});
	},
	//显示或隐藏下拉多选框
	showClickHandler: function() {
		this.setState({
			showMenu: !this.state.showMenu
		});
	},
	businessTypeChange:function (business) {
		this.setState({
			showMenu: !this.state.showMenu
		})
	},
	showClickHandler2:function () {
		this.setState({
			showMenu2: !this.state.showMenu2
		});
	},
	businessPayChange:function (payType) {
		this.setState({
			payType:payType,
			showMenu2: !this.state.showMenu2
		})
	},
	priceChange:function (e) {
		this.setState({
			price:e.target.value
		})
	},
	checkboxval:function(e){
		if(e.target.checked){
			e.target.value = "1";
		}else{
			e.target.value = "0";
		}
	},
	valueChange:function (e) {
		var id = e.target.id;
		var value = e.target.value;
		if(id=="name"){
			this.setState({name:value})
		}else if(id=="code"){
			this.setState({code:value})
		}else if(id=="app_id"){
			this.setState({app_id:value})
		}else if(id=="in_url"){
			this.setState({in_url:value})
		}else if(id=="out_url"){
			this.setState({out_url:value})
		}else if(id=="key"){
			this.setState({key:value})
		}else if(id=="pre_auth"){
			this.setState({pre_auth:value})
		}else if(id=="description"){
			this.setState({description:value})
		}
	},
	pre_authchange:function(e){
			console.log(e.target.checked);
			if(e.target.checked){
				e.target.value = "1";
			}else{
				e.target.value = "0";
			}
			console.log(e.target.value);
			this.setState({pre_auth:e.target.value})
	},
	render: function() {
		return (
			<div className="dialog-confirm addif addyw">

				<div className="dialog-hd clearfix">
					<h2>新建应用</h2>
					<span className="close" onClick={this.closeHandler}>×</span>
				</div>

				<div className="dialog-bd">
					<ul className="ulform clearfix">
						<li className="clearfix">
							<div className="name w85 fl">应用名称<span className="tip">*</span></div>
							<div className="substance fl awayleft wwidth80">
								<input placeholder="应用名称" type="text" value={this.state.name} id="name" onChange={this.valueChange}/>
							</div>

						</li>
						<li className="clearfix">
							<div className="name w85 fl">应用Code<span className="tip">*</span></div>
							<div className="substance fl awayleft wwidth80">
								<input placeholder="应用Code" type="text" value={this.state.app_id} id="app_id" onChange={this.valueChange}/>
							</div>

						</li>
						<li className="clearfix">
							<div className="name w85 fl">负责人<span className="tip">*</span></div>
							<div className="substance fl awayleft wwidth80">
								<input placeholder="负责人" type="text" value={this.state.in_url} id="in_url" onChange={this.valueChange}/>
							</div>
					
						</li>
						<li className="clearfix">
							<div className="name w85 fl">手机号码<span className="tip">*</span></div>
							<div className="substance fl awayleft wwidth80">
								<input placeholder="手机号码" type="text" value={this.state.out_url} id="out_url" onChange={this.valueChange}/>
							</div>
					
						</li>
						<li className="clearfix">
							<div className="name w85 fl">电子邮箱<span className="tip">*</span></div>
							<div className="substance fl awayleft wwidth80">
								<input placeholder="电子邮箱" type="text" value={this.state.key} id="key" onChange={this.valueChange}/>
							</div>
					
						</li>
						<li className="clearfix">
							<div className="name w85 fl">描述<span className="tip">*</span></div>
							<div className="substance fl awayleft wwidth80">
								<input placeholder="应用描述" type="text" value={this.state.code} id="code" onChange={this.valueChange}/>
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