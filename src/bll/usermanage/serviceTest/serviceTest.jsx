var React = require('react');
var ReactDom = require('react-dom');
var menuList = require('collection/getMenuList');
var productList = require('collection/getProductList');
var userBusiness = require('collection/userBusiness');
var subject = require("model/global/subject");
var TerseUI = require('terseui');
var Select = TerseUI.Select;
var modalHelp = TerseUI.Frame.modalHelp;
var Dialog = TerseUI.Frame.Dialog;
var Scroll = TerseUI.Scroll;
var Laydate = require("laydate");
var CallInterfaceList = require('model/callInterfaceList');
var CallResult = require('model/callResult');

var UserCharge = React.createClass({
	getInitialState:function(){
		return{
			status:0,
			startTime:'',
			endTime:'',
			callInterfaceList: new CallInterfaceList(),
			callResult: new CallResult(),
			interfaceSelect:[],
			args:[],
			agentCode:'',
			param:[],
			obj:{},
			requestParam:'',
			returnResult:'',
			remark:'',
			interfaceCode:'',
		};
	},
	componentDidMount: function() {
        document.oncontextmenu = function(e){
               e.preventDefault();
           };
        this.state.callInterfaceList.on("fetchDone",function(data){
        	this.state.interfaceSelect=data;
        	this.state.interfaceCode=data[0].interfaceCode;
        	this.state.args=data[0].args;
        	this.state.remark=data[0].remark;
			this.setState({
				interfaceSelect:this.state.interfaceSelect,
				interfaceCode:this.state.interfaceCode,
				args:this.state.args,
				remark:this.state.remark,
			},console.log(this.state.interfaceSelect,this.state.interfaceCode,this.state.args,this.state.remark));
		}.bind(this));
		
		this.state.callResult.on("fetchDone",function(data){
        	this.state.requestParam=data.requestParam;
        	this.state.returnResult=data.returnResult;
			this.setState({
				requestParam:this.state.requestParam,
				returnResult:this.state.returnResult,
			},console.log(this.state.requestParam,this.state.returnResult));
		}.bind(this));
		// this.state.menuList.on("fetchDone",function(total){
		// 	this.setState({
		// 		menuList:this.state.menuList
		// 	});
		// }.bind(this));
		// this.state.productList.on("fetchDone",function(){
		// 	this.setState({
		// 		productList:this.state.productList,
		// 		productCode:"0"
		// 	});
		// }.bind(this));
		// this.getMenuList();
		this.getCallList();
	},
	getCallList:function(){
		this.state.callInterfaceList.fetch({
			loadingFlag:true,
			param:{
				type:this.state.status,
			}
		});
	},
	getCallServiceResult:function(){
		document.getElementById("test").click();
		// console.log(this.refs);
		var requireRef=[];
		// for(var i=0;i<this.refs.length;i++){
		// 	if (this.refs[i].indexOf("require")>-1){
		// 		requireRef.push(this.refs[i]);
		// 	}
		// }
		// this.refs.map(function(item){
		// 	if (item[i].indexOf("require")>-1){
		// 		requireRef.push(item[i]);
		// 	}
		// })
		// console.log(requireRef);
		if(this.state.param&&this.state.param.length!=0){
			this.state.callResult.fetch({
				loadingFlag:true,
				param:{
					serviceType:this.state.status,
					interfaceCode:this.state.interfaceCode,
					args:this.state.param
				}
			});
		}
	},
	contextnone:function () {
		var context = $("#oncontext");
	    context.css("display","none");
	},
	interfaceService:function(){
		this.state.status=0;
		this.setState({
			status:this.state.status
		});
		this.state.requestParam="";
    	this.state.returnResult="";
		$('.input').val("");
		this.getCallList();
	},
	callService:function(){
		this.state.status=1;
		this.setState({
			status:this.state.status
		});
		this.state.requestParam="";
    	this.state.returnResult="";
		$('.input').val("");
		this.getCallList();
	},
	startTime: function(element,code,index) {
        var self=this;
        var start = {
            elem: element,
            format: 'YYYY-MM-DD',
            // min: laydate.now(), //è®¾ه®ڑوœ€ه°ڈو—¥وœںن¸؛ه½“ه‰چو—¥وœں
            min: '1900-01-01',
            max: '2099-12-31', //وœ€ه¤§و—¥وœں
            istime: false,
            choose: function(datas) {
                self.laydateChangeValue(datas,code,index);
            }
        };
        Laydate(start);
    },
    laydateChangeValue:function(event,code,index){
    	this.state.obj[index]={
    			code:this.state.args[index].code,
    			value:event
    		};
    	this.state.param[index]=this.state.obj[index];
    },
	endTime: function(element,code,index) {
        var self=this;
        var obj = {
            elem: element,
            format: 'YYYY-MM-DD hh:mm:ss',
            // min: laydate.now(), //è®¾ه®ڑوœ€ه°ڈو—¥وœںن¸؛ه½“ه‰چو—¥وœں
            min: '1900-01-01',
            max: '2099-12-31', //وœ€ه¤§و—¥وœں
            istime: true,
			istoday: false,
            choose: function(datas) {
                self.laydateChangeValue1(datas,code,index);
            }
        };
        Laydate(obj);
    },
    laydateChangeValue1:function(event,code,index){
    	this.state.obj[index]={
    			code:this.state.args[index].code,
    			value:event
    		};
    	this.state.param[index]=this.state.obj[index];
    },
    interfaceChange:function(event){
    	this.state.interfaceCode=event.target.value;
    	for(var i=0;i<this.state.interfaceSelect.length;i++){
    		if(event.target.value==this.state.interfaceSelect[i].interfaceCode){
    			this.state.args=this.state.interfaceSelect[i].args;
    			this.state.remark=this.state.interfaceSelect[i].remark;
    			// console.log(this.state.args,this.state.remark)
    		}
    	}
    	this.state.requestParam="";
    	this.state.returnResult="";
    	this.setState({
    		interfaceCode:this.state.interfaceCode,
    		args:this.state.args,
    		remark:this.state.remark
    	},console.log(this.state.interfaceCode));
    	this.refresh;
    	$('.input').val("");
    },
    agentCodeChange:function(code,index,event){
    	this.state.obj[index]={
    			code:this.state.args[index].code,
    			value:event.target.value
    		};
    	this.state.param[index]=this.state.obj[index];
    },
    remarkChange:function(code,index,event){
    	this.state.obj[index]={
    			code:this.state.args[index].code,
    			value:event.target.value
    		};
    	this.state.param[index]=this.state.obj[index];
    },
    refresh: function() {
		if (!this.unmount) {
			this.setState({
				a: 1
			});
		}
	},
	render:function(){
    	return (
			<div onClick={this.contextnone}>
				<div className='servicetitle'>
					<span className='color-block'></span>
					<span>经营管理平台服务测试</span>
				</div>
				<div className='clearfix' style={{'padding': '10px 0 0 166px'}}>
					<ul className='servicebtn fl'>
						<li className={this.state.status==0?'active':''} onClick={this.interfaceService}>接口类服务</li>
						<li className={this.state.status==1?'active':''} onClick={this.callService}>智呼类服务</li>
					</ul>
				</div>
				<div className='clearfix'>
					<div className='dw60f'>
						<div className='dcpw pt20' style={{"paddingTop":"30px"}}>
							<span className='dflmr'>接口选择：</span>
							<Select className='fl' value={this.state.interfaceCode} defaultValue={this.state.interfaceCode} onChange={this.interfaceChange} labelWidth="100px" textWidth="250px">
								{
									this.state.interfaceSelect?this.state.interfaceSelect.map(function (item,index){                    
                                    	return (<option key={index} value={item.interfaceCode}>{item.interfaceName}</option>)                     
                                	}.bind(this)):<option key="0" value="0" defaultValue="0">暂无数据</option>
                                }
							</Select>
							<em className={this.state.remark==''?'hide':''}></em><span className='dflm'>{this.state.remark}</span>
						</div>						
						<div className='dcpw pt20'>
							<span className='dwhbv'></span>
							<span className='dwtv'>参数配置</span>
							<span className='dwhbv'></span>
						</div>
						<form>
						{this.state.args&&this.state.args.length!=0?this.state.args.map(function (item,index){                   
                            return (
                            	<div key={index}>
                            		<div className={item.type==3?'dcpw pt20':'hide'}>
										<span className='dflmr'>{item.name+'：'}</span>
										<Select className='fl' id={item.type==3&&item.notNull==1?"select"+index:""} onChange={this.agentCodeChange.bind(this,item.code,index)} defaultValue='00' labelWidth="100px" textWidth="250px">
											<option key="00" value="00" defaultValue="00">--请选择--</option>
											{
												item.options&&item.options.length!=0?item.options.map(function (item1, index1) {
                                                    return (<option key={index1} value={item1.value}>{item1.key}</option>)
                                                }.bind(this)):<option key="0" value="0" defaultValue="0">暂无数据</option>
                                            }
										</Select>
										<span className={item.type==3&&item.notNull==1?'redtip':'hide'}>*必填</span>
										<em className={item.remark==''?'hide':''}></em><span className='dflm'>{item.remark}</span>
									</div>
									<div className={item.type==2?'dcpw pt20':'hide'}>
										<span className='dflmr'>{item.name+'：'}</span>
										<input type="text" maxLength="10" className="input s-text laydate-icon fl" ref={item.type==2&&item.notNull==1?"require"+index:""} id={index+"startDate"} required={item.type==2&&item.notNull==1?"required":""} placeholder={'请选择'+item.name} onChange={this.laydateChangeValue} onClick={this.startTime.bind(this,"#"+index+"startDate",item.code,index)}/>							
										<span className={item.type==2&&item.notNull==1?'redtip':'hide'}>*必填</span>
										<em className={item.remark==''?'hide':''}></em><span className='dflm'>{item.remark}</span>
									</div>
									<div className={item.type==1?'dcpw pt20':'hide'}>
										<span className='dflmr'>{item.name+'：'}</span>
										<input type="text" maxLength="10" className="input s-text laydate-icon fl" ref={item.type==1&&item.notNull==1?"require"+index:""} id={index+"endDate"} required={item.type==1&&item.notNull==1?"required":""} placeholder={'请选择'+item.name} onChange={this.laydateChangeValue1} onClick={this.endTime.bind(this,"#"+index+"endDate",item.code,index)}/>							
										<span className={item.type==1&&item.notNull==1?'redtip':'hide'}>*必填</span>
										<em className={item.remark==''?'hide':''}></em><span className='dflm'>{item.remark}</span>
									</div>
									<div className={item.type==0?'dcpw pt20':'hide'}>
										<span className='dflmr'>{item.name+'：'}</span>
										<input type="text" className="input s-text fl" style={{'width':'250px'}} ref={item.type==0&&item.notNull==1?"require"+index:""} placeholder={'请输入'+item.name} onChange={this.remarkChange.bind(this,item.code,index)} required={item.type==0&&item.notNull==1?"required":""}/>
										<span className={item.type==0&&item.notNull==1?'redtip':'hide'}>*必填</span>
										<em className={item.remark==''?'hide':''}></em><span className='dflm'>{item.remark}</span>
									</div>
                            	</div>
                            	)                     
                        }.bind(this)):<div></div>}
						<input type="submit" id="test" className="hide"/>
						</form>
						<div className='dcpw pt20'>
							<span className='btnwhite' onClick={this.getCallServiceResult}>调用服务</span>
						</div>
					</div>
					<div className='dw40f'>
					<div>请求参数：<div className='dwhb'>{this.state.requestParam}</div></div>
					<div>返回结果：<div className='dwhb'>{this.state.returnResult}</div></div>
					</div>
				</div>
      		</div>
    	)
  	}
});

module.exports = UserCharge;