import React from 'react'
import ReactDOM from 'react-dom'
import { useStore } from '../modules/with-react/main/index'
import createCounterStore from './createCounterStore'

const { useCallback } = React

function Counter({ initialValue = 0, label = 'Counter'}) {
  const
    store = useStore(() => createCounterStore(initialValue)),
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

function Demo() {
  return (
    <div>
      <h3>React Counter</h3>
      <Counter/>
    </div>
  )
}

ReactDOM.render(<Demo/>, document.getElementById('react-demo'))
