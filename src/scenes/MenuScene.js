function MenuScene(width, height) {
    Scene.call(this, width, height);
    this.transition = new Transition();
    this.track = audio.trackMenu;

}

MenuScene.prototype = Object.create(Scene.prototype);
MenuScene.prototype.constructor = MenuScene;

MenuScene.prototype.preload = function () {
    Scene.prototype.preload.call(this);
}

MenuScene.prototype.create = function () {
    if(audio!=null){
        if(audio.music== null || audio.music.paused){
            audio.play(this.track);
        }
    }else{
          audio.play(this.track);
    }
  

    this.gui = new MainMenuGUI(this);

    Scene.prototype.create.call(this);

}

MenuScene.prototype.update = function () {
    Scene.prototype.update.call(this);
}