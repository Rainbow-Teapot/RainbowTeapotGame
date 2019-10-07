function Collider(object,x,y,width,height,xOffset,yOffset){
    this.object = object;
    this.x = x + xOffset;
    this.y = y + yOffset;
    this.width = width;
    this.height = height;
    physics.quadTree.insert(this);
}

