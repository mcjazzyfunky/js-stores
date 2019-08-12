import { Component } from 'js-widgets'
import { isStore, observeStore } from '../../../core/main/index'

export default function useStore<T>(c: Component, store: T): T {
  if (process.env.NODE_ENV === 'development' as any) {
    if (process.env.NODE_ENV === 'development' as any) {
      if (!isStore(store)) {
        throw new TypeError(
          '[useStore] SEcond argument "store" must be a valid store')
      }
    }
  }

  const unsubscribe = 
    ((store as any).constructor).__subscribe__(() => c.forceUpdate())

  c.onUnmount(unsubscribe)

  return store
}