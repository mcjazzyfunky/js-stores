import Message from './Message'
import State from './State'

type Reducer<S extends State, M extends Message = any> =
  (state: S | undefined, msg: M) => S

export default Reducer
