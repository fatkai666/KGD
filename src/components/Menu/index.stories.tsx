import { storiesOf } from '@storybook/react'

import Menu from './'
import MenuItem from './MenuItem'
import SubMenu from './SubMenu'

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
    <MenuItem>
      cool link
    </MenuItem>
    <MenuItem>
      cool link 2
    </MenuItem>
    <MenuItem disabled>
      disabled
    </MenuItem>
    <SubMenu title="下拉选项">
      <MenuItem>
        下拉选项一
      </MenuItem>
      <MenuItem>
        下拉选项二
      </MenuItem>
    </SubMenu>
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
    <MenuItem>
      cool link
    </MenuItem>
    <MenuItem>
      cool link 2
    </MenuItem>
    <SubMenu title="点击下拉选项">
      <MenuItem>
        下拉选项一
      </MenuItem>
      <MenuItem>
        下拉选项二
      </MenuItem>
    </SubMenu>
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
    <MenuItem>
      cool link
    </MenuItem>
    <MenuItem>
      cool link 2
    </MenuItem>
    <SubMenu title="默认展开下拉选项">
      <MenuItem>
        下拉选项一
      </MenuItem>
      <MenuItem>
        下拉选项二
      </MenuItem>
    </SubMenu>
  </Menu>
  </div>
)

storiesOf('Menu 导航表单', module)
  .add('Menu', defaultMenu)
  .add('纵向Menu', VerticalMenu)
  .add('默认展开的纵向Menu', DefaultOpenVerticalMenu)

