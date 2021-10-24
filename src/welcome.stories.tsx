import React from 'react'
import { storiesOf } from '@storybook/react'

storiesOf('Welcome page', module)
  .add('welcome', () => {
    return (
      <>
        <h1>欢迎来到 kgd 组件库</h1>
        <p>kgd是模拟antd打造的组件库，旨在锻炼个人业务能力</p>
        <h3>安装试试</h3>
        <code>
          yarn add kgd --save
        </code>
      </>
    )
  }, { info : { disable: true }})