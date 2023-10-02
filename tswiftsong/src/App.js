import React, { useState } from 'react';
import axios from 'axios';
function RandomTaylorSwiftSong() {
  const [randomSong, setRandomSong] = useState('');

  const getRandomSong = async () => {
    const options = {
      method: 'GET',
      url: 'https://spotify23.p.rapidapi.com/artist_singles/',
      params: {
        id: '06HL4z0CvFAxyc27GXpf02',
        offset: '0',
        limit: '20'
      },
      headers: {
        'X-RapidAPI-Key': process.env.REACT_APP_RAPIDAPI_KEY,
        'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
      }
    };

    try {
      const response = await axios.request(options);
      const randomIndex = Math.floor(Math.random() * response.data.data.artist.discography.singles.items.length);
      const randomSongName = response.data.data.artist.discography.singles.items[randomIndex].releases.items[0].name;
      setRandomSong(randomSongName);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <button onClick={getRandomSong}>Get Random Taylor Swift Song</button>
      <p>{randomSong}</p>
    </div>
  );
}

export default RandomTaylorSwiftSong;
