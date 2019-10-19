var audio = {
    music: null,
    track1: "./music/jazz_music.wav",
    trackMenu: "./music/main_theme_media_intro.mp3",
    trackDefeat: "./music/defeat_theme.mp3",
    trackVictory: "./music/victory_theme_high.mp3",
    trackLevel1: "./music/level_1.mp3",
    trackLevel2: "./music/level_2.mp3",
    trackLevel3: "./music/level_3.mp3",

    soundEffect: null,
    effectDamage: "./music/soundEffects/damage.mp3",
    effectDoor: "./music/soundEffects/door1.mp3",
    effectBridge: "./music/soundEffects/drawbridge.mp3",
    effectLife: "./music/soundEffects/extra_life_celesta.mp3",
    effectSpoon: "./music/soundEffects/spoon.mp3",
    effectJump: "./music/soundEffects/jump.mp3",
    effectKey: "./music/soundEffects/key.mp3",
    effectLever: "./music/soundEffects/lever.mp3",
    effectTea: "./music/soundEffects/tea.mp3",

    play: function (trackPath) {

        if (audio.music != null) {
            audio.music.pause();
            audio.music.src = "";
            
        }
        audio.music = new Audio(trackPath);
        audio.music.muted = false;
        audio.music.volume = Game.volume;      

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
                Game.volume = futureVolume; 
                audio.music.volume = futureVolume;
                return true;
            }
        }
        return false;
    },

    playEffect: function (effectSound) {
        console.log("PLay " + effectSound);
        /*if (audio.soundEffect != null) {
            audio.soundEffect.pause();
            //audio.soundEffect.src = "";
        }  */      

        audio.soundEffect = new Audio(effectSound);
        audio.soundEffect.muted = false;        
        audio.soundEffect.volume = Game.effectsVolume; 

        audio.soundEffect.play();
    }

};