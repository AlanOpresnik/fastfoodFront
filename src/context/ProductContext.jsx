import React, { createContext, useState } from "react";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {





    return (
        <ProductContext.Provider
          value={{}}
        >
          {children}
        </ProductContext.Provider>
      );
}