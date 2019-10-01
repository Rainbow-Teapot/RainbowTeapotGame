function ObjectFactory(scene){
    Factory.call(this,scene);
    //this.createFactory(scene);
}

ObjectFactory.prototype = Object.create(Factory.prototype);
ObjectFactory.prototype.constructor = ObjectFactory;

ObjectFactory.prototype.createFactory = function(scene){

}

ObjectFactory.prototype.createProductFromColor = function(color, x, y){
    if(color.equals(new Color(0,0,0,255))){
        //let sprite = new Sprite(scene, null,k*Game.TILE_SIZE,j*Game.TILE_SIZE,0,0,Game.TILE_SIZE,Game.TILE_SIZE,0);
        let player = new Player(this.scene,x, y);
        this.scene.player = player;
    }else if(color.equals(new Color(0,255,0,255))){
        //let sprite = new Sprite(scene,k*Game.TILE_SIZE,j*Game.TILE_SIZE,0);
        //let sprite = new Sprite(scene, null,k*Game.TILE_SIZE,j*Game.TILE_SIZE,0,0,Game.TILE_SIZE,Game.TILE_SIZE,0);
        let wall = new Wall(this.scene, x, y);
    }
}