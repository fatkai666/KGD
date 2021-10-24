import React, { useState } from 'react';
import classNames from 'classnames';
import Icon from '../Icon';
import Transition from '../Transition';
/**
 * 页面中提示框，适合信息提示
 * ### 引用方法
 *
 * ~~~js
 * import { Alert } from 'kgd'
 * ~~~
 */
var Alert = function (props) {
    var _a;
    var className = props.className, title = props.title, description = props.description, type = props.type, onClose = props.onClose, closable = props.closable;
    var classes = classNames('kgd-alert', className, (_a = {},
        _a["kgd-alert-" + type] = type,
        _a['closable'] = type === 'warning' ? false : closable,
        _a));
    var _b = useState(true), visible = _b[0], setVisible = _b[1];
    var closeAlert = function (onClose) {
        return function () {
            setVisible(false);
            onClose();
        };
    };
    return (React.createElement(Transition, { in: visible || !closable || type === 'warning', animation: 'zoom-in-top', timeout: 200 },
        React.createElement("div", { className: classes },
            React.createElement("span", null, title),
            React.createElement("span", { className: 'kgd-alert-close', onClick: closeAlert(onClose) },
                React.createElement(Icon, { icon: 'times' })),
            React.createElement("p", null, description ? description : null))));
};
Alert.defaultProps = {
    type: 'default',
    closable: true,
    onClose: function () { }
};
export default Alert;
