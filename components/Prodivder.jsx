"use client"

import { SessionProvider } from 'next-auth/react';

const Prodivder = ({ children, session }) => {
  return (
    <SessionProvider session={session}>
      {children}
    </SessionProvider>
  )
}

export default Prodivder