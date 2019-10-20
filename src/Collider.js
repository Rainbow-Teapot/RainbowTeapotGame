/*Collider básico, se contempla el que se pueda mover o no para tratarlo de forma diferente
en cuanto a su gestión. Si no se mueve se almacena en el quadtree, por el contrario se mete
en una lista ya que como mucho habra 2 o 3 por nivel y no necesitamos un quadtree para eso */
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

