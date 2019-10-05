function MenuScene(width, height){
    Scene.call(this,width,height);
}

MenuScene.prototype = Object.create(Scene.prototype);
MenuScene.prototype.constructor = MenuScene;

MenuScene.prototype.preload = function(){

    Scene.prototype.loadToScene.call(this,"button", "./assets/touch.png");

    Scene.prototype.preload.call(this);
    
}

MenuScene.prototype.create = function(){
    
    let buttonSprite = new GUIImage(this,"button",50,50,0,0,114,52,0);
    let button = new Button(this,viewport.width/2 - buttonSprite.width/2,50,0,buttonSprite);
    //button.sprite = buttonSprite;
    button.performClick = function(){
        Game.changeScene(new TestScene(60 * Game.TILE_SIZE,20* Game.TILE_SIZE));
    };
    this.addClickableObject(button);

    let text = new Text(this,"jaja sí, soy io",100,100,"30px Folks");

    let text3 = new Text(this,"JUGAR sí, soy io",100,240,"50px CartoonRegular");

    
    Scene.prototype.create.call(this);
    
}

MenuScene.prototype.update = function(){
    Scene.prototype.update.call(this);
}