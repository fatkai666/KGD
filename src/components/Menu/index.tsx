import {
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
import { MenuItemProps } from './MenuItem'

type MenuMode = 'horizontal' | 'vertical'
type selectCallback = (selectedIndex: string) => void

interface BaseMenu {
  mode ?: MenuMode;
  defaultIndex ?: string;
  onSelect ?: selectCallback;
  classNames ?: string;
  style ?: CSSProperties;
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

export default Menu;