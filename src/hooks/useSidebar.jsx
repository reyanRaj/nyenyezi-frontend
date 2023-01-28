import { createContext, useContext, useMemo } from "react";
import { useState } from "react";

const SidebarContext = createContext();

export const SidebarProvider = ({ children }) => {
  const [showSidebar, setshowSidebar] = useState(true);

  const setSidebar = (show) => {
    setshowSidebar(show);
  };

  const value = useMemo(
    () => ({
      sidebar: showSidebar,
      setSidebar,
    }),
    [showSidebar]
  );

  return (
    <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>
  );
};

export const useSidebar = () => {
  return useContext(SidebarContext);
};
