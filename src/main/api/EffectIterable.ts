import { Observable } from 'rxjs'
import Effect from './types/Effect'
import State from './types/State'

const EFFECT_IDENTIFIER = 'js-stores:effect'

export default abstract class EffectsIterable<S extends State>
  implements Iterable<Effect<S>> {
  getEffects(): Effect<S>[] {
    const ret: Effect<S>[] = []

    for (const value of Object.entries(this)) {
      if (typeof value === 'function' && value[EFFECT_IDENTIFIER] === this) {
        ret.push(value)
      }
    }

    return ret
  }

  [Symbol.iterator]() {
    return this.getEffects().values()
  }

  protected effect(
    f: (action$: Observable<any>, state$: Observable<S>) => Observable<any>
  ): Effect<S> {
    const ret = f.bind(null)

    Object.defineProperty(ret, EFFECT_IDENTIFIER, {
      value: this
    })

    return ret
  }
}
