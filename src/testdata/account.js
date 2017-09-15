module.exports = function(obj) {
  obj["/auth/authLogin.action"] = function(data, success, error) {
    success({
      errorcode: 0,
      data: {
        sessionId:"12345678901234567890123456789012"
      }
    });
  };
  obj["/auth/getUserInfo.action"] = function(data, success, error) {
    var result;
    result = {
      userName:data.userName,
      role:1,
      menus:[{
        key:'usermanage',
        name:'用户计费',
        subMenus:[{
          key:'usermanage',
          name:'用户管理'
        },{
          key:'usercharge',
          name:'用户计费详情'
        },{
          key:'productcharge',
          name:'产品计费详情'
        }]
      },
      {
        key:'bsmanage',
        name:'产品配置'
      },
      {
        key:'interfacemanage',
        name:'开发配置',
        subMenus:[{
          key:'interfacemanage',
          name:'应用接口配置'
        },
        {
          key:'colmanage',
          name:'目录配置'
        }]
      },
      {
        key:'messagemanage',
        name:'消息管理'
      },
      {
        key:'logmanage',
        name:'日志管理'
      }]
    };
    success({
      errorcode: 0,
      data: result
    });
  };

};