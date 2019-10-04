function Button(scene, x, y, depth, guiImage, functionOnClick){
    GameObject.call(this, scene, x, y, depth);
    this.sprite = guiImage;
    this.isEnable = true;
    this.setVisible(true);
    this.functionOnClick = functionOnClick;
    this.scene.addClickableObject(this);
    //this.sprite.img.addEventListener('click', () => console.log("He pulsado el boton"));
}

Button.prototype = Object.create(GameObject.prototype);
Button.prototype.constructor = Button;

Button.prototype.update = function(){
    GameObject.prototype.update.call(this);
}

Button.prototype.performClick = function(){
    if(this.isEnable)
        this.functionOnClick();
}

Button.prototype.setVisible = function(isVisible){
    this.isVisible = isVisible;
    this.isEnable = isVisible;
    this.sprite.setVisible(isVisible);
}
