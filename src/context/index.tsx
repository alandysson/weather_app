import { createContext, ReactNode, useState } from "react";

type ContextProps = {
  long: number;
  lat: number;
  setLat: (lat: number) => void;
  setLong: (long: number) => void;
};

type MainContextProviderProps = {
  children: ReactNode;
};
const MainContext = createContext({} as ContextProps);

export const MainProvider = ({ children }: MainContextProviderProps) => {
  const [long, setLong] = useState<number>();
  const [lat, setLat] = useState<number>();
  return <MainContext.Provider value={{ lat, long, setLat, setLong }}>{children}</MainContext.Provider>;
};

export default MainContext;
