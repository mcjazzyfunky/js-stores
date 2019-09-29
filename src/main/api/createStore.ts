// external imports
import { produce } from 'immer'

// internal imports
import HandlerCreator from './types/HandlerCreator'

// --- createStore --------------------------------------------------

function createStore<S extends Record<string, any>>(
  createHandler: HandlerCreator<S, any>,
  initialState: S
) {
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

    withDraft = (apply: (draft: S) => any) => {
      let ret: any

      const nextState = produce(currState,
        (draft: S) => void(ret = apply(draft)))

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

      return ret
    },

    ctrl = createHandler(withDraft as any), // TODO

    dispatch = (msg: any) => {
      if (msg && msg.type && typeof msg.type === 'string') {
        const type = msg.type

        if (ctrl.hasOwnProperty(type)) {
          withDraft(draft => ctrl[type](draft, msg.payload, msg.meta))
        }
      }
    }

  return { subscribe, getState, dispatch }
}

// --- exports ------------------------------------------------------

export default createStore
