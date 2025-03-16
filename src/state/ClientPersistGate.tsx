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
    <PersistGate loading={null} persistor={persistor}>
      {children}
    </PersistGate>
  );
}