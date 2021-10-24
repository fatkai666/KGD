import React, { createContext, useState, Children, cloneElement } from 'react';
import classNames from 'classnames';
import MenuItem from './MenuItem';
import SubMenu from './SubMenu';
export var MenuContext = createContext({ index: '0' });
/**
 *为网站提供导航功能的菜单。支持横向纵向两种模式，支持下拉菜单。
 * ### 引用方法
 *
 * ~~~js
 * import { Menu } from 'kgd'
 * ~~~
 */
var Menu = function (props) {
    var _a;
    var className = props.className, style = props.style, defaultIndex = props.defaultIndex, mode = props.mode, children = props.children, onSelect = props.onSelect, defaultOpenSubMenus = props.defaultOpenSubMenus;
    var classes = classNames('kgd-menu', className, (_a = {},
        _a["menu-" + mode] = mode,
        _a));
    var _b = useState(defaultIndex), currentActive = _b[0], setActive = _b[1];
    var handleClick = function (index) {
        setActive(index);
        onSelect && onSelect(index);
    };
    var passedContext = {
        index: currentActive ? currentActive : '0',
        onSelect: handleClick,
        mode: mode,
        defaultOpenSubMenus: defaultOpenSubMenus,
    };
    var renderChildren = function () {
        return Children.map(children, function (child, index) {
            var childElement = child;
            var displayName = childElement.type.displayName;
            if (displayName === 'MenuItem' || displayName === 'SubMenu')
                return cloneElement(childElement, {
                    index: index.toString()
                });
            else
                console.error('Warning: Menu has a child which is not a MenuItem component');
        });
    };
    return (React.createElement("ul", { className: classes, style: style },
        React.createElement(MenuContext.Provider, { value: passedContext }, renderChildren())));
};
Menu.defaultProps = {
    defaultIndex: '0',
    mode: 'horizontal',
    defaultOpenSubMenus: [],
};
var completeMenu = Menu;
completeMenu.Item = MenuItem;
completeMenu.SubMenu = SubMenu;
export default completeMenu;
