import React, { FC, HTMLAttributes } from 'react';
import { TabItemProps } from './TabItem';
declare type tabsType = 'line' | 'card';
declare type SelectCallback = (SelectIndex: number) => void;
interface BaseTabs {
    /**当前激活 tab 面板的 index，默认为0 */
    defaultIndex?: number;
    /**用户自定义选项卡样式类名 */
    className?: string;
    /**点击 Tab 触发的函数 */
    onSelect?: SelectCallback;
    /**Tabs的样式，两种可选，默认为 line */
    type?: tabsType;
    /**默认打开的Tab */
    defaultOpenTabs?: number[];
}
export declare type TabsProps = BaseTabs & HTMLAttributes<HTMLUListElement>;
interface ITabsContext {
    type?: tabsType;
    index: number;
    onSelect?: SelectCallback;
    defaultOpenTabs?: number[];
}
export declare const TabsContext: React.Context<ITabsContext>;
export declare type ITabsComponent = FC<TabsProps> & {
    Item: FC<TabItemProps>;
};
declare const completeTabs: ITabsComponent;
export default completeTabs;
