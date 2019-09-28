import { describe, it } from 'mocha'
import { expect } from 'chai'
import { defineMessages } from 'js-messages'

import createStore from '../../main/api/createStore'
import Handler from '../../main/api/types/Handler'

type CounterState = { count: number }

const CounterMsg = defineMessages({
  reset: {},
  increment: (delta: number) => ({ delta }),
  decrement: (delta: number) => ({ delta }),
})

const counterHandler: Handler<CounterState, typeof CounterMsg> = use => {
  return {
    increment(model, { delta }) {
      model.count++
    },

    decrement(model, { delta }) {
      model.count++
    },

    //reset(model) {
    //  model.count = 0
    //}
  }
}

const counterStore = createStore(counterHandler as any, { count: 0 })

describe('createStore', () => {
  it('some test', () => {
    console.log('juuuuxxxx')
  })
})