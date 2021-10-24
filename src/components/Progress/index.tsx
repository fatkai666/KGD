import React,{ FC, CSSProperties } from 'react'

import { ThemeProps } from '../Icon'

interface progressProps {
  percent: number
  strokeHeight?: number
  showText?: boolean
  styles?: CSSProperties
  theme?: ThemeProps
}

const Progress: FC<progressProps> = (props) => {

  const {
    percent,
    strokeHeight,
    showText,
    styles,
    theme
  } = props

  return (
    <div
      className='kgd-progress-bar'
      style = {styles}
    >
      <div
        className = 'kgd-progress-bar-outer'
        style = {{height : `${strokeHeight}px`}}
      >
        <div 
          className = {`kgd-progress-bar-inner color-${theme}`}
          style = {{width : `${percent}%`}}
        >
          {showText && <span className = 'inner-text'>{`${percent}%`}</span>}
        </div>
      </div>
    </div>
  )
}

Progress.defaultProps = {
  strokeHeight : 15,
  showText: true,
  theme: 'primary'
}

export default Progress;

