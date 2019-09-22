function Point(x,y){
    this.x = x;
    this.y = y;
}

Point.prototype.changeBase = function(dstBase){
    return new Point(this.x - dstBase.x, this.y - dstBase.y);
}