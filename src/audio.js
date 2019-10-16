var audio = {
    music: null,
    track1: "./music/jazz_music.wav",
    trackMenu: "./music/main_theme.mp3",
    trackDefeat: "./music/defeat_theme.mp3",
    trackVictory: "./music/victory_theme_high.mp3",
    trackLevel1: "./music/level_1.mp3",

    play: function (trackPath) {
        if (audio.music != null) {

            audio.music.pause();
            audio.music.src = "";
        }

        audio.music = new Audio(trackPath);
        audio.music.muted = false;
        audio.music.volume = 0.5;

        if ((trackPath === audio.trackDefeat) || (trackPath === audio.trackVictory)) {
            audio.music.play();
            
        }
        else {
            audio.music.addEventListener('ended', function () {
                this.currentTime = 0;
                this.play();
            }, false);
            audio.music.play();
        }

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