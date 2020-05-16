import State from './State'
import Message from './Message'

type Store<S extends State, M extends Message> = {
  getState(): S,
  subscribe(listener: () => void): () => void,
}

export default Store
