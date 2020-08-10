import { createStore as createReduxStore, Store } from 'redux'
import { createEpicMiddleware } from 'redux-observable'
import Reducer from '../internal/types/Reducer'
import State from './types/State'
import Effect from './types/Effect'

const EMPTY_OBJ = Object.freeze({})

export default function createStore<S extends State, D extends object = {}>(
  reducer: Reducer<S>,
  initialState?: S,
  effect?: Effect<S> | null,
  deps?: D
): Store<S> {
  let middleware: any

  if (effect) {
    middleware = createEpicMiddleware({
      dependencies: deps || EMPTY_OBJ
    })
  }

  let ret = createReduxStore(reducer, initialState as any, middleware)

  if (effect) {
    middleware.run(effect)
  }

  return ret
}
