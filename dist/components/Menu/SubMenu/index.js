var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import React, { useContext, useState, Children, cloneElement } from 'react';
import classNames from 'classnames';
import { MenuContext } from '../';
import Icon from '../../Icon';
import Transition from '../../Transition';
var SubMenu = function (props) {
    var title = props.title, index = props.index, className = props.className, children = props.children;
    var context = useContext(MenuContext);
    var openedSubMenus = context.defaultOpenSubMenus;
    var isopened = (index && context.mode === 'vertical') ? openedSubMenus.includes(index) : false;
    var _a = useState(isopened), menuOpen = _a[0], setOpen = _a[1];
    var classes = classNames('submenu-item menu-item', className, {
        'is-active': context.index === index,
        'is-opened': menuOpen,
        'is-vertical': context.mode === 'vertical'
    });
    var handleClick = function (e) {
        e.preventDefault();
        setOpen(!menuOpen);
    };
    var timer;
    var handleMouse = function (e, toggle) {
        clearTimeout(timer);
        e.preventDefault();
        timer = setTimeout(function () {
            setOpen(toggle);
        }, 200);
    };
    var clickEvents = context.mode === 'vertical' ? {
        onClick: handleClick
    } : {};
    var hoverEvents = context.mode === 'vertical' ?
        {} : {
        onMouseEnter: function (e) { handleMouse(e, true); },
        onMouseLeave: function (e) { handleMouse(e, false); }
    };
    var renderChildren = function () {
        var classes = classNames('kgd-submenu', {
            'menu-opened': menuOpen
        });
        var ChildComponet = Children.map(children, function (child, i) {
            var childElement = child;
            if (childElement.type.displayName === 'MenuItem')
                return cloneElement(childElement, {
                    index: index + "-" + i
                });
            else
                console.error('Warning: Menu has a child which is not a MenuItem component');
        });
        return (React.createElement(Transition, { in: menuOpen, animation: 'zoom-in-top', timeout: 200 },
            React.createElement("ul", { className: classes }, ChildComponet)));
    };
    return (React.createElement("li", __assign({ className: classes, key: index }, hoverEvents),
        React.createElement("div", __assign({ className: 'submenu-title' }, clickEvents),
            title,
            React.createElement(Icon, { icon: "angle-down", className: "arrow-icon" })),
        renderChildren()));
};
SubMenu.displayName = 'SubMenu';
export default SubMenu;
