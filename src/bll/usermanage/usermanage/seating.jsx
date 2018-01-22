
var React = require("react");
var TerseUI = require('terseui');
var modalHelp = TerseUI.Frame.modalHelp;
var Dialog = TerseUI.Frame.Dialog;
var DataGrid = TerseUI.Frame.DataGrid;
var token = require("./token");
// var Constance = require("root/constance");
var SeatingModel = require('collection/seatingModel');

var Item = React.createClass({
    getInitialState: function () {
        return {
            status: 0,
        }
    },
    render: function () {
        var model = this.props.option.item;
        if(model.status==0){status='冻结'}else if(model.status==1){status='生效'}
        return (
            <tr>
                <td width="25%">
		        	<span className="ellipsis" title={model.code}>
			        	<em className=''></em>
			        	<b className="f14 deepgray">
				         	{model.code}
				        </b>
			        </span>
                </td>
                <td width="25%">
		        	<span className="ellipsis" title={model.group_id}>
			         	{model.group_id}
			        </span>
                </td>
                <td width="20%">
                    <div className="select-div ellipsis" title={status}>
						<span>
							{status}
						</span>
                    </div>
                </td>
                <td width="30%">
		        	<span className="ellipsis" title={model.update_time}>
			         	{model.update_time}
			        </span>
                </td>
            </tr>
        );
    }
});
var Seating = React.createClass({
	getInitialState: function() {
		return {
			seatingModel: new SeatingModel(),
			userid:this.props.option.userId,
			// userid:this.props.option.userId,
			// username:this.props.option.username,
			pagenow: 1,
            pagesize: 10,
            // total:4,
            filter: "",
            flag: false,
            agentList:[],
            status:""
		};
	},
	componentDidMount: function () {
        this.tokenEvents = {
            "page": this.queryAgentList,
            "selectClick": this.queryListSelect
        };
        token.on(this.tokenEvents);
        this.listEvents = {
            "fetchDone": this.afterQueryAgentList
        };
        this.state.seatingModel.on(this.listEvents);
        this.queryAgentList();
    },
    componentWillUnmount: function() {
        this.unmount = true;
        token.off(this.tokenEvents);
        token.clear();
        this.state.seatingModel.off("fetchDone");        
    },
    queryAgentList:function(page){
    	this.state.flag = false;
        this.state.seatingModel.fetch({
            loadingFlag: true,
            param: {
                id:this.state.userid||10,
                // id:10,
                pagesize:this.state.pagesize,
                pagenow:this.state.pagenow,
                status: this.state.status,
            }
        });
    },
    afterQueryAgentList:function(data){
    	// this.props.option.ok.callback();
        console.log(data);
    	this.state.agentList = data.list;
        this.state.total = data.totalCount;
    	this.setState({
    		agentList:this.state.agentList,
            total:this.state.total
    	});
    	console.log(this.state.agentList);
    },
	closeHandler: function() {
		this.props.close();
	},
	eventListener: function (type, param) {
        console.log(param,123);
        if (type == "page") {
            this.state.pagenow = param;
            this.setState({
                pagenow: this.state.pagenow
            });
            token.trigger('page',param);
        }
        if (type == "selectClick") {
			token.trigger('selectClick', param);
		}
    },
    queryListSelect:function(param){
        console.log(param);
    	    if (!param.key) {
				this.state.status ="";
			}
			if (param.key == "used") {
				this.state.status = param.value+"";
			}
			if (param.key == "stopped") {
				this.state.status = param.value+"";
			}
            // if(!param.value){this.state.status ="";}
            // if(param.value == 1){this.state.status = param.value+"";}
            // if(param.value == 0){this.state.status = param.value+"";}
			this.setState({
				status: this.state.status,
			},function(){
                console.log(this.state.status);
            });
			this.queryAgentList();
			this.refresh();
    },
    refresh: function() {
		if (!this.unmount) {
			this.setState({
				a: 1
			});
		}
	},
	render: function() {
		var headOpt = [{
            key: 'seatingDecode',
            name: '坐席编码',
            width: '25%'
        }, {
            key: 'streetName',
            name: '所属逻辑分组',
            width: '25%'
        }, {
            key: 'status',
            name: '状态',
            width: '20%',
            type: 'select',
            list: [{
                key: "used",
                name: "生效",
                value: 1
            },{
                key: "stopped",
                name: "冻结",
                value: 0
            }],
            value: 1
        }, {
            key: 'updateTime',
            name: '更新时间',
            width: '30%'
        },];
        var pageInfo = {
            pageIndex: this.state.pagenow,
            pageSize: this.state.pagesize,
            total: this.state.total
        };
		return (
			<div className="dialog-confirm editdialog" style={{width: 488}}>
				<div className="dialog-hd clearfix">
                    <h2>坐席信息</h2>
                    <span className="close" onClick={this.closeHandler}>×</span>
                </div>
				<div className="dialog-bd ">
                    <div className="pos-rel dialogdatagrid trdialog">
                        <DataGrid
                            headOpt={headOpt}
                            list={this.state.agentList}
                            itemCls={Item}
                            pageInfo={pageInfo}
                            eventListener={this.eventListener}/>
                    </div>
                </div>
			</div>
		);
	}
});

module.exports = Seating;