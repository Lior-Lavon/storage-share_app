import { Route, Routes } from "react-router-dom";
import { unstable_HistoryRouter as HistoryRouter } from "react-router-dom";

import { Landing, NotFound, ProtectiveRoute } from "./pages/index";
import history from "./utils/history";

function App() {
  return (
    <HistoryRouter history={history}>
      <Routes>
        <Route
          path="/"
          element={<ProtectiveRoute>{/* <Dashboard /> */}</ProtectiveRoute>}
        >
          {/* <Route index element={<StartPage />} /> */}
        </Route>
        <Route path="/landing" element={<Landing />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </HistoryRouter>
  );
}

export default App;
