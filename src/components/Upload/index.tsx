import {
  FC,
  useRef,
  ChangeEvent,
  useState
} from 'react'

import axios from 'axios'

import UploadList from './UploadList'
import Dragger from './Dragger'

export type uploadFileStatus = 'ready' | 'uploading' | 'success' | 'error'

export interface uploadFile extends File {
  uid: string
  size: number
  percent?: number
  name: string
  status?: uploadFileStatus
  raw?: File
  response?: any
  error?: any
}

export interface uploadProps {
  /**必选参数, 上传的地址 */
  action: string
  /**上传文件之前的钩子，参数为上传的文件，若返回 false 或者 Promise 则停止上传。 */
  beforeUpload?: (file: uploadFile) => boolean | Promise<uploadFile>
  /**上传的文件列表 */
  defaultFileList?: uploadFile[]
  /**上传文件时的钩子函数 */
  onProgress?: (percentage: number, file: uploadFile) => void
  /**文件上传成功时的钩子函数 */
  onSuccess?: (data: any, file: uploadFile) => void
  /**文件上传失败时的钩子函数 */
  onError?: (err: any, file: uploadFile) => void
  /**文件状态改变时的钩子，上传成功或者失败时都会被调用 */
  onChange?: (file: uploadFile) => void
  /**文件列表移除文件时的钩子 */
  onRemove?: (file: uploadFile) => void
  /**用户自定义上传的请求头 */
  headers?: { [key: string]: any }
  /**上传的文件字段名 */
  name?: string
  /**上传时附带的额外数据 */
  data?: { [key: string]: any }
  /**支持发送 cookie 凭证信息 */
  withCredentials?: boolean
  /**用户自定义接受上传的文件类型 */
  accept?: string
  /**是否可以多选 */
  multiple?: boolean
  /**是否支持拖拽上传 */
  drag ?: boolean
}

/**
 *通过点击或者拖拽上传文件
 * ### 引用方法
 * 
 * ~~~js
 * import { Upload } from 'kgd'
 * ~~~
 */


const Upload: FC<uploadProps> = (props) => {

  const {
    action,
    beforeUpload,
    defaultFileList,
    onProgress,
    onSuccess,
    onError,
    onChange,
    onRemove,
    headers,
    name,
    data,
    withCredentials,
    accept,
    multiple,
    children,
    drag
  } = props

  const fileRef = useRef<HTMLInputElement>(null)
  const [fileList, setFlieList] = useState<uploadFile[]>(defaultFileList || [])

  const updateFileList = (updatefile: uploadFile, updateObj: Partial<uploadFile>) => {
    setFlieList(prevList => prevList.map(
      file => file.uid === updatefile.uid ? { ...file, ...updateObj } : file
    )
    )
  }

  const handleClick = () => {
    fileRef.current && fileRef.current.click()
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    let files = e.target.files
    if (!files) return
    uploadFile(files)
    if (fileRef.current) fileRef.current.value = ''
  }

  const uploadFile = (files: FileList) => {
    [].forEach.call(files, (file: uploadFile) => {
      if (!beforeUpload) post(file)
      else {
        const result = beforeUpload(file)
        if (result && result instanceof Promise) result.then(processfile => {
          post(processfile)
        })
        else if (result !== false) post(file)
      }
    })
  }

  const post = (file: uploadFile) => {
    let _file: uploadFile = {
      uid: Date.now() + 'upload-file',
      status: 'ready',
      name: file.name,
      size: file.size,
      percent: 0,
      raw: file,
      //未知属性
      lastModified: 0,
      webkitRelativePath: '',
      type: '',
      arrayBuffer: function (): Promise<ArrayBuffer> {
        throw new Error('Function not implemented.')
      },
      slice: function (start?: number, end?: number, contentType?: string): Blob {
        throw new Error('Function not implemented.')
      },
      stream: function (): ReadableStream<any> {
        throw new Error('Function not implemented.')
      },
      text: function (): Promise<string> {
        throw new Error('Function not implemented.')
      }
    }
    setFlieList(prevlist => {
      return [_file, ...prevlist]
    })
    const formdata = new FormData()
    formdata.append(name || file.name, file)
    data && Object.keys(data).forEach(key => formdata.append(key, data[key]))
    axios({
      method: 'POST',
      url: action,
      data: formdata,
      headers: {
        ...headers,
        'Content-Type': 'multipart/form-data',
      },
      withCredentials,
      onUploadProgress: (e) => {
        let percentage = Math.round((e.loaded * 100) / e.total) || 0;
        if (percentage < 100) {
          updateFileList(_file, { percent: percentage, status: 'uploading' })
          onProgress && onProgress(percentage, file)
        }
      }
    }).then(resp => {
      updateFileList(_file, { status: 'success', response: resp.data })
      onSuccess && onSuccess(resp.data, file)
      onChange && onChange(file)
    }).catch(err => {
      updateFileList(_file, { status: 'error', error: err })
      onError && onError(err, file)
      onChange && onChange(file)
    })
  }

  const handleRemove = (file: uploadFile) => {
    setFlieList((prevlist) => {
      return prevlist.filter(item => item.uid !== file.uid)
    })
    onRemove && onRemove(file)
  }

  return (
    <div
      className='kgd-upload-component'
    >
      <div
        className = 'kgd-upload-input'
        style = {{display: 'inline-block'}}
        onClick={handleClick}
      >
        {drag ? <Dragger onFile = {(files) => {uploadFile(files)}}>{children}</Dragger> :children}
        <input
          type="file"
          style={{ display: 'none' }}
          ref={fileRef}
          className='kgd-file-input'
          onChange={handleChange}
          accept={accept}
          multiple={multiple}
        />
      </div>
      <UploadList
        fileList={fileList}
        onRemove={handleRemove}
      />
    </div>
  )
}

Upload.defaultProps = {
  name: 'file'
}

export default Upload;