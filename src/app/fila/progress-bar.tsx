'use client'

import { Progress } from "@/components/ui/progress"
import { useEffect, useState } from "react"

export function ProgressBar() {

  const [value, setValue] = useState(0)

  useEffect(() => {
    if (value < 35) {
      const interval = setInterval(() => {
        setValue((prev) => Math.min(prev + 1, 35))
      }, 200)
      return () => clearInterval(interval)
    }
  }, [value])


  return <Progress className="h-4" value={value} />
}