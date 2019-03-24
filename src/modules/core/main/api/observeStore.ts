export default function observeStore<T>(store: T, observer: (store: T) => void): () => void {
  let
    invalid = store === null
      || typeof store !== 'object'
      || !(store as any).constructor,
    
    subscribe: any = invalid
      ? null
      : (store as any).constructor.__subscribe
 
  if (invalid) {
    throw new Error('[observeStore] First argument store must be a valid store')
  }

  return subscribe(observer)
}
