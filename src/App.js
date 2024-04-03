// Import pages
import Home from "./pages/home/home";
import Login from "./pages/login/login";
import Newresults from "./pages/newresults/newresults";
import Results from "./pages/results/results";
import FAQ from "./pages/faq/faq";
import Settings from "./pages/settings/settings";

// Imports
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { resultsInputs } from "./formSource";
import { useContext } from "react";
import { AuthContext } from "./context/authContext";

// Main
function App() {
  const {currentUser} = useContext(AuthContext)
  
  const RequireAuth = ({children}) => {
    return currentUser ? (children) : <Navigate to="/login" />;
  };

  //console.log(currentUser);

  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route path="login" element={<Login />} />
            <Route index element={<RequireAuth><Home /></RequireAuth>} />
            <Route path="login" element={<Login />} />
            <Route path="results">
              <Route index element={<RequireAuth><Results /></RequireAuth>} />
              <Route path="newresults" element={<RequireAuth><Newresults inputs={resultsInputs} title="Add New Test Result" /></RequireAuth>} />
            </Route>
            <Route path="faq">
              <Route index element={<RequireAuth><FAQ /></RequireAuth>} />
            </Route>
            <Route path="settings">
              <Route index element={<RequireAuth><Settings /></RequireAuth>} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
