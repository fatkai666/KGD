import React,{
  FC, 
  createContext, 
  useState, 
  HTMLAttributes, 
  Children, 
  FunctionComponentElement, 
  cloneElement, 
  CSSProperties
} from 'react'
import classNames from 'classnames'
import MenuItem, { MenuItemProps } from './MenuItem'
import SubMenu, { SubMenuProps } from './SubMenu'

type MenuMode = 'horizontal' | 'vertical'
type selectCallback = (selectedIndex: string) => void
interface BaseMenu {
  /**设置菜单类型，横向或纵向 */
  mode ?: MenuMode;
  /**默认 active 的菜单项的索引值 */
  defaultIndex ?: string;
  /**点击菜单触发的函数 */
  onSelect ?: selectCallback;
  /**用户自定义的样式类名 */
  classNames ?: string;
  /**用户自定义的样式 */
  style ?: CSSProperties;
  /**设置子菜单的默认打开 只在纵向模式下生效 */
  defaultOpenSubMenus ?: string[];
}

interface IMenuContext {
  index : string;
  onSelect ?: selectCallback;
  mode ?: MenuMode;
  defaultOpenSubMenus ?: string[];
}

export const MenuContext = createContext<IMenuContext>({index:'0'})

export type MenuProps = BaseMenu & HTMLAttributes<HTMLUListElement>

export type ImenuComponent = FC<MenuProps> & {
  Item : FC<MenuItemProps>,
  SubMenu : FC<SubMenuProps>,
}

/**
 *为网站提供导航功能的菜单。支持横向纵向两种模式，支持下拉菜单。
 * ### 引用方法
 * 
 * ~~~js
 * import { Menu } from 'kgd'
 * ~~~
 */

const Menu:FC<MenuProps> = (props) => {
  const {
    className, 
    style, 
    defaultIndex, 
    mode,
    children,
    onSelect,
    defaultOpenSubMenus,
  } = props

  const classes = classNames('kgd-menu', className, {
    [`menu-${mode}`] : mode
  })

  const [currentActive, setActive] = useState(defaultIndex)

  const handleClick = (index:string) => {
    setActive(index)
    onSelect && onSelect(index)
  }

  const passedContext : IMenuContext = {
    index : currentActive ? currentActive : '0',
    onSelect: handleClick,
    mode,
    defaultOpenSubMenus,
  }

  const renderChildren = () => {
    return Children.map(children,(child, index) => {
      const childElement = child as FunctionComponentElement<MenuItemProps>
      const { displayName } = childElement.type
      if(displayName === 'MenuItem' || displayName === 'SubMenu') 
      return cloneElement(childElement, { 
        index:index.toString()
      })
      else console.error('Warning: Menu has a child which is not a MenuItem component')
    })
  }
  

  return(
    <ul 
    className={classes}
    style={style}
    >
      <MenuContext.Provider value = {passedContext}>
        {renderChildren()}
      </MenuContext.Provider>
    </ul>
  )
}

Menu.defaultProps = {
  defaultIndex : '0',
  mode : 'horizontal',
  defaultOpenSubMenus : [],
}

const completeMenu = Menu as ImenuComponent

completeMenu.Item = MenuItem
completeMenu.SubMenu = SubMenu

export default completeMenu;