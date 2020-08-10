import { combineEpics } from 'redux-observable'
import Effect from './types/Effect'
import Effects from './types/Effects'
import State from './types/State'

export default function combineEffects<S extends State>(
  ...args: (Effect<S> | Effects<S> | Iterable<Effect<S>>)[]
): Effect<S> {
  const effects: Effect<S>[] = []

  for (let i = 0; i < args.length; ++i) {
    const eff = args[i]
    const type = typeof eff

    if (typeof eff === 'function') {
      effects.push(eff)
    } else if (typeof (eff as any)[Symbol.iterator] === 'function') {
      for (const eff2 of Array.from(eff as any) as any) {
        effects.push(eff2)
      }
    } else {
      for (const eff2 of Object.values(eff)) {
        effects.push(eff2)
      }
    }
  }

  return combineEpics.apply(null, effects)
}
