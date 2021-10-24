import React, { useState } from 'react';
import classNames from 'classnames';
var Dragger = function (props) {
    var onFile = props.onFile, children = props.children;
    var _a = useState(false), dragOver = _a[0], setDragOver = _a[1];
    var classes = classNames('kgd-uploader-dragger', {
        'is-dragover': dragOver
    });
    var handleDrag = function (over) {
        return function (e) {
            e.preventDefault();
            setDragOver(over);
        };
    };
    var handleDrop = function (e) {
        e.preventDefault();
        setDragOver(false);
        onFile(e.dataTransfer.files);
    };
    return (React.createElement("div", { className: classes, onDragOver: handleDrag(true), onDragLeave: handleDrag(false), onDrop: handleDrop }, children));
};
export default Dragger;
