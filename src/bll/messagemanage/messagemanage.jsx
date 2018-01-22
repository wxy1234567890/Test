var React = require("react");
var TerseUI = require('terseui');
var DataGrid = TerseUI.Frame.DataGrid;
var Scroll = TerseUI.Scroll;
var modalHelp = TerseUI.Frame.modalHelp;
var Dialog = TerseUI.Frame.Dialog;
var token = require("./token");
var releaseDialog = require("./releasenewmsg.jsx");
var newsList = require('collection/newsList');
var newsDetail = require('collection/newsDetail');

var Item = React.createClass({
  showNewsDetail:function (newsId) {
    token.trigger("toNewsDetail", newsId);
  },
  render: function() {
    var news = this.props.option.item;
    var typeName= ["系统公告","管理通知"];
    var newsTypeStyle="";
    switch (Number(news.get("type"))){
      case 1:
        newsTypeStyle = "btn f12 green s mt-10";
        break;
      case 2:
        newsTypeStyle = "btn f12 s mt-10";
        break;
      case 3:
        newsTypeStyle = "btn f12 red s mt-10";
        break;
      default:
        newsTypeStyle = "";
    }
    return (
        <tr onClick={this.showNewsDetail.bind(this,news.get("id"))}>
          <td width="45%">
            <span className="ellipsis">{news.get("title")}</span>
          </td>
          <td width="35%">
            <span className="ellipsis">{news.get("time")}</span>
          </td>
          <td width="20%">
            <span className={newsTypeStyle}>{typeName[news.get("type")-1]}</span>
          </td>
        </tr>
    );
  }
});

var MessageManage = React.createClass({
  pageSize: 10,
  pageIndex: 1,
  orderType:0,//列表按发布时间排序（0-升序 1-降序）
  newsType:0,//列表筛选（0-全部 1-系统公告 2-升级公告 3-管理通知）
  getInitialState: function() {
    return {
      newsDetail:new newsDetail(),
      newsList: new newsList(),
      content:"",
      pageInfo: {
        total:0,
        pageSize:this.pageSize,
        pageIndex:this.pageIndex
      }
    };
  },
  componentDidMount() {
    //监听点击列表查看详情
    this.tokenEvents = {
      "toNewsDetail": this.queryNewsDetail
    };
    token.on(this.tokenEvents);

    this.state.newsDetail.on("getDetailDone", function() {
      this.setState({
        newsDetail: this.state.newsDetail
      });
    }.bind(this));

    this.state.newsList.on("getNewsListDone", function(total) {
      this.setState({
        newsList: this.state.newsList,
        pageInfo:{total:total, pageSize:this.pageSize, pageIndex:this.pageIndex}
      });
      if(this.state.newsList&&this.state.newsList.length!=0){
        this.queryNewsDetail(this.state.newsList.toArray()[0].get('id'));
      }
    }.bind(this));
    this.getNewsList();
  },
  getNewsList: function() {
    this.state.newsList.getNewsList({
      loadingFlag: true,
      param:{
        title:this.state.content
      }
    });
  },
  queryNewsDetail:function (newsId) {
    this.state.newsDetail.getDetailDoing({
      loadingFlag:true,
      param:{
        newsId:newsId
      }
    });
  },
  contentHandler:function(e) {
    this.setState({
      "content":e.target.value
    })
  },
  eventListener:function (type, param) {
    if (type == "page") {
      this.pageIndex = param;
      //分页
      this.getNewsList();
    }else if (type == "pxClick"){
      if(param.rule=='asc'){
        this.orderType=0;
      } else if(param.rule=='desc'){
        this.orderType=1;
      }
      //排序
      this.getNewsList();
    }else if (type == "selectClick"){
      if(param.value==''){
        this.newsType=0;
      } else {
        this.newsType=param.value;
      }
      //筛选
      this.getNewsList();
    }
  },
  releasenewmsg: function() {
    modalHelp.show({
      Dialog: releaseDialog,
      option: {
        ok:{
          callback:function(){
            this.getNewsList();
          }.bind(this)
        }
      }
    });
  },
  render:function(){
    var headOpt = [{
      key: 'title',
      name: '消息标题',
      width: '45%'
    },{
      key: 'time',
      name: '发布时间',
      width: '35%',
      px: {self:'time', rule:""+this.orderType==0?"asc":"desc"+"", name:"time"}
    },{
      key: 'type',
      name: '消息类型',
      width: '20%',
      type: "select",
      value: this.newsType,
      list: [
        {name:'系统公告',value:0},
        {name:'管理通知',value:1}
      ]
    }];
    return (
      <div>
      	<div className='search-msg-h'>
      		<span className='f16'>消息管理</span>
      		<div className="search-area clearfix fr">
  						<div className="search-box w160 pos-relative fl">
  							<input placeholder="请输入查询内容" className="s-text" type="text" value={this.state.content} onChange={this.contentHandler} />
  							<span className="s-btn" onClick={this.getNewsList}></span>
  							<em className="del cursor pos-absolute"></em>
  						</div>
  						<span className="btn green ml-5 fl" onClick={this.releasenewmsg}>发布新消息</span>
  					</div>
      	</div>
        <div className="msgmng">
          <div className="msgleft">
            <DataGrid
                headOpt={headOpt}
                list={this.state.newsList}
                itemCls={Item}
                eventListener={this.eventListener}
                pageInfo={this.state.pageInfo}
            />

          </div>
          <Scroll className="msgright">
            <h2>{this.state.newsDetail.get("title")}</h2>
            {this.state.newsDetail.get("content")}
          </Scroll>
        </div>
      </div>
      
    );
  }
});

module.exports = MessageManage;