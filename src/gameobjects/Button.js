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
    //this.sprite.img.addEventListener('click', () => console.log("He pulsado el boton"));
}

Button.prototype = Object.create(GameObject.prototype);
Button.prototype.constructor = Button;

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

Button.prototype.performClick = function(){
    if(this.isEnable)
        this.functionOnClick();
}

Button.prototype.setVisible = function(isVisible){
    this.isVisible = isVisible;
    this.isEnable = isVisible;
    if(this.sprite)
    this.sprite.setVisible(isVisible);
    if(this.text)
    this.text.setVisible(isVisible);
}
