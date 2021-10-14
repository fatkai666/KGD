import React from 'react'
import Tabs from './components/Tabs'
import TabItem from './components/Tabs/TabItem'

function App() {
  return (
    <>
      <div
        style={{
          padding: '20px 40px',
          width: '500px'
        }}
      >
        <h3>
          组件演示
        </h3>
        <Tabs
          defaultIndex={0}
          onSelect={(index) => { console.log(index) }}
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
      card型
      <div
        style={{
          padding: '20px 40px',
          width: '500px'
        }}
      >
        <h3>
          组件演示
        </h3>
        <Tabs
          defaultIndex={0}
          onSelect={function noRefCheck() { }}
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
      自定义
      <div
        style={{
          padding: '20px 40px',
          width: '500px'
        }}
      >
        <h3>
          组件演示
        </h3>
        <Tabs
          defaultIndex={0}
          onSelect={function noRefCheck() { }}
          type="card"
        >
          <TabItem label={<>自定义图标</>}>
            this is card one
          </TabItem>
          <TabItem label="tab2">
            this is content two
          </TabItem>
        </Tabs>
      </div>
    </>
  );
}

export default App;
