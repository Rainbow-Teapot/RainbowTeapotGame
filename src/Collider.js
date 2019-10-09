function Collider(object,x,y,width,height,xOffset,yOffset){
    this.object = object;
    this.x = x + xOffset;
    this.y = y + yOffset;
    this.width = width - xOffset;
    this.height = height - yOffset;
    physics.quadTree.insert(this);
}

