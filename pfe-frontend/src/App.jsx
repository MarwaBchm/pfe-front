import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./plugins/routes";

function App() {
  return (
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <div className="z-0">
        <AppRoutes />
      </div>
    </BrowserRouter>
  );
}

export default App;
