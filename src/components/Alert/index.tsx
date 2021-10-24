import React,{ FC, useState, HTMLAttributes } from 'react'
import classNames from 'classnames'
import Icon from '../Icon'
import Transition from '../Transition'

export type AlertType  = 'success' | 'default' | 'danger' | 'warning'
interface BaseAlert {
  /**
   * 设置Alert标题
   */
  title?: string,
  /**
   * 添加Alert描述
   */
  description?: string,
  /**
   * 设置Alert类型
   */
  type?: AlertType,
  /**
   * 设置Alert点击事件
   */
  onClose?: () => void,
  /**
   * 设置Alert能否关闭
   */
  closable?: boolean
}


export type AlertProps = BaseAlert & HTMLAttributes<HTMLDivElement>

/**
 * 页面中提示框，适合信息提示
 * ### 引用方法
 * 
 * ~~~js
 * import { Alert } from 'kgd'
 * ~~~
 */

const Alert: FC<AlertProps> = (props) => {
  const {
    className,
    title,
    description,
    type,
    onClose,
    closable
  } = props

  const classes = classNames('kgd-alert', className, {
    [`kgd-alert-${type}`]: type,
    'closable': type === 'warning' ? false : closable,
  })


  const [visible, setVisible] = useState(true)

  const closeAlert = (onClose: Function) => {
    return () => {
      setVisible(false)
      onClose()
    }
  }

  return (
      <Transition
        in = {visible || !closable || type === 'warning'}
        animation = 'zoom-in-top'
        timeout = {200}
      >
        <div
          className={classes}
        >
          <span>{title}</span>
          <span
            className='kgd-alert-close'
            onClick={closeAlert(onClose as () => void)}
          >
            <Icon icon='times' />
          </span>
          <p>{description ? description : null}</p>
        </div>
      </Transition>
    )
}

Alert.defaultProps = {
  type: 'default',
  closable: true,
  onClose: () => { }
}

export default Alert;