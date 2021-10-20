import classNames from 'classnames'
import {
  FC,
  useState,
  ChangeEvent,
  ReactElement,
  useEffect,
  KeyboardEvent,
  useRef
} from 'react'

import Input, { InputProps } from '../Input'
import Icon from '../Icon'
import Transition from '../Transition'

import useDebounce from '../../hooks/useDebounce'
import useClickOutside from '../../hooks/useClickOutside'


interface DataSourceObject {
  value: string,
}

export type DataSourceType<T = {}> = T & DataSourceObject

export interface AutoCompleteProps extends Omit<InputProps, 'onSelect'> {
  /**	返回输入建议的方法，可以拿到当前的输入，然后返回同步的数组或者是异步的 Promise
    * type DataSourceType<T = {}> = T & DataSourceObject 
    */
  fetchSuggestions: (str: string) => DataSourceType[] | Promise<DataSourceType[]>,
  /**点击选中建议项时触发的回调 */
  onSelect?: (item: DataSourceType) => void,
  /**支持自定义渲染下拉项，返回 ReactElement */
  renderOption?: (item: DataSourceType) => ReactElement
}

/**
 * 输入框自动完成功能。当输入值需要自动完成时使用，支持同步和异步两种方式 支持 Input 组件的所有属性 支持键盘事件选择
 * ### 引用方法
 * 
 * ~~~js
 * import { AutoComplete } from 'kgd'
 * ~~~
 */

const AutoComplete: FC<AutoCompleteProps> = (props) => {
  const {
    fetchSuggestions,
    onSelect,
    value,
    renderOption,
    ...restProps
  } = props

  const [inputValue, setInputValue] = useState(value as string)
  const [suggestions, setSuggestions] = useState<DataSourceType[]>([])
  const [loading, setLoading] = useState(false)
  const [highLightIndex, setHighLightIndex] = useState(-1)
  const [showDropDown, setShowDropDown] = useState(false)

  const triggerSearch = useRef(false)
  const componentRef = useRef<HTMLDivElement>(null)
  const debouncedValue = useDebounce(inputValue)

  useClickOutside(componentRef, () => {
    setSuggestions([])
    setLoading(false)
  })

  useEffect(() => {
    if (debouncedValue && triggerSearch.current) {
      const results = fetchSuggestions(debouncedValue)
      setLoading(true)
      if(results instanceof Promise)  
        results.then(data => {
          setSuggestions(data)
          setLoading(false)
          if (data.length > 0) setShowDropDown(true)
        }) 
      else{
        setSuggestions(results)
        setShowDropDown(true)
        if (results.length > 0) setShowDropDown(true)
      } 
    } else {
      setShowDropDown(false)
      setLoading(false)
    }
    setHighLightIndex(-1)
  }, [debouncedValue, fetchSuggestions])

  const highLight = (index: number) => {
    if (index < 0) index = suggestions.length - 1
    if (index >= suggestions.length) index = 0
    setHighLightIndex(index)
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case 'Enter':
        suggestions[highLightIndex] && handleSelecet(suggestions[highLightIndex])()
        break
      case 'ArrowUp':
        highLight(highLightIndex - 1)
        break
      case 'ArrowDown':
        highLight(highLightIndex + 1)
        break
      case 'Escape':
        setShowDropDown(false)
        setLoading(false)
        break
      default: break
    }
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim()
    setInputValue(value)
    triggerSearch.current = true
  }

  const handleSelecet = (item: DataSourceType) => () => {
    setInputValue(item.value)
    setShowDropDown(false)
    if (onSelect) onSelect(item)
    triggerSearch.current = false
  }

  const renderTemplate = (item: DataSourceType) => renderOption ? renderOption(item) : item.value

  const generateDropDown = () => {
    return (
      <Transition
        in={showDropDown || loading}
        animation="zoom-in-top"
        timeout={300}
        onExited={() => {setSuggestions([])}}
      >
        <ul className="kgd-suggestion-list">
          {suggestions.map((item, index) => {
            const classes = classNames('suggestion-item', {
              'is-active': index === highLightIndex
            })

            return (
              <li
                key={index}
                onClick={handleSelecet(item)}
                className={classes}
              >
                {renderTemplate(item)}
              </li>
            )
          })
          }
        </ul>
      </Transition>
    )
  }

  return (
    <div
      className='kgd-auto-complete'
      ref={componentRef}
    >
      <Input
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        {...restProps}
      />
      {loading &&
        <ul className="kgd-suggestion-list">
          <div
            className="suggstions-loading-icon"
          >
            <Icon icon='spinner' spin />
          </div>
        </ul>}
      {(suggestions.length > 0) && generateDropDown()}
    </div>
  )

}

export default AutoComplete;