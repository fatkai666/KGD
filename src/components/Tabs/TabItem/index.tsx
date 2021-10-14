import React, {FC, useContext, useState, useEffect} from 'react'
import classNames from 'classnames'
import {TabsContext} from '../'

interface BaseTabsItem {
  index ?: number,
  label : any,
  disabled ?: boolean,
  ChildrenContent ?: Function,
}

export type TabItemProps = BaseTabsItem & React.LiHTMLAttributes<HTMLLIElement>

const TabItem : FC<TabItemProps> = (props) => {

  const {index, label, disabled, className, children, ChildrenContent} = props

  const context = useContext(TabsContext)

  
  const openedTabs = context.defaultOpenTabs as Array<number>
  const isopened = openedTabs.includes(index as number)

  const [tabsOpen,setOpen] = useState(isopened)

  useEffect(() =>{
    index === context.index && setOpen(true)
    index === context.index && ChildrenContent && ChildrenContent(children, tabsOpen)
  },[index,context.index,ChildrenContent,children,tabsOpen])

  const classes = classNames('kgd-tabs-nav-item', className, {
    'disabled': disabled,
    'is-active' : context.index === index
  })

  const handleClick = () => {
    if(context.onSelect && !disabled && (typeof index === 'number')) {
      context.onSelect(index)
      setOpen(!tabsOpen)
      ChildrenContent && ChildrenContent(children, tabsOpen)
    }
  }

  return (
      <li
        className = {classes}
        onClick = {handleClick}
        key = {index}
      >
        {label}
      </li>
  )
}

TabItem.displayName = 'TabsItem'

TabItem.defaultProps = {
  index : 0,
}

export default TabItem;