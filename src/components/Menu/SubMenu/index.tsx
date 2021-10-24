import React,{
  FC, 
  useContext, 
  useState, 
  LiHTMLAttributes, 
  MouseEvent, 
  Children, 
  FunctionComponentElement, 
  cloneElement
} from 'react'
import classNames from 'classnames'

import {MenuContext} from '../'
import {MenuItemProps} from '../MenuItem'

import Icon from '../../Icon'
import Transition from '../../Transition'

interface BaseSubMenu {
  /**下拉菜单选项下标 */
  index ?: string;
  /**下拉菜单选项标题 */
  title : string;
  /**用户自定义的下拉菜单选项样式类名 */
  className ?: string
}

export type SubMenuProps = BaseSubMenu & LiHTMLAttributes<HTMLLIElement>

const SubMenu : FC<SubMenuProps> = (props) => {

  const {
    title, 
    index, 
    className, 
    children
  } = props

  const context = useContext(MenuContext)

  const openedSubMenus = context.defaultOpenSubMenus as Array<string>
  const isopened = (index && context.mode === 'vertical') ? openedSubMenus.includes(index) :false

  const [menuOpen,setOpen] = useState(isopened)

  const classes = classNames('submenu-item menu-item', className, {
    'is-active' : context.index === index,
    'is-opened' : menuOpen,
    'is-vertical' : context.mode === 'vertical'
  })

  const handleClick = (e:MouseEvent) => {
    e.preventDefault()
    setOpen(!menuOpen)
  }

  let timer:any
  const handleMouse = (e:MouseEvent,toggle:boolean) => {
    clearTimeout(timer)
    e.preventDefault()
    timer = setTimeout(() => {
      setOpen(toggle)
    },200)
  }

  const clickEvents = context.mode === 'vertical' ? {
    onClick : handleClick
  } : {}

  const hoverEvents = context.mode === 'vertical' ? 
  {} : {
    onMouseEnter:(e:MouseEvent) => {handleMouse(e,true)},
    onMouseLeave:(e:MouseEvent) => {handleMouse(e,false)}
  }

  const renderChildren = () => {
    const classes = classNames('kgd-submenu', {
      'menu-opened' : menuOpen
    })
    const ChildComponet = Children.map(children,(child, i) => {
      const childElement = child as FunctionComponentElement<MenuItemProps>
      if(childElement.type.displayName === 'MenuItem') return cloneElement(childElement, {
        index:`${index}-${i}`
      })
      else console.error('Warning: Menu has a child which is not a MenuItem component')
    })
    return(
      <Transition
        in = {menuOpen}
        animation = 'zoom-in-top'
        timeout = {200}
      >
        <ul
        className = {classes}
      >
        {ChildComponet}
      </ul>
      </Transition>
    )
  }

  return(
    <li
      className = {classes}
      key = {index}
      {...hoverEvents}
    >
      <div 
      className = 'submenu-title'
      {...clickEvents}
      >
        {title}
        <Icon icon="angle-down" className="arrow-icon"/>
      </div>
      {renderChildren()}
    </li>
  )
}

SubMenu.displayName = 'SubMenu'

export default SubMenu;