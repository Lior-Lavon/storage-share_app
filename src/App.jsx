import { Route, Routes } from "react-router-dom";
import { unstable_HistoryRouter as HistoryRouter } from "react-router-dom";

import { NotFound } from "./pages/index";
import history from "./utils/history";

function App() {
  return (
    <HistoryRouter history={history}>
      <Routes>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </HistoryRouter>
  );
}

export default App;
