function InGameGUI(scene){
    GUISet.call(this,scene);
    this.TEXT_OFFSET_Y = 0;
    this.playerInfo = this.scene.objControl;
    this.lifes = new Array(this.playerInfo.numLifes);
    this.OFFSET_TEABAG = 50;
    this.create();
}

InGameGUI.prototype = Object.create(GUISet.prototype);
InGameGUI.prototype.constructor = InGameGUI;

InGameGUI.prototype.create = function(){

    let that = this;

    //vidas
    for(let i = 0;i < this.lifes.length; i++){
        this.lifes[i] = new GUIImage(this.scene,"teaLifeGUI",10 + this.OFFSET_TEABAG * i,10,0,0,64,64,0);
    }

    this.goldenSpoons = new GUIImage(this.scene, "goldenSpoonGUI", 10, 85, 0, 0, 30, 30, 0)
    this.numGoldenSpoons = new Text(this.scene, "x" +this.scene.goldenSpoons, 60,140, "20px CartoonRegular", new Color(255,255,255,255));


    //llave
    this.key = new GUIImage(this.scene,"keyOff", viewport.width/2 - Game.TILE_SIZE/2, 10,0,0,64,64,0);

    let optionMenu = new InGameOptionsMenuGUI(this.scene);
    optionMenu.hide();

    //boton de ir para atras
    let buttonOptionsSprite = new GUIImage(this.scene,"botonAjustes",50,50,0,0,114,52,0);
    let showOptionMenu = function(){
        that.scene.objControl.pauseChrono();
        Game.pauseGame();
        optionMenu.show();
    };
    let buttonOptions = new Button(this.scene,viewport.width - buttonOptionsSprite.width - 25,10,0,buttonOptionsSprite, showOptionMenu);

    //botones de juego en movil
    if(input.currentInputMode == input.inputMode.MOBILE){
        let buttonSwapPlayerSprite = new GUIImage(this.scene,"mobileButton1",50,50,0,0,114,52,0);
        buttonSwapPlayerSprite.alpha = 0.3;
        let swapPlayerGUI = function(){
            this.scene.objControl.colorPlayer.controls.changePlayerCommand.ivoked = true;
            this.scene.objControl.shadowPlayer.controls.changePlayerCommand.ivoked = true;
        }
        let buttonSwap = new Button(this.scene,viewport.width - buttonOptionsSprite.width - 20,viewport.height - 130,0,buttonSwapPlayerSprite, swapPlayerGUI);
        buttonSwap.vel = 0;

        let buttonInteractSprite = new GUIImage(this.scene,"mobileButton2",50,50,0,0,114,52,0);
        buttonInteractSprite.alpha = 0.3;
        let interactGUI = function(){
            this.scene.objControl.colorPlayer.controls.interactCommand.ivoked = true;
            this.scene.objControl.shadowPlayer.controls.interactCommand.ivoked = true;
        }
        let buttonInteract = new Button(this.scene,viewport.width - buttonOptionsSprite.width - Game.TILE_SIZE - 20,viewport.height - 80,0,buttonInteractSprite, interactGUI);
        buttonInteract.vel = 0;
        this.guiObjects.push(buttonSwap,buttonInteract);

    }

    this.guiObjects.push(buttonOptions);
};

InGameGUI.prototype.lowerHealth = function(){
    let currentHealth = this.playerInfo.numLifes;
    this.lifes[currentHealth].setVisible(false);
}

InGameGUI.prototype.riseHealth = function(){
    let currentHealth = this.playerInfo.numLifes - 1;
    this.lifes[currentHealth].setVisible(true);
}


InGameGUI.prototype.pickUpKey = function(){
    this.key.setImage("keyOn");
}
InGameGUI.prototype.useKey = function(){
    this.key.setImage("keyOff");
}

InGameGUI.prototype.pickUpGoldenSpoon = function(){
    this.numGoldenSpoons.string = "x"+this.scene.goldenSpoons;      
}