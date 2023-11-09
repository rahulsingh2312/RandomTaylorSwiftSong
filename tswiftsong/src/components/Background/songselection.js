export default function Songselection(artist , KanyeWestSongs ,randomSongName  , setRandomSongvisible , setRandomSong){ 
    let lengthofsong;
        switch(artist){
          case "Kanye West":
            lengthofsong = KanyeWestSongs.length;
            break; 
        };
        const randomIndex = Math.floor(
          Math.random() *
            lengthofsong
        );
        console.log(randomIndex)
        switch(artist){
          case "Kanye West":
         randomSongName = KanyeWestSongs[randomIndex] + "kanye west";
        setRandomSongvisible(KanyeWestSongs[randomIndex]);
        break;
        };

        console.log(randomSongName)
        setRandomSong(randomSongName);
    }