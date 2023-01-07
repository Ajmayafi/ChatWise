import { createBrowserRouter, RouterProvider, Outlet, BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useContext } from "react";
import "./styles.scss";
import { SiteContext } from "./SiteContext";

import Welcome from "./pages/Welcome";
import Chat from "./pages/Chat";
import Sidebar from "./components/Sidebar";


function App() {
  const { user } = useContext(SiteContext)

  return (
    <div className="App">
      <div className="AppLayout">
   <Router>
   <Sidebar /> 
    <Routes>
      <Route 
      path="/"
      element={<div className="content"><Chat /></div>}
      />
    </Routes>
   </Router>
   </div>
    </div>
  );
}


export default App;
