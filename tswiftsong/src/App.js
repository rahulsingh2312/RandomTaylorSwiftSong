import React, { useState } from 'react';
import axios from 'axios';
import YouTube from 'react-youtube';
import Background from "./components/Background/Background.tsx";
import ts_bg from "./background/ts_bg.png"
import ts_folk from "./background/folklore.png"


function RandomTaylorSwiftSong() {
  const [randomSong, setRandomSong] = useState('');
  const [videoId, setVideoId] = useState('');

  const getRandomSong = async () => {
    console.log('API Key:', process.env.REACT_APP_RAPIDAPI_KEY);

    const options = {
      method: 'GET',
      url: 'https://spotify23.p.rapidapi.com/artist_singles/',
      params: {
        id: '06HL4z0CvFAxyc27GXpf02',
        offset: '0',
        limit: '20',
      },
      headers: {
        'X-RapidAPI-Key': `${process.env.REACT_APP_RAPIDAPI_KEY}`,
        'X-RapidAPI-Host': 'spotify23.p.rapidapi.com',
      },
    };

    try {
      const response = await axios.request(options);
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

  const opts = {
    height: '390',
    width: '640',
    playerVars: {
      autoplay: 1, // Auto-play the video
    },
  };

  return (
    <main>
      <div
        className="h-screen p-16 bg-cover bg-center overflow-auto font-line"
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

export default RandomTaylorSwiftSong;
