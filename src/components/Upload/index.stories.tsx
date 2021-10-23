import { storiesOf } from '@storybook/react'

import Upload from './'
import Button from '../Button'
import Icon from '../Icon'
import { action } from '@storybook/addon-actions'

const checkFileSize = (file: File) => {
  if (Math.round(file.size / 1024) > 50) {
    alert('file is too big')
    return false
  }
  return true
}

const simpleTest = () => (
  <div
    style={{
      padding: '20px 40px',
      width: '500px'
    }}
  >
    <Upload
      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
      name="file"
      onChange={function noRefCheck() { }}
      onProgress={function noRefCheck() { }}
      onRemove={function noRefCheck() { }}
      onSuccess={function noRefCheck() { }}
    >
      <Button
        btnType="primary"
        disabled={false}
        size="lg"
      >
        <Icon icon="upload" />
        点击上传
      </Button>
    </Upload>
  </div>
)

const CheckFileBeforeUpload = () => (
  <Upload
    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
    onChange={action('changed')}
    beforeUpload={checkFileSize}
  >
    <Button size="lg" btnType="primary"><Icon icon="upload" /> 不能传大于50Kb！ </Button>
  </Upload>
)

const DragFlie = () => (
  <div
    style={{
      padding: '20px 40px',
      width: '500px'
    }}
  >
    <Upload
      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
      drag
      multiple
      name="fileName"
      onChange={function noRefCheck() { }}
      onRemove={function noRefCheck() { }}
    >
      <Icon
        icon="upload"
        size="5x"
        theme="secondary"
      />
      <br />
      <p>
        点击或者拖动到此区域进行上传
      </p>
    </Upload>
  </div>
)


storiesOf('Upload 上传', module)
  .add('Upload', simpleTest)
  .add('上传前检查文件大小', CheckFileBeforeUpload)
  .add('拖拽上传', DragFlie)