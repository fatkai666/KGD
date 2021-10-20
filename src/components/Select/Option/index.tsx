import {
  FC, 
  LiHTMLAttributes, 
  useContext,
} from 'react'
import classNames from 'classnames'

import {SelectContext} from '../'
import Icon from '../../Icon'

interface BaseOption {
  /**选项下标 */
  index ?: string;
  /**	默认根据此属性值进行筛选，该值不能相同 */
  value ?: string;
  /**选项的标签，若不设置则默认与 value 相同 */
  label ?: string;
  /**是否禁用该选项 */
  disabled ?: boolean;
}

export type OptionProps = BaseOption & LiHTMLAttributes<HTMLLIElement>

const Option : FC<OptionProps> = (props) => {

  const {
    value,
    index,
    label,
    disabled
  } = props

  const context = useContext(SelectContext)

  const handleClick = () => {
    let tagIndex = context.tagsArray.indexOf(value as string)

    !context.multiple && 
    context.setInputValue(value) && 
    context.onChange &&
    context.onChange(value as string,context.tagsArray)

    if(context.tagsArray.length > 0 && context.multiple) {
      tagIndex > -1 ? removeTag(tagIndex) :
      context.setTagsArray([...context.tagsArray,value])
    }
    else{
      context.setTagsArray([value])
    }
  }

  const removeTag = (index : number) => {
      context.tagsArray.splice(index,1)
      context.setTagsArray(context.tagsArray)
  }

  const classes = classNames('kgd-select-item',{
    'is-disabled':disabled,
    'is-selected': context.tagsArray.includes(value as string)
  })

  return(
    <li 
      key = {index}
      className = {classes}
      onClick = {handleClick}
    >
      {label ? label : value}
      {
      context.tagsArray.includes(value as string) && 
        <Icon 
          className = 'primary'
          icon = 'check'
        />
      }
    </li>
  )
}

Option.displayName = 'Option'

export default Option;


