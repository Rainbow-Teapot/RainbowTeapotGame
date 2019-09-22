function Scene(width, height){
    this.isSceneLoaded = false;
    this.loadingPromises = [];
    this.camera = null;
    this.numLayers = 0;
    this.levelTiles = null;
    this.width = width;
    this.height = height;

    this.backgroundLayer = new Layer();
    this.tileLayer = [];
    this.spriteObjectsLayer = new Layer();
    this.GUILayer = new Layer();

};

Scene.prototype.loadToScene = function(tag,src){
    
    var promise = cache.load(tag,src).then(function(img){
        console.log("Terminada de cargar recurso: " + tag);
        cache.retrieve(tag).loadFlag = true;
    });

    this.loadingPromises.push(promise);
};

Scene.prototype.preload = function(){

    let that = this;

    Promise.all(this.loadingPromises).then( function(){
        console.log("Se han cargado todos los recursos");
        that.create();
    });
};

Scene.prototype.create = function(){

    //this.levelTiles = levelParser.parseTiles("layer", this.numLayers);
    this.camera = new Camera(this,viewport,0,0);
    this.isSceneLoaded = true;
};

Scene.prototype.update = function(){
    if(this.isSceneLoaded){
        //console.log("Estoy updateando la escena");
        this.camera.update();
    }
};

Scene.prototype.draw = function(){
    if(this.isSceneLoaded){
        
        this.backgroundLayer.draw(this.camera);
        let frameLayer = this.camera.getFrameLayer();
        frameLayer.draw(this.camera);
        this.spriteObjectsLayer.draw(this.camera);
        this.GUILayer.draw(this.camera);
    }
}