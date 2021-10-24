import React, { useContext } from 'react';
import classNames from 'classnames';
import { MenuContext } from '../';
var MenuItem = function (props) {
    var className = props.className, style = props.style, children = props.children, index = props.index, disabled = props.disabled;
    var context = useContext(MenuContext);
    var classes = classNames('menu-item', className, {
        'is-disabled': disabled,
        'is-active': context.index === index
    });
    var handleClick = function () {
        if (context.onSelect && !disabled && (typeof index === 'string')) {
            context.onSelect(index);
        }
    };
    return (React.createElement("li", { style: style, className: classes, onClick: handleClick }, children));
};
MenuItem.displayName = 'MenuItem';
MenuItem.defaultProps = {
    index: '0',
};
export default MenuItem;
