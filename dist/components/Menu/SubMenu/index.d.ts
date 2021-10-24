import { FC, LiHTMLAttributes } from 'react';
interface BaseSubMenu {
    /**下拉菜单选项下标 */
    index?: string;
    /**下拉菜单选项标题 */
    title: string;
    /**用户自定义的下拉菜单选项样式类名 */
    className?: string;
}
export declare type SubMenuProps = BaseSubMenu & LiHTMLAttributes<HTMLLIElement>;
declare const SubMenu: FC<SubMenuProps>;
export default SubMenu;
