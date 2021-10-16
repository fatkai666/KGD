import React from 'react'
import Alert from './components/Alert'

function App() {
  return (
    <div
  style={{
    padding: '20px 40px',
    width: '500px'
  }}
>
  <h3>
    组件演示
  </h3>
  <React.Fragment key=".1">
    <Alert
      closable
      title="this is Success"
      type="success"
    />
    <Alert
      closable
      title="this is Danger!"
      type="danger"
    />
    <Alert
      closable={false}
      title="this is Warning!"
      type="warning"
    />
  </React.Fragment>
</div>
  );
}

export default App;
