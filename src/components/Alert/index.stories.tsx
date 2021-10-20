import { storiesOf } from '@storybook/react'

import Alert from './'

const defaultAlert = () => (
  <div
    style={{
      padding: '20px 40px',
      width: '500px'
    }}
  >
    <Alert title = 'default Alert' />
  </div>
)

const AlertWithType = () => (
  <div
    style={{
      padding: '20px 40px',
      width: '500px'
    }}
  >
    <Alert type="default" title = 'default Alert' /> 
    <Alert type="success" title = 'success Alert' /> 
    <Alert type="warning" title = 'warning Alert' /> 
    <Alert type="danger" title = 'danger Alert' /> 
  </div>
)

const AlertWithDescription = () => (
  <div
    style={{
      padding: '20px 40px',
      width: '500px'
    }}
  >
    <Alert 
      closable
      description="this is a long description"
      onClose={function noRefCheck(){}}
      title="提示标题欧亲"
      type="default"
    />
  </div>
)

storiesOf('Alert 警告', module)
  .add('Alert', defaultAlert)
  .add('不同类型的 Alert', AlertWithType)
  .add('添加描述的 Alert', AlertWithDescription)
  
