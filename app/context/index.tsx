"use client"

import React, { createContext, useContext, useState } from "react";
import { CartProduct } from "../types";

interface AppContextType {
    state: CartProduct[];
    setState: React.Dispatch<React.SetStateAction<CartProduct[]>>;
  }

  const AppContext = createContext<AppContextType | undefined>(undefined);


export function AppWrapper({ children }: {
    children: React.ReactNode;
}) {

    const [state, setState] = useState<CartProduct[]>([]);

    return (

        <AppContext.Provider value={{
            state, setState
        }}>
            {children}
        </AppContext.Provider>

    )

}

export function useAppContext() {
    
    const context = useContext(AppContext);
    if (!context) {
      throw new Error("useAppContext must be used within an AppWrapper");
    }
    
    return context;
  }