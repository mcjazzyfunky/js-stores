// --- HandlerFactory -----------------------------------------------

type HandlerFactory<
  S extends Record<string, any>,
  T,
  D = {}
> =
  T extends {
    [k: string]:
      (...args: any[]) => { type: string, payload?: any, meta?: any }
    }
  ? (use: <R>(draft: S) => R, depencencies: D) => {
      [K in keyof Partial<T>]:
        T[K] extends (...args: any[]) => { type: string, payload: infer P, meta: infer M }
          ? (draft: S, payload: P, meta: M) => any 
          : T[K] extends (...args: any[]) => { type: string, payload: infer P }
          ? (draft: S, payload: P) => any 
          : T[K] extends (...args: any[]) => { type: string, meta: infer M }
          ? (draft: S, payload: undefined, meta: M) => any 
          : T[K] extends (...args: any[]) => { type: string }
          ? (draft: S) => any
          : never
    }
  : T extends {
      [k: string]: { type: string, payload?: any, meta?: any }
    }
  ? (use: <R>(draft: S) => R, dependencies: D) => {
      [K in keyof Partial<T>]:
        T[K] extends { type: string, payload: infer P, meta: infer M }
          ? (draft: S, payload: P, meta: M) => any 
          : T[K] extends { type: string, payload: infer P }
          ? (draft: S, payload: P) => any 
          : T[K] extends { type: string, meta: infer M }
          ? (draft: S, payload: undefined, meta: M) => any 
          : T[K] extends { type: string }
          ? (draft: S) => any
          : never
    }
  : never

// --- exports ------------------------------------------------------

export default HandlerFactory
