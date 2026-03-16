import { createContext } from "react";

const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
    const contextValue = {
        
    }
  return <AppContext.Provider value={{}}>{children}</AppContext.Provider>;
};
