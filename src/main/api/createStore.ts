// external imports
import { produce } from 'immer'

// internal imports
import Handler from './types/Handler'

// --- createStore --------------------------------------------------

function createStore<S extends Record<string, any>>(handler: Handler<S, any>, initialState: S) {
  let currState = initialState

  const
     observers: (() => void)[] = [],

    subscribe = (observer: () => void) => {
      const obs = observer.bind(null)

      observers.push(obs)

      return () => {
        const idx = observers.findIndex(it => it === obs)

        observers.splice(idx, 1)
      }
    },

    getState = () => currState,

    withDraft: any = () => {},

    ctrl = handler(withDraft),

    dispatch = (msg: any) => {
      if (msg && msg.type && typeof msg.type === 'string') {
        const type = msg.type

        if (handler.hasOwnProperty(type)) {
          const nextState = produce(currState,
            (draft: S) => ctrl[type](draft, msg.payload, msg.meta))

          if (nextState !== currState) {
            currState = nextState

            const observers2 = [...observers] // TODO

            for (let i = 0; i < observers2.length; ++i) {
              observers2[i]()
            }
          }
        }
      }
    }

  return { subscribe, getState, dispatch }
}

// --- exports ------------------------------------------------------

export default createStore
