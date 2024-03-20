// app/providers.tsx
'use client'

import { NextUIProvider } from '@nextui-org/react'
import { SessionProvider } from 'next-auth/react'

export function Providers({children}: { children: React.ReactNode }) {
  return (
    <SessionProvider>
        <NextUIProvider>
          {children}
        </NextUIProvider>
    </SessionProvider>
  )
}

//? Many components in NextUI, requires state to work properly. 
//? All states in the project are managed by React Context.  
//? This NextUI provider is a kind of mechanism that all this state throughout all the different NextUI components.  
//? So, all different type of states and event handlers are shared across all components we are using. 