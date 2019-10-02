/*prototipo basico de un punto para gestionar mejor las posiciones*/
function Point(x,y){
    this.x = x;
    this.y = y;
}

/*el cambio de base de una base a otra, es simplemente una resta pero
js no soporto definicion de operando asi que hay que hacer una funcion*/
Point.prototype.changeBase = function(dstBase){
    return new Point(this.x - dstBase.x, this.y - dstBase.y);
}

Point.prototype.equals = function(otherPoint){
    return this.x === otherPoint.x && this.y === otherPoint.y;
}