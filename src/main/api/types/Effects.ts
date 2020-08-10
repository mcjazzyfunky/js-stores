import Effect from './Effect'
import State from './State'

type Effects<S extends State> = Record<string, Effect<S>>

export default Effects
