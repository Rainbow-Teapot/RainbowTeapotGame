function ObjectFactory(scene){
    Factory.call(this,scene);
    //this.createFactory(scene);
}

ObjectFactory.prototype = Object.create(Factory.prototype);
ObjectFactory.prototype.constructor = ObjectFactory;

ObjectFactory.prototype.createFactory = function(scene){

}

ObjectFactory.prototype.createProductFromColor = function(color, x, y){
    
    //meter todo esto luego en un diccionario en el createFactory()
    if(color.a == 64){
    
        let objControl = new Control(this.scene, x, y);
        objControl.colorPlayer = new Player(this.scene,color.r * Game.TILE_SIZE, color.g * Game.TILE_SIZE,0);
        objControl.shadowPlayer = new ShadowPlayer(this.scene, color.r *Game.TILE_SIZE, (color.g - this.scene.shadowLevel) * Game.TILE_SIZE,1);
        this.scene.objControl = objControl;
        this.scene.selectedPlayer = objControl.colorPlayer;


    }if(color.a == 128){
    
        //objeto palanca
        if(color.b == 64){
            if(color.r % 5 == 1) color.r--;
            if(color.g % 5 == 1) color.g--;
            console.log(color.r);
            console.log(color.g);
            new Lever(this.scene,x,y,0,false, color.r * Game.TILE_SIZE, color.g * Game.TILE_SIZE);
            new Lever(this.scene,x,y - Game.TILE_SIZE * this.scene.shadowLevel,0,true,color.r * Game.TILE_SIZE, color.g * Game.TILE_SIZE);
        //objeto puente levadizo
        }else if(color.r == 122 && color.g == 255){
            if(color.b == 255){
                new Bridge(this.scene,x,y,0,false,-1);
                new Bridge(this.scene,x,y - Game.TILE_SIZE * this.scene.shadowLevel,0,true,-1);
            }else if(color.b == 128){
                new Bridge(this.scene,x,y,0,false,1);
                new Brige(this.scene,x,y - Game.TILE_SIZE * this.scene.shadowLevel,0,true,1);
            }
        }

    }else if(color.a == 255){
        if(color.equals(new Color(0,0,0,255))){
            let player = new Player(this.scene,x, y);
            this.scene.player = player;
        }else if(color.equals(new Color(0,255,0,255))){
            let wall = new Wall(this.scene, x, y,0);
        }else if(color.equals(new Color(255,0,0,255))){
            let wall = new Wall(this.scene,x,y,1);
        }else if(color.equals(new Color(255,0,255,255))){
            let wall1 = new Wall(this.scene,x,y,0);
            let wall2 = new Wall(this.scene,x,y,1);
        }else if(color.equals(new Color(255,122,0,255))){
            new Door(this.scene,x,y,0);
        }else if(color.equals(new Color(0,0,255,255))){
            new Key(this.scene,x,y,0, false);
            new Key(this.scene,x,y-Game.TILE_SIZE * this.scene.shadowLevel,0, true);
        }else if(color.equals(new Color(255,255,0,255))){
            console.log("created teapot");
            new GoldenTeapot(this.scene,x,y,0);
        }
    }
}