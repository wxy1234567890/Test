module.exports = function(obj) {
    //用戶列表
    obj["/user/getUserListWithProductStat.action"] = function(data, success, error) {
        success({
            errorcode:0,
            errormsg:'',
            data: {
                list:[
                    {id:'243',real_name:'33',login_name:"WW",subsProductCount:'0',company_id:'1'},
                    {id:'263',real_name:'测试A',login_name:"AA",subsProductCount:'1',company_id:'2'},
                    {id:'283',real_name:'测试B',login_name:"BB",subsProductCount:'0',company_id:'3'},
                ]
            }
        });
    };
    //冻结用户
    obj["/user/userFreeze.action"] = function(data, success, error) {
        success({
            errorcode:0,
            errormsg:'',
            data:""
        });
    };
    //删除用户
    obj["/user/userDelete.action"] = function(data, success, error) {
        success({
            errorcode:0,
            errormsg:'',
            data:""
        });
    };
    //用户密码修改
    obj["/user/userPwdEdit.action"] = function(data, success, error) {
        success({
            errorcode:0,
            errormsg:'',
            data:""
        });
    };
    //修改用户
    obj["/user/addNewUser.action"] = function(data, success, error) {
        success({
            errorcode:0,
            errormsg:'',
            data:""
        });
    };
    //新增用户
    obj["/user/userAdd.action"] = function(data, success, error) {
        success({
            errorcode:0,
            errormsg:'',
            data:""
        });
    };
    //用户业务新增
    obj["/user/userBusinessAdd.action"] = function(data, success, error) {
        success({
            errorcode:0,
            errormsg:'',
            data: ""
        });
    };
    //用户对应的业务
    obj["/user/userBusiness.action"] = function(data, success, error) {
        success({
            errorcode:0,
            errormsg:'',
            data: {
                list:[
                    {id:'1',name:'获客专家',type:1,totalBuy:6855,totalAllUse:3855,totalMonthUse:3000},
                    {id:'2',name:'智慧征信',type:0,totalBuy:6855,totalAllUse:3855,totalMonthUse:3000}
                ]
            }
        });
    };
    obj["/product/getUserProductStat.action"] = function(data, success, error) {
        success({
            errorcode:0,
            errormsg:'',
            data: {
                list:[
                    {id:'1',name:'按次计费产品A',productType:0,subsTotal:20,useCount:30,useTotal:34},
                    {id:'2',name:'智呼包月产品',productType:1,subsTotal:126,agentCount:52,totalFee:143,callTimeSum:30},
                    {id:'3',name:'智呼标准产品',productType:1,subsTotal:26,agentCount:60,totalFee:86,callTimeSum:30},
                    {id:'4',name:'智呼包时产品',productType:1,subsTotal:956,agentCount:6529,totalFee:863,callTimeSum:30}
                ]
            }
        });
    };
    obj["/callProduct/getAgentStatByProduct.action"] = function(data, success, error) {
        success({"data":{"callFeeSum":25.5,"callLengthSum":0,"list":[{"updateDate":"2017-09-06 05:09:15","code":"agentA","totalFee":24,"groupId":2,"callTimeSum":12},{"updateDate":"2017-09-13 10:09:28","code":"agentF","totalFee":0.9,"groupId":2,"callTimeSum":9},{"updateDate":"2017-09-13 10:09:57","code":"agentE","totalFee":0.6,"groupId":2,"callTimeSum":6}],"totalCount":3},"errorcode":0,"errormsg":"智呼产品的坐席统计列表查询成功"});
    };
    obj["/product/getInterfaceUseListByMonthByDay.action"] = function(data, success, error) {
        success({
            errorcode:0,
            errormsg:'',
            data: {
                list:[
                    {id:'1',create_time:'2017年7月9日',name:'按次计费产品A',seatingDecode:43,callTime:'2017年7月9日',logicalGroup:'组一',seatingCharge:4343,updateTime:'2017年7月9日',useInterfaceNum:33,useCount:34,phoneCount:1,smsCount:20},
                    {id:'2',create_time:'2017年8月9日',name:'智呼包月产品',seatingDecode:65,callTime:'2017年8月9日',logicalGroup:'组二',seatingCharge:3223,updateTime:'2017年8月9日',useInterfaceNum:78,useCount:143,phoneCount:2,smsCount:126},
                    {id:'3',create_time:'2017年6月9日',name:'智呼标准产品',seatingDecode:55,callTime:'2017年6月9日',logicalGroup:'组三',seatingCharge:322,updateTime:'2017年9月9日',useInterfaceNum:56,useCount:86,phoneCount:3,smsCount:26},
                    {id:'4',create_time:'2017年9月9日',name:'智呼包时产品',seatingDecode:765,callTime:'2017年9月9日',logicalGroup:'组四',seatingCharge:878,updateTime:'2017年6月9日',useInterfaceNum:45,useCount:457,phoneCount:4,smsCount:956}
                ]
            }
        });
    };
    obj["/product/getInterfaceUseListByMonth.action"] = function(data, success, error) {
        success({
            errorcode:0,
            errormsg:'',
            data: {
                list:[
                    {id:'1',date:'2017年7月9日',name:'按次计费产品A',seatingDecode:433,callTime:'2017年7月9日',logicalGroup:'组一',seatingCharge:343,updateTime:'2017年7月9日',useCount:34,phoneCount:1,smsCount:20},
                    {id:'2',date:'2017年8月9日',name:'智呼包月产品',seatingDecode:735,callTime:'2017年8月9日',logicalGroup:'组二',seatingCharge:7343,updateTime:'2017年8月9日',useCount:143,phoneCount:2,smsCount:126},
                    {id:'3',date:'2017年6月9日',name:'智呼标准产品',seatingDecode:435,callTime:'2017年9月9日',logicalGroup:'组三',seatingCharge:643,updateTime:'2017年9月9日',useCount:86,phoneCount:3,smsCount:26},
                    {id:'4',date:'2017年9月9日',name:'智呼包时产品',seatingDecode:895,callTime:'2017年6月9日',logicalGroup:'组四',seatingCharge:3343,updateTime:'2017年6月9日',useCount:457,phoneCount:4,smsCount:956}
                ]
            }
        });
    };
    //用户对应的详情
    obj["/user/userInfo.action"] = function(data, success, error) {
        if(data.userId==2){
            success({
                errorcode:0,
                errormsg:'',
                data: {
                    businessList:[
                        {id:'1',name:'获客专家',type:1},
                        {id:'2',name:'智慧征信',type:0}
                    ],
                    userInfo: {
                        id:'2',
                        login_name:'Kobe',
                        passWord:'******',
                        forzen:'0',
                        type:'开发者',
                        chargeType:"预付费",
                        userEmail:'kobe@asiainfo.com',
                        userPhone:'13951639911',
                        desc:'江苏华盛科技推广部书记,完全不做事的书记',
                        realName:'王羊',
                        comName:'亚信科技',
                        comPhone:'010-12345678',
                        comContacts:'王羊',
                        comEmail:'xiaoya@asiainfo.com',
                        comAddress:'江苏省南京市鼓楼区徐庄软件园B区',
                        comLegalPerson:'徐胜胜',
                        comLicense:'10281230',
                        charge_type:'1',
                        balance:'80',
                        create_time:'2017年6月9日',
                        subsProductCount:'30'
                    }
                }
            });
        }else{
             success({
            errorcode:0,
            errormsg:'',
            data: {
                businessList:[
                    {id:'1',name:'获客专家',type:1},
                    {id:'2',name:'智慧征信',type:0}
                ],
                userInfo: {
                    id:'2',
                    login_name:'James',
                    passWord:'******',
                    forzen:'0',
                    type:'用户',
                    chargeType:"后付费",
                    userEmail:'xiaoya@asiainfo.com',
                    userPhone:'18963603579',
                    desc:'江苏华盛科技推广部经理，负责短信业务推广工作',
                    realName:'陈吉木',
                    comName:'亚信科技',
                    comPhone:'010-12345678',
                    comContacts:'陈吉木',
                    comEmail:'xiaoya@asiainfo.com',
                    comAddress:'江苏省南京市鼓楼区徐庄软件园B区',
                    comLegalPerson:'徐胜',
                    comLicense:'12301028',
                    charge_type:'2',
                    balance:'8000',
                    create_time:'2017年12月30日',
                    subsProductCount:'31'
                }
            }
        });

        }
    };
    //充值信息
    obj["/trans/getTopUpHistoryList.action"] = function(data, success, error) {
        success({
            errorcode:0,
            errormsg:'',
            data: {
                list:[
                    {create_time:'2017年6月1日',creator:'PrwyPrwy1',desc:'有钱1',balance:'20001'},
                    {create_time:'2017年6月2日',creator:'PrwyPrwy2',desc:'有钱2',balance:'20002'},
                    {create_time:'2017年6月3日',creator:'PrwyPrwy3',desc:'有钱3',balance:'20003'},
                    {create_time:'2017年6月4日',creator:'PrwyPrwy4',desc:'有钱4',balance:'20004'},
                    {create_time:'2017年6月5日',creator:'PrwyPrwy5',desc:'有钱5',balance:'20005'},
                    {create_time:'2017年6月6日',creator:'PrwyPrwy6',desc:'有钱6',balance:'20006'}
                ]
            }
        });
    };
    //查询用户订购产品列表
    obj["/product/getSubsProductList.action"] = function(data, success, error) {
        success({
            errorcode:0,
            errormsg:'',
            data: {
                list:[
                    {name:'获客专家',create_time:'2017-5-16',charge_time:'2017-12-30',type:1},
                    {name:'智慧征信',create_time:'2017-5-16',charge_time:'2017-12-30',type:0},
                    {name:'江苏电信',create_time:'2017-5-16',charge_time:'2017-12-30',type:1}
                ]
            }
        });
    };
    //查询应用列表
    obj["/application/getAppList.action"] = function(data, success, error) {
        success({
            errorcode:0,
            errormsg:'',
            data: {
                list:[
                    {id:'1',name:'京东网站手机品类',create_time:'2017-5-16',charge_time:'2017-12-30',type:1},
                    {id:'2',name:'淘宝网站手机品类',create_time:'2017-5-16',charge_time:'2017-12-30',type:0},
                    {id:'3',name:'苏宁网站手机品类',create_time:'2017-5-16',charge_time:'2017-12-30',type:1}
                ]
            }
        });
    };
    //产品列表
    obj["/product/getProductList.action"] = function(data, success, error) {
        success({
            errorcode:0,
            errormsg:'',
            data: {
                list:[
                    {id:'1',name:'费用总计',status:0,type:0,totalBuy:6855,useCount:7855,subsCharge:3000},
                    {id:'2',name:'获客专家',status:1,type:1,totalBuy:6855,useCount:3855,subsCharge:3000},
                    {id:'3',name:'智慧征信',status:1,type:1,totalBuy:6855,useCount:3855,subsCharge:3000}
                ]
            }
        });
    };
    //接口类产品详情列表
    obj["/product/getProductUserDetailStat.action"] = function(data, success, error) {
        success({
            errorcode:0,
            errormsg:'',
            data: {
                list:[
                    {id:'1',name:'费用总计',status:0,type:0,real_name:'王宇',seatCount:334,callTime:'123',create_time:'2017-07-18',totalConsume:65,useCount:7855,subsCharge:3000},
                    {id:'2',name:'获客专家',status:1,type:1,real_name:'张伟',seatCount:34,callTime:'666',create_time:'2017-06-23',totalConsume:855,useCount:3855,subsCharge:3000},
                    {id:'3',name:'智慧征信',status:1,type:1,real_name:'赵云',seatCount:534,callTime:'87',create_time:'2017-08-14',totalConsume:6855,useCount:3855,subsCharge:3000}
                ]
            }
        });
    };
    //智呼类产品详情列表
    // obj["/callProduct/getAgentStatByProduct.action"] = function(data, success, error) {
    //     success({
    //         errorcode:0,
    //         errormsg:'',
    //         data: {
    //             list:[
    //                 {userId:'1',name:'费用总计',status:0,type:0,realName:'王宇',agentCount:334,callTimeSum:'123',subsDate:'2017-07-18',totalFee:65,totalConsume:65,useCount:7855,subsCharge:3000},
    //                 {userId:'2',name:'获客专家',status:1,type:1,realName:'张伟',agentCount:34,callTimeSum:'666',subsDate:'2017-06-23',totalFee:165,totalConsume:855,useCount:3855,subsCharge:3000},
    //                 {userId:'3',name:'智慧征信',status:1,type:1,realName:'赵云',agentCount:534,callTimeSum:'87',subsDate:'2017-08-14',totalFee:265,totalConsume:6855,useCount:3855,subsCharge:3000}
    //             ]
    //         }
    //     });
    // };
    //用户坐席信息列表
    obj["/agent/getUserAgentList.action"] = function(data, success, error) {
        success({
            errorcode:0,
            errormsg:'',
            data: {
                list:[
                    {id:'1',name:'费用总计',code:'ddd',group_id:1,status:0,type:0,realName:'王宇',agentCount:334,callTimeSum:'123',update_time:'2017-07-18',totalFee:65,totalConsume:65,useCount:7855,subsCharge:3000},
                    {id:'2',name:'获客专家',code:'ccc',group_id:2,status:1,type:1,realName:'张伟',agentCount:34,callTimeSum:'666',update_time:'2017-06-23',totalFee:165,totalConsume:855,useCount:3855,subsCharge:3000},
                    {id:'3',name:'智慧征信',code:'eee',group_id:3,status:1,type:1,realName:'赵云',agentCount:534,callTimeSum:'87',update_time:'2017-08-14',totalFee:265,totalConsume:6855,useCount:3855,subsCharge:3000}
                ]
            }
        });
    };
    //产品的使用用户列表
    obj["/product/getProductUserStat.action"] = function(data, success, error) {
        success({
            errorcode:0,
            errormsg:'',
            data: {
                list:[
                    {id:'1',name:'James',totalConsumer:1000,create_time:"2017年6月12日"},
                    {id:'2',name:'Kobe',totalConsumer:1000,create_time:"2017年6月12日"},
                    {id:'3',name:'JamKo',totalConsumer:1000,create_time:"2017年6月12日"},
                    {id:'4',name:'Jeans Chen',totalConsumer:1000,create_time:"2017年6月12日"}
                ]
            }
        });
    };
    //业务对应的详情
    obj["/business/businessInfo.action"] = function(data, success, error) {
        success({
            errorcode:0,
            errormsg:'',
            data: {
                id:'1',
                price:'0.1',
                time:'2016-10-10',
                desc:'基于问答模式，对客户基本信息进行校验和交差验证。包括姓名、联系方式、紧急联系人、住址、办公单位等',
                totalMonthUse:1,
                totalAllUse:10,
                userCount:2//用户人数
            }
        });
    };
    //删除业务
    obj["/business/businessDelete.action"] = function(data, success, error) {
        success({
            errorcode:0,
            errormsg:'',
            data:""
        });
    };
    //新增业务
    obj["/product/productSubscription.action"] = function(data, success, error) {
        success({
            errorcode:0,
            errormsg:'',
            data:""
        });
    };
    //下线业务
    obj["/business/businessOff.action"] = function(data, success, error) {
        success({
            errorcode:0,
            errormsg:'',
            data:""
        });
    };
    //业务月统计列表
    obj["/business/getDataList.action"] = function(data, success, error) {
        success({
            errorcode:0,
            errormsg:'',
            data: {
                totalCount:13,
                list:[
                    {id:'1',useCount:'21',interfaceCount:'9',interface_name:'A'},
                    {id:'2',useCount:'32',interfaceCount:'14',interface_name:'A'},
                    {id:'3',useCount:'22',interfaceCount:'12',interface_name:'A'},
                    {id:'4',useCount:'60',interfaceCount:'20',interface_name:'A'},
                    {id:'5',useCount:'31',interfaceCount:'11',interface_name:'A'},
                    {id:'6',useCount:'66',interfaceCount:'6',interface_name:'A'},
                    {id:'7',useCount:'60',interfaceCount:'20',interface_name:'A'},
                    {id:'8',useCount:'31',interfaceCount:'11',interface_name:'A'},
                    {id:'9',useCount:'66',interfaceCount:'6',interface_name:'A'}
                ]
            }
        });
    };
    //消息列表
    obj["/news/newsList.action"] = function(data, success, error) {
        success({
            errorcode:0,
            errormsg:'',
            data: {
                totalCount:3,
                list:[
                    {id:'1',title:'网络传真升级公告',type:1,time:"2013-12-12 11:12"},
                    {id:'2',title:'网络传真升级公告',type:2,time:"2013-12-12 11:12"},
                    {id:'3',title:'网络传真升级公告',type:3,time:"2013-12-12 11:12"}
                ]
            }
        });
    };
    //新增消息
    obj["/news/newsAdd.action"] = function(data, success, error) {
        success({
            errorcode:0,
            errormsg:'',
            data:""
        });
    };
    //消息详情
    obj["/news/newsDetail.action"] = function(data, success, error) {
        success({
            errorcode:0,
            errormsg:'',
            data: {
                id:'1',
                time:'2016-12-12 12:12',
                title:'江苏电信：做“互联网+”使能者，激发各行业创新活力',
                content:'<p>文字仅填充内容，今年全国“两会”上，李克强总理所作的政府工作报告提出要“培育壮大新动能，加快发展新经济”，并提出要着力实施创新驱动发展战略，发挥“大众创业、万众创新”和“互联网+”集众智汇众力的乘数效应。</p><p>作为基础电信运营商，如何通过发展“互联网+”，为各行各业提供服务能力，助力其重塑创新体系、激发创新活力、培育新兴业态和创新公共服务模式，从而推动经济发展获得新动能？在这方面，江苏电信有着自己的思考，并进行了积极探索与实践。</p><p>近年来，浙江移动积极践行江苏电信“智能管道、开放平台、特色业务、友好界面”的移动互联网战略，提出了“互联网+”能力开放战略，致力于打造“互联网+”能力开放平台，为合作伙伴和政企用户实施“互联网+”提供全方位的能力支持和资源共享，促进互联网和全产业链的融合。</p>'
            }
        });
    };
    //日志列表
    obj["/log/logList.action"] = function(data, success, error) {
        success({
            errorcode:0,
            errormsg:'',
            data: {
                totalCount:3,
                list:[
                    {id:'1',userName:'admin',ip:'132.132.123.123',content:'admin：成功更新鼠标(news)，操作ID为：62',time:"2013-12-12 11:12"},
                    {id:'2',userName:'admin',ip:'132.132.123.123',content:'admin：成功更新鼠标(news)，操作ID为：62',time:"2013-12-12 11:12"},
                    {id:'3',userName:'admin',ip:'132.132.123.123',content:'admin：成功更新鼠标(news)，操作ID为：62',time:"2013-12-12 11:12"}
                ]
            }
        });
    };
    //删除日志
    obj["/log/logDelete.action"] = function(data, success, error) {
        success({
            errorcode:0,
            errormsg:'',
            data:""
        });
    };
    //=====================================
    //获客专家使用概况
    obj["/huokeAction/getAwardDetail.action"] = function(data, success, error) {
        success({
            errorcode:0,
            errormsg:'',
            data: {allCount:10000,allUseCount:9000,monthUseCount:1000,buyDate:'2016-01-01',status:0}
        });
    };
    //获客专家数据列表
    obj["/huokeAction/getDataListByMonth.action"] = function(data, success, error) {
        success({
            errorcode:0,
            errormsg:'',
            data: {
                monthList:[
                    {id:'1',userId:'10010',date:'2016-10-01',phoneCount:'128',smsCount:'256'},
                    {id:'2',userId:'10010',date:'2016-10-02',phoneCount:'198',smsCount:'199'},
                    {id:'3',userId:'10010',date:'2016-10-03',phoneCount:'89',smsCount:'89'},
                    {id:'4',userId:'10010',date:'2016-10-04',phoneCount:'111',smsCount:'188'},
                    {id:'5',userId:'10010',date:'2016-10-05',phoneCount:'43',smsCount:'86'},
                    {id:'6',userId:'10010',date:'2016-10-06',phoneCount:'89',smsCount:'89'}
                ]
            }
        });
    };
    //根据日期和用户id，获取该日期短信使用详情
    obj["/huokeAction/getDataListByDay.action"] = function(data, success, error) {
        success({
            errorcode:0,
            errormsg:'',
            data: {
                totalCount:13,
                list:[
                    {id:'1',phone:'189****1234',count:'10'},
                    {id:'2',phone:'133****1212',count:'21'},
                    {id:'3',phone:'153****3212',count:'31'}
                ]
            }
        });
    };
};



 for (var i=1; i<=9; i++) {
    function timer(){
       k = i;
     }
 }