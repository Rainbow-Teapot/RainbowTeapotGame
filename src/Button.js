function Button(scene, x, y, guiImage,depth){
    GameObject.call(this, scene, x, y, guiImage, depth);
    //this.sprite.img.addEventListener('click', () => console.log("He pulsado el boton"));
}

Button.prototype = Object.create(GameObject.prototype);
Button.prototype.constructor = Button;

Button.prototype.update = function(){

}
