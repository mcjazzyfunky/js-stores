// external imports
import { produce } from 'immer'

// internal imports
import Handler from './types/Handler'

// --- createStore --------------------------------------------------

function createStore<S extends Record<string, any>>(handler: Handler<S, any>, initialState: S) {
  let
    observers: ((() => void) | null)[] = [],
    currState = initialState,
    isEmitting = false,
    hasUnsubscribesWhileEmitting = false

  const
    subscribe = (observer: () => void) => {
      const obs = observer.bind(null)

      observers.push(obs)

      return () => {
        const idx = observers.findIndex(it => it === obs)

        if (!isEmitting) {
          observers.splice(idx, 1)
        } else {
          observers[idx] = null
          hasUnsubscribesWhileEmitting = true
        }
      }
    },

    getState = () => currState,

    withDraft: any = () => {},

    ctrl = handler(withDraft),

    dispatch = (msg: any) => {
      if (msg && msg.type && typeof msg.type === 'string') {
        const type = msg.type

        if (ctrl.hasOwnProperty(type)) {
          const nextState = produce(currState,
            (draft: S) => ctrl[type](draft, msg.payload, msg.meta))

          if (nextState !== currState) {
            currState = nextState

            isEmitting = true
            hasUnsubscribesWhileEmitting = false

            for (let i = 0; i < observers.length; ++i) {
              const obs = observers[i]

              if (obs) {
                obs()
              }
            }

            if (hasUnsubscribesWhileEmitting) {
              observers = observers.filter(Boolean)
            }

            isEmitting = false
            hasUnsubscribesWhileEmitting = false
          }
        }
      }
    }

  return { subscribe, getState, dispatch }
}

// --- exports ------------------------------------------------------

export default createStore
