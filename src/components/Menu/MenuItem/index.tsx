import {FC, useContext, LiHTMLAttributes, CSSProperties} from 'react'
import classNames from 'classnames'
import {MenuContext} from '../'

interface BaseMenuItem {
  /**选项下标 */
  index ?: string;
  /**选项是否被禁用 */
  disabled ?: boolean;
  /**用户自定义的选项扩展样式类名 */
  className?: string;
  /**用户自定义的选项样式 */
  style ?: CSSProperties;
}

export type MenuItemProps = BaseMenuItem & LiHTMLAttributes<HTMLLIElement>

const MenuItem:FC<MenuItemProps> = (props) => {
  const {
    className,
    style,
    children,
    index,
    disabled,
  } = props

  const context = useContext(MenuContext)

  const classes = classNames('menu-item', className, {
    'is-disabled': disabled,
    'is-active' : context.index === index
  })

  const handleClick = () => {
    if(context.onSelect && !disabled && (typeof index === 'string')) {
      context.onSelect(index)
    }
  }

  return(
    <li
    style={style}
    className = {classes}
    onClick = {handleClick}
    >
      {children}
    </li>
  )
}

MenuItem.displayName = 'MenuItem'

MenuItem.defaultProps = {
  index : '0',
}

export default MenuItem;