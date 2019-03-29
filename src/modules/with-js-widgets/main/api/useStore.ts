import { Component } from 'js-widgets'
import { isStore, observeStore } from '../../../core/main/index'

export default function useStore<T>( c: Component, create: () => T): T {
  if (process.env.NODE_ENV === 'development' as any) {
    if (typeof create !== 'function') {
      throw new TypeError(
        '[useStore] First argument store "create" must be a function')
    }
  }

  const store = create()

  if (process.env.NODE_ENV === 'development' as any) {
    if (!isStore(store)) {
      throw new TypeError(
        '[useStore] Return value of function "create" must be a valid store')
    }
  }

  const unsubscribe = 
    (store.constructor as any).__subscribe__(() => c.forceUpdate())

  c.onUnmount(unsubscribe)

  return store
}