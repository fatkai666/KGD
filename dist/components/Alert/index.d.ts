import { FC, HTMLAttributes } from 'react';
export declare type AlertType = 'success' | 'default' | 'danger' | 'warning';
interface BaseAlert {
    /**
     * 设置Alert标题
     */
    title?: string;
    /**
     * 添加Alert描述
     */
    description?: string;
    /**
     * 设置Alert类型
     */
    type?: AlertType;
    /**
     * 设置Alert点击事件
     */
    onClose?: () => void;
    /**
     * 设置Alert能否关闭
     */
    closable?: boolean;
}
export declare type AlertProps = BaseAlert & HTMLAttributes<HTMLDivElement>;
/**
 * 页面中提示框，适合信息提示
 * ### 引用方法
 *
 * ~~~js
 * import { Alert } from 'kgd'
 * ~~~
 */
declare const Alert: FC<AlertProps>;
export default Alert;
