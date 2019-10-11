function GoldenTeapot(scene, x, y){
    Pickupable.call(this,scene,x,y);
    this.type.push("GoldenTeapot");
    this.vel = 0.2;
    this.initPosY = this.pos.y - Game.TILE_SIZE/2;
    this.endPosY = this.pos.y;
   // this.sprite = new Sprite(this.scene,"goldenTeapot",0,0,0,0,Game.TILE_SIZE/2,Game.TILE_SIZE/2,0);
    this.sprite = this.prepareAnimations();
    this.sprite.initAnimation("idle"); 

    this.collider = new Collider(this,this.pos.x,this.pos.y,this.width,this.height,0,0);
}

GoldenTeapot.prototype = Object.create(Pickupable.prototype);
GoldenTeapot.prototype.constructor = GoldenTeapot;


GoldenTeapot.prototype.prepareAnimations = function(){

    let sprite = new Sprite(this.scene, "goldenTeapot",0, 0,0,0,Game.TILE_SIZE,Game.TILE_SIZE,0);
    sprite.addAnimation("idle",0,2,25,-1);    

    return sprite;

};


GoldenTeapot.prototype.pickUp = function(){
    this.scene.fadeType = "fadeOut";
    this.scene.functionFade = function(){
        Game.changeScene(new EndLevelScene(20 * Game.TILE_SIZE,20 * Game.TILE_SIZE));
    }

    let colorPlayer = this.scene.objControl.colorPlayer;
    let shadowPlayer =  this.scene.objControl.shadowPlayer;

    colorPlayer.currentState = colorPlayer.states.DISABLED;
    shadowPlayer.currentState = shadowPlayer.states.DISABLED;

    Pickupable.prototype.pickUp.call(this);
}

