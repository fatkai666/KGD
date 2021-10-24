import React,{
  FC, 
  useState, 
  createContext, 
  HTMLAttributes, 
  Children, 
  FunctionComponentElement, 
  cloneElement
} from 'react'
import classNames from 'classnames'
import TabItem,{TabItemProps} from './TabItem'

type tabsType = 'line' | 'card'
type SelectCallback = (SelectIndex:number) => void

interface BaseTabs {
  /**当前激活 tab 面板的 index，默认为0 */
  defaultIndex ?: number;
  /**用户自定义选项卡样式类名 */
  className ?: string;
  /**点击 Tab 触发的函数 */
  onSelect ?: SelectCallback
  /**Tabs的样式，两种可选，默认为 line */
  type ?: tabsType
  /**默认打开的Tab */
  defaultOpenTabs ?: number[];
}

export type TabsProps = BaseTabs & HTMLAttributes<HTMLUListElement>

interface ITabsContext {
  type ?: tabsType;
  index : number;
  onSelect ?: SelectCallback;
  defaultOpenTabs ?: number[];
}

export const TabsContext = createContext<ITabsContext>({
  index:0,
})

export type ITabsComponent = FC<TabsProps> & {
  Item : FC<TabItemProps>
}

/**
 *选项卡切换组件。 提供平级的区域将大块内容进行收纳和展现，保持界面整洁。
 * ### 引用方法
 * 
 * ~~~js
 * import { Tabs } from 'kgd'
 * ~~~
 */

const Tabs : FC<TabsProps> = (props) => {

  const {
    className,
    type,
    onSelect,
    defaultIndex,
    children,
    defaultOpenTabs
   } = props;

   const classes = classNames('kgd-tabs-nav', className, {
     [`nav-${type}`] : type
   })

   const [currentActive, setActive] = useState(defaultIndex)
   const [content, setContent] = useState()
   const [tabsOpen,setTabsopen] = useState(false)

   const handleClick = (index:number) => {
    setActive(index)
    onSelect && onSelect(index)
   }

  const passedContext : ITabsContext = {
    index : currentActive ? currentActive : 0,
    onSelect: handleClick,
    type,
    defaultOpenTabs,
  }  

  const getContent = (content : any, tabsOpen : boolean) => {
    return tabsOpen ? (
        <div className = 'kgd-tabs-content'>
          <div className = 'kgd-tab-panel'>
            {content}
          </div>
        </div> 
    ): null
  }

  const ChildrenContent = (content : any, tabsOpen : boolean) => {
    setContent(content)
    setTabsopen(tabsOpen)
  }

  const renderChildren = () => {
    return Children.map(children,(child, index) => {
      const childElement = child as FunctionComponentElement<TabItemProps>
      const { displayName } = childElement.type
      if(displayName === 'TabsItem') 
      return cloneElement(childElement, { 
        index,
        ChildrenContent
      })
      else console.error('Warning: Tabs has a child which is not a TabsItem component')
    })
  }

  return (
    <>
      <ul
        className={classes}
      >
        <TabsContext.Provider value = {passedContext}>
          {renderChildren()}
        </TabsContext.Provider>
      </ul>
      {getContent(content,tabsOpen)}
    </>
  )
}

Tabs.defaultProps = {
  defaultIndex : 0,
  defaultOpenTabs : []
}

const completeTabs = Tabs as ITabsComponent
completeTabs.Item = TabItem

export default completeTabs;