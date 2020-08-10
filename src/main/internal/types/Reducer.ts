import State from '../../api/types/State'

type Reducer<S extends State> = (state: S | undefined, msg: any) => S

export default Reducer
