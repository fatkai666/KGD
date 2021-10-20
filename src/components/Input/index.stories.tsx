import { storiesOf } from '@storybook/react'

import Input from './'

const defaultInput = () => (
  <Input
    onChange={function noRefCheck(){}}
    placeholder="漂亮的 Input"
  />
)

const DisabledInput = () => (
  <Input
  disabled
  placeholder="disabled input"
/>
)

const IconTnput = () => (
  <Input
    icon="search"
    placeholder="input with icon"
  />
)

const TnputOfSize = () => (
  <div
  style={{
    padding: '20px 40px',
    width: '500px'
  }}
  >
    <Input
      defaultValue="large size"
      size="lg"
    />
    <Input
      placeholder="small size"
      size="sm"
    />
  </div>
)

const TnputOfpend = () => (
  <div
  style={{
    padding: '20px 40px',
    width: '500px'
  }}
>
    <Input
      defaultValue="prepend text"
      prepend="https://"
    />
    <Input
      append=".com"
      defaultValue="google"
    />
</div>
)

storiesOf('Input 输入框', module)
  .add('Input', defaultInput)
  .add('禁用 Input', DisabledInput)
  .add('图标 Input', IconTnput)
  .add('Input大小', TnputOfSize)
  .add('Input前后缀', TnputOfpend)
