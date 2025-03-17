"use client";

import { Box } from "@mui/material";
import { persistor } from "./store";
import { ReactNode } from "react";
import { PersistGate } from "redux-persist/integration/react";


interface ClientProviderProps {
  children: ReactNode;
}

export function ClientPersistGate({ children }: ClientProviderProps)
{      
  return (
    <PersistGate 
    loading={<Box sx={{
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column",
                    alignItems: "center",
                    backgroundImage: 'url(/fightArena.jpg)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center center',
                    backgroundRepeat: 'no-repeat',
                    height: '100vh',
                    width: '100%',
                  }}
              />}
      persistor={persistor}>
      {children}
    </PersistGate>
  );
}