import { useEffect, useState } from 'react'

// Generic async-content hook with loading + data state.
export function useContent(loader, deps = []) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true
    setLoading(true)
    Promise.resolve(loader())
      .then((res) => {
        if (active) setData(res)
      })
      .finally(() => {
        if (active) setLoading(false)
      })
    return () => {
      active = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  return { data, loading }
}
