var React = require("react");
var TerseUI = require('terseui');
var DataGrid = TerseUI.Frame.DataGrid;
var Select = TerseUI.Select;
var Pagetool = TerseUI.Frame.PageTool;
var Scroll = TerseUI.Scroll;
var subject = require("model/global/subject");
var modalHelp = TerseUI.Frame.modalHelp;
var Dialog = TerseUI.Frame.Dialog;
var dtlDialog = require("./details.jsx");
var allBusiness = require('collection/businessAll');
var businessInfo = require('collection/businessInfo');
var businessDelete = require('collection/businessDelete');
var businessOff = require('collection/businessOff');
var checkInSubscription = require('collection/checkInSubscription');
var checkInSubscription2 = require('collection/checkInSubscription2');
var editBusinessDialog = require("./editBusiness.jsx");
var businessMonth = require('collection/businessMonth');
var productUseStat = require('collection/productUseStat');
var configList = require('collection/configList');
var getY_M = require("util/validcheck").getY_M;
var classNames = require("classnames/index");
var model=require("model/callbsmanage");
var BusinessList = React.createClass({
    toShowBusinessInfo: function (item) {
        //调用父类中方法
        this.props.getBusinessInfo(item);
    },
    render: function () {
        var allBusiness = this.props.option;
        var statusName = ["冻结中", "运行中"];
        return (
            <ul className="ullist">
                {allBusiness.map(function (item, index) {
                    return (
                        <li key={index} className="clearfix cursor" onClick={this.toShowBusinessInfo.bind(this, item)}>
                            <div className="userimfor clearfix">
                                <img className="fl"
                                     src={item.get("type") == 0 ? require("../../images/pic1.png") : require("../../images/call1.png")}
                                     width="79" height="56"/>
                                <div className="imfordtl fl">
                                    <span className="name ellipsis">{item.get("name")}</span>
                                    <span>{statusName[item.get("status")]}</span>
                                </div>
                            </div>
                        </li>
                    )
                }.bind(this))}
            </ul>
        )
    }
})
var BusinessDetail = React.createClass({
    render: function () {
        var businessInfo = this.props.option;
        var typeName = ["预付费", "后付费"];
        var typeCharge = ["包月套餐", "包条数套餐", "按次计费",];
        return (
            <ul className="basicinfo winfor">
                <li className="clearfix wbor-h">
                    <span className='name-h f12 fl'>产品编码</span>
                    <span className='info-h f10 fr'>{businessInfo.get("code")}</span>
                </li>
                <li className="clearfix wbor-h">
                    <span className='name-h f12 fl'>产品类型</span>
                    <span className='info-h f10 fr'>接口产品</span>
                </li>
                <li className="clearfix wbor-h">
                    <span className='name-h f12 fl'>计费类型</span>
                    <span className='info-h f10 fr'>{typeCharge[businessInfo.get("charge_type")]}</span>
                </li>
                <li className="wbor-h clearfix">
                    <span className='name-h f12 fl'>订购价格</span>
                    <span className='info-h f10 fr'>{businessInfo.get("bundle_price")}元</span>
                </li>
                <li className="clearfix wbor-h">
                    <span className='name-h f12 fl'>月使用量</span>
                    <span
                        className='info-h f10 fr'>{businessInfo.get("use_limit") == -1 ? "无限制" : businessInfo.get("use_limit")}</span>
                </li>
                <li className="clearfix wbor-h">
                    <span className='name-h f12 fl'>用户限制</span>
                    <span className='info-h f10 fr'>{typeName[businessInfo.get('type')]}</span>
                </li>
                <li className="clearfix wbor-h">
                    <span className='name-h f12 fl'>产品描述</span>
                    <span className='info-h f10 fr'>{businessInfo.get("description")}</span>
                </li>
                <li className="clearfix wbor-h">
                    <span className='name-h f12 fl'>套餐外使用</span>
                    <span className='info-h f10 fr'>{businessInfo.get("out_bundle_use") == 0 ? "不支持" : "支持"}</span>
                </li>
                <li className="clearfix wbor-h">
                    <span className='name-h f12 fl'>产品创建时间</span>
                    <span className='info-h f10 fr'>{businessInfo.get("create_time")}</span>
                </li>
            </ul>
        )
    }
})
var BusinessStatistics = React.createClass({
    toShowComAll: function (e) {
        if (e.target.parentNode.getAttribute('class') == "tableol") {
            console.log("i");
            var activenodelist = document.getElementsByClassName("active tableol");
            console.log(activenodelist);
            activenodelist[0].setAttribute('class', 'tableol');
            e.target.parentNode.setAttribute('class', 'active tableol');
        }
    },
    render: function () {
        var productUseStat = this.props.option;
        console.log(productUseStat);
        return (
            <div className='tableo-h'>
                <p className='tableol active' onClick={this.toShowComAll}>
                    <span className='cap-h'>当月消费(条)</span>
                    <span className='num-hys'>{productUseStat.get("monthConsume")}</span>
                </p>
                <p className='tableol' onClick={this.toShowComAll}>
                    <span className='cap-h'>消费总计(条)</span>
                    <span className='num-hys'>{productUseStat.get("totalConsume")}</span>
                </p>
                <p className='tableol' onClick={this.toShowComAll}>
                    <span className='cap-h'>用户数(人)</span>
                    <span className='num-hys'>{productUseStat.get("userCount")}</span>
                </p>
                <p className='tableol' onClick={this.toShowComAll}>
                    <span className='cap-h'>购买总计(次)</span>
                    <span className='num-hys'>{productUseStat.get("subsCount")}</span>
                </p>
            </div>
        )
    }
})
var BSManage = React.createClass({
    pageSize: 10,
    pageIndex: 1,
    getInitialState: function () {
        return {
            showMenu: false,
            clickcur: 1,
            feeOrder:"1",
            monthStr: getY_M(0),
            rightHide: true,
            searchKey: "",
            orderType: "asc",
            orderBy: "countOrder",
            businessOff: new businessOff(),
            businessDelete: new businessDelete(),
            checkInSubscription: new checkInSubscription(),
            checkInSubscription2: new checkInSubscription2(),
            allBusiness: new allBusiness(),
            businessInfo: new businessInfo(),
            businessMonth: new businessMonth(),
            productUseStat: new productUseStat(),
            configList: new configList(),
            Model:new model(),
            callData:[],
            BusinessType:"",
            tablename: {
                table1: "用户名",
                table2: "使用接口数",
                table3: "使用接口次数",
                table4: "操作"
            },
            pageInfo: {
                total: 0,
                pageSize: this.pageSize,
                pageIndex: this.pageIndex
            }
        };
    },
    componentDidMount: function () {
        this.state.allBusiness.on("fetchDone", function () {
            this.state.rightHide = this.state.allBusiness.at(0).get("type") == 0 ? true : false;
            this.setState({
                allBusiness: this.state.allBusiness,
                rightHide: this.state.rightHide
            });

            this.getBusinessInfo(this.state.allBusiness.at(0));
            this.getProductUseStat(this.state.allBusiness.at(0));
            this.getConfigList(this.state.allBusiness.at(0));
        }.bind(this));

        this.state.businessInfo.on("getDetailDone", function () {
            this.setState({
                businessInfo: this.state.businessInfo
            });
            window.businessInfo = this.state.businessInfo.attributes;
            if(this.state.BusinessType=="0"){
                this.getBusinessMonth();
            }

        }.bind(this));

        this.state.configList.on("fetchDone", function () {
            this.setState({
                configList: this.state.configList
            });
            window.configList = this.state.configList;
        }.bind(this));

        this.state.productUseStat.on("getProductUseStat", function () {
            this.setState({
                ProductUseStat: this.state.ProductUseStat
            });
        }.bind(this));

        this.state.businessDelete.on("businessDeleteDone", function () {
            //删除指定业务后，重新加载列表
            this.getAllBusiness();
        }.bind(this));

        this.state.checkInSubscription.on("checkDone", function () {
            this.state.businessOff.businessOffDoing({
                loadingFlag: true,
                param: {
                    businessId: this.state.businessInfo.get("id")
                }
            })
        }.bind(this));

        this.state.checkInSubscription.on("showError", function () {
            this.showError();
        }.bind(this));

        this.state.checkInSubscription2.on("checkDone2", function () {
            subject.trigger("navigate", {
                path: "createbs2"
            });
        }.bind(this));

        this.state.checkInSubscription2.on("showError2", function () {
            this.showError();
        }.bind(this));

        this.state.businessOff.on("businessOffDone", function () {
            //下线指定业务后调用
        }.bind(this));

        this.state.businessMonth.on("fetchDone", function (total) {
            this.setState({
                businessMonth: this.state.businessMonth,
                pageInfo: {total: total, pageSize: this.pageSize, pageIndex: this.pageIndex}
            });
        }.bind(this));

        this.modelevent={
            "queryCallStatList":this.queryCallStatListInfo
        };
        this.state.Model.on(this.modelevent);
        this.getAllBusiness();
    },
    pageTo: function (page) {
        this.pageIndex = page;
        this.getBusinessMonth();
    },
    pageTo2: function (page) {
        this.pageIndex = page;
        this.queryCalllist();
    },
    getBusinessMonth: function (wmonth) {
        this.state.businessMonth.fetch({
            loadingFlag: true,
            param: {
                businessId: this.state.businessInfo.get('id'),
                month: wmonth,
                userName: this.state.searchKey,
                pageSize: this.pageSize,
                pageIndex: this.pageIndex,
                orderType: this.state.orderType,
                orderBy: this.state.orderBy
            }
        });
    },

    // 智呼用户使用列表
    queryCalllist:function (cid) {
        this.state.Model.queryCallStatList({
            loadingFlag:true,
            param:{
                id:cid || this.state.businessInfo.get('id'),
                month: this.state.monthStr,
                pagesize: this.pageSize,
                pagenow: this.pageIndex,
                feeOrder:this.state.feeOrder
            }
        })
    },
    queryCallStatListInfo:function (data) {
        this.state.callData=data.list;
        this.state.pageInfo={
            total: data.totalCount,
            pageSize: this.pageSize,
            pageIndex: this.pageIndex
        };
        this.setState({
            callData:this.state.callData,
            pageInfo:this.state.pageInfo
        })
    },
    //指定业务详情
    getProductUseStat: function (item) {
        var type = item.get("type");
        var ID = item.get("id");
        if (type == 0 || type == "0") {
            this.state.productUseStat.getDetail({
                loadingFlag: true,
                param: {
                    businessId: ID
                }
            });
        }

    },
    getBusinessInfo: function (item) {
        var type = item.get("type");
        var ID = item.get("id");
        this.state.BusinessType=type;
        this.pageIndex=1;
        this.state.businessInfo.getDetail({
            loadingFlag: true,
            param: {
                businessId: ID
            }
        });
        if (type == 0 || type == "0") {
            this.state.rightHide = true;
            this.setState({
                rightHide: this.state.rightHide
            });
            this.state.productUseStat.getDetail({
                loadingFlag: true,
                param: {
                    businessId: ID
                }
            });
            this.state.configList.fetch({
                loadingFlag: true,
                param: {
                    businessId: ID
                }
            });
        } else {
            this.state.rightHide = false;
            this.setState({
                rightHide: this.state.rightHide
            });

            this.queryCalllist(ID);
        }
    },
    getConfigList: function (item) {
        var type = item.get("type");
        var ID = item.get("id");
        if (type == 0 || type == "0") {
            this.state.configList.fetch({
                loadingFlag: true,
                param: {
                    businessId: ID
                }
            });
        }
    },
    getAllBusiness: function () {
        this.state.allBusiness.fetch({
            loadingFlag: true,
            param: {
                loginUserId: ""
            }
        });
    },
    orderClickHandler: function (orderName) {
        if (this.state.orderBy == orderName) {
            if (this.state.orderType == "desc") {
                this.state.orderType = "asc";
            } else {
                this.state.orderType = "desc";
            }
        } else {
            this.state.orderBy = orderName;
            this.state.orderType = "asc";
        }
        this.getBusinessMonth();
    },
    dtlDetails: function () {
        modalHelp.show({
            Dialog: dtlDialog,
            option: {
                ok: {}
            }
        });
    },
    updateBusiness: function (businessId) {
        this.state.checkInSubscription2.fetch({
            loadingFlag: true,
            param: {
                businessId: businessId
            }
        })
    },
    createbs: function () {
        subject.trigger("navigate", {
            path: "createbs"
        });
    },
    offBusiness: function (businessId) {
        modalHelp.show({
            Dialog: Dialog,
            option: {
                type: "question",
                title: "确认",
                content: "确定要下线该产品?",
                ok: {
                    callback: function () {
                        this.state.checkInSubscription.fetch({
                            loadingFlag: true,
                            param: {
                                businessId: businessId
                            }
                        });
                    }.bind(this)
                },
                cancel: {
                    text: "取消"
                }
            }
        });
    },
    showError: function (businessId) {
        modalHelp.show({
            Dialog: Dialog,
            option: {
                type: "question",
                title: "错误",
                content: "产品被订购情况下无法进行该操作!",
                cancel: {
                    text: "取消"
                }
            }
        });
    },
    updateBusiness2: function (businessId) {
        subject.trigger("navigate", {
            path: "createbs2"
        });
    },
    deleteBusiness: function (businessId) {
        modalHelp.show({
            Dialog: Dialog,
            option: {
                type: "question",
                title: "确认",
                content: "确定要删除该产品?",
                ok: {
                    callback: function () {
                        this.state.businessDelete.businessDeleteDoing({
                            loadingFlag: true,
                            param: {
                                businessId: businessId
                            }
                        });
                    }.bind(this)
                },
                cancel: {
                    text: "取消"
                }
            }
        });
    },
    //显示或隐藏下拉多选框
    showClickHandler: function () {
        this.setState({
            showMenu: !this.state.showMenu
        });
    },
    monthChange: function (monthStr) {
        this.setState({
            monthStr: monthStr,
            showMenu: !this.state.showMenu
        });
    },
    search: function (e) {
        this.monthValue = e.target.value;
        this.getBusinessMonth(this.monthValue);
    },
    valueChange: function (e) {
        this.setState({
            searchKey: e.target.value
        })
    },
    toShowComAll: function (e) {
        if (e.target.parentNode.getAttribute('class') == "tableol") {
            console.log("i");
            var activenodelist = document.getElementsByClassName("active tableol");
            console.log(activenodelist);
            activenodelist[0].setAttribute('class', 'tableol');
            e.target.parentNode.setAttribute('class', 'active tableol');
            this.setState({
                tablename: {
                    table1: "用户名",
                    table2: "计费(元)",
                    table3: "计费时间",
                    table4: "操作"
                }
            })
        }
    },
    deleBusiness: function () {

    },
    postTotal: function (cur) {
        this.state.clickcur = cur;
        this.setState({
            clickcur: this.state.clickcur
        })
    },
    callSearch:function (e) {
        this.state.monthStr=e.target.value;
        this.queryCalllist();
    },
    toatlAplay:function () {
      if(this.state.feeOrder=="1"){
          this.state.feeOrder="2";

      }else {
          this.state.feeOrder="1";

      }
        this.queryCalllist();
    },
    refresh:function () {
      this.setState({
          a:1
      })
    },
    render: function () {
        var orderType = this.state.orderType;
        var orderBy = this.state.orderBy;
        var countOrderCss;
        var allCountOrderCss;
        if (orderBy == "countOrder") {
            allCountOrderCss = "px-text";
            if (orderType == "desc") {
                countOrderCss = "px-text downt";
            } else if (orderType == "asc") {
                countOrderCss = "px-text upt";
            }
        } else if (orderBy == "allCountOrder") {
            countOrderCss = "px-text";
            if (orderType == "desc") {
                allCountOrderCss = "px-text downt";
            } else if (orderType == "asc") {
                allCountOrderCss = "px-text upt";
            }
        }
        //获取当前月份及前五个月份的集合
        var dateArray = [getY_M(0), getY_M(-1), getY_M(-2), getY_M(-3), getY_M(-4)];

        var rightcon1 = classNames("rightcon", {
            rhide: !this.state.rightHide
        });
        var rightcon2 = classNames("rightcon", {
            rhide: this.state.rightHide
        });
        var topDown="px-text upt";
        if(this.state.feeOrder=="2"){
            topDown="px-text downt"
        };
        console.log(this.state.pageInfo);
        return (
            <div className="widthmodule">
                <Scroll className="leftcon">
                    <span className="btn green block" onClick={this.createbs}>发布新产品</span>
                    <BusinessList option={this.state.allBusiness} getBusinessInfo={this.getBusinessInfo}/>
                </Scroll>
                <div className={rightcon1}>
                    <div className="basicinfo wtopw">
                        <div className="title ellipsis">{this.state.businessInfo.get("name")}</div>
                        <div className="btnarea mb-40">
                            <span className="btn white mr-10"
                                  onClick={this.offBusiness.bind(this, this.state.businessInfo.get("id"))}>下线</span>
                            <span className="btn white mr-10">预览产品</span>
                            <span className="btn white mr-10"
                                  onClick={this.updateBusiness.bind(this, this.state.businessInfo.get("id"))}>编辑产品</span>
                        </div>
                    </div>
                    <BusinessDetail option={this.state.businessInfo}/>
                    <div className='table-h mt-40'>
                        <div className='tableo-h'>
                            <p className='tableol active'>
                                <span className='cap-h'>当月消费(条)</span>
                                <span className='num-hys'>{this.state.productUseStat.get("monthConsume")}</span>
                            </p>
                            <p className='tableol'>
                                <span className='cap-h'>消费总计(条)</span>
                                <span className='num-hys'>{this.state.productUseStat.get("totalConsume")}</span>
                            </p>
                            <p className='tableol'>
                                <span className='cap-h'>用户数(人)</span>
                                <span className='num-hys'>{this.state.productUseStat.get("userCount")}</span>
                            </p>
                            <p className='tableol'>
                                <span className='cap-h'>购买总计(次)</span>
                                <span className='num-hys'>{this.state.productUseStat.get("subsCount")}</span>
                            </p>
                        </div>
                        <div className='tableu-h'>
                            <div className="tablearea">
                                <div className="tit fl wtitmonth">
                                    <div>
                                        <Select ref="monthRef" labelWidth="100px" onChange={this.search}>
                                            {
                                                dateArray.map(function (item, index) {
                                                    return <option key={index} value={item}>{item}</option>
                                                }.bind(this))
                                            }
                                        </Select>
                                    </div>
                                </div>
                                <table>
                                    <thead>
                                    <tr>
                                        <th width="30%">{this.state.tablename.table1}</th>
                                        <th className={countOrderCss} width="30%"
                                            onClick={this.orderClickHandler.bind(this, "countOrder")}>{this.state.tablename.table2}<em
                                            className="px"></em></th>
                                        <th className={allCountOrderCss} width="30%"
                                            onClick={this.orderClickHandler.bind(this, "allCountOrder")}>{this.state.tablename.table3}<em
                                            className="px"></em></th>
                                        <th width="10%">{this.state.tablename.table4}</th>
                                    </tr>
                                    </thead>
                                </table>
                            </div>
                            <div className="tablearea">
                                <table>
                                    <tbody>
                                    {this.state.businessMonth.map(function (item, index) {
                                        return (
                                            <tr key={index}>
                                                <td width="30%">
                                                    <span className="ellipsis">{item.get("real_name")}</span>
                                                </td>
                                                <td width="30%">
                                                    <span className="ellipsis">{item.get("useCount")}</span>
                                                </td>
                                                <td width="30%">
                                                    <span className="ellipsis">{item.get("interfaceCount")}</span>
                                                </td>
                                                <td width="10%">
													<span className="ellipsis" onClick={this.dtlDetails}>
														<em className="bluetxt cursor">查看详单</em>
													</span>
                                                </td>
                                            </tr>
                                        )
                                    }.bind(this))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="pagebar">
                                <div className="pagetool">
                                    <Pagetool option={this.state.pageInfo} onPageTo={this.pageTo}/>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className='tableu-h wbottomtable'>
                        <div className="tablearea">
                            <table>
                                <tbody>
                                <tr>
                                    <td width="100%">
                                        <span className="ellipsis wprotitle">产品接口配置</span>
                                    </td>
                                </tr>
                                <tr>
                                    <th width="10%">序号</th>
                                    <th width="30%">接口名称</th>
                                    <th width="30%">接口价格</th>
                                    <th width="30%">调用限制</th>
                                </tr>
                                {this.state.configList.map(function (item, index) {
                                    return (
                                        <tr key={index}>
                                            <td width="10%">
													<span className="ellipsis">
														{index + 1}
													</span>
                                            </td>
                                            <td width="30%">
                                                <span className="ellipsis">{item.get("name")}</span>
                                            </td>
                                            <td width="30%">
                                                <span className="ellipsis">{item.get("price")}</span>
                                            </td>
                                            <td width="30%">
                                                <span
                                                    className="ellipsis">数量:{item.get("useLimit") < 0 ? "无限制" : item.get("useLimit") + "次"}</span>
                                            </td>
                                        </tr>
                                    )
                                }.bind(this))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/*智呼产品详情*/}
                <div className={rightcon2}>
                    <div className="basicinfo wtopw">
                        <div className="title ellipsis">{this.state.businessInfo.get("name")}</div>
                        <div className="btnarea mb-40">
                            <span className="btn white mr-10"
                                  onClick={this.offBusiness.bind(this, this.state.businessInfo.get("id"))}>下线</span>
                            <span className="btn white mr-10"
                                  onClick={this.deleBusiness.bind(this, this.state.businessInfo.get("id"))}>删除业务</span>
                        </div>
                    </div>
                    <BusinessDetail option={this.state.businessInfo}/>
                    <div className="mt-25">
                        <h4 className="ellipsis wprotitle">账单统计</h4>
                        <ul className="tabselect mt-15 pos-rel">
                            <li className={this.state.clickcur == 1 ? "selected cur" : "selected"}
                                onClick={this.postTotal.bind(this, 1)}>总账单统计
                            </li>
                            <li className={this.state.clickcur == 2 ? "selected cur" : "selected"}
                                onClick={this.postTotal.bind(this, 2)}>用户账单统计
                            </li>
                        </ul>
                        <div className={this.state.clickcur == 1 ? "" : "disnone"}>
                            <div className="tablearea">
                                <div className="tit fl wtitmonth">

                                    <div>
                                        <Select ref="monthRef" textWidth="300px" onChange={this.callSearch}>
                                            {
                                                dateArray.map(function (item, index) {
                                                    return <option key={index} value={item}>{item}</option>
                                                }.bind(this))
                                            }
                                        </Select>
                                    </div>
                                </div>
                                <table>
                                    <thead>
                                    <tr>
                                        <th width="11%">用户ID</th>
                                        <th width="20%">用户名</th>
                                        <th width="13%">计费坐席数</th>
                                        <th width="13%">呼叫总时长</th>
                                        <th width="13%" className={topDown} onClick={this.toatlAplay}>总费用(元)<em className="px"></em></th>
                                        <th width="30%">开通时间</th>
                                    </tr>
                                    </thead>
                                </table>
                            </div>
                            <div className="tablearea">
                                <table>
                                    <tbody>
                                    {this.state.callData?this.state.callData.map(function (item, index) {
                                        return (
                                            <tr key={index}>
                                                <td width="11%">
                                                    <span className="ellipsis">{item.userId}</span>
                                                </td>
                                                <td width="20%">
                                                    <span className="ellipsis">{item.realName}</span>
                                                </td>
                                                <td width="13%">
                                                    <span className="ellipsis">{item.agentCount}</span>
                                                </td>
                                                <td width="13%">
                                                    <span className="ellipsis">{item.callTimeSum}</span>
                                                </td>
                                                <td width="13%">
                                                    <span className="ellipsis">{item.totalFee}</span>
                                                </td>
                                                <td width="30%">
                                                    <span className="ellipsis">{item.subsDate}</span>
                                                </td>
                                            </tr>
                                        )
                                    }.bind(this)):(<tr><td className="tac">暂无数据</td></tr>)}
                                    </tbody>
                                </table>
                            </div>
                            <div className="pagebar mt-15">
                                <div className="pagetool">
                                    <Pagetool option={this.state.pageInfo} onPageTo={this.pageTo2}/>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        );
    }
});
module.exports = BSManage;