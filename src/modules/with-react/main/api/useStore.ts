import React from 'react'

const { useEffect, useState } = React

function useStore<T extends { subscribe(subscriber: () => void): void }>(create: () => T): T {
   const [{ store }, set] = useState(() => ({ store: create() }))

    useEffect(() => {
      return store.subscribe(() => set({ store }))
    }, [])

   return store
}

export default useStore
