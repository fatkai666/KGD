import { storiesOf } from '@storybook/react'

import Menu from './'

const defaultMenu = () => (
  <div
    style={{
      padding: '20px 40px',
      width: '500px'
    }}
  >
    <Menu
    defaultIndex="0"
    defaultOpenSubMenus={[]}
    mode="horizontal"
    onSelect={function noRefCheck(){}}
  >
    <Menu.Item>
      cool link
    </Menu.Item>
    <Menu.Item>
      cool link 2
    </Menu.Item>
    <Menu.Item disabled>
      disabled
    </Menu.Item>
    <Menu.SubMenu title="下拉选项">
      <Menu.Item>
        下拉选项一
      </Menu.Item>
      <Menu.Item>
        下拉选项二
      </Menu.Item>
    </Menu.SubMenu>
  </Menu>
  </div>
)

const VerticalMenu = () => (
  <div
    style={{
      padding: '20px 40px',
      width: '500px'
    }}
  >
    <Menu
    defaultIndex="0"
    defaultOpenSubMenus={[]}
    mode="vertical"
    onSelect={function noRefCheck(){}}
  >
    <Menu.Item>
      cool link
    </Menu.Item>
    <Menu.Item>
      cool link 2
    </Menu.Item>
    <Menu.SubMenu title="点击下拉选项">
      <Menu.Item>
        下拉选项一
      </Menu.Item>
      <Menu.Item>
        下拉选项二
      </Menu.Item>
    </Menu.SubMenu>
  </Menu>
  </div>
)

const DefaultOpenVerticalMenu = () => (
  <div
    style={{
      padding: '20px 40px',
      width: '500px'
    }}
  >
    <Menu
    defaultIndex="0"
    defaultOpenSubMenus={[
      '2'
    ]}
    mode="vertical"
    onSelect={function noRefCheck(){}}
  >
    <Menu.Item>
      cool link
    </Menu.Item>
    <Menu.Item>
      cool link 2
    </Menu.Item>
    <Menu.SubMenu title="默认展开下拉选项">
      <Menu.Item>
        下拉选项一
      </Menu.Item>
      <Menu.Item>
        下拉选项二
      </Menu.Item>
    </Menu.SubMenu>
  </Menu>
  </div>
)

storiesOf('Menu 导航表单', module)
  .add('Menu', defaultMenu)
  .add('纵向Menu', VerticalMenu)
  .add('默认展开的纵向Menu', DefaultOpenVerticalMenu)

