/*prototipo para que la gestión de tiles, sprites e imágenes sea más sencilla,
simplemente es un array que contiene los elementos que se han de dibujar,
solo ha de contener objetos que hereden de Drawable*/
function Layer(){
    this.elements = [];
}

Layer.prototype.addElement = function(element){
    this.elements.push(element);
}

Layer.prototype.removeElement = function(element){
    let index = this.elements.indexOf(element);
    if (index > -1) {
        this.elements.splice(index, 1);
    }
}

Layer.prototype.draw = function(camera){
    for(let i = 0; i < this.elements.length; i++){
        this.elements[i].draw(camera);
    }
}

