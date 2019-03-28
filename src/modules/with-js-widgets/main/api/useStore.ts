import { Component } from 'js-widgets'

export default function useStore<T extends { subscribe(subscriber: () => void): void }>(
  c: Component,
  create: () => T
): T {
  const
    store: T = create(),
    unsubscribe = store.subscribe(() => c.forceUpdate())

  c.onUnmount(() => unsubscribe)

  return store
}