import { FC, LiHTMLAttributes } from 'react';
interface BaseTabsItem {
    /**选项卡下标 */
    index?: number;
    /**选项卡标签名 */
    label: any;
    /**选项卡是否禁用 */
    disabled?: boolean;
    /**选项卡下内容 */
    ChildrenContent?: Function;
}
export declare type TabItemProps = BaseTabsItem & LiHTMLAttributes<HTMLLIElement>;
declare const TabItem: FC<TabItemProps>;
export default TabItem;
