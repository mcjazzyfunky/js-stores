import State from '../../api/types/State'

type Store<S extends State> = {
  dispatch(msg: any): void
  getState(): S
  subscribe(listener: () => void): () => void
}

export default Store
