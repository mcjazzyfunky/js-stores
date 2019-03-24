/* @jsx createElement */

import { createElement, defineComponent } from 'js-widgets'
import * as DOM from 'js-widgets/dom'
import * as Hooks from 'js-widgets/hooks'
import { useStore } from '../modules/js-widgets/main/index'
import createCounterStore from './createCounterStore'

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
      getProps = Hooks.useProps(c),
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

function Demo() {
  return (
    <div>
      <h3>jsWidgets Counter</h3>
      <Counter/>
    </div>
  )
}
console.log(Demo)
DOM.mount(<Demo/>, document.getElementById('js-widgets-demo'))
