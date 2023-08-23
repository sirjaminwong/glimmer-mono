import { useEffect } from "react"

import { useStorage } from "@plasmohq/storage/hook"


function TabManage() {
  const [favorites] = useStorage<string[]>("favorites", [])

  useEffect(() => {
  }, [])

  return (
    <div>
      wrwqetq
      {JSON.stringify(favorites)}
    </div>
  )
}

export default TabManage
