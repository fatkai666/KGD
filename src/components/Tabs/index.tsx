import {
  FC, 
  useState, 
  createContext, 
  HTMLAttributes, 
  Children, 
  FunctionComponentElement, 
  cloneElement
} from 'react'
import classNames from 'classnames'
import {TabItemProps} from './TabItem'

type tabsType = 'line' | 'card'
type SelectCallback = (SelectIndex:number) => void

interface BaseTabs {
  defaultIndex ?: number;
  className ?: string;
  onSelect ?: SelectCallback
  type ?: tabsType
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

export default Tabs;