import { Route, Routes } from "react-router-dom";
import { routes } from "./routes";
import { ComponentRoute } from "./types/index";
import { AppHeader } from "./cmps/AppHeader";

function App() {
  return (
    <div className="App">
      <AppHeader />
      <Routes>
        {routes.map((route: ComponentRoute, idx: number) => (
          <Route key={idx} path={route.path} element={<route.component />} />
        ))}
      </Routes>
    </div>
  );
}

export default App;
