import { Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./Components/Layout/Layout";
import Body from "./Components/Body/Body";

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={<Layout />}
        >
          <Route
            index
            element={<Body />}
          />
        </Route>
      </Routes>
      <div className="background">
        <div className="bg-wave"></div>
        <div className="bg-wave"></div>
        <div className="bg-wave"></div>
      </div>
    </>
  );
}

export default App;
