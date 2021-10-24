import React,{ 
  FC, 
  useState, 
  createContext, 
  useEffect,
  Children,
  cloneElement,
  FunctionComponentElement,
  useRef,
  useCallback
 } from 'react'
import classNames from 'classnames'

import Input from '../Input'
import Icon from '../Icon'
import Transition from '../Transition'
import Option, { OptionProps} from "./Option"

import useClickOutside from '../../hooks/useClickOutside'

export interface SelectProps {
  /**指定默认选中的条目 可以是字符串或者字符串数组 */
  defaultValue?: string | string[];
  /**选择框默认文字 */
  placeholder?: string;
  /**是否禁用 */
  disabled?: boolean;
  /**是否可以多选 */
  multiple?: boolean;
  /**select input的name属性 */
  name?: string;
  /**选中值发生变化时触发 */
  onChange?: (selectedValue: string, selectedValues: string[]) => void
  /**下拉框隐藏/出现时触发 */
  onVisibleChange?: (visible: boolean) => void
}

interface IselectContext {
  setInputValue: any
  setTagsArray: any
  tagsArray: string[]
  multiple: boolean
  onChange?: (selectedValue: string, selectedValues: string[]) => void
}

export const SelectContext = createContext<IselectContext>({
  setInputValue: () => {},
  setTagsArray: () => {},
  tagsArray: [],
  multiple: false,
  onChange: () => {}
})

export type ISelectComponent = FC<SelectProps> & {
  Option : FC<OptionProps>
}

/**
 * 下拉选择器。 弹出一个下拉菜单给用户选择操作，用于代替原生的选择器，或者需要一个更优雅的多选器时。
 * ### 引用方法
 * 
 * ~~~js
 * import { Select } from 'kgd'
 * ~~~
 */

const Select: FC<SelectProps> = (props) => {

  const {
    defaultValue,
    placeholder,
    disabled,
    multiple,
    name,
    children,
    onChange,
    onVisibleChange
  } = props

  const [clickControl, setClickControl] = useState(false)
  const [inputValue, setInputValue] = useState(defaultValue)
  const [tagsArray, setTagsArray] = useState([])

  const divRef = useRef<HTMLDivElement>(null)

  useClickOutside(divRef, () => {
    setClickControl(false)
    onVisibleChange && onVisibleChange(clickControl)
  })

  const removeTag = useCallback((index: number) => {
    return () => {        
      const newArray = tagsArray.slice()
      newArray.splice(index,1)
      setTagsArray(newArray)
    }
  },[tagsArray])

  const renderTags = useCallback((tagsArray: string[]) => {

    return tagsArray.map((tag, index) => (
      <span
        key={index}
        className='kgd-tag'
      >
        {tag}
        <Icon
          icon='times'
          onClick = {removeTag(index)}
        />
      </span>
    )
    )
  },[removeTag])

  useEffect(() => {
    renderTags(tagsArray)
  }, [tagsArray,renderTags])

  const classes = classNames('kgd-select', {
    'menu-is-open': clickControl,
    'is-multiple': multiple,
  })

  const openMenu = () => {
    setClickControl(!clickControl)
    onVisibleChange && onVisibleChange(clickControl)
  }

  const getLiContext: IselectContext = {
    setInputValue,
    setTagsArray,
    tagsArray,
    multiple: multiple ? multiple : false,
    onChange
  }

  

  const renderChildren = () => {
    return Children.map(children,(child, index) => {
      const childElement = child as FunctionComponentElement<OptionProps>
      const { displayName } = childElement.type
      if(displayName  === 'Option') 
      return cloneElement(childElement, { 
        index:index.toString()
      })
      else console.error('Warning: Select has a child which is not a Option component')
    })
  }

  return (
    <div 
    className={classes} 
    ref = {divRef}
    >
      <div className='kgd-select-input'>
        <Input
          readOnly={true}
          placeholder={tagsArray.length > 0 ? '' : placeholder}
          icon='angle-down'
          value={inputValue}
          onClick={openMenu}
          disabled = {disabled}
          name = {name}
        />
      </div>
      <Transition
        animation='zoom-in-top'
        in={clickControl}
        timeout={200}
      >
        <SelectContext.Provider value={getLiContext}>
          <ul 
          className='kgd-select-dropdown'
          onClick={!multiple ? openMenu : () => {}}
          >
            {renderChildren()}
          </ul>
        </SelectContext.Provider>
      </Transition>
      <div className='kgd-selected-tags'>
        {multiple && renderTags(tagsArray)}
      </div>
    </div>
  )
}

Select.defaultProps = {
  name: 'kgd-select',
  placeholder: '请选择'
}

const completeSelect = Select as ISelectComponent
completeSelect.Option = Option

export default completeSelect;
