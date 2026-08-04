import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import Loading from "../components/Loading";
import isLowPowerDevice from "../components/utils/deviceCapability";

interface LoadingType {
  isLoading: boolean;
  setIsLoading: (state: boolean) => void;
  setLoading: (percent: number) => void;
}

export const LoadingContext = createContext<LoadingType | null>(null);

export const LoadingProvider = ({ children }: PropsWithChildren) => {
  // Loading progress only advances via the 3D character's load callback
  // (see Scene.tsx), so anywhere that character is skipped must also skip
  // the loading screen or it hangs forever waiting for a callback that
  // never fires.
  const skipsCharacter = window.innerWidth < 768 || isLowPowerDevice();
  const [isLoading, setIsLoading] = useState(!skipsCharacter);
  const [loading, setLoading] = useState(skipsCharacter ? 100 : 0);

  const value = {
    isLoading,
    setIsLoading,
    setLoading,
  };
  useEffect(() => {}, [loading]);

  return (
    <LoadingContext.Provider value={value as LoadingType}>
      {isLoading && <Loading percent={loading} />}
      <main className="main-body">{children}</main>
    </LoadingContext.Provider>
  );
};

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }
  return context;
};
