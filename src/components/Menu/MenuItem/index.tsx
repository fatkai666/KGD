import {FC, useContext} from 'react'
import classNames from 'classnames'
import {MenuContext} from '../'

interface BaseMenuItem {
  index ?: string;
  disabled ?: boolean;
  className?: string;
  style ?: React.CSSProperties;
}

export type MenuItemProps = BaseMenuItem & React.LiHTMLAttributes<HTMLLIElement>

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