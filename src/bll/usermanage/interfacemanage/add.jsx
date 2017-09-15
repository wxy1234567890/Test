var React = require("react");
var interfaceAdd = require('collection/interfaceAdd');
var interfaceCodeValid = require('collection/interfaceCodeValid');
var TerseUI = require('terseui');
var modalHelp = TerseUI.Frame.modalHelp;
var LoadDialog = TerseUI.Frame.LoadDialog;
var Dialog = TerseUI.Frame.Dialog;
var Add = React.createClass({
	getInitialState:function(){
		var appInfo = window.appInfo.attributes;
		return{
			showMenu:false,
			showMenu2:false,
			data:"",
			interfaceAdd : new interfaceAdd,
			interfaceCodeValid : new interfaceCodeValid,
			name:"",
			code:"",
			app_id:appInfo.id,
			in_url:"",
			out_url:"",
			key:"",
			pre_auth:"0",
			description:"",
			argsConfig:[]
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
				code:this.state.code
			}
		});
	},
	componentDidMount: function() {
		this.state.interfaceCodeValid.on("fetchDone",function(){
			this.setState({
				interfaceCodeValid:this.state.interfaceCodeValid
			});
			this.interfaceAdd();
		}.bind(this));
		this.state.interfaceCodeValid.on("fault",function(){
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
		}.bind(this));
	},
	interfaceAdd:function(){
		var singlearr = [];
		var singleobj = {};
		var i = 0;
		var vary = 0;
		//得到参数值
        $(".line").each(function(){
        	$(this).find("input").map(function(){
        		i++;
        		if(!($(this).val())){
        			vary = 1;
        			console.log("vary=1");
        			return
        		}
        		if(i%3==1){
        			vary = 0;
        		if($(this).val()==""){
        		}
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
        	if(vary == 0){
        	singlearr.push(JSON.parse(JSON.stringify(singleobj)));
        }
        })
		this.setState({
			argsConfig: singlearr
		})
		this.state.interfaceAdd.on("fetchDone",function(){
			this.props.close();
			location.reload();
		}.bind(this));
		this.state.interfaceAdd.fetch({
			loadingFlag:true,
			param:{
				name:this.state.name,
				code:this.state.code,
				app_id:this.state.app_id,
				in_url:this.state.in_url,
				out_url:this.state.out_url,
				pre_auth:this.state.pre_auth,
				description:this.state.description,
				argsConfig:this.state.argsConfig,
				key:this.state.key
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
	deleteLine:function(e){
		e.target.parentNode.remove();
	},
	addLine:function(e){
		var content = 	"<li class='clearfix line'><div class='substance fl awayleft'><input placeholder='参数名称' type='text' /></div><div class='substance fl awayleft'><input placeholder='参数说明' type='text' /></div><input class='wcheck' type='checkbox' value='0' onClick='this.value==0?this.value=1:this.value=0'/>可为空<span class='wtext' onClick='this.parentNode.remove()'>删除</span></li>";
		$(e.target.parentNode).after(content);
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
					<h2>新建接口</h2>
					<span className="close" onClick={this.closeHandler}>×</span>
				</div>

				<div className="dialog-bd">
					<ul className="ulform clearfix">
						<li className="clearfix">
							<div className="name w85 fl">中文名称<span className="tip">*</span></div>
							<div className="substance fl awayleft wwidth80">
								<input placeholder="中文名称" type="text" value={this.state.name} id="name" onChange={this.valueChange}/>
							</div>

						</li>
						<li className="clearfix">
							<div className="name w85 fl">内部调用URL<span className="tip">*</span></div>
							<div className="substance fl awayleft wwidth80">
								<input placeholder="内部调用URL" type="text" value={this.state.in_url} id="in_url" onChange={this.valueChange}/>
							</div>
					
						</li>
						<li className="clearfix">
							<div className="name w85 fl">外部调用URL<span className="tip">*</span></div>
							<div className="substance fl awayleft wwidth80">
								<input placeholder="外部调用URL" type="text" value={this.state.out_url} id="out_url" onChange={this.valueChange}/>
							</div>
					
						</li>
						<li className="clearfix">
							<div className="name w85 fl">内部调用KEY<span className="tip">*</span></div>
							<div className="substance fl awayleft wwidth80">
								<input placeholder="内部调用KEY" type="text" value={this.state.key} id="key" onChange={this.valueChange}/>
							</div>
					
						</li>
						<li className="clearfix">
							<div className="name w85 fl">外部API Code<span className="tip">*</span></div>
							<div className="substance fl awayleft wwidth80">
								<input placeholder="外部APICode" type="text" value={this.state.code} id="code" onChange={this.valueChange}/>
							</div>
					
						</li>
						<li className="clearfix">
							<div className="name w85 fl">接口描述<span className="tip">*</span></div>
							<div className="substance fl awayleft wwidth80">
								<input placeholder="接口描述" type="text" value={this.state.description} id="description" onChange={this.valueChange}/>
							</div>
						</li>	
						<li className="clearfix">
							<input className="wcheck" type="checkbox"   id="pre_auth" onClick={this.pre_authchange}/>是否需要验证
							<div className="name w85 fl">pre_auth<span className="tip">*</span></div>
						</li>		
					</ul>
				</div>


				<div className="dialog-hd clearfix">
					<h2>参数配置管理</h2>
				</div>

				<div className="dialog-bd">
					<ul className="ulform clearfix addline">
						<li className="clearfix line">
							<div className="substance fl awayleft">
								<input placeholder="对内参数" type="text" />
							</div>
							<div className="substance fl awayleft">
								<input placeholder="对外参数" type="text" />
							</div>
							<input className="wcheck" type="checkbox"   onClick={this.checkboxval}/>可为空
							<span className="wtext" onClick={this.addLine}>添加</span>
						</li>		
						<li className="clearfix line">
							<div className="substance fl awayleft">
								<input placeholder="对内参数" type="text"/>
							</div>
							<div className="substance fl awayleft">
								<input placeholder="对外参数" type="text"/>
							</div>
							<input className="wcheck" type="checkbox"   onClick={this.checkboxval}/>可为空
							<span className="wtext" onClick={this.deleteLine}>删除</span>
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