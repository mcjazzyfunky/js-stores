/* @jsx createElement */

import { createElement, defineComponent } from 'js-widgets'
import { useProps } from 'js-widgets/hooks'
import { mount } from 'js-widgets/dom'
import { useStore } from '../modules/with-js-widgets/main/index'
import createSyncCounterStore from './createSyncCounterStore'
import createAsyncCounterStore from './createAsyncCounterStore'

type CounterProps = {
  initialValue?: number,
  label?: string
}

const SyncCounter = defineComponent<CounterProps>({
  displayName: 'SyncCounter',

  defaults: {
    initialValue: 0,
    label: 'Counter'
  },

  init(c) {
    const
      getProps = useProps(c),
      store = useStore(c, () => createSyncCounterStore(getProps().initialValue!)),
      onIncrement = () => store.increment(),
      onDecrement = () => store.decrement()

    return props => (
      <div>
        <label>{` ${props.label}: `}</label>
        <button onClick={onDecrement}>-</button>
        {` ${store.count} `}
        <button onClick={onIncrement}>+</button>
      </div>
    )
  }
})

const AsyncCounter = defineComponent<CounterProps>({
  displayName: 'SyncCounter',

  defaults: {
    initialValue: 0,
    label: 'Counter'
  },

  init(c) {
    const
      getProps = useProps(c),
      store = useStore(c, () => createAsyncCounterStore(getProps().initialValue!)),
      onIncrement = () => store.increment(),
      onDecrement = () => store.decrement()

    return props => (
      <div>
        <label>{` ${props.label}: `}</label>
        <button onClick={onDecrement}>-</button>
        {` ${store.state.count} `}
        <button onClick={onIncrement}>+</button>
      </div>
    )
  }
})

const Demo = defineComponent({
  displayName: 'Demo',
  
  render: () =>
    <div>
      <h3>jsWidgets Counter (sync.)</h3>
      <SyncCounter/>
      <h3>jsWidgets Counter (async.)</h3>
      <AsyncCounter/>
    </div>
})

mount(<Demo/>, document.getElementById('js-widgets-demo')!)
