import React, { FC } from 'react';
import { OptionProps } from "./Option";
export interface SelectProps {
    /**指定默认选中的条目 可以是字符串或者字符串数组 */
    defaultValue?: string | string[];
    /**选择框默认文字 */
    placeholder?: string;
    /**是否禁用 */
    disabled?: boolean;
    /**是否可以多选 */
    multiple?: boolean;
    /**select input的name属性 */
    name?: string;
    /**选中值发生变化时触发 */
    onChange?: (selectedValue: string, selectedValues: string[]) => void;
    /**下拉框隐藏/出现时触发 */
    onVisibleChange?: (visible: boolean) => void;
}
interface IselectContext {
    setInputValue: any;
    setTagsArray: any;
    tagsArray: string[];
    multiple: boolean;
    onChange?: (selectedValue: string, selectedValues: string[]) => void;
}
export declare const SelectContext: React.Context<IselectContext>;
export declare type ISelectComponent = FC<SelectProps> & {
    Option: FC<OptionProps>;
};
declare const completeSelect: ISelectComponent;
export default completeSelect;
