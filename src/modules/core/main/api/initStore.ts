type Updater1<T extends object> = Partial<T> |  (() => void) 
type Updater2<S extends object> = Partial<S> | ((oldState: S) => Partial<S>)
type Methods = Record<string, (...args: any[]) => any> & { state?: never } 

function initStore<T extends object>(base: T): [T, (updater?: Updater1<T> | null) => void]

function initStore<S extends object, T extends Methods>(initialState: S, base: T):
  [T & { state: S }, (updater: Updater2<S>) => void]

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
    [self, emit] = createEmptyStore(),

    update = (updater?: Updater1<T> | null) => {
      if (typeof updater === 'function') {
        updater()
      } else if (updater !== null && typeof updater === 'object') {
        Object.assign(self, updater)
      } else if (updater !== undefined && updater !== null) {
        throw new TypeError('Illegal first argument for update function '
          + '- must be a function, an object or empty')
      }

      emit()
    }

  Object.assign(self, base)
  
  return [self, update]
}

function initStore2<S extends object, T extends Methods>(initialState: S, base: T):
  [T & { state: S }, (updater: Updater2<S>) => void] {

  let updaters: Updater2<S>[] = []

  const
    [self, emit] = createEmptyStore(),

    update = (updater: Updater2<S>) => {
      const typeOfUpdater = typeof updater

      if (updater !== null && (typeOfUpdater === 'function' || typeOfUpdater === 'object')) {
        updaters.push(updater)
      } else {
        throw new TypeError('Illegal first argument for update function '
          + '- must be a function or an object')
      }

      emit(() => {
        self.state = processUpdaters(updaters, self.state)
      })
    }

  Object.assign(self, base)
  self.state = { ...initialState }

  return [self, update]
}

function createEmptyStore(): [any, (runPrior?: () => void) => void] {
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

  function emit(runPrior?: () => void) {
    if (!timeout) {
      timeout = setTimeout(() => {
        timeout = null

        if (runPrior) {
          runPrior()
        }

        const obs = [...observers]

        for (let i = 0; i < obs.length; ++i) {
          obs[i]()
        }
      }, 0)
    }
  }

  return [new Store, emit] 
}

function processUpdaters(updaters: any[], oldState: any) {
  const ret = {...oldState}

  for (let i = 0; i < updaters.length; ++i) {
    const updater = updaters[i]
    Object.assign(ret, typeof updater === 'object' ? updater : updater(ret))
  }

  updaters.length = 0

  return ret
}

export default initStore
