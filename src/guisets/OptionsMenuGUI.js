function OptionsMenuGUI(scene) {
    GUISet.call(this, scene);
    this.create();
    this.TEXT_OFFSET_Y = 0;
}

OptionsMenuGUI.prototype = Object.create(GUISet.prototype);
OptionsMenuGUI.prototype.constructor = OptionsMenuGUI;

OptionsMenuGUI.prototype.create = function () {

    let viewportMiddleX = viewport.width / 2;

    let bgMenu = new Background(this.scene, "bgMenu", 0, 0, 0);

    //tablero
    let board = new GUIImage(this.scene, "board", viewport.width / 2, 125, 0, 0, 0, 0);
    board.pos.x -= board.width / 2;

    //boton de ir para atras
    let buttonBackSprite = new GUIImage(this.scene, "botonVolver", 50, 50, 0, 0, 114, 52, 0);
    let goMainMenu = function () {

        Game.changeScene(new MenuScene(20 * Game.TILE_SIZE, 20 * Game.TILE_SIZE));
    };
    let buttonBack = new Button(this.scene, 25, 25, 0, buttonBackSprite, goMainMenu);

    //texto OPCIONES
    let textOptions = new Text(this.scene, i18n.translate(Game.lang, "options"), viewportMiddleX, 120, "60px CartoonRegular");
    //texto volumen
    let textVolume = new Text(this.scene, i18n.translate(Game.lang, "volume"), viewportMiddleX, 170, "40px CartoonRegular");

    let buttonReduceVolumeSprite = new GUIImage(this.scene, "flechaIzq", 50, 50, 0, 0, 114, 52, 0);
    let buttonIncrementVolumeSprite = new GUIImage(this.scene, "flechaDer", 50, 50, 0, 0, 114, 52, 0);
    let buttonVolumeLine = new GUIImage(this.scene, "volumeLine", viewportMiddleX - 109, 225, 0, 0, 0, 0, 0);


    let incrementVolume = function () {
        if (Game.volume != 0) {
            if (audio.setVolume(0.1))
                teapotVolumeSprite.pos.x += 0.1 * 150;
        }
    }
    let decrementVolume = function () {
        if (Game.volume != 0) {
            if (audio.setVolume(-0.1))
                teapotVolumeSprite.pos.x -= 0.1 * 150;
        }

    };

    //botones opciones musica
    let buttonVolumeUp = new Button(this.scene, viewportMiddleX + 95, 208, 0, buttonIncrementVolumeSprite, incrementVolume);
    let buttonVolumeDown = new Button(this.scene, viewportMiddleX - 130, 208, 0, buttonReduceVolumeSprite, decrementVolume);
    buttonVolumeUp.vel = 0;
    buttonVolumeDown.vel = 0;
    if (audio.music != null) {
        if (!audio.music.muted || Game.volume != 0) {
            var teapotVolumeSprite = new GUIImage(this.scene, "teapotVolume", viewportMiddleX - 110 + (audio.music.volume * 180), 200, 0, 0, 0, 0);
        }
    }


    let tab = 64;
    if (Game.lang === i18n.eng) {
        tab = 50;
    }

    //texto idioma
    let textLanguage = new Text(this.scene, i18n.translate(Game.lang, "lang"), viewportMiddleX - tab, 300, "40px CartoonRegular");
    //tetera idioma
    let buttonTeapotSprite;

    if (Game.lang === i18n.eng)
        buttonTeapotSprite = new GUIImage(this.scene, "teapotEsp", 40, 40, 0, 0, 114, 52, 0);
    else {
        buttonTeapotSprite = new GUIImage(this.scene, "teapotEng", 40, 40, 0, 0, 114, 52, 0);
    }


    let changeLanguage = function () {
        if (Game.lang === i18n.eng) {
            Game.lang = i18n.esp;
        }
        else {
            Game.lang = i18n.eng;
        }
        Game.changeScene(new OptionsScene(20 * Game.TILE_SIZE, 20 * Game.TILE_SIZE));
    }

    let buttonTeapot = new Button(this.scene, viewportMiddleX + 70, 250, 0, buttonTeapotSprite, changeLanguage);


    //texto musicas
    let textMusic = new Text(this.scene, i18n.translate(Game.lang, "music"), viewportMiddleX - 64, 350, "40px CartoonRegular");

    let buttonOnOffMusicSprite = new GUIImage(this.scene, "whiteSquare", 50, 50, 0, 0, 114, 52, 0);


    let onOffMusic = function () {

        if (audio.music === null) {
            audio.play(this.scene.track);
            tickSprite.isVisible = true;

        } else if (Game.volume == 0) {
            console.log("Volume = 0, dale candela"); 
            audio.music.muted = false;
            Game.volume = audio.music.volume; 
            tickSprite.isVisible = true;

        } else {
            console.log("Silencia"); 
            audio.music.muted = true;
            Game.volume = 0;
            tickSprite.isVisible = false;
        }
        Game.changeScene(new OptionsScene(20 * Game.TILE_SIZE, 20 * Game.TILE_SIZE));

    };

    let buttonOnOffMusic = new Button(this.scene, viewportMiddleX + 75, 320, 0, buttonOnOffMusicSprite, onOffMusic);

    let tickSprite = new GUIImage(this.scene, "tick", viewportMiddleX + 75, 315, 0, 0, 0, 0);

    if ((audio.music === null) || (audio.music.muted === true))
        tickSprite.isVisible = false;
    else {
        tickSprite.isVisible = true;
    }

    //texto efectos sonido
    let textSoundEffects = new Text(this.scene, i18n.translate(Game.lang, "sound"), viewportMiddleX - 64, 400, "40px CartoonRegular");

    this.guiObjects.push(buttonBack, buttonTeapot, buttonVolumeUp, buttonVolumeDown, teapotVolumeSprite, tickSprite, buttonVolumeLine);
    this.guiSprites.push(textOptions, board, textVolume, textLanguage, textMusic, textSoundEffects, buttonOnOffMusic);
};