import { lazy, Suspense, useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

const CharacterModel = lazy(() => import("./components/Character"));
const MainContainer = lazy(() => import("./components/MainContainer"));
const WorkPage = lazy(() => import("./pages/WorkPage"));
import { LoadingProvider } from "./context/LoadingProvider";

const HomePage = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Suspense>
      <MainContainer>
        {!isMobile && (
          <Suspense>
            <CharacterModel />
          </Suspense>
        )}
      </MainContainer>
    </Suspense>
  );
};

const App = () => {
  return (
    <LoadingProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/work"
            element={
              <Suspense>
                <WorkPage />
              </Suspense>
            }
          />
        </Routes>
      </BrowserRouter>
    </LoadingProvider>
  );
};

export default App;
