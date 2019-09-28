# js-stores

A small store library (using "Immer" internally)

[![Licence](https://img.shields.io/badge/licence-LGPLv3-blue.svg?style=flat)](https://github.com/js-works/js-stores/blob/master/LICENSE)
[![npm version](https://img.shields.io/npm/v/js-stores.svg?style=flat)](https://www.npmjs.com/package/js-stores)
[![Build status](https://travis-ci.com/js-works/js-stores.svg)](https://travis-ci.org/js-works/js-stores)
[![Coverage status](https://coveralls.io/repos/github/js-works/js-stores/badge.svg?branch=master)](https://coveralls.io/github/js-works/js-stores?branch=master)

## Installation

npm install --save js-stores

## Usage
```ts
import { defineMessages } from 'js-messages'
import { createStore, Handler } from 'js-stores'

const CounterActions = defineMessages({
  increment: (delta = 1) => ({ delta }),
  decrement: (delta = 1) => ({ delta }),
  reset: {}
})

type CounterState = { count: number }

const counterHandler: Handler<CounterState, typeof CounterActions> = use => {
  return {
    increment(model, { delta }) {
      model.count += delta
    },

    decrement(model, { delta }) {
      model.count -= delta
    },

    reset(model) {
      model.count = 0
    }
  }
}

const store = createStore(counterHandler as any, { count: 0 })

console.log('Initial state:', store.getState())

const unsubscribe = store.subscribe(() => {
  console.log('New state:', store.getState())
})

store.dispatch(CounterActions.increment())
store.dispatch(CounterActions.increment())
store.dispatch(CounterActions.increment())
store.dispatch(CounterActions.increment(10))
store.dispatch(CounterActions.reset())
store.dispatch(CounterActions.decrement(3))

unsubscribe()

store.dispatch(CounterActions.decrement(4))
console.log('Final state:', store.getState())

/*
  Output:
  
  Initial state: { count: 0 }
  New state: { count: 1 }
  New state: { count: 2 }
  New state: { count: 3 }
  New state: { count: 13 }
  New state: { count: 0 }
  New state: { count: -3 }
  Final state: { count: -7 }  
*/
```

## License

"js-stores" is licensed under LGPLv3.

## Project status

"js-stores" is currently in alpha status.
