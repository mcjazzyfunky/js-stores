import { initStore } from '../modules/core/main/index'

export default function createAsyncCounterStore(initialValue: number) {
  const
    initialState = { count: 0 },

    [self, update] = initStore(initialState, {
      increment() {
        update({ count: self.state.count + 1})
      },

      decrement() {
        update(state => ({ count: state.count - 1 }))
      }
    })
 
  return self
}
