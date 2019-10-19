function CreditsMenuGUI(scene){
    GUISet.call(this,scene);
    this.create();
    this.TEXT_OFFSET_Y = 0;
}

CreditsMenuGUI.prototype = Object.create(GUISet.prototype);
CreditsMenuGUI.prototype.constructor = CreditsMenuGUI;

CreditsMenuGUI.prototype.create = function(){

    let viewportMiddleX = viewport.width/2;

    let bgMenu = new Background(this.scene,"bgMenu", 0,0,0);

    //boton de ir para atras
    let buttonBackSprite = new GUIImage(this.scene,"botonVolver",50,50,0,0,114,52,0);
    let goMainMenu = function(){
        Game.changeScene(new MenuScene(20 * Game.TILE_SIZE,20 * Game.TILE_SIZE));
    };
    let buttonBack = new Button(this.scene,25,25,0,buttonBackSprite, goMainMenu);

    //texto OPCIONES
    let textCredits = new Text(this.scene, i18n.translate(Game.lang, "credits"),viewportMiddleX,100,"60px CartoonRegular");
    
    let c1 = new GUIImage(this.scene, "andrea", viewport.width/2- 232, 140, 0, 0, 0, 0); 
    let c2 = new GUIImage(this.scene, "carlos", viewport.width/2 +32, 140, 0, 0, 0, 0); 
    let c3= new GUIImage(this.scene, "celia", 90, viewport.height -c1.height -60, 0, 0, 0, 0);     
    let c4 = new GUIImage(this.scene, "juanantonio", viewport.width/2-c1.width/2,viewport.height -c1.height -60, 0, 0, 0, 0);     
    let c5 = new GUIImage(this.scene, "celia", viewport.width-c1.width -90, viewport.height -c1.height -60, 0, 0, 0, 0); 
    let text1 = new Text(this.scene, "Andrea Rodríguez", c1.pos.x + 100,c1.pos.y+c1.height+25,"30px CartoonRegular");
    let text2 = new Text(this.scene, "Carlos Marques",c2.pos.x+100,c2.pos.y+c2.height+25,"30px CartoonRegular");
    let text3 = new Text(this.scene, "Celia Merino",c3.pos.x+100,c3.pos.y+c3.height+25,"30px CartoonRegular");
    let text4 = new Text(this.scene, "Juan Antonio Ruiz",c4.pos.x+100,c4.pos.y+c4.height+25,"30px CartoonRegular");
    let text5 = new Text(this.scene, "Marcos Agudo",c5.pos.x+100,c5.pos.y+c5.height+25,"30px CartoonRegular");

    this.guiObjects.push(buttonBack);
    this.guiSprites.push(textCredits, text1, text2, text3, text4, text5);
};