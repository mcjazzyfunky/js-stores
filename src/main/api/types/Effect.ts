import { Observable } from 'rxjs'

import State from './State'

type Effect<S extends State, D extends object = {}> = (
  action$: Observable<any>,
  state$: Observable<S>,
  getState: () => S,
  deps: D
) => Observable<any>

export default Effect
