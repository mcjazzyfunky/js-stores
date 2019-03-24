import React from 'react'
import ReactDOM from 'react-dom'

const { useCallback } = React

import { initStore } from '../modules/core/main/index'
import { useStore } from '../modules/react/main/index'

function createStore(initialValue: number) {
  const [self, update] = initStore({
    count: initialValue,

    increment() {
      update(() => self.count++)
    },

    decrement() {
      update(() => self.count--)
    }
  })
 
  return self
}

function ReactCounter({ initialValue = 0, label = 'Counter'}) {
  const
    store = useStore(() => createStore(initialValue)),
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

function ReactDemo() {
  return (
    <div>
      <h3>React Counter</h3>
      <ReactCounter/>
    </div>
  )
}

export default ReactDemo
