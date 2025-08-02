'use client'

import { useEffect, useState } from "react"
import ProModal from "./pro-modal";

const ProModalProvider = () => {
  const [mounted, SetMounted] = useState(false);

  useEffect(() => {
    SetMounted(true);
  }, [])

  if (!mounted) return null;

  return (
    <div>
      <ProModal />
    </div>
  )
}

export default ProModalProvider
