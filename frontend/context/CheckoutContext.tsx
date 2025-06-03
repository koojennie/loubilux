"use client"
import { createContext, useContext, useState } from 'react';

interface CheckoutContextType {
  checkoutData: any;
  setCheckoutData: React.Dispatch<React.SetStateAction<any>>;
}

const CheckoutContext = createContext<CheckoutContextType | undefined>(undefined);

export const useCheckout = () => useContext(CheckoutContext);

export const CheckoutProvider = ({ children }: { children: React.ReactNode }) => {
  const [checkoutData, setCheckoutData] = useState(null);

  return (
    <CheckoutContext.Provider value={{ checkoutData, setCheckoutData }}>
      {children}
    </CheckoutContext.Provider>
  );
};
