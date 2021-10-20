import React, {FC, ButtonHTMLAttributes, AnchorHTMLAttributes} from 'react'

import classNames from 'classnames'

export type ButtonType = 'primary' | 'danger' | 'default' | 'link'

export type ButtonSize = 'lg' | 'sm'

interface BaseButton {
  /**用户自定义样式类名 */
  className ?: string,
  /**设置 Button 的类型 */
  btnType ?: ButtonType,
  /**设置 Button 的尺寸 */
  size ?: ButtonSize,
  children ?: React.ReactNode,
  /**设置 Button 的禁用 */
  disabled ?: boolean,
  /**设置link型Button的跳转地址 */
  href ?: string,
}

type NativeButtonProps = BaseButton & ButtonHTMLAttributes<HTMLButtonElement> 
type AnchorButtonProps = BaseButton & AnchorHTMLAttributes<HTMLAnchorElement>
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>

/**
 * 页面中最常用的的按钮元素，适合于完成特定的交互
 * ### 引用方法
 * 
 * ~~~js
 * import { Button } from 'kgd'
 * ~~~
 */

const Button : FC<ButtonProps>  = (props) => {
  const {
    className, 
    btnType, 
    size, 
    children, 
    disabled, 
    href,
    ...restProps
  } = props
  const classes = classNames('btn', className, {
    [`btn-${btnType}`] : btnType,
    [`btn-${size}`] : size,
    'disabled' : btnType === 'link' && disabled,
  })
  return btnType === 'link' && href ? 
  (
    <a
      className = {classes}
      href = {href}
      {...restProps}
    >
      {children}
    </a>
  ) : 
  (
    <button
      className = {classes}
      disabled = {disabled}
      {...restProps}
    >
      {children}
    </button>
  )
}

Button.defaultProps = {
  disabled: false,
  btnType: 'default'
}

export default Button;