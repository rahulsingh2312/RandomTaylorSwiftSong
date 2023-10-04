import React, { useState } from 'react';
import axios from 'axios';
import YouTube from 'react-youtube';

function RandomTaylorSwiftSong() {
  const [randomSong, setRandomSong] = useState('');
  const [videoId, setVideoId] = useState('');
  const [error, setError] = useState('');

  // Function to fetch a random Taylor Swift song and its corresponding YouTube video
  const getRandomSong = async () => {
    try {
      // Call the Spotify API to get Taylor Swift songs
      const response = await axios.get('https://spotify23.p.rapidapi.com/artist_singles/', {
        params: {
          id: '06HL4z0CvFAxyc27GXpf02',
          offset: '0',
          limit: '20',
        },
        headers: {
          'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY, // Store your API key in an environment variable
          'X-RapidAPI-Host': 'spotify23.p.rapidapi.com',
        },
      });

      // Get a random song
      const songs = response.data.data.artist.discography.singles.items;
      const randomIndex = Math.floor(Math.random() * songs.length);
      const randomSongName = songs[randomIndex].releases.items[0].name;
      setRandomSong(randomSongName);

      // Search for the YouTube video using the song name
      const apiKey = process.env.REACT_APP_YOUTUBE_API_KEY; // Store your YouTube API key in an environment variable
      const searchUrl = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&q=${encodeURIComponent(
        randomSongName
      )}&type=video`;

      const youtubeResponse = await axios.get(searchUrl);
      const videoId = youtubeResponse.data.items[0].id.videoId;
      setVideoId(videoId);
    } catch (error) {
      setError('Error fetching data. Please try again.');
      console.error('Error:', error);
    }
  };

  const opts = {
    height: '390',
    width: '640',
    playerVars: {
      autoplay: 1,
    },
  };

  return (
    <div className='wrapper'>
      <button onClick={getRandomSong} className='butt'>
        Get Random Taylor Swift Song
      </button>
      <div className='paragraph'>{error || randomSong}</div>
      {videoId && <YouTube videoId={videoId} opts={opts} />} {/* Embed the YouTube video */}
    </div>
  );
}

export default RandomTaylorSwiftSong;
