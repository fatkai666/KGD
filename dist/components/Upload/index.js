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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import React, { useRef, useState } from 'react';
import axios from 'axios';
import UploadList from './UploadList';
import Dragger from './Dragger';
/**
 *通过点击或者拖拽上传文件
 * ### 引用方法
 *
 * ~~~js
 * import { Upload } from 'kgd'
 * ~~~
 */
var Upload = function (props) {
    var action = props.action, beforeUpload = props.beforeUpload, defaultFileList = props.defaultFileList, onProgress = props.onProgress, onSuccess = props.onSuccess, onError = props.onError, onChange = props.onChange, onRemove = props.onRemove, headers = props.headers, name = props.name, data = props.data, withCredentials = props.withCredentials, accept = props.accept, multiple = props.multiple, children = props.children, drag = props.drag;
    var fileRef = useRef(null);
    var _a = useState(defaultFileList || []), fileList = _a[0], setFlieList = _a[1];
    var updateFileList = function (updatefile, updateObj) {
        setFlieList(function (prevList) { return prevList.map(function (file) { return file.uid === updatefile.uid ? __assign(__assign({}, file), updateObj) : file; }); });
    };
    var handleClick = function () {
        fileRef.current && fileRef.current.click();
    };
    var handleChange = function (e) {
        var files = e.target.files;
        if (!files)
            return;
        uploadFile(files);
        if (fileRef.current)
            fileRef.current.value = '';
    };
    var uploadFile = function (files) {
        [].forEach.call(files, function (file) {
            if (!beforeUpload)
                post(file);
            else {
                var result = beforeUpload(file);
                if (result && result instanceof Promise)
                    result.then(function (processfile) {
                        post(processfile);
                    });
                else if (result !== false)
                    post(file);
            }
        });
    };
    var post = function (file) {
        var _file = {
            uid: Date.now() + 'upload-file',
            status: 'ready',
            name: file.name,
            size: file.size,
            percent: 0,
            raw: file,
            //未知属性
            lastModified: 0,
            webkitRelativePath: '',
            type: '',
            arrayBuffer: function () {
                throw new Error('Function not implemented.');
            },
            slice: function (start, end, contentType) {
                throw new Error('Function not implemented.');
            },
            stream: function () {
                throw new Error('Function not implemented.');
            },
            text: function () {
                throw new Error('Function not implemented.');
            }
        };
        setFlieList(function (prevlist) {
            return __spreadArray([_file], prevlist, true);
        });
        var formdata = new FormData();
        formdata.append(name || file.name, file);
        data && Object.keys(data).forEach(function (key) { return formdata.append(key, data[key]); });
        axios({
            method: 'POST',
            url: action,
            data: formdata,
            headers: __assign(__assign({}, headers), { 'Content-Type': 'multipart/form-data' }),
            withCredentials: withCredentials,
            onUploadProgress: function (e) {
                var percentage = Math.round((e.loaded * 100) / e.total) || 0;
                if (percentage < 100) {
                    updateFileList(_file, { percent: percentage, status: 'uploading' });
                    onProgress && onProgress(percentage, file);
                }
            }
        }).then(function (resp) {
            updateFileList(_file, { status: 'success', response: resp.data });
            onSuccess && onSuccess(resp.data, file);
            onChange && onChange(file);
        }).catch(function (err) {
            updateFileList(_file, { status: 'error', error: err });
            onError && onError(err, file);
            onChange && onChange(file);
        });
    };
    var handleRemove = function (file) {
        setFlieList(function (prevlist) {
            return prevlist.filter(function (item) { return item.uid !== file.uid; });
        });
        onRemove && onRemove(file);
    };
    return (React.createElement("div", { className: 'kgd-upload-component' },
        React.createElement("div", { className: 'kgd-upload-input', style: { display: 'inline-block' }, onClick: handleClick },
            drag ? React.createElement(Dragger, { onFile: function (files) { uploadFile(files); } }, children) : children,
            React.createElement("input", { type: "file", style: { display: 'none' }, ref: fileRef, className: 'kgd-file-input', onChange: handleChange, accept: accept, multiple: multiple })),
        React.createElement(UploadList, { fileList: fileList, onRemove: handleRemove })));
};
Upload.defaultProps = {
    name: 'file'
};
export default Upload;
