import { storiesOf } from '@storybook/react'

import Tabs from './'
import Icon from '../Icon'

const defaultTabs = () => (
  <div
    style={{
      padding: '20px 40px',
      width: '500px'
    }}
  >
    <Tabs
    defaultIndex={0}
    onSelect={function noRefCheck(){}}
    type="line"
  >
    <Tabs.Item label="选项卡一">
      this is content one
    </Tabs.Item>
    <Tabs.Item label="选项卡二">
      this is content two
    </Tabs.Item>
    <Tabs.Item label="用户管理">
      this is content three
    </Tabs.Item>
  </Tabs>
  </div>
)

const CardTabs = () => (
  <div
    style={{
      padding: '20px 40px',
      width: '500px'
    }}
  >
    <Tabs
    defaultIndex={0}
    onSelect={function noRefCheck(){}}
    type="card"
  >
    <Tabs.Item label="card1">
      this is card one
    </Tabs.Item>
    <Tabs.Item label="card2">
      this is content two
    </Tabs.Item>
    <Tabs.Item
      disabled
      label="disabled"
    >
      this is content three
    </Tabs.Item>
  </Tabs>
  </div>
)

const CustomCardTabs = () => (
  <div
    style={{
      padding: '20px 40px',
      width: '500px'
    }}
  >
    <Tabs
    defaultIndex={0}
    onSelect={function noRefCheck(){}}
    type="card"
  >
    <Tabs.Item label={<><Icon icon="exclamation-circle" />{'  '}自定义图标</>}>
      this is card one
    </Tabs.Item>
    <Tabs.Item label="tab2">
      this is content two
    </Tabs.Item>
  </Tabs>
  </div>
)

storiesOf('Tabs 标签页', module)
  .add('Tabs', defaultTabs)
  .add('选项卡Tabs', CardTabs)
  .add('自定义选项卡Tabs', CustomCardTabs)

