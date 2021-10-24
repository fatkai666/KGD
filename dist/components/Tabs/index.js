import React, { useState, createContext, Children, cloneElement } from 'react';
import classNames from 'classnames';
import TabItem from './TabItem';
export var TabsContext = createContext({
    index: 0,
});
/**
 *选项卡切换组件。 提供平级的区域将大块内容进行收纳和展现，保持界面整洁。
 * ### 引用方法
 *
 * ~~~js
 * import { Tabs } from 'kgd'
 * ~~~
 */
var Tabs = function (props) {
    var _a;
    var className = props.className, type = props.type, onSelect = props.onSelect, defaultIndex = props.defaultIndex, children = props.children, defaultOpenTabs = props.defaultOpenTabs;
    var classes = classNames('kgd-tabs-nav', className, (_a = {},
        _a["nav-" + type] = type,
        _a));
    var _b = useState(defaultIndex), currentActive = _b[0], setActive = _b[1];
    var _c = useState(), content = _c[0], setContent = _c[1];
    var _d = useState(false), tabsOpen = _d[0], setTabsopen = _d[1];
    var handleClick = function (index) {
        setActive(index);
        onSelect && onSelect(index);
    };
    var passedContext = {
        index: currentActive ? currentActive : 0,
        onSelect: handleClick,
        type: type,
        defaultOpenTabs: defaultOpenTabs,
    };
    var getContent = function (content, tabsOpen) {
        return tabsOpen ? (React.createElement("div", { className: 'kgd-tabs-content' },
            React.createElement("div", { className: 'kgd-tab-panel' }, content))) : null;
    };
    var ChildrenContent = function (content, tabsOpen) {
        setContent(content);
        setTabsopen(tabsOpen);
    };
    var renderChildren = function () {
        return Children.map(children, function (child, index) {
            var childElement = child;
            var displayName = childElement.type.displayName;
            if (displayName === 'TabsItem')
                return cloneElement(childElement, {
                    index: index,
                    ChildrenContent: ChildrenContent
                });
            else
                console.error('Warning: Tabs has a child which is not a TabsItem component');
        });
    };
    return (React.createElement(React.Fragment, null,
        React.createElement("ul", { className: classes },
            React.createElement(TabsContext.Provider, { value: passedContext }, renderChildren())),
        getContent(content, tabsOpen)));
};
Tabs.defaultProps = {
    defaultIndex: 0,
    defaultOpenTabs: []
};
var completeTabs = Tabs;
completeTabs.Item = TabItem;
export default completeTabs;
