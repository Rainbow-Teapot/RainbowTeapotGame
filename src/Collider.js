function Collider(object,x,y,width,height,xOffset,yOffset, isMovable){
    this.object = object;
    this.x = x + xOffset;
    this.y = y + yOffset;
    this.width = width - xOffset;
    this.height = height - yOffset;
    if(!isMovable)
        physics.quadTree.insert(this);
    else
        physics.movableList.push(this);
}

