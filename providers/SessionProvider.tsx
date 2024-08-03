'use client';

import { SessionProvider } from 'next-auth/react';
import React, { FC, ReactNode } from 'react'

const Provider: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <SessionProvider>
        {children}
    </SessionProvider>
  )
}

export default Provider;
