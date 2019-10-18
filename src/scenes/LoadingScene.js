function LoadingScene(width, height, levelToLoad){
    Scene.call(this,width,height);
    this.levelToLoad = levelToLoad;
    this.charged = 0;
    this.minUpdatesToAtLeastShowTheLoadingScene = 10;
}

LoadingScene.prototype = Object.create(Scene.prototype);
LoadingScene.prototype.constructor = LoadingScene;

LoadingScene.prototype.preload = function(){
    Scene.prototype.preload.call(this);    
}

LoadingScene.prototype.create = function(){
    
    Scene.prototype.create.call(this);
    let bg = new Background(this,"bgMenu",0,0,0);
    new Text(Game.scene, i18n.translate(Game.lang, "loading"),viewport.width/2,viewport.height - Game.TILE_SIZE,"60px CartoonRegular");    
    let that = this;
    let loadLevel = function(){
        Game.loadLevel(that.levelToLoad);
    };
    this.timerLoad = new Timer(null,loadLevel,500);
    this.timerLoad.initTimer();
}

LoadingScene.prototype.update = function(){
    Scene.prototype.update.call(this);
}
