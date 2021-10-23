import {FC, useState, DragEvent} from 'react'
import classNames from 'classnames'

interface draggerProps {
  onFile : (file : FileList) => void
}

const Dragger : FC<draggerProps> = (props) => {

  const {
    onFile,
    children
  } = props

  const [dragOver, setDragOver] = useState(false)

  let classes = classNames('kgd-uploader-dragger', {
    'is-dragover' : dragOver
  })

  const handleDrag = (over : boolean) => 
    (e : DragEvent<HTMLElement>) => {
      e.preventDefault()
      setDragOver(over)
    }

  const handleDrop = (e : DragEvent<HTMLElement>) => {
    e.preventDefault()
    setDragOver(false)
    onFile(e.dataTransfer.files)
  }
  

  return (
    <div
      className = {classes}
      onDragOver = {handleDrag(true)}
      onDragLeave = {handleDrag(false)}
      onDrop = {handleDrop}
    >
      {children}
    </div>
  )
}

export default Dragger