"use client";

import { persistor } from "./store";
import { ReactNode } from "react";
import { PersistGate } from "redux-persist/integration/react";


interface ClientProviderProps {
  children: ReactNode;
}

export function ClientPersistGate({ children }: ClientProviderProps)
{      
  return (
    <PersistGate loading={<p>Loading Redux...</p>} persistor={persistor}>
      {children}
    </PersistGate>
  );
}