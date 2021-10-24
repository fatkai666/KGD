import { storiesOf } from '@storybook/react'

import Select from './'

const SimpleTest = () => {
  return (
    <div
      style={{
        padding: '20px 40px',
        width: '500px'
      }}
    >
      <Select
        name="kgd-select"
        onChange={function noRefCheck() { }}
        onVisibleChange={function noRefCheck() { }}
        placeholder="请选择"
      >
        <Select.Option value="nihao" />
        <Select.Option value="nihao2" />
        <Select.Option value="nihao3" />
        <Select.Option
          disabled
          value="disabled"
        />
        <Select.Option value="nihao5" />
      </Select>
    </div>
  )
}

const MutipleSelect = () => {
  return (
    <div
      style={{
        padding: '20px 40px',
        width: '500px'
      }}
    >
      <Select
        multiple
        name="kgd-select"
        onChange={function noRefCheck() { }}
        onVisibleChange={function noRefCheck() { }}
        placeholder="支持多选"
      >
        <Select.Option value="nihao" />
        <Select.Option value="nihao2" />
        <Select.Option value="nihao3" />
        <Select.Option value="kgd" />
        <Select.Option value="kgd2" />
      </Select>
    </div>
  )
}

const disableSelect = () => {
  return (
    <div
  style={{
    padding: '20px 40px',
    width: '500px'
  }}
>
  <Select
    disabled
    name="kgd-select"
    placeholder="禁用啦！"
  >
    <Select.Option value="nihao" />
    <Select.Option value="nihao2" />
    <Select.Option value="nihao3" />
  </Select>
</div>
  )
}

storiesOf('Select 选择器', module)
  .add('Select', SimpleTest)
  .add('支持多选的Select', MutipleSelect)
  .add('被禁用的Select', disableSelect)