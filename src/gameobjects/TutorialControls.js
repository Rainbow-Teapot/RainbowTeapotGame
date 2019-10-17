function TutorialControls(scene, x, y, depth){
    GameObject.call(this,scene,x, y,depth);
    this.type.push("TutorialControls");
    this.depth = depth;    
    //this.width = Game.TILE_SIZE;
    //this.height = Game.TILE_SIZE * 2;
    this.sprite = new Sprite(this.scene,i18n.translate(Game.lang, "tutorial"),0,0,0,0,Game.TILE_SIZE*6,Game.TILE_SIZE*5,0);
        
}

TutorialControls.prototype = Object.create(GameObject.prototype);
TutorialControls.prototype.constructor = TutorialControls;


