/**
 * Created by lenovo on 2017/9/19.
 */
var Backbone = require("backbone");
var AJAX_POST = require("util/ajax").AJAX_POST;
var model=Backbone.Model.extend({
    initialize:function () {

    },
    queryCallStatList:function (option) {
        option.loadingText="正在查询用户月使用列表！";
        option.url = "/callProduct/getUserCallStatList.action";
        option.data = option.param;
        option.success = function (data1) {
            var data={
                list:[
                    {
                        agentCount:1,
                        callTimeSum:12,
                        realName:"修改A",
                        subsDate:"2017-09-07 02:09:26",
                        totalFee:1.2,
                        userId:262
                    },{
                        agentCount:1,
                        callTimeSum:12,
                        realName:"修改A",
                        subsDate:"2017-09-07 02:09:26",
                        totalFee:1.2,
                        userId:262
                    },
                    {
                        agentCount:1,
                        callTimeSum:12,
                        realName:"修改A",
                        subsDate:"2017-09-07 02:09:26",
                        totalFee:1.2,
                        userId:262
                    },
                    {
                        agentCount:1,
                        callTimeSum:12,
                        realName:"修改A",
                        subsDate:"2017-09-07 02:09:26",
                        totalFee:1.2,
                        userId:262
                    },
                    {
                        agentCount:1,
                        callTimeSum:12,
                        realName:"修改A",
                        subsDate:"2017-09-07 02:09:26",
                        totalFee:1.2,
                        userId:262
                    },
                    {
                        agentCount:1,
                        callTimeSum:12,
                        realName:"修改A",
                        subsDate:"2017-09-07 02:09:26",
                        totalFee:1.2,
                        userId:262
                    },
                    {
                        agentCount:1,
                        callTimeSum:12,
                        realName:"修改A",
                        subsDate:"2017-09-07 02:09:26",
                        totalFee:1.2,
                        userId:262
                    },
                    {
                        agentCount:1,
                        callTimeSum:12,
                        realName:"修改A",
                        subsDate:"2017-09-07 02:09:26",
                        totalFee:1.2,
                        userId:262
                    },
                    {
                        agentCount:1,
                        callTimeSum:12,
                        realName:"修改A",
                        subsDate:"2017-09-07 02:09:26",
                        totalFee:1.2,
                        userId:262
                    },
                    {
                        agentCount:1,
                        callTimeSum:12,
                        realName:"修改A",
                        subsDate:"2017-09-07 02:09:26",
                        totalFee:1.2,
                        userId:262
                    }
                ],
                totalCount:19
            };
            this.set(data);
            this.trigger("queryCallStatList", data);
        }.bind(this);
        AJAX_POST(option);
    }
});
module.exports=model;