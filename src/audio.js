var audio  = {
    music: null, 
    track1: "./music/jazz_music.wav", 

    play: function(trackPath){
        if(audio.music!= null){

            audio.music.pause(); 
            audio.music.src = "";
        }

        audio.music = new Audio (trackPath); 
        audio.music.play(); 
    }


};