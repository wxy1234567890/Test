var React = require("react");
var classNames = require("classnames/bind");
var subject = require("model/global/subject");


require("./leftmenu.less");

/*
 * @description 垂直菜单项
 * @props menu 菜单项要使用的数据,包括key和name两个属性
 * @props curSubMenuKey 当前子菜单项的key
 */
var MenuItem = React.createClass({
  clickHandler:function(){
    subject.trigger("navigate",{
      path:this.props.menu.key
    });
  },
  render:function(){
    var cls = classNames("vertical-menu-item","classb",{
      "vertical-menu-item-active":this.props.menu.key == this.props.curSubMenuKey
    });

    return (
      <li className={cls} onClick={this.clickHandler}><em></em>{this.props.menu.name}</li>
    );
  }
});

/*
 * @description 左侧垂直菜单
 * @props curMenuKey 当前菜单项的key
 * @props curSubMenuKey 当前子菜单项的key
 */
var LeftMenu = React.createClass({
  render:function(){
    var menus = window.JSON.parse(sessionStorage.getItem('bsMenus'));
    var subMenus;

    menus.forEach(function(menu){
      if(menu.key == this.props.curMenuKey){
        subMenus = menu.subMenus;
        return false;
      }
    }.bind(this));
    return (
      <ul className="vertical-menu">
        {
          subMenus.map(function(subMenu,index){
            return <MenuItem key={index} menu={subMenu} curSubMenuKey={this.props.curSubMenuKey} />
          }.bind(this))
        }
      </ul>
    );
  }
});

module.exports = LeftMenu