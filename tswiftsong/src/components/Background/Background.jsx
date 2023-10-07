import ts from "../../background/ts_1989.svg";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import YouTube from 'react-youtube';
// import fs from 'fs'


export default function RandomTaylorSwiftSong() {
    const [randomSong, setRandomSong] = useState(`Taylor's Version `);
    const [videoId, setVideoId] = useState('');
  
    const getRandomSong = async () => {
    //   console.log('API Key:', process.env.REACT_APP_RAPIDAPI_KEY);
  
    //   const options = {
    //     method: 'GET',
    //     url: 'https://spotify23.p.rapidapi.com/artist_singles/',
    //     params: {
    //       id: '06HL4z0CvFAxyc27GXpf02',
    //       offset: '0',
    //       limit: '20',
    //     },
    //     headers: {
    //       'X-RapidAPI-Key': `${process.env.REACT_APP_RAPIDAPI_KEY}`,
    //       'X-RapidAPI-Host': 'spotify23.p.rapidapi.com',
    //     },
    //   };
  
  
      try {
        const response = await axios.get('/api/taylordata');
        const randomIndex = Math.floor(
          Math.random() * response.data.data.artist.discography.singles.items.length
        );
        const randomSongName =
          response.data.data.artist.discography.singles.items[randomIndex].releases.items[0].name;
        setRandomSong(randomSongName);
  
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
            console.log('YouTube Video ID:', videoId);
          })
          .catch((error) => {
            console.error('Error fetching YouTube video:', error);
          });
      } catch (error) {
        console.error(error);
      }
    };
    const [opts, setOpts] = useState({
        height: '390',
        width: getVideoWidth(),
        playerVars: {
          autoplay: 1, // Auto-play the video
        },
      });
      useEffect(() => {
        // Attach the resize event listener when the component mounts
        window.addEventListener('resize', handleResize);
    
        // Detach the resize event listener when the component unmounts
        return () => {
          window.removeEventListener('resize', handleResize);
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
 window.addEventListener('resize', function () {
    opts.width = getVideoWidth();
    // Reload the YouTube player with the new width
    // Assuming you have a reference to the YouTube player instance
    // player.setSize(opts.width, opts.height);
  });

      return (
        <div className="flex justify-center items-center rounded-xl border-2 border-[#2f6e8b] h-full w-full p-8"
             style={{
                 fill: 'linear-gradient(92deg, rgba(255, 255, 255, 0.25) -43.85%, rgba(217, 217, 217, 0.10) 55.97%)',
                 strokeWidth: '1px',
                 stroke: 'rgba(255, 255, 255, 0.60)',
                 backdropFilter: 'blur(16px)',
             }}>
            <div className="flex flex-col items-center justify-center gap-6">
                <div>
                    <div className="text-2xl sm:text-4xl font-bold text-pink-400 /90 text-center">{randomSong}</div>
                </div>
                {!videoId && (
  <img
    src={ts}
    alt="description"
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
                <button onClick={getRandomSong} className="bg-gradient-to-r from-[#1f5175] to-[#00344B]/80 border-2 border-[#2f6e8b]
                 text-[#DFE6E8] font-semibold rounded-md px-2 sm:px-4 sm:py-2 py-1 text-sm sm:text-xl hover:bg-[#00344B] hover:scale-110">
                    Get a Random Song
                </button>
            </div>

        </div>
    )
}

function getVideoWidth() {
    if (window.innerWidth >= 640) {
      // If the screen width is greater than or equal to 640 (laptop view)
      return '640';
    } else {
      // For smaller screens (mobile view), you can set a smaller width
      // Adjust this value as needed for your specific design
      return '360';
    }
  }

 