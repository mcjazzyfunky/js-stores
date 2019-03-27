type Updater1<T extends object> = Partial<T> |  (() => void) 
type Updater2<S extends object> = Partial<S> | ((oldState: S) => Partial<S>) 

function initStore<T extends object>(base: T): [T, (updater?: Updater1<T> | null) => void]

function initStore(a1: any, a2?: any) {
  let ret: any

  const
    a1IsObj = a1 !== null && typeof a1 === 'object',
    a2IsObj = a2 !== null && typeof a2 === 'object'

  if (a1IsObj && a2 === undefined) {
    ret = initStore1(a1)
  } else if (a1IsObj && a2IsObj) {
    ret = initStore2(a1, a2)
  } else { 
    throw new TypeError('[initStore] Illegal arguments')
  }

  return ret
}

function initStore1<T extends object>(base: T): [T, (updater?: Updater1<T> | null) => void] {
  const
    self: T = createEmptyStore(),

    update = (updater?: Updater1<T> | null) => {
      if (typeof updater === 'function') {
        updater()
      } else if (updater !== null && typeof updater === 'object') {
        Object.assign(self, updater)
      } else if (updater !== undefined && updater !== null) {
        throw new TypeError('Illegal first argument for update function '
          + '- must be a function, an object or empty')
      }

      (self.constructor as any).__emit()
    }
 
  Object.assign(self, base)

  return [self, update]
}

function initStore2<S extends object, T extends Object>(initialState: S, base: T):
  [T & { state: S }, (updater: Updater2<S>) => void] {

  return null as any
}

function createEmptyStore(): any {
  const
    Store: any = () => {},
    observers = [] as any[]

  let timeout: any = null

  Store.__subscribe = (subscriber: any) => {
    const observer = subscriber.bind(null)
    observers.push(observer)

    return () => {
      const idx = observers.indexOf(observer)
      observers.splice(idx, 1)
    }
  }

  Store.__emit = () => {
    if (!timeout) {
      timeout = setTimeout(() => {
        timeout = null

        const obs = [...observers]

        for (let i = 0; i < obs.length; ++i) {
          obs[i]()
        }
      }, 0)
    }
  }

  return new Store 
}

export default initStore
