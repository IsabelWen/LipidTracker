// Imports
import Home from "./pages/home/home";
import Login from "./pages/login/login";
import Newresults from "./pages/newresults/newresults";
import Results from "./pages/results/results";
import FAQ from "./pages/faq/faq";
import Settings from "./pages/settings/settings";
import Notes from "./pages/notes/notes";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// Main
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="results">
              <Route index element={<Results />} />
              <Route path="newresults" element={<Newresults title="Add New Test Result" />} />
            </Route>
            <Route path="notes">
              <Route index element={<Notes />} />
            </Route>
            <Route path="faq">
              <Route index element={<FAQ />} />
            </Route>
            <Route path="settings">
              <Route index element={<Settings />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
