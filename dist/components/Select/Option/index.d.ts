import { FC, LiHTMLAttributes } from 'react';
interface BaseOption {
    /**选项下标 */
    index?: string;
    /**	默认根据此属性值进行筛选，该值不能相同 */
    value?: string;
    /**选项的标签，若不设置则默认与 value 相同 */
    label?: string;
    /**是否禁用该选项 */
    disabled?: boolean;
}
export declare type OptionProps = BaseOption & LiHTMLAttributes<HTMLLIElement>;
declare const Option: FC<OptionProps>;
export default Option;
