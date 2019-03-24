export default function initES5Store<T extends object>(base: T): [T, (f: () => void) => void] {
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

    update = (f: () => void) => {
      f()
      
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
