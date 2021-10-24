import { FC } from 'react';
export declare type uploadFileStatus = 'ready' | 'uploading' | 'success' | 'error';
export interface uploadFile extends File {
    uid: string;
    size: number;
    percent?: number;
    name: string;
    status?: uploadFileStatus;
    raw?: File;
    response?: any;
    error?: any;
}
export interface uploadProps {
    /**必选参数, 上传的地址 */
    action: string;
    /**上传文件之前的钩子，参数为上传的文件，若返回 false 或者 Promise 则停止上传。 */
    beforeUpload?: (file: uploadFile) => boolean | Promise<uploadFile>;
    /**上传的文件列表 */
    defaultFileList?: uploadFile[];
    /**上传文件时的钩子函数 */
    onProgress?: (percentage: number, file: uploadFile) => void;
    /**文件上传成功时的钩子函数 */
    onSuccess?: (data: any, file: uploadFile) => void;
    /**文件上传失败时的钩子函数 */
    onError?: (err: any, file: uploadFile) => void;
    /**文件状态改变时的钩子，上传成功或者失败时都会被调用 */
    onChange?: (file: uploadFile) => void;
    /**文件列表移除文件时的钩子 */
    onRemove?: (file: uploadFile) => void;
    /**用户自定义上传的请求头 */
    headers?: {
        [key: string]: any;
    };
    /**上传的文件字段名 */
    name?: string;
    /**上传时附带的额外数据 */
    data?: {
        [key: string]: any;
    };
    /**支持发送 cookie 凭证信息 */
    withCredentials?: boolean;
    /**用户自定义接受上传的文件类型 */
    accept?: string;
    /**是否可以多选 */
    multiple?: boolean;
    /**是否支持拖拽上传 */
    drag?: boolean;
}
/**
 *通过点击或者拖拽上传文件
 * ### 引用方法
 *
 * ~~~js
 * import { Upload } from 'kgd'
 * ~~~
 */
declare const Upload: FC<uploadProps>;
export default Upload;
