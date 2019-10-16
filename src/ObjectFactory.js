function ObjectFactory(scene) {
    Factory.call(this, scene);
    //this.createFactory(scene);
}

ObjectFactory.prototype = Object.create(Factory.prototype);
ObjectFactory.prototype.constructor = ObjectFactory;

ObjectFactory.prototype.createFactory = function (scene) {

}

ObjectFactory.prototype.createProductFromColor = function (color, x, y) {

    //meter todo esto luego en un diccionario en el createFactory()
    if (color.a == 64) {
        console.log(color.r);
        console.log(color.g);
        let objControl = new Control(this.scene, x, y);
        this.scene.objControl = objControl;

        let playerShadowPos = new Point(objControl.pos.x, objControl.pos.y - this.scene.shadowLevel * Game.TILE_SIZE + Game.TILE_SIZE / 2);
        let playerColorPos = new Point(objControl.pos.x, objControl.pos.y + Game.TILE_SIZE / 2);

        objControl.shadowPlayer = new ShadowPlayer(this.scene, playerShadowPos.x, playerShadowPos.y, 1);
        objControl.colorPlayer = new Player(this.scene, playerColorPos.x, playerColorPos.y, 0);


        this.scene.selectedPlayer = objControl.colorPlayer;


    } if (color.a == 128) {

        //objeto luz
        if(color.b >= 198 && color.b <= 202){
            new Light(this.scene,x,y,0,false,color.r,color.g);
            new Light(this.scene,x,y - Game.TILE_SIZE * this.scene.shadowLevel,1,true,color.r,color.g);
            console.log("se ha cerad la luz");
        //objeto palanca
        }else if (color.b == 64) {
            if (color.r % 5 == 1) color.r--;
            if (color.g % 5 == 4) color.g--;
            console.log(color.r);
            console.log(color.g);
            new Lever(this.scene, x, y, 0, false, color.r * Game.TILE_SIZE, color.g * Game.TILE_SIZE);
            new Lever(this.scene, x, y - Game.TILE_SIZE * this.scene.shadowLevel, 0, true, color.r * Game.TILE_SIZE, color.g * Game.TILE_SIZE);
            
            //obj swicthLight
        } else if (color.r == 100){
            color.b--;
            new SwitchLight(this.scene,x,y,0,false,color.g * Game.TILE_SIZE, color.b * Game.TILE_SIZE);
            new SwitchLight(this.scene,x,y - Game.TILE_SIZE * this.scene.shadowLevel,1,true,color.g * Game.TILE_SIZE, color.b * Game.TILE_SIZE);
            //objeto puente levadizo
        }else if (color.r == 122 && color.g == 255) {
            if (color.b == 255) {
                new Bridge(this.scene, x, y, 0, false, -1);
                new Bridge(this.scene, x, y - Game.TILE_SIZE * this.scene.shadowLevel, 1, true, -1);

            } else if (color.b == 128) {
                //new Bridge(this.scene, x, y, 0, false, 1);
                //new Bridge(this.scene, x, y - Game.TILE_SIZE * this.scene.shadowLevel, 1, true, 1);

            }
            //objeto plataforma móvil     
        } else if (color.g == 64) {
            if (color.r == 122) {
                //new MovablePlatform(this.scene, x, y, 0, false, 1, color.b);
                //new MovablePlatform(this.scene, x, y - Game.TILE_SIZE * this.scene.shadowLevel, 1, true, 1, color.b);
            } else if (color.r == 255) {
                //new MovablePlatform(this.scene, x, y, 0, false, 2, color.b);
                //new MovablePlatform(this.scene, x, y - Game.TILE_SIZE * this.scene.shadowLevel, 1, true, 2, color.b);
            }
        } else if (color.g == 128 && color.b == 128) {
            new DamageBlock(this.scene, x, y, 0, color.r);
            //new DamageBlock(this.scene, x, y - Game.TILE_SIZE * this.scene.shadowLevel, 1,color.r);
        }

    } else if (color.a == 255) {
        if (color.equals(new Color(0, 255, 0, 255))) {
            let wall = new Wall(this.scene, x, y, 0);
        } else if (color.equals(new Color(255, 0, 0, 255))) {
            let wall = new Wall(this.scene, x, y, 1);
        } else if (color.equals(new Color(255, 0, 255, 255))) {
            let wall1 = new Wall(this.scene, x, y, 0);
            let wall2 = new Wall(this.scene, x, y, 1);
        } else if (color.equals(new Color(255, 122, 0, 255))) {
            new Door(this.scene, x, y, 0, false);
        } else if (color.equals(new Color(0, 0, 255, 255))) {
            new Key(this.scene, x, y-16, 0, false);
            new Key(this.scene, x, y - Game.TILE_SIZE * this.scene.shadowLevel-16, 1, true);
        } else if (color.equals(new Color(255, 255, 0, 255))) {
            console.log("created teapot");
            new GoldenTeapot(this.scene, x, y, 0);
        } else if (color.equals(new Color(255, 122, 122, 255))) {
            new TeaLife(this.scene, x, y - 16, 0, false);
            new TeaLife(this.scene, x, y - Game.TILE_SIZE * this.scene.shadowLevel - 16, 0, true);
        } else if(color.equals(new Color(0,0,0,255))){
            new ShadowBlock(this.scene, x, y, 1);
        }
    }
}
