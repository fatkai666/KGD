import React, {FC} from 'react'

import classNames from 'classnames'

export enum ButtonType {
  Primary = 'primary',
  Danger = 'danger',
  Default = 'default',
  Link = 'link',
}

export enum ButtonSize {
  Large = 'lg',
  Small = 'sm',
}

interface BaseButton {
  className ?: string,
  btnType ?: ButtonType,
  size ?: ButtonSize,
  children ?: React.ReactNode,
  disabled ?: boolean,
  href ?: string,
}

type NativeButtonProps = BaseButton & React.ButtonHTMLAttributes<HTMLButtonElement> 
type AnchorButtonProps = BaseButton & React.AnchorHTMLAttributes<HTMLAnchorElement>
type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>

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
    'disabled' : btnType === ButtonType.Link && disabled,
  })
  return btnType === ButtonType.Link && href ? 
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
  btnType: ButtonType.Default
}

export default Button;