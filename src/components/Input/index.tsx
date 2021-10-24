import React,{
  FC, 
  ReactElement, 
  ChangeEvent, 
  InputHTMLAttributes
} from 'react'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import classNames from 'classnames'

import Icon from '../Icon' 

type InputSize = 'lg' | 'sm'

interface BaseInput {
  /**输入框是否禁用，默认为false */
  disabled ?: boolean,
  /**输入框的图标 */
  icon ?: IconProp,
  /**输入框规格类型 */
  size ?: InputSize,
  /**输入框前缀 */
  prepend ?: string | ReactElement,
  /**输入框后缀 */
  append ?: string | ReactElement,
  /**输入框输入内容后调用函数 */
  onChange ?: (e: ChangeEvent<HTMLInputElement>) => void
}

export type InputProps = BaseInput & Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>

/**
 * 支持 HTMLInput 的所有基本属性
 * ### 引用方法
 * 
 * ~~~js
 * import { Input } from 'kgd'
 * ~~~
 */

const Input : FC<InputProps> = (props) => {
  const {
    disabled,
    icon,
    size,
    prepend,
    append,
    style,
    ...restProps
  } = props;

  const classes = classNames('kgd-input-wrapper', {
    'is-disabled': disabled,
    [`input-size-${size}`] : size,
    'input-group': prepend || append,
    'input-group-append': !!append,
    'input-group-prepend': !!prepend
  })

  const fixControlledValue = (value: any) => typeof value === 'undefined' || value === null ? '' : value
  
  if('value' in props) {
    delete restProps.defaultValue
    restProps.value = fixControlledValue(props.value)
  }

  return(
    <div
      className = {classes}
      style = {style}
    >
      {prepend && <div className="kgd-input-group-prepend">{prepend}</div>}
      {icon && <div className="icon-wrapper"><Icon icon={icon} title={`title-${icon}`}/></div>}
      <input 
        className="kgd-input-inner"
        disabled={disabled}
        {...restProps}
      />
      {append && <div className="kgd-input-group-append">{append}</div>}
    </div>
  )
}

export default Input;