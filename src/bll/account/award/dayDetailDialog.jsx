var React = require("react");
var TerseUI = require('terseui');
var modalHelp = TerseUI.Frame.modalHelp;
var Dialog = TerseUI.Frame.Dialog;
var Pagetool = TerseUI.Frame.PageTool;
// var DataGrid = TerseUI.Frame.DataGrid;
var token = require("./token");
var AgentDayDetail = require('collection/agentDayDetail');

var DayDetail = React.createClass({
	getInitialState: function() {
		return {
			agentDayDetail: new AgentDayDetail(),
			id:this.props.option.id,
			userId:this.props.option.userId,
			codeName:this.props.option.codeName,
			day:this.props.option.day,
			agentId:this.props.option.agentId,
			pagenow: 1,
            pagesize: 10,
            feeOrder:0,
            callLengthOrder:0,            
            filter: "",
            flag: false,
            topDown1:"px-text",
        	topDown2:"px-text",
            // agentList:[],
            // status:""
		};
	},
	componentDidMount: function () {
        // this.tokenEvents = {
        //     "page": this.queryAgentList,
        //     "selectClick": this.queryListSelect
        // };
        // token.on(this.tokenEvents);
        this.listEvents = {
            "fetchDone": this.afterQueryAgentList
        };
        this.state.agentDayDetail.on(this.listEvents);
        this.queryAgentList();
    },
    componentWillUnmount: function() {
        this.unmount = true;
        // token.off(this.tokenEvents);
        token.clear();
        this.state.agentDayDetail.off("fetchDone");        
    },
    queryAgentList:function(){
    	this.state.flag = false;
        this.state.agentDayDetail.fetch({
            loadingFlag: true,
            param: {
                id:this.state.id,
                userId:this.state.userId,
                agentId:this.state.agentId,
                day:this.state.day,
                pagesize:this.state.pagesize,
                pagenow:this.state.pagenow,
                feeOrder:this.state.feeOrder,
                callLengthOrder:this.state.callLengthOrder
                // status: this.state.status,
            }
        });
    },
    afterQueryAgentList:function(data){
    	// this.props.option.ok.callback();
        console.log(data,this.state.agentDayDetail);
		this.state.total=data;
		this.setState({
				agentDayDetail:this.state.agentDayDetail,
				total:this.state.total
			});        
    },
	closeHandler: function() {
		this.props.close();
	},

    refresh: function() {
		if (!this.unmount) {
			this.setState({
				a: 1
			});
		}
	},
	getUserList1:function(feeOrder,callLengthOrder){
		this.state.feeOrder=feeOrder;
		this.state.callLengthOrder=callLengthOrder;
		this.setState({
			feeOrder:this.state.feeOrder,
			callLengthOrder:this.state.callLengthOrder
		});
		this.queryAgentList();		
	},
	getUserList2:function(pagenow,pagesize){
		this.state.pagenow=pagenow;
		this.state.pagesize=pagesize;
		this.setState({
			pagesize:this.state.pagesize,
			pagenow:this.state.pagenow
		});
		this.queryAgentList();		
	},
	totalTime:function () {
		this.state.feeOrder=0; 
		this.state.topDown2="px-text";
		if(this.state.callLengthOrder==0){
			this.state.callLengthOrder=1;
		}else if(this.state.callLengthOrder==1){
          	this.state.callLengthOrder=2;
      	}else {
          	this.state.callLengthOrder=1;
      	}
      	if(this.state.callLengthOrder==2){
        	this.state.topDown1="px-text upt";
        }else if(this.state.callLengthOrder==1){
        	this.state.topDown1="px-text downt";
        }
      	this.getUserList1(this.state.feeOrder,this.state.callLengthOrder);
    },
    totalFee:function () {  
    	this.state.callLengthOrder=0;
    	this.state.topDown1="px-text";
    	if(this.state.feeOrder==0){
    		this.state.feeOrder=1;
    	}else if(this.state.feeOrder==1){
          	this.state.feeOrder=2;
      	}else {
          	this.state.feeOrder=1;
      	}
    	if(this.state.feeOrder==2){
            this.state.topDown2="px-text upt";
        }else if(this.state.feeOrder==1){
        	this.state.topDown2="px-text downt";
        }
      	this.getUserList1(this.state.feeOrder,this.state.callLengthOrder);
    },
    pageTo: function (page) {
        this.state.pagenow = page;
        this.getUserList2(this.state.pagenow,this.state.pagesize);
    },
	render: function() {
		// var topDown="px-text upt";          
        // var option = this.props.option;    
		// var productByDay = option.option1, total = option.option2, proid = option.option3, protype = option.option4, userId = option.option5, agentId = option.option6;
		var pageInfo = {
				pageIndex: this.state.pagenow,
				pageSize: this.state.pagesize,
				total: this.state.total
		};
		var downobj4 = {id:this.state.id,userId:this.state.userId,agentId:this.state.agentId,day:this.state.day};
		var downarr4 = encodeURIComponent(JSON.stringify(downobj4));
		var download4 = window.apiUrl+"/file/downloadCallProductHourStat.action?param="+downarr4;
		return(<div className="clearfix">
			<div className="dialog-confirm editdialog" style={{width: 488}}>
				<div className="dialog-hd clearfix">
					<h2 className="fl">{this.state.codeName}坐席详情（{this.state.day}）</h2>
					<p className="fr downloading" style={{"width":"22%"}}><a href={download4}><em></em>下载</a></p>
                    <span className="fr close" onClick={this.closeHandler}>×</span>
                </div>
				<div className="dialog-bd ">
                    <div className="pos-rel dialogdatagrid trdialog">
		       			<div className="tablearea">
								<table>
									<thead>
										<tr>
											<th width="33%">时间</th>
											<th width="33%" className={this.state.topDown1} onClick={this.totalTime}>呼叫时长（分钟）<em className="px"></em></th>
											<th width="34%" className={this.state.topDown2} onClick={this.totalFee}>坐席费用（元）<em className="px"></em></th>
										</tr>
									</thead>
									
									<tbody>
									{this.state.agentDayDetail&&this.state.agentDayDetail.length!=0?this.state.agentDayDetail.map(function(item,index){
										// console.log(item);
										return (
										<tr key={index}>
											<td width="33%">
												<span className="ellipsis wcursor wvisible">{item.get('useTime')}</span>
											</td>
											<td width="33%">
												<span className="ellipsis wvisible">{item.get('totalCallLength')}</span>
											</td>
											<td width="34%">
												<span className="ellipsis wvisible">{item.get('totalCallFee')}</span>
											</td>								
										</tr>
										)
									}.bind(this)):(<tr className="tac"><td>没有找到符合你查询条件的记录</td></tr>)}						
									</tbody>
								
								</table>
						</div>			
			            <div className="pagebar mt-20">
		                    <div className="pagetool">
		                        <Pagetool option={pageInfo} onPageTo={this.pageTo}/>
		                    </div>
		                </div>
                    </div>
                </div>
			</div>               
	    </div>
		)
	}
});

module.exports = DayDetail;