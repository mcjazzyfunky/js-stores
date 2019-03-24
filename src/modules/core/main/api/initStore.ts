type Updater<T> = (() => void) | Partial<T> 

export default function initStore<T extends object>(base: T): [T, (updater: Updater<T>) => void] {
  let
    observers: ((store: T) => void)[] = [] as any,
    timeout: any = null

  class Store {
    static __subscribe(observer: (store: T) => {}) {
      const newObserver = observer.bind(null)
      observers.push(newObserver)

      return () => {
        observers = observers.filter(it => it !== newObserver)
      }
    }
  }

  const
    self: T = new Store() as T,

    update = (updater: Updater<T>) => {
      if (typeof updater === 'function') {
        updater()
      } else if (updater !== null && typeof updater === 'object') {
        Object.assign(self, updater)
      } else {
        throw new TypeError('Illegal first argument for update function '
          + '- must be a function or an object')
      }
      
      if (!timeout) {
        timeout = setTimeout(() => {
          timeout = null

          for (let i = 0; i < observers.length; ++i) {
            observers[i](self)
          }
        }, 0)
      }
    }
 
  Object.assign(self, base)

  return [self, update]
}
