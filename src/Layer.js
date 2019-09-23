function Layer(){
    this.elements = [];
}

Layer.prototype.addElement = function(element){
    this.elements.push(element);
}

Layer.prototype.draw = function(camera){
    for(let i = 0; i < this.elements.length; i++){
        this.elements[i].draw(camera);
    }
}

