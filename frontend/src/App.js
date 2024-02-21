import React from "react";
import RootRouters from "./routers/RootRouters";
import "./styles/global/_base.scss";

function App() {
  return (
    <div className="app-wrapper">
      <main className="content-wrapper">
        <RootRouters />
      </main>
    </div>
  );
}

export default App;
