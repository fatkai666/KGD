import React,{FC, useContext, useState} from 'react'
import classNames from 'classnames'
import {MenuContext} from '../'
import {MenuItemProps} from '../MenuItem'

interface BaseSubMenu {
  index ?: string;
  title : string;
  className ?: string
}

export type SubMenuProps = BaseSubMenu & React.LiHTMLAttributes<HTMLLIElement>

const SubMenu : FC<SubMenuProps> = (props) => {

  const {
    title, 
    index, 
    className, 
    children
  } = props

  const context = useContext(MenuContext)

  const classes = classNames('submenu-item menu-item', className, {
    'is-active' : context.index === index,
  })

  const openedSubMenus = context.defaultOpenSubMenus as Array<string>
  const isopened = (index && context.mode === 'vertical') ? openedSubMenus.includes(index) :false

  const [menuOpen,setOpen] = useState(isopened)

  const handleClick = (e:React.MouseEvent) => {
    e.preventDefault()
    setOpen(!menuOpen)
  }

  let timer:any
  const handleMouse = (e:React.MouseEvent,toggle:boolean) => {
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
    onMouseEnter:(e:React.MouseEvent) => {handleMouse(e,true)},
    onMouseLeave:(e:React.MouseEvent) => {handleMouse(e,false)}
  }

  const renderChildren = () => {
    const classes = classNames('kgd-submenu', {
      'menu-opened' : menuOpen
    })
    const ChildComponet = React.Children.map(children,(child, i) => {
      const childElement = child as React.FunctionComponentElement<MenuItemProps>
      if(childElement.type.displayName === 'MenuItem') return React.cloneElement(childElement, {
        index:`${index}-${i}`
      })
      else console.error('Warning: Menu has a child which is not a MenuItem component')
    })
    return(
      <ul
        className = {classes}
      >
        {ChildComponet}
      </ul>
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
      </div>
      {renderChildren()}
    </li>
  )
}

SubMenu.displayName = 'SubMenu'

export default SubMenu;