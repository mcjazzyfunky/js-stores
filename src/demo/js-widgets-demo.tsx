/* @jsx createElement */

import { createElement, defineComponent } from 'js-widgets'
import * as Hooks from 'js-widgets/hooks'
import * as DOM from 'js-widgets/dom'
//import { useProps } from 'js-widgets/hooks'
//import { mount } from 'js-widgets/dom'
import { useStore } from '../modules/js-widgets/main/index'
import createCounterStore from './createCounterStore'

const { useProps } = (Hooks as any).default
const { mount } = (DOM as any).default

type CounterProps = {
  initialValue?: number,
  label?: string
}

const Counter = defineComponent<CounterProps>({
  displayName: 'Counter',

  defaultProps: {
    initialValue: 0,
    label: 'Counter'
  },

  init(c) {
    const
      getProps = useProps(c),
      store = useStore(c, () => createCounterStore(getProps().initialValue)),
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

const Demo = defineComponent({
  displayName: 'Demo',
  
  render: () =>
    <div>
      <h3>jsWidgets Counter</h3>
      <Counter/>
    </div>
})

mount(<Demo/>, document.getElementById('js-widgets-demo'))
