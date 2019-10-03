function Button(scene, x, y, depth, guiImage,){
    GameObject.call(this, scene, x, y, depth);
    this.sprite = guiImage;
    //this.sprite.img.addEventListener('click', () => console.log("He pulsado el boton"));
}

Button.prototype = Object.create(GameObject.prototype);
Button.prototype.constructor = Button;

Button.prototype.update = function(){
    GameObject.prototype.update.call(this);
}
