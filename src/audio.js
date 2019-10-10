var audio = {
    music: null,
    track1: "./music/jazz_music.wav",

    play: function (trackPath) {
        if (audio.music != null) {

            audio.music.pause();
            audio.music.src = "";
        }

        audio.music = new Audio(trackPath);        
        audio.music.muted = false;
        audio.music.volume = 0.3;
        audio.music.addEventListener('ended', function() {
            this.currentTime = 0;
            this.play();
        }, false);
        audio.music.play();

        //const playPromise = audio.music.play();
        /*if (playPromise !== null){
            playPromise.catch(() => { audio.music.play(); })
        }*/
    },

    setVolume: function (volume) {
        if (audio.music != null) {
            let futureVolume = audio.music.volume + volume;            
            if ((0 <= futureVolume) && (futureVolume <= 1.0)) {
                audio.music.volume = futureVolume;
                return true;
            }
        }
        return false;
    },
   

};