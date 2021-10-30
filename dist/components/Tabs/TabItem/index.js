import React, { useContext, useState, useLayoutEffect } from 'react';
import classNames from 'classnames';
import { TabsContext } from '../';
var TabItem = function (props) {
    var index = props.index, label = props.label, disabled = props.disabled, className = props.className, children = props.children, ChildrenContent = props.ChildrenContent;
    var context = useContext(TabsContext);
    var openedTabs = context.defaultOpenTabs;
    var isopened = openedTabs.includes(index);
    var _a = useState(isopened), tabsOpen = _a[0], setOpen = _a[1];
    useLayoutEffect(function () {
        index === context.index && setOpen(true);
        index === context.index && ChildrenContent && ChildrenContent(children, tabsOpen);
    }, [index, context.index, ChildrenContent, children, tabsOpen]);
    var classes = classNames('kgd-tabs-nav-item', className, {
        'disabled': disabled,
        'is-active': context.index === index
    });
    var handleClick = function () {
        if (context.onSelect && !disabled && (typeof index === 'number')) {
            context.onSelect(index);
            setOpen(!tabsOpen);
            ChildrenContent && ChildrenContent(children, tabsOpen);
        }
    };
    return (React.createElement("li", { className: classes, onClick: handleClick, key: index }, label));
};
TabItem.displayName = 'TabsItem';
TabItem.defaultProps = {
    index: 0,
};
export default TabItem;
