var React = require("react");
var TerseUI = require('terseui');
var DataGrid = TerseUI.Frame.DataGrid;
var logList = require('collection/logList');
var logDelete = require('collection/logDelete');
var getY_M = require("util/validcheck").getY_M;

var Item = React.createClass({
  getInitialState: function() {
    return {
      logDelete: new logDelete()
    };
  },
  deleteLog:function (logId) {
    this.logDelete(logId);
  },
  componentDidMount:function() {
    this.state.logDelete.on("logDeleteDone", function() {
      //删除成功后...
    }.bind(this));
  },
  logDelete:function (logId) {
    this.state.logDelete.logDeleteDoing({
      loadingFlag: true,
      param:{
        logId:logId
      }
    });
  },
  render: function() {
    var logs = this.props.option.item;
    return (
        <tr>
          <td width="20%">
            <span className="ellipsis">{logs.get("realName")}</span>
          </td>
          <td width="20%">
            <span className="ellipsis">{logs.get("after_balance")}</span>
          </td>
          <td width="34%">
            <span className="ellipsis">{logs.get("description")}</span>
          </td>
          <td width="22%">
            <span className="ellipsis">{logs.get("create_time")}</span>
          </td>
          <td width="4%">
            <span className="bluetxt f12 cursor" onClick={this.deleteLog.bind(this,logs.get("id"))}>删除</span>
          </td>
        </tr>
    );
  }
});

var LogManage = React.createClass({
  pageSize: 10,
  pageIndex: 1,
  orderBy:0,//列表排序（0-升序 1-降序）
  getInitialState: function() {
    return {
      logList: new logList(),
      showMenu:false,
      monthStr:"充值",
      content:"",
      type:0,
      pageInfo: {
        total:0,
        pageSize:this.pageSize,
        pageIndex:this.pageIndex
      }
    };
  },
  componentDidMount:function() {
    this.state.logList.on("getLogListDone", function(total) {
      this.setState({
        logList: this.state.logList,
        pageInfo:{total:total, pageSize:this.pageSize, pageIndex:this.pageIndex}
      });
    }.bind(this));
    this.getLogList();
  },
  getLogList: function() {
    this.state.logList.getLogList({
      loadingFlag: true,
      param:{
        loginUserId:'',
        month:this.state.monthStr,
        type:this.state.type,
        content:this.state.content,
        pageSize:this.pageSize,
        pageIndex:this.pageIndex,
        orderBy:this.orderBy
      }
    });
  },
  eventListener:function (type, param) {
    if (type == "page") {
      this.pageIndex = param;
      //分页
      this.getLogList();
    }else if (type == "pxClick"){
      if(param.rule=='asc'){
        this.orderBy=0;
      } else if(param.rule=='desc'){
        this.orderBy=1;
      }
      //排序
      this.getLogList();
    }
  },
  //显示或隐藏下拉多选框
  showClickHandler: function() {
    this.setState({
      showMenu: !this.state.showMenu
    });
  },
  newsTypeChange:function (monthStr,type) {
    this.setState({
      "monthStr":monthStr,
      "type":type,
      showMenu: !this.state.showMenu
    })
  },
  contentHandler:function(e) {
    this.setState({
      "content":e.target.value
    })
  },
  render:function(){
    var headOpt = [{
      key: 'userName',
      name: '用户名',
      width: '20%'
    },{
      key: 'ip',
      name: '余额',
      width: '20%'
    },{
      key: 'content',
      name: '描述',
      width: '34%'
    },{
      key: 'time',
      name: '操作时间',
      width: '22%',
      px: {self:'time', rule:""+this.orderBy==0?"asc":"desc"+"", name:"time"}
    },{
      key: 'operate',
      name: '操作',
      width: '4%'
    }];
    //获取当前月份及前五个月份的集合
    var dateArray = [getY_M(0),getY_M(-1),getY_M(-2),getY_M(-3),getY_M(-4)];
    return (
    <div className='logmng'>
    	<div className='search-msg-h'>
    		<span className='f16'>日志管理</span>
    		<div className="search-area clearfix fr">
    					<div className={this.state.showMenu ? "selectbox dw pos-rel fl mr-10 ml-20 open wdatacc" : "wdatacc selectbox dw pos-rel fl mr-10 ml-20"}>
									<div className="selected pos-rel cursor">
										<input className="input-h cursor wdatacc" value={this.state.monthStr} readOnly="readOnly" type="text" onClick={this.showClickHandler}/>
										<em className="pos-abs"></em>
									</div>
									<ul className="selectlist">
                        <li onClick={this.newsTypeChange.bind(this,"充值",0)} >充值</li>
                        <li onClick={this.newsTypeChange.bind(this,"订购套餐费",1)} >订购套餐费 </li>
                        <li onClick={this.newsTypeChange.bind(this,"订购冻结",2)} >订购冻结 </li>
                        <li onClick={this.newsTypeChange.bind(this,"接口服务余额扣费",3)} >接口服务余额扣费</li>
                        <li onClick={this.newsTypeChange.bind(this,"接口服务冻结扣费",4)} >接口服务冻结扣费</li>
                        <li onClick={this.newsTypeChange.bind(this,"接口服务结算扣费",5)} >接口服务结算扣费</li>
                        <li onClick={this.newsTypeChange.bind(this,"解冻",6)} >解冻</li>
									</ul>
								</div>
						<div className="search-box w218 pos-relative fl">
							<input placeholder="请输入查询内容" className="s-text" type="text" value={this.state.content} onChange={this.contentHandler}/>
							<span className="s-btn" onClick={this.getLogList}></span>
							<em className="del cursor pos-absolute"></em>
						</div>
						
					</div>
    	</div>
        <div className="msgmng">
          <div className="msgleft">
            <DataGrid
                headOpt={headOpt}
                list={this.state.logList}
                itemCls={Item}
                eventListener={this.eventListener}
                pageInfo={this.state.pageInfo}
            />
          </div>
        </div>
    </div>
    );
  }
});

module.exports = LogManage;