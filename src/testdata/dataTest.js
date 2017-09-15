module.exports = function(obj) {
    //用戶列表
    obj["/user/userList.action"] = function(data, success, error) {
        success({
            errorcode:0,
            errormsg:'',
            data: {
                list:[
                    {id:'1',userName:'James',bCount:4},
                    {id:'2',userName:'kobe',bCount:5},
                    {id:'3',userName:'gordon',bCount:6},
                    {id:'4',userName:'ibaka',bCount:7},
                    {id:'5',userName:'biyombo',bCount:8},
                    {id:'6',userName:'kobe',bCount:1},
                    {id:'7',userName:'gordon',bCount:2},
                    {id:'8',userName:'biyombo',bCount:3}
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
    obj["/user/userInfoUpdate.action"] = function(data, success, error) {
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
    //用户对应的详情
    obj["/user/userInfo.action"] = function(data, success, error) {
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
                    userName:'admin',
                    userEmail:'xiaoya@asiainfo.com',
                    userPhone:'18963603579',
                    userDesc:'江苏华盛科技推广部经理，负责短信业务推广工作',
                    realName:'陈吉木',
                    comName:'亚信科技',
                    comPhone:'010-12345678',
                    comContacts:'陈吉木',
                    comEmail:'xiaoya@asiainfo.com',
                    comAddress:'江苏省南京市鼓楼区徐庄软件园B区',
                    comLegalPerson:'徐胜',
                    comLicense:''
                }
            }
        });
    };
    //业务列表
    obj["/business/businessAll.action"] = function(data, success, error) {
        success({
            errorcode:0,
            errormsg:'',
            data: {
                list:[
                    {id:'1',name:'获客专家',status:1,type:1,totalBuy:6855,totalAllUse:3855,totalMonthUse:3000},
                    {id:'2',name:'智慧征信',status:0,type:0,totalBuy:6855,totalAllUse:3855,totalMonthUse:3000}
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
    obj["/business/businessAdd.action"] = function(data, success, error) {
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