import { describe, it } from 'mocha'
import { expect } from 'chai'
import { defineMessages } from 'js-messages'

import createStore from '../../main/api/createStore'
import Handler from '../../main/api/types/Handler'

type CounterState = { count: number }

const CounterActions = defineMessages({
  reset: {},
  increment: (delta = 1) => ({ delta }),
  decrement: (delta = 1) => ({ delta }),
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

const store = createStore(counterHandler as any, { count: 0 })

describe('createStore', () => {
  it('some test', () => {
    const unsubscribe = store.subscribe(() => {
      console.log(store.getState())
    })

    console.log('Start:', store.getState())
    store.dispatch(CounterActions.increment())
    store.dispatch(CounterActions.increment(100))
    store.dispatch(CounterActions.increment())
    store.dispatch(CounterActions.reset())
    store.dispatch(CounterActions.decrement(3))
    unsubscribe()
    store.dispatch(CounterActions.decrement(3))
    console.log('End:', store.getState())
  })
})