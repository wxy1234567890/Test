var React = require('react');
var TopBar = require("bll/components/topbar/topbar.jsx");
var TerseUI = require('terseui');
var modalHelp = TerseUI.Frame.modalHelp;
var Updown = TerseUI.Frame.UpDown;
var businessAdd = require('collection/businessAdd');
var subject = require("model/global/subject");
var LayDate = require("laydate");
var Dialog = TerseUI.Frame.Dialog;
var appList = require('collection/appList');
var interfaceApp = require('collection/interfaceApp');
var interfaceCodeValid = require('collection/interfaceCodeValidproduct');
var Down = React.createClass({
	getInitialState: function() {
		return {
			businessAdd:new businessAdd(),
			appList:new appList(),
			interfaceApp:new interfaceApp(),
			interfaceCodeValid:new interfaceCodeValid(),
			price:"0",
			interfacetimes:"0",
			bsName:"",
			bsPrice:"",
			bsCode:"",
			bsDesc:"1",
			bsTimes:"",
			act:"",
			showMenu:false,
			description:""
		};
	},
	componentDidMount:function(){
		this.state.businessAdd.on("bsAddDone", function(data) {
			modalHelp.show({
				Dialog: Dialog,
				option: {
					type: "success",
					title: "提示",
					content: "新建产品成功",
					ok: {text: "好的"}
				}
			});
			//跳转到列表页面
			subject.trigger("navigate", {
				path: 'bsmanage'
			});
		}.bind(this));
		this.state.appList.on("fetchDone", function() {
			this.setState({
				appList:this.state.appList
			});
		if(this.state.appList&&this.state.appList.length!=0&&this.state.appList.toArray()[0]){		
			this.state.interfaceApp.fetch({
				loadingFlag:true,
				param:{
					id:this.state.appList.toArray()[0].attributes.id
				}
			});
		}	
		}.bind(this));
		this.getAppList();
		this.state.interfaceApp.on("fetchDone", function() {
			this.setState({
				interfaceApp:this.state.interfaceApp
			});
		if(this.state.interfaceApp&&this.state.interfaceApp.length!=0&&this.state.interfaceApp.toArray()[0]){	
			window.proId = this.state.interfaceApp.toArray()[0].attributes.id;
		}
		}.bind(this));
		this.state.interfaceCodeValid.on("fetchDone",function(data){
			this.state.userList=data;
			this.setState({
				userList:data
			});
			if(this.state.userList==1){
				this.addBusiness();
			}else if(this.state.userList==0){
				modalHelp.show({
					Dialog: Dialog,
					option: {
						type: "error",
						title: "提示",
						content: "编码不唯一",
						ok: {text: "关闭"}
					}
				});
			}
		}.bind(this));
	},
	getAppList:function () {
		this.state.appList.fetch({
			loadingFlag:true,
			param:{
			}
		});
	},
	bsNameChange:function (e) {
		this.setState({
			bsName:e.target.value
		})
	},
	bsCodeChange:function (e) {
		this.setState({
			bsCode:e.target.value
		})
	},
	bsPriceChange:function (e) {
		this.setState({
			bsPrice:e.target.value
		})
	},
	bsTimesChange:function (e) {
		this.setState({
			bsTimes:e.target.value
		})
	},
	bsDescChange:function (e) {
		this.setState({
			bsDesc:e.target.value
		})
	},
	descriptionChange:function(e){
		this.setState({
			description:e.target.value
		})
	},
	addBusiness:function () {
		var bsName = this.state.bsName;
		var bsPrice = this.state.bsPrice;
		var bsDesc = this.state.bsDesc;
		var bsTimes = this.state.bsTimes;
		var varycode = true;
		console.log($("input[type='checkbox']").is(':checked'));
		console.log($("input[type='checkbox']").is(':checked'));
		if ($("input[type='checkbox']").is(':checked')){
			var checkboxval = "1"
		}else{
			var checkboxval = "0"
		}
		var charge_type = $(".active3").attr("itemID");
		if(charge_type==0){
			var singlearr = [];
			var singleobj = {};
			singleobj.use_limit = -1;
			singleobj.interface_id=window.proId;
			singleobj.price = $("#selectC").val();
			// singlearr.push(JSON.parse(JSON.stringify(singleobj)));
			//得到参数值
	        $(".linelist").each(function(){
	        	$(this).find("input").map(function(index,item){
	 			if (index==1){
	    			singleobj.interface_id = $(this).attr("itemID");
	        		}
        		if(index==2){
        			singleobj.price = $(this).val();
    			}
    			bsTimes = -1;
    			singleobj.use_limit = -1;
	        	});
	        	singlearr.map(function (item,index) {
	        		if(item.interface_id==singleobj.interface_id){
		        		varycode = false;
	        		}
	        	})
	        	singlearr.push(JSON.parse(JSON.stringify(singleobj)));
	        	console.log(singlearr);
	        })
	        if(varycode == false){
        		modalHelp.show({
				Dialog: Dialog,
				option: {
					type: "error",
					title: "提示",
					content: "新增接口不可以重复",
					ok: {text: "关闭"}
					}
				})
	        }
		}
		if(charge_type==1){
			var singlearr = [];
			var singleobj = {};
			singleobj.interface_id=window.proId;
			singleobj.price = $("#selectC").val();
			singleobj.use_limit = $("#selectD").val();
			// singlearr.push(JSON.parse(JSON.stringify(singleobj)));
			//得到参数值
	        $(".linelist").each(function(){
	        	$(this).find("input").map(function(index,item){
	 			if (index==1){
	    			singleobj.interface_id = $(this).attr("itemID");
	        		}
        		if(index==2){
        			singleobj.price = $(this).val();

    			}
        		if(index==4){
        			singleobj.use_limit = $(this).val();

    			}
	        	});
	        	singlearr.map(function (item,index) {
	        		if(item.interface_id==singleobj.interface_id){
	        			varycode = false;					
	        		}
	        	})
	        	singlearr.push(JSON.parse(JSON.stringify(singleobj)));
	        })
	        if(varycode == false){
        		modalHelp.show({
				Dialog: Dialog,
				option: {
					type: "error",
					title: "提示",
					content: "新增接口不可以重复",
					ok: {text: "关闭"}
					}
				})
        	}
		}
		if(charge_type==2){
			var singlearr = [];
			var singleobj = {};
			singleobj.use_limit = 0;
			singleobj.interface_id=window.proId;
			singleobj.price = $("#selectC").val();
			// singlearr.push(JSON.parse(JSON.stringify(singleobj)));
			//得到参数值
	        $(".linelist").each(function(){
	        	$(this).find("input").map(function(index,item){
	 			if (index==1){
	    			singleobj.interface_id = $(this).attr("itemID");
	        		}
        		if(index==2){
        			singleobj.price = $(this).val();

    			}
    			bsTimes = 0;
    			singleobj.use_limit = 0;
	        	});
	        	singlearr.push(JSON.parse(JSON.stringify(singleobj)));
	        })
		}
		// console.log(varycode);
		if(varycode){
		this.state.businessAdd.bsAddDoing({
			loadingFlag: true,
			param:{
				name:bsName,
				code:this.state.bsCode,
				type:$(".active").attr("itemID")||0,
				charge_type:$(".active3").attr("itemID"),
				user_restrict:$(".active2").attr("itemID"),
				use_limit:bsTimes?bsTimes:-1,
				bundle_price:this.state.bsPrice,
				out_bundle_use:checkboxval,
				charge_date:this.state.bsDesc,
				interfaceJSONArrStr:singlearr,
				description:this.state.description
		}});
	}
	},
	okHandler: function() {
		this.state.interfaceCodeValid.fetch({
			loadingFlag:true,
			param:{
				code:this.state.bsCode
			}
		});
	},
	startTime: function(element) {
		var start = {
			elem: element,
			format: 'YYYY-MM-DD hh:mm:ss',
			min: laydate.now(), //设定最小日期为当前日期
			istime: true
		};
		LayDate(start);
	},
	chargeType:function (e) {
		if(e.target.getAttribute('class')==""){
		var activenodelist =document.getElementsByClassName("active");
		activenodelist[0].setAttribute('class','');
		e.target.setAttribute('class','active');
		}
	},
	chargeType2:function (e) {
		if(e.target.getAttribute('class')==""){
		var activenodelist =document.getElementsByClassName("active2");
		activenodelist[0].setAttribute('class','');
		e.target.setAttribute('class','active2');
		}
	},
	chargeTypex:function (e) {
		if(e.target.getAttribute('class')==""){
		var activenodelist = document.getElementsByClassName("active3");
		activenodelist[0].setAttribute('class','');
		e.target.setAttribute('class','active3');
		}
		$(".wshadow").css("display","none");
		$(".wshadow2").css("display","none");
		// $(".wshadow3").css("display","none");
		$(".wshadow4").css("display","none");
	},
	chargeTypeh:function (e) {
		if(e.target.getAttribute('class')==""){
		var activenodelist = document.getElementsByClassName("active3");
		activenodelist[0].setAttribute('class','');
		e.target.setAttribute('class','active3');
		}
		$(".wshadow").css("display","inline-block");
		$(".wshadow2").css("display","block");
		// $(".wshadow3").css("display","none");
		$(".wshadow4").css("display","none");
	},
	pathmain: function() {
		subject.trigger("navigate",{
	      path:"bsmanage"
	    });
	},
	chargeTypeq:function (e) {
		if(e.target.getAttribute('class')==""){
			var activenodelist =document.getElementsByClassName("active3");
			activenodelist[0].setAttribute('class','');
			e.target.setAttribute('class','active3');
		}
		$(".wshadow").css("display","none");
		$(".wshadow2").css("display","none");
		// $(".wshadow3").css("display","none");
		$(".wshadow4").css("display","inline-block");
	},
	showClickHandl1er: function() {
		this.setState({
			showMenu: !this.state.showMenu
		});
	},
	deleteLine:function(e){
		e.target.parentNode.remove();
	},
	addLine:function(e){
		var content = 	"<li class='clearfix linelist'><div class='substance fl awayleft'><input  disabled='disabled' value="+$("#selectA").val()+" type='text' /></div><div class='substance fl awayleft'><input  disabled='disabled' itemID="+window.proId+"  value="+$("#selectB").val()+" type='text' /></div><div class='substance fl awayleft wshadow4'><span class='wwwtext'>单价</span><input disabled='disabled' value="+$("#selectC").val()+" class='wminibar' type='text'/><span class='pl5'>元/次</span></div><div class='substance fl awayleft wshadow2'><span class='wwwtext'>套餐外</span><input disabled='disabled' value="+$("#selectC").val()+" class='wminibar' type='text'/><span class='pl5'>元/次</span></div><div class='substance fl awayleft'><span class='wwwtext wshadow'>接口限制次数</span><input disabled='disabled' placeholder='接口限制次数'  value="+$("#selectD").val()+" class='wminibar wshadow' type='text'/></div><span class='wtext' onClick='this.parentNode.remove()'>删除</span></li>";
		$(e.target.parentNode).after(content);
		if($(".active3").attr("itemID")=="1"){
			$(".wshadow").css("display","inline-block");
			// $(".wshadow3").css("display","none");
			$(".wshadow4").css("display","none");
			$(".wshadow2").css("display","block");
		}
		if($(".active3").attr("itemID")=="2"){
			// $(".wshadow3").css("display","none");
			$(".wshadow4").css("display","inline-block");
			$(".wshadow2").css("display","none");
		}
	},
	changeApp:function (e) {
		var val = e.target.value;
		var proid = "";
		$("#selectA option").each(function(){
			if(val == $(this).val()){
				proid = $(this).attr("itemID");
			}
		})
		this.state.interfaceApp.fetch({
			loadingFlag:true,
			param:{
				id:proid
			}
		});
	},
	productId:function(e){
		var val = e.target.value;
		$("#selectB option").each(function(){
			if(val == $(this).val()){
				window.proId = $(this).attr("itemID");
			}
		})
	},
	priceChange:function(e){
		this.setState({
			price:e.target.value
		});
	},
	interfacetimesChange:function(e){
		this.setState({
			interfacetimes:e.target.value
		});
	},
	test:function(){
		console.log($("input[type='checkbox']").is(':checked'));
	},
	render: function() {
		return (
			<div className="widthmodule">
				<div className="widthwrap">
					<div className="navtit mb-30 mt-30">新建产品</div>
					<p className="f16 mb-20"><b>基本信息</b></p>
					<ul className="ulform clearfix">
						<li className="clearfix">
							<div className="name w75 fl pr-5">产品类型</div>
							<ul className="radiobtn">
								<li className={this.state.act? "" : "active"} itemID="0" onClick={this.chargeType}>接口类</li>
								<li className={this.state.act? "active hide" : "hide"} itemID="1" onClick={this.chargeType}>智呼类</li>
							</ul>
						</li>
						<li className="clearfix">
							<div className="name w75 fl pr-5">适用用户</div>
							<ul className="radiobtn">
								<li className={this.state.act ? "" : "active2"} itemID="0" onClick={this.chargeType2}>预付费</li>
								<li className={this.state.act ? "active2" : ""} itemID="1" onClick={this.chargeType2}>后付费</li>
								<li className={this.state.act ? "active2" : ""} itemID="2" onClick={this.chargeType2}>无限制</li>
							</ul>
						</li>
						<li className="clearfix">
							<div className="name w75 fl pr-5">产品名称</div>
							<div className="substance dw fl">
								<input className="w405" type="text" placeholder="请输入产品名称" value={this.state.bsName} onChange={this.bsNameChange}/>
							</div>
						</li>
						<li className="clearfix">
							<div className="name w75 fl pr-5">产品编码</div>
							<div className="substance dw fl">
								<input className="w405" type="text" placeholder="请输入产品编码" value={this.state.bsCode} onChange={this.bsCodeChange}/>
							</div>
						</li>
						<li className="clearfix">
							<div className="name w75 fl pr-5">套餐价格</div>
							<div className="substance dw fl">
								<input className="w405" type="text" placeholder="请输入套餐价格" value={this.state.bsPrice} onChange={this.bsPriceChange}/>
							</div>
						</li>
						<li className="clearfix wshadow2">
							<div className="name w75 fl pr-5">套餐外使用</div>
							<div className="substance dw fl">
								<input  type="checkbox" className="allowuse" onClick={this.test}/>允许
							</div>
						</li>
						<li className="clearfix">
							<div className="name w75 fl pr-5">扣费日期</div>
							<div className="substance dw fl">
								<input className="w405" type="text" placeholder="请输入扣费日期:默认为1" value={this.state.bsDesc} onChange={this.bsDescChange}/>
							</div>
						</li>
						<li className="clearfix">
							<div className="name w75 fl pr-5">产品描述</div>
							<div className="substance dw fl">
								<input className="w405" type="text" placeholder="请输入产品描述" value={this.state.description} onChange={this.descriptionChange}/>
							</div>
						</li>
					</ul>
				</div>
				<div className='basicsuc h418 basicsucwrap'>
					<div className='widthwrap'>
						<p className=" navtit mb-20 mt-30">产品接口配置</p>
						<ul className="ulform clearfix">
							<li className="clearfix">
								<div className="name w75 fl pr-5">基本信息</div>
								<ul className="radiobtn">
									<li className={this.state.act ? "" : "active3"} itemID="0" onClick={this.chargeTypex}>包月套餐</li>
									<li className={this.state.act ? "active3" : ""} itemID="1" onClick={this.chargeTypeh}>包条套餐</li>
									<li className={this.state.act ? "active3" : ""} itemID="2" onClick={this.chargeTypeq}>按次计费</li>
								</ul>
							</li>
						</ul>
				<div className="dialog-bd wmt wshadow2">
					<ul className="ulform clearfix addline">
						<li className="clearfix line">
							<div className="substance fl awayleft">
								<span className="wwwtext">总限制次数</span>
								<input  type="text" placeholder="总限制次数" value={this.state.bsTimes} onChange={this.bsTimesChange}/>
							</div>
						</li>
					</ul>
				</div>
				<div className="dialog-bd wmt">
					<ul className="ulform clearfix addline">
						<li className="clearfix line">
							<select id="selectA" className="substance fl awayleft " onChange={this.changeApp}>
								{this.state.appList.map(function(item,index){
									return(
								  <option key={index} id="op1" itemID={item.get('id')}>{item.get('name')}</option>)
								}.bind(this))}	
							</select>
							<select id="selectB" className="substance fl awayleft " onChange={this.productId}>
								{this.state.interfaceApp.map(function(item,index){
									return(
								  <option key={index} id="op2" itemID={item.get('id')}>{item.get('name')}</option>)
								}.bind(this))}	
							</select>
							<div className="substance fl awayleft wshadow2">
								<span className="wwwtext">套餐外</span>
								<input  placeholder="请输入套餐外:默认为0"  id="selectC" type="text"  className="wminibar" value={this.state.price} onChange={this.priceChange}/><span className="pl5">元/次</span>
							</div>
							<div className="substance fl awayleft wshadow4">
								<span className="wwwtext">单价</span>
								<input  placeholder="请输入单价:默认为0"  id="selectC" type="text"  className="wminibar" value={this.state.price} onChange={this.priceChange}/><span className="pl5">元/次</span>
							</div>
							<div className="substance fl awayleft">
								<span className="wwwtext wshadow">接口限制次数</span>
								<input  placeholder="请输入接口限制次数" id="selectD"  className="wminibar wshadow" type="text" value={this.state.interfacetimes} onChange={this.interfacetimesChange}/>
							</div>
							<span className="wtext" onClick={this.addLine}>添加</span>
						</li>					
					</ul>
				</div>
					</div>
				</div>

					<div className="winlinebtnmid">
					<div className="ml-20 mt-20 mb-40 inlineblc">
						<span className="btn xxl" onClick={this.okHandler}><b className="f18">提交</b></span>
					</div>
					<div className="ml-20 mt-20 mb-40 inlineblc">
						<span className="btn xxl white wbluecolor" onClick={this.pathmain}><b className="f18">取消</b></span>
					</div>
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