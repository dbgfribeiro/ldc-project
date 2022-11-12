import React from "react";
import Camera from "./components/Camera";
import Messages from "./components/Camera/Messages";

function App() {
  return (
    <div className="app">
      <Messages />
      <Camera />
    </div>
  );
}

export default App;
