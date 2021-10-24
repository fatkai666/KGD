import { FC, LiHTMLAttributes, CSSProperties } from 'react';
interface BaseMenuItem {
    /**选项下标 */
    index?: string;
    /**选项是否被禁用 */
    disabled?: boolean;
    /**用户自定义的选项扩展样式类名 */
    className?: string;
    /**用户自定义的选项样式 */
    style?: CSSProperties;
}
export declare type MenuItemProps = BaseMenuItem & LiHTMLAttributes<HTMLLIElement>;
declare const MenuItem: FC<MenuItemProps>;
export default MenuItem;
