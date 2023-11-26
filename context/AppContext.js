import React from 'react'
import { AdvanceLinksProvider } from './AdvanceLink_SocialContext'
import { BarCodeProvider } from './BarCodeContext'

export function ContextProvider({ children }) {
  return (
    <AdvanceLinksProvider>
      <BarCodeProvider>{children}</BarCodeProvider>
    </AdvanceLinksProvider>
  )
}
