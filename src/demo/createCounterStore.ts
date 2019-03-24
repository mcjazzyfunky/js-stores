import { initStore } from '../modules/core/main/index'

export default function createCounterStore(initialValue: number) {
  const [self, update] = initStore({
    count: initialValue,

    increment() {
      update({ count: self.count + 1})
    },

    decrement() {
      update({ count: self.count + 1 })
    }
  })
 
  return self
}
