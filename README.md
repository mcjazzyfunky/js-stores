# js-stores

Very small store library - mainly to be used locally within UI components

[![Licence](https://img.shields.io/badge/licence-LGPLv3-blue.svg?style=flat)](https://github.com/js-works/js-stores/blob/master/LICENSE)
[![npm version](https://img.shields.io/npm/v/js-stores.svg?style=flat)](https://www.npmjs.com/package/js-stores)
[![Build status](https://travis-ci.com/js-works/js-stores.svg)](https://travis-ci.org/js-works/js-stores)
[![Coverage status](https://coveralls.io/repos/github/js-works/js-stores/badge.svg?branch=master)](https://coveralls.io/github/js-works/js-stores?branch=master)

## Installation

npm install --save js-stores

## Usage
```tsx
import React from 'react'
import ReactDOM from 'react-dom'
import { initStore } from 'js-stores'
import { useStore } from 'js-stores/react'

const { useCallback } = React

function createStore() { 
  const [self, update] = initStore({
    count: initialValue,

    increment() {
      increase(1)
    },

    decrement() {
      increase(-1)
    }
  })

  // private
  function increase(delta: number) {
    update({ count: self.count + delta })
  }
  
  return self
}

function Counter() {
  const
    store = useStore(createStore),
    increment = useCallback(() => store.increment(), []),
    decrement = useCallback(() => store.decrement(), [])

  return (
    <div>
      <label>Counter: </label>
      <button onClick={decrement}>-</button>
      {` ${store.count} `}
      <button onClick={increment}>+</button>
    </div>
  )
}

ReactDOM.render(<Counter/>, document.getElementById('main-content'))
```

## License

"js-stores" is licensed under LGPLv3.

## Project status

"js-stores" is currently in alpha status.
