import { Observable } from 'rxjs'

import State from './State'

type Effect<S extends State> = (
  action$: Observable<any>,
  state$: Observable<S>,
  getState: () => S
) => Observable<any>

export default Effect
