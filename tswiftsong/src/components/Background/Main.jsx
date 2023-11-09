import React, { useState, useEffect } from "react";
import axios from "axios";
import YouTube from "react-youtube";
import KanyeWestSongs from "../../data/kanyedata";
import Songselection from "./songselection";
// import fs from 'fs'

export default function RandomTaylorSwiftSong() {
  const [randomSong, setRandomSong] = useState("");
const [randomSongvisible , setRandomSongvisible] = useState("");
  const [videoId, setVideoId] = useState("");
  const [artist, setArtist] = useState("Taylor Swift");
  const ts = "/Taylor Swift.webp";
  const kw = `/Kanye West.webp`;
  const ts_bg = "/ts_bg.webp";
  const kw_bg = "/kw_bg.webp";

  const getRandomSong = async () => {
    try {
      let randomSongName = null;
      if(artist=="Taylor Swift"){
      const response = await axios.get(
        "https://server-9nb0.onrender.com/api/taylordata"
      );
      const randomIndex = Math.floor(
        Math.random() *
          response.data.data.artist.discography.singles.items.length
      );
       randomSongName =
        response.data.data.artist.discography.singles.items[randomIndex]
          .releases.items[0].name;
      setRandomSong(randomSongName);
      console.log(randomSongName)
      }else{
        Songselection(artist , KanyeWestSongs ,randomSongName ,setRandomSong , setRandomSongvisible)
      }
      // Fetch the YouTube video here using the song title
      const apiKey = `${process.env.REACT_APP_YOUTUBE_API_KEY}`;
      const searchUrl = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&q=${encodeURIComponent(
        randomSongName
      )}&type=video`;

      axios
        .get(searchUrl)
        .then((response) => {
          // Handle the response and extract the video ID
          const videoId = response.data.items[0].id.videoId;
          setVideoId(videoId);
          console.log("YouTube Video ID:", videoId);
        })
        .catch((error) => {
          console.error("Error fetching YouTube video:", error);
        });
    } catch (error) {
      console.error(error);
    }
  };
  const [opts, setOpts] = useState({
    height: "590",
    width: getVideoWidth(),
    playerVars: {
      autoplay: 1, // Auto-play the video
    },
  });
  useEffect(() => {
    // Attach the resize event listener when the component mounts
    window.addEventListener("resize", handleResize);

    // Detach the resize event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleResize = () => {
    // Update the player width when the window is resized
    setOpts((prevOpts) => ({
      ...prevOpts,
      width: getVideoWidth(),
    }));
  };
  // Add an event listener to update the video width on window resize
  window.addEventListener("resize", function () {
    opts.width = getVideoWidth();
  });

  return (
    <div
      className=" h-screen p-8 sm:p-16 bg-cover bg-center overflow-auto font-line justify-center items-center"
      style={{
        backgroundImage: `url(${artist == "Taylor Swift" ? ts_bg : kw_bg})`,
        backgroundRepeat: "no-repeat",
      }}
    >
      <div
        className="flex justify-center bg-gray-950 bg-opacity-50 items-center rounded-xl border border-[#737373] h-auto w-full p-8"
        style={{
          fill: "linear-gradient(92deg, rgba(255, 255, 255, 0.25) -43.85%, rgba(217, 217, 217, 0.10) 55.97%)",
          strokeWidth: "1px",
          stroke: "rgba(255, 255, 255, 0.60)",
          backdropFilter: "blur(0px)",
        }}
      >
        <div className=""></div>
        <div className="flex flex-col items-center justify-center gap-6">
          <div>
          <select
              value={artist}
              onChange={(e) => setArtist(e.target.value)}
              
              className="transition xl:ml-10 ease-in-out w-40 duration-700 text-white bg-gray-700 hover:bg-blue-800 items-center  pl-4 h-10 mb-4 font-medium text-sm dark:bg-opacity-60 dark:hover:bg-gray-900 dark:focus:ring-blue-800"
            >

              <option value="Taylor Swift">Taylor Swift</option>
              <option value="Kanye West">Kanye West</option>
            </select>
            <div className="text-2xl sm:text-4xl font-bold text-pink-400 /90 text-center">
              
            {videoId && randomSongvisible}
            {!videoId && artist=="Kanye West" && <h1>Kanye's version</h1> }
            {!videoId && artist=="Taylor Swift" && <h1> Taylor's version</h1> }
            </div>
          </div>
          {!videoId && (
            <img
              src={artist === "Taylor Swift" ? ts : kw}
              alt="Artist"
              height={190}
              width={190}
            />
          )}
          {/*use api to fetch the album images*/}
          {/* <img src={ts} alt="description"
                     height={190}
                     width={190}
                /> */}
          {videoId && <YouTube videoId={videoId} opts={opts} />}
          <button
            onClick={getRandomSong}
            className="transition ease-in duration-200 bg-gradient-to-r from-[#1f5175] to-[#00344B]/80 border-2 border-[#2f6e8b]
                 text-[#DFE6E8] font-semibold rounded-md px-2 sm:px-4 sm:py-2 py-1 text-sm sm:text-xl hover:bg-[#00344B] hover:scale-110"
          >
            Get a Random Song
          </button>
        </div>
      </div>
    </div>
  );
}

function getVideoWidth() {
  if (window.innerWidth >= 640) {
    // If the screen width is greater than or equal to 640 (laptop view)
    return "640";
  } else {
    // For smaller screens (mobile view), you can set a smaller width
    // Adjust this value as needed for your specific design
    return "300";
  }
}
