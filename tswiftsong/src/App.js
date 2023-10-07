// import React, { useState } from 'react';
// import axios from 'axios';
// import YouTube from 'react-youtube';
import Background from "./components/Background/Background.jsx";
import ts_bg from "./background/ts_bg.png"
// import ts_folk from "./background/folklore.png"



function main() {

  return (
    <main>
      <div
        className="h-screen p-8 sm:p-16 bg-cover bg-center overflow-auto font-line"
        style={{
          backgroundImage: `url(${ts_bg})`,
          backgroundRepeat: 'no-repeat',
        }}
      >
        <Background className=""/>
      </div>
    </main>



  );
}

export default main;
