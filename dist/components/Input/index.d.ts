import { FC, ReactElement, ChangeEvent, InputHTMLAttributes } from 'react';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
declare type InputSize = 'lg' | 'sm';
interface BaseInput {
    /**输入框是否禁用，默认为false */
    disabled?: boolean;
    /**输入框的图标 */
    icon?: IconProp;
    /**输入框规格类型 */
    size?: InputSize;
    /**输入框前缀 */
    prepend?: string | ReactElement;
    /**输入框后缀 */
    append?: string | ReactElement;
    /**输入框输入内容后调用函数 */
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}
export declare type InputProps = BaseInput & Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>;
/**
 * 支持 HTMLInput 的所有基本属性
 * ### 引用方法
 *
 * ~~~js
 * import { Input } from 'kgd'
 * ~~~
 */
declare const Input: FC<InputProps>;
export default Input;
