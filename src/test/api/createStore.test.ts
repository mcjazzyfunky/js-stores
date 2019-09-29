import { describe, it } from 'mocha'
import { expect } from 'chai'
import { defineMessages } from 'js-messages'

import createStore from '../../main/api/createStore'
import Handler from '../../main/api/types/Handler'

type CounterState = { count: number }

const CounterActions = defineMessages({
  increment: (delta: number = 1) => ({ delta }),
  decrement: (delta: number = 1) => ({ delta }),
  reset: {}
})

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

const store = createStore(counterHandler as any, { count: 0 }) // TODO!!!!!!!!!!!!

describe('createStore', () => {
  it('some test', () => {
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
  })
})