function Scene(width, height){
    this.isSceneLoaded = false;
    this.loadingPromises = [];
    this.camera = null;
    this.numLayers = 0;
    this.levelTiles = null;
    this.width = width;
    this.height = height;

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

    this.loadToScene("layer0","../assets/layer0.png");
    this.loadToScene("layer1","../assets/layer1.png");
    this.numLayers = 2;

    Promise.all(this.loadingPromises).then( function(){
        console.log("Se han cargado todos los recursos");
        that.create();
    });

    /*cache.load("layer0","../assets/layer0.png").then(function(img){
        console.log(img.width);
        cache.retrieve("layer0").loadFlag = true;
        
        console.log(img.width);
   
    });

    that.create();*/
};

Scene.prototype.create = function(){

    this.levelTiles = levelParser.parseTiles("layer", this.numLayers);
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
        //console.log("Estoy pintando la escena");
        this.camera.draw();
        /*var objectsToDraw = camera.getDrawables(this);

        for(let i = 0; i < this.numLayers; i++){
        
            for(let j = 0; j < this.levelTiles[i].length; j++){
    
                //console.log(levelTiles[i][100]);
                this.levelTiles[i][j].draw();
            }
        }*/

    }
}