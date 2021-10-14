import React, {FC, useState} from 'react'

import classNames from 'classnames'

export enum AlertType {
  Success = 'success',
  Default = 'default',
  Danger = 'danger',
  Warning = 'warning',
}

interface BaseAlert { 
  title ?: string,
  description ?: string,
  type ?: AlertType,
  onClose ?: () => void,
  closable ?: boolean
}


export type AlertProps = BaseAlert & React.HTMLAttributes<HTMLDivElement>

const Alert : FC<AlertProps> = (props) => {
  const {
    className,
    title, 
    description, 
    type, 
    onClose, 
    closable
  } = props

  const classes = classNames('kgd-alert',className, {
    [`kgd-alert-${type}`] : type,
    'closable' : type === AlertType.Warning ? false : closable,
    'zoom-in-top-appear-done' : 'zoom-in-top-appear-done',
    'zoom-in-top-enter-done' : 'zoom-in-top-enter-done',
  })
     

  const [visible, setVisible] = useState(true)

  const closeAlert  = (onClose : Function) => {
    return () => {
      setVisible(false)
      onClose()
    }
  }

  return visible ?
  ( 
    <div
      className={classes}
    >
      <span>{title}</span>
      <span 
      className = 'kgd-alert-close'  
      onClick = {closeAlert(onClose as () => void)}
      >
        ×
      </span>
      <p>{description ? description : null}</p>
    </div>
  ): null
}

Alert.defaultProps = {
  type : AlertType.Default,
  closable : true,
  onClose : () => {}
}

export default Alert;