import { createStore as createReduxStore, Store } from 'redux'
import Message from '../internal/types/Message'
import Reducer from '../internal/types/Reducer'
import State from '../internal/types/State'

export default function createStore<S extends State, M extends Message = any>(
  reducer: Reducer<S, M>,
  initialState: S
): Store<S, M> {
  return createReduxStore(reducer, initialState as any)
}
