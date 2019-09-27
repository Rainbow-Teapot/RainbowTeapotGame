var audio  = {
    music: null, 
    track1: "./music/jazz_music.wav", 

    play: function(trackPath){
        if(audio.music!= null){

            audio.music.pause(); 
            audio.music.src = "";
        }

        audio.music = new Audio (trackPath); 
        const playPromise  = audio.music.play();
        audio.music.muted = false;
        /*if (playPromise !== null){
            playPromise.catch(() => { audio.music.play(); })
        }*/
    }


};