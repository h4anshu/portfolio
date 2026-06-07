import { lazy, Suspense, useState, useEffect } from "react";
import "./App.css";

const CharacterModel = lazy(() => import("./components/Character"));
const MainContainer = lazy(() => import("./components/MainContainer"));
import { LoadingProvider } from "./context/LoadingProvider";

const App = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <LoadingProvider>
        <Suspense>
          <MainContainer>
            {!isMobile && (
              <Suspense>
                <CharacterModel />
              </Suspense>
            )}
          </MainContainer>
        </Suspense>
      </LoadingProvider>
    </>
  );
};

export default App;
