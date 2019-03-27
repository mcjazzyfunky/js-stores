import React from 'react'
import ReactDOM from 'react-dom'
import { useStore } from '../modules/with-react/main/index'
import createSyncCounterStore from './createSyncCounterStore'
import createAsyncCounterStore from './createAsyncCounterStore'

const { useCallback } = React

function SyncCounter({ initialValue = 0, label = 'Counter'}) {
  const
    store = useStore(() => createSyncCounterStore(initialValue)),
    onIncrement = useCallback(() => store.increment(), []),
    onDecrement = useCallback(() => store.decrement(), [])

  return (
    <div>
      <label>{` ${label}: `}</label>
      <button onClick={onDecrement}>-</button>
      {` ${store.count} `}
      <button onClick={onIncrement}>+</button>
    </div>
  )
}

function AsyncCounter({ initialValue = 0, label = 'Counter'}) {
  const
    store = useStore(() => createAsyncCounterStore(initialValue)),
    onIncrement = useCallback(() => store.increment(), []),
    onDecrement = useCallback(() => store.decrement(), [])

  return (
    <div>
      <label>{` ${label}: `}</label>
      <button onClick={onDecrement}>-</button>
      {` ${store.state.count} `}
      <button onClick={onIncrement}>+</button>
    </div>
  )
}

function Demo() {
  return (
    <div>
      <h3>React Counter (sync.)</h3>
      <SyncCounter/>
      <h3>React Counter (async.)</h3>
      <AsyncCounter/>
    </div>
  )
}

ReactDOM.render(<Demo/>, document.getElementById('react-demo'))
