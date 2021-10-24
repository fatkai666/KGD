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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import classNames from 'classnames';
import React, { useState, useEffect, useRef } from 'react';
import Input from '../Input';
import Icon from '../Icon';
import Transition from '../Transition';
import useDebounce from '../../hooks/useDebounce';
import useClickOutside from '../../hooks/useClickOutside';
/**
 * 输入框自动完成功能。当输入值需要自动完成时使用，支持同步和异步两种方式 支持 Input 组件的所有属性 支持键盘事件选择
 * ### 引用方法
 *
 * ~~~js
 * import { AutoComplete } from 'kgd'
 * ~~~
 */
var AutoComplete = function (props) {
    var fetchSuggestions = props.fetchSuggestions, onSelect = props.onSelect, value = props.value, renderOption = props.renderOption, restProps = __rest(props, ["fetchSuggestions", "onSelect", "value", "renderOption"]);
    var _a = useState(value), inputValue = _a[0], setInputValue = _a[1];
    var _b = useState([]), suggestions = _b[0], setSuggestions = _b[1];
    var _c = useState(false), loading = _c[0], setLoading = _c[1];
    var _d = useState(-1), highLightIndex = _d[0], setHighLightIndex = _d[1];
    var _e = useState(false), showDropDown = _e[0], setShowDropDown = _e[1];
    var triggerSearch = useRef(false);
    var componentRef = useRef(null);
    var debouncedValue = useDebounce(inputValue);
    useClickOutside(componentRef, function () {
        setSuggestions([]);
        setLoading(false);
    });
    useEffect(function () {
        if (debouncedValue && triggerSearch.current) {
            var results = fetchSuggestions(debouncedValue);
            setLoading(true);
            if (results instanceof Promise)
                results.then(function (data) {
                    setSuggestions(data);
                    setLoading(false);
                    if (data.length > 0)
                        setShowDropDown(true);
                });
            else {
                setSuggestions(results);
                setShowDropDown(true);
                if (results.length > 0)
                    setShowDropDown(true);
            }
        }
        else {
            setShowDropDown(false);
            setLoading(false);
        }
        setHighLightIndex(-1);
    }, [debouncedValue, fetchSuggestions]);
    var highLight = function (index) {
        if (index < 0)
            index = suggestions.length - 1;
        if (index >= suggestions.length)
            index = 0;
        setHighLightIndex(index);
    };
    var handleKeyDown = function (e) {
        switch (e.key) {
            case 'Enter':
                suggestions[highLightIndex] && handleSelecet(suggestions[highLightIndex])();
                break;
            case 'ArrowUp':
                highLight(highLightIndex - 1);
                break;
            case 'ArrowDown':
                highLight(highLightIndex + 1);
                break;
            case 'Escape':
                setShowDropDown(false);
                setLoading(false);
                break;
            default: break;
        }
    };
    var handleChange = function (e) {
        var value = e.target.value.trim();
        setInputValue(value);
        triggerSearch.current = true;
    };
    var handleSelecet = function (item) { return function () {
        setInputValue(item.value);
        setShowDropDown(false);
        if (onSelect)
            onSelect(item);
        triggerSearch.current = false;
    }; };
    var renderTemplate = function (item) { return renderOption ? renderOption(item) : item.value; };
    var generateDropDown = function () {
        return (React.createElement(Transition, { in: showDropDown || loading, animation: "zoom-in-top", timeout: 300, onExited: function () { setSuggestions([]); } },
            React.createElement("ul", { className: "kgd-suggestion-list" }, suggestions.map(function (item, index) {
                var classes = classNames('suggestion-item', {
                    'is-active': index === highLightIndex
                });
                return (React.createElement("li", { key: index, onClick: handleSelecet(item), className: classes }, renderTemplate(item)));
            }))));
    };
    return (React.createElement("div", { className: 'kgd-auto-complete', ref: componentRef },
        React.createElement(Input, __assign({ value: inputValue, onChange: handleChange, onKeyDown: handleKeyDown }, restProps)),
        loading &&
            React.createElement("ul", { className: "kgd-suggestion-list" },
                React.createElement("div", { className: "suggstions-loading-icon" },
                    React.createElement(Icon, { icon: 'spinner', spin: true }))),
        (suggestions.length > 0) && generateDropDown()));
};
export default AutoComplete;
