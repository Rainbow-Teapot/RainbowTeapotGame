function ObjectFactory(scene) {
    Factory.call(this, scene);
}

ObjectFactory.prototype = Object.create(Factory.prototype);
ObjectFactory.prototype.constructor = ObjectFactory;

ObjectFactory.prototype.createFactory = function (scene) {

}

/*Objetos harcodeados segun su color, posible mejora, meterlos en un mapa para que el acceso sea mucho más rápido
Diminuiría el tiempo de creación de nivel*/
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
    }

    if (color.g == 0) {

        if (color.r == 128) {
            //Obj wall 
            if (color.b == 0) {
                new Wall(this.scene, x, y, 0);
            } else if (color.b == 64) {
                new Wall(this.scene, x, y, 1);
            } else if (color.b == 128) {
                console.log("" + color.r + " " + color.g + " " + color.b);
                new Wall(this.scene, x, y, 0);
                new Wall(this.scene, x, y, 1);
            }
        } else if (color.r == 64) {
            if (color.b == 0) {
                //Obj door
                new Door(this.scene, x, y, 0, false);
            } else if (color.b == 64) {
                //Obj key 
                new Key(this.scene, x, y - 16, 0, false);
                new Key(this.scene, x, y - Game.TILE_SIZE * this.scene.shadowLevel - 16, 1, true);
            } else if (color.b == 128) {
                //Obj golden teapot
                new GoldenTeapot(this.scene, x, y, 0);
            } else if (color.b == 192) {
                //Obj golden spoon
                new GoldenSpoon(this.scene, x, y - 16, 0, false);
                new GoldenSpoon(this.scene, x, y - Game.TILE_SIZE * this.scene.shadowLevel - 16, 1, true);
            } else if (color.b == 255) {
                //Obj teaLife 
                new TeaLife(this.scene, x, y - 16, 0, false);
                new TeaLife(this.scene, x, y - Game.TILE_SIZE * this.scene.shadowLevel - 16, 1, true);

            }
        }
    } else if (color.g == 24) {
        if (color.r == 0) {
            this.scene.tutorial = new TutorialControls(this.scene, x - 50, y + 20, 1);
        }
    } else if (color.g == 64) {
        if (color.b == 0) {
            //Obj damageBlock
            new DamageBlock(this.scene, x, y, 0, color.r);
        }
        else if (color.b == 64) {
            //Obj bridge
            if (color.r == 0) {
                new Bridge(this.scene, x, y, 0, false, 1);
                new Bridge(this.scene, x, y - Game.TILE_SIZE * this.scene.shadowLevel, 1, true, 1);

            } else if (color.r == 64) {
                new Bridge(this.scene, x, y, 0, false, -1);
                new Bridge(this.scene, x, y - Game.TILE_SIZE * this.scene.shadowLevel, 1, true, -1);
            }
        } else {
            //Obj movable Platform
            if (color.r == 0) {
                new MovablePlatform(this.scene, x, y, 0, false, 1, color.b);
                new MovablePlatform(this.scene, x, y - Game.TILE_SIZE * this.scene.shadowLevel, 1, true, 1, color.b);
                
            } else if (color.r == 64) {
                new MovablePlatform(this.scene, x, y, 0, false, 2, color.b);
                new MovablePlatform(this.scene, x, y - Game.TILE_SIZE * this.scene.shadowLevel, 1, true, 2, color.b);
                //console.log("He instanciado un MOVABLE PLATFORM");
            }
           
        }

    } else if (color.g == 128) {
        //Obj lever
        new Lever(this.scene, x, y, 0, false, color.r * Game.TILE_SIZE, color.b * Game.TILE_SIZE);
        new Lever(this.scene, x, y - Game.TILE_SIZE * this.scene.shadowLevel, 1, true, color.r * Game.TILE_SIZE, color.b * Game.TILE_SIZE);
    } else if (color.g == 192) {
        //Obj light
        new Light(this.scene, x, y, 0, false, color.r, color.b);
        new Light(this.scene, x, y - Game.TILE_SIZE * this.scene.shadowLevel, 1, true, color.r, color.b);
    } else if (color.g == 224) {
        //Obj switchLight
        new SwitchLight(this.scene, x, y, 0, false, color.r * Game.TILE_SIZE, color.b * Game.TILE_SIZE);
        new SwitchLight(this.scene, x, y - Game.TILE_SIZE * this.scene.shadowLevel, 1, true, color.r * Game.TILE_SIZE, color.b * Game.TILE_SIZE);
    }

}