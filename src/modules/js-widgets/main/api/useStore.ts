import { Component } from 'js-widgets'
import { observeStore } from '../../../core/main/index'

export default function useStore<T extends object>(
  c: Component,
  create: () => T
): T {
  const
    store: T = create(),
    unsubscribe = observeStore(store, () => c.forceUpdate)

  c.onUnmount(() => unsubscribe)

  return store
}