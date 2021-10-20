import { storiesOf } from '@storybook/react'

import Tabs from './'
import TabItem from './TabItem'
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
    <TabItem label="选项卡一">
      this is content one
    </TabItem>
    <TabItem label="选项卡二">
      this is content two
    </TabItem>
    <TabItem label="用户管理">
      this is content three
    </TabItem>
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
    <TabItem label="card1">
      this is card one
    </TabItem>
    <TabItem label="card2">
      this is content two
    </TabItem>
    <TabItem
      disabled
      label="disabled"
    >
      this is content three
    </TabItem>
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
    <TabItem label={<><Icon icon="exclamation-circle" />{'  '}自定义图标</>}>
      this is card one
    </TabItem>
    <TabItem label="tab2">
      this is content two
    </TabItem>
  </Tabs>
  </div>
)

storiesOf('Tabs 标签页', module)
  .add('Tabs', defaultTabs)
  .add('选项卡Tabs', CardTabs)
  .add('自定义选项卡Tabs', CustomCardTabs)

