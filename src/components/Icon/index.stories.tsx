import { storiesOf } from '@storybook/react'

import Icon from './'
import Button from '../Button'

const defaultIcon = () => (
  <div
    style={{
      padding: '20px 40px',
      width: '500px'
    }}
  >
    <Icon
      icon="check"
      size="3x"
    />
    <Icon
      icon="times"
      size="3x"
    />
    <Icon
      icon="anchor"
      size="3x"
    />
    <Icon
      icon="trash"
      size="3x"
    />
    <Button
      btnType="primary"
      disabled={false}
      size="lg"
    >
      <Icon icon="check" />
       check 
    </Button>
  </div>
)

const IconOfDifferentTheme = () => (
  <div
    style={{
      padding: '20px 40px',
      width: '500px'
    }}
  >
    <Icon
      icon="check"
      size="3x"
      theme="success"
    />
    <Icon
      icon="times"
      size="3x"
      theme="danger"
    />
    <Icon
      icon="anchor"
      size="3x"
      theme="primary"
    />
    <Icon
      icon="exclamation-circle"
      size="3x"
      theme="warning"
    />
  </div>
)

const IconOfMoreActions = () => (
  <div
    style={{
      padding: '20px 40px',
      width: '500px'
    }}
  >
    <Icon
      icon="spinner"
      size="3x"
      spin
      theme="primary"
    />
    <Icon
      icon="spinner"
      pulse
      size="3x"
      theme="success"
    />
  </div>
)

storiesOf('Icon 图标', module)
  .add('Icon', defaultIcon)
  .add('不同主题的 Icon', IconOfDifferentTheme)
  .add('更多行为的 Icon', IconOfMoreActions)

