import React, { useState, createContext, useEffect, Children, cloneElement, useRef, useCallback } from 'react';
import classNames from 'classnames';
import Input from '../Input';
import Icon from '../Icon';
import Transition from '../Transition';
import Option from "./Option";
import useClickOutside from '../../hooks/useClickOutside';
export var SelectContext = createContext({
    setInputValue: function () { },
    setTagsArray: function () { },
    tagsArray: [],
    multiple: false,
    onChange: function () { }
});
/**
 * 下拉选择器。 弹出一个下拉菜单给用户选择操作，用于代替原生的选择器，或者需要一个更优雅的多选器时。
 * ### 引用方法
 *
 * ~~~js
 * import { Select } from 'kgd'
 * ~~~
 */
var Select = function (props) {
    var defaultValue = props.defaultValue, placeholder = props.placeholder, disabled = props.disabled, multiple = props.multiple, name = props.name, children = props.children, onChange = props.onChange, onVisibleChange = props.onVisibleChange;
    var _a = useState(false), clickControl = _a[0], setClickControl = _a[1];
    var _b = useState(defaultValue), inputValue = _b[0], setInputValue = _b[1];
    var _c = useState([]), tagsArray = _c[0], setTagsArray = _c[1];
    var divRef = useRef(null);
    useClickOutside(divRef, function () {
        setClickControl(false);
        onVisibleChange && onVisibleChange(clickControl);
    });
    var removeTag = useCallback(function (index) {
        return function () {
            var newArray = tagsArray.slice();
            newArray.splice(index, 1);
            setTagsArray(newArray);
        };
    }, [tagsArray]);
    var renderTags = useCallback(function (tagsArray) {
        return tagsArray.map(function (tag, index) { return (React.createElement("span", { key: index, className: 'kgd-tag' },
            tag,
            React.createElement(Icon, { icon: 'times', onClick: removeTag(index) }))); });
    }, [removeTag]);
    useEffect(function () {
        renderTags(tagsArray);
    }, [tagsArray, renderTags]);
    var classes = classNames('kgd-select', {
        'menu-is-open': clickControl,
        'is-multiple': multiple,
    });
    var openMenu = function () {
        setClickControl(!clickControl);
        onVisibleChange && onVisibleChange(clickControl);
    };
    var getLiContext = {
        setInputValue: setInputValue,
        setTagsArray: setTagsArray,
        tagsArray: tagsArray,
        multiple: multiple ? multiple : false,
        onChange: onChange
    };
    var renderChildren = function () {
        return Children.map(children, function (child, index) {
            var childElement = child;
            var displayName = childElement.type.displayName;
            if (displayName === 'Option')
                return cloneElement(childElement, {
                    index: index.toString()
                });
            else
                console.error('Warning: Select has a child which is not a Option component');
        });
    };
    return (React.createElement("div", { className: classes, ref: divRef },
        React.createElement("div", { className: 'kgd-select-input' },
            React.createElement(Input, { readOnly: true, placeholder: tagsArray.length > 0 ? '' : placeholder, icon: 'angle-down', value: inputValue, onClick: openMenu, disabled: disabled, name: name })),
        React.createElement(Transition, { animation: 'zoom-in-top', in: clickControl, timeout: 200 },
            React.createElement(SelectContext.Provider, { value: getLiContext },
                React.createElement("ul", { className: 'kgd-select-dropdown', onClick: !multiple ? openMenu : function () { } }, renderChildren()))),
        React.createElement("div", { className: 'kgd-selected-tags' }, multiple && renderTags(tagsArray))));
};
Select.defaultProps = {
    name: 'kgd-select',
    placeholder: '请选择'
};
var completeSelect = Select;
completeSelect.Option = Option;
export default completeSelect;
