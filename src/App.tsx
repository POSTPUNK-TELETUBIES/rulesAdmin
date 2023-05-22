import { Container } from "@mui/material";

import { ColorModeWrapper } from "./theme";
import { NavBar } from "./components/NavBar";

import { Home } from "./pages/Home";
import { Suspense, lazy, useContext } from "react";
import { AuthContext } from "./context/auth";
import { CustomSkeleton } from "./components/CustomSkeleton";
import { SnackbarProvider } from "notistack";

const LazyAdminPanel = lazy(() => import("./pages/AdminPanel"));

function App() {
  const { isLogged, isLoading } = useContext(AuthContext);

  return (
    <SnackbarProvider>
      <ColorModeWrapper
        app={
          <>
            <NavBar />
            <Container sx={{ paddingTop: 12, minHeight: "100vh" }}>
              {isLoading && <CustomSkeleton />}
              {!isLogged && !isLoading ? (
                <Home />
              ) : (
                <Suspense fallback={<CustomSkeleton />}>
                  <LazyAdminPanel />
                </Suspense>
              )}
            </Container>
          </>
        }
      />
    </SnackbarProvider>
  );
}

export default App;
