export default function observeStore<T>(store: T, observer: (store: T) => void): () => void {
  if (process.env.NODE_ENV === 'development' as any) {
    const invalid =
      store === null
        || typeof store !== 'object'
        || !(store as any).constructor
  
    if (invalid) {
      throw new Error('[observeStore] First argument store must be a valid store')
    }
  }

  return (store as any).constructor.__subscribe(observer)
}
