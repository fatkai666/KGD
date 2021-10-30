var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import React, { useContext, } from 'react';
import classNames from 'classnames';
import { SelectContext } from '../';
import Icon from '../../Icon';
var Option = function (props) {
    var value = props.value, index = props.index, label = props.label, disabled = props.disabled;
    var context = useContext(SelectContext);
    var handleClick = function () {
        var tagIndex = context.tagsArray.indexOf(value);
        !context.multiple &&
            context.setInputValue(value) &&
            context.onChange &&
            context.onChange(value, context.tagsArray);
        if (context.tagsArray.length > 0 && context.multiple) {
            tagIndex > -1 ? removeTag(tagIndex) :
                context.setTagsArray(__spreadArray(__spreadArray([], context.tagsArray, true), [value], false));
        }
        else {
            context.setTagsArray([value]);
        }
    };
    var removeTag = function (index) {
        context.tagsArray.splice(index, 1);
        context.setTagsArray(__spreadArray([], context.tagsArray, true));
    };
    var classes = classNames('kgd-select-item', {
        'is-disabled': disabled,
        'is-selected': context.tagsArray.includes(value)
    });
    return (React.createElement("li", { key: index, className: classes, onClick: handleClick },
        label ? label : value,
        context.tagsArray.includes(value) &&
            React.createElement(Icon, { className: 'primary', icon: 'check' })));
};
Option.displayName = 'Option';
export default Option;
