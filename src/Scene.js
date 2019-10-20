/*Guarda toda la información del nivel; objetos, sprites, tiles, backgrunds, tiles.
Todas las escenas deberan heredar de esta. Las escenas se actualizan y se dibujan en el gameLoop
encapsulando absolutamente todo lo que guardan. Posee deiferentes objetos Layers: backgrundLayer,
tileLayer,spriteObjetcsLayer y GUILayer y una referencia al player que es basntante importante
La escena tiene diferentes estados: Preload, Create y Update/Draw. En el preload se han de cargar
todos los resources necesarios para la creación de la escena y de los objetos (por ejemplo la
spritesheet del player), cuando se ha terminado de cargar todo se pasa al estado create donde el
lavel parser creara todo, backgrunds, objetos, tiles..., el estado Update/draw ya es lo normal, en ellos
se actualizan todos los objetos y de dibujan todas las layers respectivamente*/
function Scene(width, height){
    this.isSceneLoaded = false;
    this.loadingPromises = [];
    this.camera = null;

    this.numLayers = 0;
    this.numObjectLayers = 0;

    this.levelTiles = null;
    this.width = width;
    this.height = height;

    this.backgroundLayer = new Layer();
    this.tileLayer = [new Layer(), new Layer()];
    this.spriteObjectsLayer = new Layer();
    this.foregroundLayer = new Layer();
    this.GUILayer = new Layer();

    this.selectedPlayer = null;
    this.levelSelected = 0;

    this.transition = null;
    this.fadeType = "fadeIn";
    this.functionFade = null;

    this.gameObjects = [];
    this.clickableObjects = [];
    this.animations = [];

    this.middleSceneX = width/2;

    this.goldenSpoons = 0; 
    
    this.objectFactory = new ObjectFactory(this);

    this.track = null; 
};

/*funcion para cargar resources necesarios para la creación de la escena,
con ella cargaremos tilemaps, spritesheets, imagenes y JSONs, hace uso de la cache y guarda
las promesas en un array para luego esperar a todas ellas y poder continuar*/
Scene.prototype.loadToScene = function(tag,src){
    
    if(!cache.retrieve(tag)){
        var promise = cache.load(tag,src).then(function(img){
            console.log("Terminada de cargar recurso: " + tag);
            cache.retrieve(tag).loadFlag = true;
        });

        this.loadingPromises.push(promise);
    }
};

/*esperar a que todo se haya cargado y pasar al create, aquí no se especifica lo que hay que cargar,
por eso no se utiliza loadToScene, se le indica en los hijos que hereden de Scene*/
Scene.prototype.preload = function(){

    let that = this;
    
    Promise.all(this.loadingPromises).then( function(){
        console.log("Se han cargado todos los recursos");
        that.create();
    });
};

/*crear la cámara y avisar de que la escena ya esta lista, aquí no se llama al levelParser ya
que no tenemos nada con lo que trabajar para crear el nivel. Se llama a levelParser en los hijos que
hereden de Scene*/
Scene.prototype.create = function(){

    physics.initPhysics(0, 0, this.width,this.height);
    this.camera = new Camera(this,viewport,0,0);
    this.isSceneLoaded = true;
    coreLoop.setScene(this);
    
};

/*actualizar todos los objetos y la camara*/
Scene.prototype.update = function(delta){
    if(this.isSceneLoaded){
        
        for(let i = 0; i < this.gameObjects.length; i++){
            //console.log(this.gameObjects[i].type);
            this.gameObjects[i].update(delta);
        }
        for(let i = 0; i < this.animations.length; i++){
            //console.log("Actualizando animaciones");
            this.animations[i].update();
        }
        this.camera.update();
    }

    
};



/*dibujar todas las layer en el siguiente orden: 
    1. Backgrounds
    2. Tiles (se seleccionan los tiles a pintar a traves del framebuffer de la camara)
    3. Sprites de los objetos
    4. GUI
Dentro de cada layer podra haber más layer ordenadas por profunidad pero todas referidas a su layer
contenedora. En la layer background habrá backgrund0, background1...*/
Scene.prototype.draw = function(){
    if(this.isSceneLoaded){
        
        this.backgroundLayer.draw(this.camera);
        
        let frameLayerShadow = this.camera.getFrameLayer(this.tileLayer[0]);
        frameLayerShadow.draw(this.camera);
        
        this.spriteObjectsLayer.sortByDepth();
        this.spriteObjectsLayer.draw(this.camera);

        let frameLayerColor = this.camera.getFrameLayer(this.tileLayer[1]);
        frameLayerColor.draw(this.camera);

        this.foregroundLayer.draw(this.camera);
        this.GUILayer.draw(this.camera);
        
        if(this.transition){
            this.transition.fade(this.fadeType,this.camera,this.functionFade);
        }
    }
};

Scene.prototype.restart = function(){
    Game.changeScene(this);
}

Scene.prototype.addAnimation = function(animation){
    this.animations.push(animation);
}

Scene.prototype.addClickableObject = function(clickable){
    this.clickableObjects.push(clickable);
}

Scene.prototype.removeAnimation = function(animation){
    let index = this.animations.indexOf(animation);
    if (index > -1) {
        this.animations.splice(index, 1);
    }
}

Scene.prototype.removeSprite = function(sprite){
    let index = this.spriteObjectsLayer.elements.indexOf(sprite);
    if (index > -1) {
        this.spriteObjectsLayer.elements.splice(index, 1);
    } 
}

Scene.prototype.removeGameObject = function(gameObject){

    gameObject.disable = true;
    let index = this.gameObjects.indexOf(gameObject);
    if (index > -1) {
        this.gameObjects.splice(index, 1);
    }  
}
//La escena se ocupa de ver si algún botón de su escena haya sido pulsado
Scene.prototype.handleClick = function(e){
    let clickPos = viewport.getCursorPosition(e);
    let clickedObject = null;
    let factorWidth = viewport.width/ viewport.canvas.offsetWidth;
    let factorHeight = viewport.height/ viewport.canvas.offsetHeight;

    clickPos.x *= factorWidth;
    clickPos.y *= factorHeight;

    for(let i = 0; i < Game.scene.clickableObjects.length; i++){
        let currentClickableObject = Game.scene.clickableObjects[i];
        let currentDrawable = currentClickableObject.sprite;

        if(currentDrawable.pos.x <= clickPos.x && currentDrawable.pos.y <= clickPos.y
            && currentDrawable.pos.x + currentDrawable.width >= clickPos.x 
            && currentDrawable.pos.y + currentDrawable.height>= clickPos.y){

                clickedObject = currentClickableObject;
                break;
        }
    }

    if(clickedObject){
        clickedObject.performClick();
    }

    console.log("estoy pulsando la pantalla");
}

Scene.prototype.destroy = function(){
    physics.quadTree.clear();
}