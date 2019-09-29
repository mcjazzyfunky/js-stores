// external imports
import { produce } from 'immer'

// internal imports
import HandlerFactory from './types/HandlerFactory'

// --- createStore --------------------------------------------------

function createStore<S extends State>(
  createHandler: HandlerFactory<S, any>,
  initialState: S
): Store<S>

function createStore<S extends State, D>(
  createHandler: HandlerFactory<S, any, D>,
  initialState: S,
  dependencies: D
): Store<S> 

function createStore<S extends State, D = null>(
  createHandler: HandlerFactory<S, any, D>,
  initialState: S,
  dependencies?: D
): Store<S> {
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

    handler = (createHandler as any)(withDraft, dependencies), // TODO!!!!!

    dispatch = (msg: any) => {
      if (msg && msg.type && typeof msg.type === 'string') {
        const type = msg.type

        if (handler.hasOwnProperty(type)) {
          withDraft(draft => handler[type](draft, msg.payload, msg.meta))
        }
      }
    }

  return { subscribe, getState, dispatch }
}

// --- locals -------------------------------------------------------

type State = Record<string, any>

type Store<S extends State> = {
  getState(): S,
  subscribe(observer: () => void): () => void,
  dispatch(msg: any): void
}

// --- exports ------------------------------------------------------

export default createStore
