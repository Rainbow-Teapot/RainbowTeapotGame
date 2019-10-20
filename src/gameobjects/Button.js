/*Objto que representa a un botón, con la versatilidad de que puede hacer cualquier cosa que 
un gameObject normal haga y tener cualquier apariencai por medio de sprite. Además de lo que un
botón normal haga*/
function Button(scene, x, y, depth, guiImage, functionOnClick, text,styleText,colorText){
    GameObject.call(this, scene, x, y, depth);
    this.sprite = guiImage;
    this.isEnable = true;
    this.setVisible(true);
    if(text){
        this.text = new Text(this.scene, text,x,y,styleText,colorText);
        this.text.pos.x = this.pos.x + this.sprite.width/2;
        this.text.pos.y = this.pos.y + this.sprite.height/2 + 5;
    }
    this.functionOnClick = functionOnClick;
    this.scene.addClickableObject(this);
    this.initPosY = this.pos.y - 6;
    this.endPosY = this.pos.y + 6;
    this.vel = 0.05;
}

Button.prototype = Object.create(GameObject.prototype);
Button.prototype.constructor = Button;

/*En este caso los botones se pueden mover gracias a que son un GameObject*/
Button.prototype.update = function(){
    GameObject.prototype.update.call(this);
    
    if(this.pos.y < this.initPosY){
        this.pos.y = this.initPosY
        this.vel = -this.vel;
    }else if(this.pos.y > this.endPosY){
        this.pos.y = this.endPosY;
        this.vel = -this.vel;
    }
    
    this.pos.y += this.vel;
    if(this.text){
        this.text.pos.x = this.pos.x + this.sprite.width/2;
        this.text.pos.y = this.pos.y + this.sprite.height/2 + 5;
    }
}

/*llamar a la función asignada cuadno se pulsa el boton*/
Button.prototype.performClick = function(){
    if(this.isEnable)
        this.functionOnClick();
}

/*ocultar mostrar boton*/
Button.prototype.setVisible = function(isVisible){
    this.isVisible = isVisible;
    this.isEnable = isVisible;
    if(this.sprite)
    this.sprite.setVisible(isVisible);
    if(this.text)
    this.text.setVisible(isVisible);
}
