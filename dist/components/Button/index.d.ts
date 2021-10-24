import React, { FC, ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react';
export declare type ButtonType = 'primary' | 'danger' | 'default' | 'link';
export declare type ButtonSize = 'lg' | 'sm';
interface BaseButton {
    /**用户自定义样式类名 */
    className?: string;
    /**设置 Button 的类型 */
    btnType?: ButtonType;
    /**设置 Button 的尺寸 */
    size?: ButtonSize;
    children?: React.ReactNode;
    /**设置 Button 的禁用 */
    disabled?: boolean;
    /**设置link型Button的跳转地址 */
    href?: string;
}
declare type NativeButtonProps = BaseButton & ButtonHTMLAttributes<HTMLButtonElement>;
declare type AnchorButtonProps = BaseButton & AnchorHTMLAttributes<HTMLAnchorElement>;
export declare type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>;
/**
 * 页面中最常用的的按钮元素，适合于完成特定的交互
 * ### 引用方法
 *
 * ~~~js
 * import { Button } from 'kgd'
 * ~~~
 */
declare const Button: FC<ButtonProps>;
export default Button;
