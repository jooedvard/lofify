import React, { Suspense, useEffect, useState } from "react";
import Libary from "./components/Libary/Libary";
import Player from "./components/Musicplayer/Player";
import music from "./constant/music";


function App() {

  const [song, setSong] = useState(music[0]);


  let isSong = song != null;

  return (
    <div className="App">
      {isSong && < Player song={song} setSong={setSong} ></Player>}
      <Libary setSong={setSong} />
    </div>
  );
}

export default App;
