import React, { FC, HTMLAttributes, CSSProperties } from 'react';
import { MenuItemProps } from './MenuItem';
import { SubMenuProps } from './SubMenu';
declare type MenuMode = 'horizontal' | 'vertical';
declare type selectCallback = (selectedIndex: string) => void;
interface BaseMenu {
    /**设置菜单类型，横向或纵向 */
    mode?: MenuMode;
    /**默认 active 的菜单项的索引值 */
    defaultIndex?: string;
    /**点击菜单触发的函数 */
    onSelect?: selectCallback;
    /**用户自定义的样式类名 */
    classNames?: string;
    /**用户自定义的样式 */
    style?: CSSProperties;
    /**设置子菜单的默认打开 只在纵向模式下生效 */
    defaultOpenSubMenus?: string[];
}
interface IMenuContext {
    index: string;
    onSelect?: selectCallback;
    mode?: MenuMode;
    defaultOpenSubMenus?: string[];
}
export declare const MenuContext: React.Context<IMenuContext>;
export declare type MenuProps = BaseMenu & HTMLAttributes<HTMLUListElement>;
export declare type ImenuComponent = FC<MenuProps> & {
    Item: FC<MenuItemProps>;
    SubMenu: FC<SubMenuProps>;
};
declare const completeMenu: ImenuComponent;
export default completeMenu;
