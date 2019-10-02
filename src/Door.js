function Door(scene, x, y){
    GameObject.call(this,scene,x, y);
    this.type.push("Door");
    this.depth = 0;
    this.width = Game.TILE_SIZE;
    this.height = Game.TILE_SIZE * 2;
    this.sprite = new Sprite(this.scene,null,0,0,0,0,Game.TILE_SIZE,Game.TILE_SIZE*2,0);
    this.walls = [new Wall(this.scene,x,y,0), new Wall(this.scene,x,y+Game.TILE_SIZE,0)];
    console.log(this.pos);
}

Door.prototype = Object.create(GameObject.prototype);
Door.prototype.constructor = Door;

Door.prototype.perform = function(){
    console.log("Puerta activada");
    for(let i = 0; i < this.walls.length; i++){
        this.walls[i].destroy();
    }
    this.destroy();
}

