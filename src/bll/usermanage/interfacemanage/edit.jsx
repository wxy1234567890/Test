var React = require("react");
var interfaceAdd = require('collection/interfaceEdit');

var Add = React.createClass({
	getInitialState:function(){
	console.log(this.props.option);
	var exit = this.props.option.getInfo.attributes;
	var getArgsList = this.props.option.getArgsList;
	console.log(getArgsList);
		return{
			getArgsList:getArgsList,
			showMenu:false,
			showMenu2:false,
			interfaceAdd : new interfaceAdd,
			name:exit.name,
			code:exit.code,
			app_id:exit.app_id,
			id:exit.id,
			in_url:exit.in_url_address,
			out_url:exit.out_url_address,
			key:exit.key,
			pre_auth:"0",
			description:exit.description,
			argsConfig:exit.argsConfig
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
         console.log(singlearr);
		this.state.interfaceAdd.on("fetchDone",function(){
			this.props.close();
			location.reload();
		}.bind(this));
		this.state.interfaceAdd.fetch({
			loadingFlag:true,
			param:{
				id:this.state.id,
				name:this.state.name,
				code:this.state.code,
				app_id:this.state.app_id,
				in_url:this.state.in_url,
				out_url:this.state.out_url,
				pre_auth:this.state.pre_auth,
				description:this.state.description,
				argsConfig:singlearr,
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
		this.refresh;
	},
	addLine:function(e){
		var content = 	"<li class='clearfix line lineH'><div class='substance fl awayleft'><input placeholder='对内参数' type='text' /></div><div class='substance fl awayleft'><input placeholder='参数说明' type='text' /></div><input class='wcheck' type='checkbox' value='0' onClick='this.value==0?this.value=1:this.value=0'/>可为空<span class='wtext' onClick='this.parentNode.remove()'>删除</span></li>";
		$(e.target.parentNode).before(content);
		this.refresh;
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
		}else if(id=="idd"){
			this.setState({id:value})
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
				e.target.value = "0";
			}else{
				e.target.value = "1";
			}
			this.setState({pre_auth:e.target.value})
	},
	refresh: function() {
		if (!this.unmount) {
			this.setState({
				a: 1
			});
		}
	},
	render: function() {
		return (
			<div className="dialog-confirm addif addyw">

				<div className="dialog-hd clearfix">
					<h2>编辑接口</h2>
					<span className="close" onClick={this.closeHandler}>×</span>
				</div>

				<div className="dialog-bd">
					<ul className="ulform clearfix">
						<li className="clearfix">
							<div className="name w85 fl">中文名称<span className="tip">*</span></div>
							<div className="substance fl awayleft wwidth80">
								<input placeholder="对内服务参数名称" type="text" value={this.state.name} id="name" onChange={this.valueChange}/>
							</div>

						</li>
						<li className="clearfix">
							<div className="name w85 fl">内部调用URL<span className="tip">*</span></div>
							<div className="substance fl awayleft wwidth80">
								<input placeholder="对内服务参数名称" type="text" value={this.state.in_url} id="in_url" onChange={this.valueChange}/>
							</div>
					
						</li>
						<li className="clearfix">
							<div className="name w85 fl">外部调用URL<span className="tip">*</span></div>
							<div className="substance fl awayleft wwidth80">
								<input placeholder="对内服务参数名称" type="text" value={this.state.out_url} id="out_url" onChange={this.valueChange}/>
							</div>
					
						</li>
						<li className="clearfix">
							<div className="name w85 fl">外部调用KEY<span className="tip">*</span></div>
							<div className="substance fl awayleft wwidth80">
								<input placeholder="对内服务参数名称" type="text" value={this.state.key} id="key" onChange={this.valueChange}/>
							</div>
					
						</li>
						<li className="clearfix">
							<div className="name w85 fl">外部API Code<span className="tip">*</span></div>
							<div className="substance fl awayleft wwidth80">
								<input placeholder="对内服务参数名称" disabled="disabled" type="text" value={this.state.code} id="code" onChange={this.valueChange}/>
							</div>
					
						</li>
						<li className="clearfix">
							<div className="name w85 fl">接口描述<span className="tip">*</span></div>
							<div className="substance fl awayleft wwidth80">
								<input placeholder="对内服务参数名称" type="text" value={this.state.description} id="description" onChange={this.valueChange}/>
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
						{this.state.getArgsList.map(function(item,index){
							return (
						<li className="clearfix line lineH" key={index}>
							<div className="substance fl awayleft">
								<input defaultValue={item.get('name')} type="text"/>
							</div>
							<div className="substance fl awayleft">
								<input defaultValue={item.get('explanation')} type="text"/>
							</div>
							<input className="wcheck" type="checkbox"   onClick={this.checkboxval}/>可为空
							<span className="wtext" onClick={this.deleteLine}>删除</span>
						</li>
							)
						}.bind(this))}	
						<li className="clearfix line lineH">
							<div className="substance fl awayleft">
								<input placeholder="对内参数" type="text" />
							</div>
							<div className="substance fl awayleft">
								<input placeholder="参数说明" type="text" />
							</div>
							<input className="wcheck" type="checkbox"   onClick={this.checkboxval}/>可为空
							<span className="wtext" onClick={this.addLine}>添加</span>
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