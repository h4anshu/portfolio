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
  // Loading progress normally advances via the 3D character's load callback
  // (see Scene.tsx). Mobile CSS doesn't need the Loading component's reveal
  // effects at all, so it skips mounting Loading entirely. Desktop-width
  // low-power devices still skip the character, but their layout depends on
  // Loading's own completion effect (initialFX: unpauses ScrollSmoother,
  // enables scroll, reveals hero text) — so Loading must still mount and
  // just start already at 100% instead of waiting on a callback that will
  // never fire.
  const isMobile = window.innerWidth < 768;
  const [isLoading, setIsLoading] = useState(!isMobile);
  const [loading, setLoading] = useState(
    isMobile || isLowPowerDevice() ? 100 : 0
  );

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
