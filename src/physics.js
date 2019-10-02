var physics = {
    quadTree : null,
    initPhysics : function(x,y,width,height){
        physics.quadTree = new Quadtree(
                {   x:x, 
                    y:y , 
                    width: width, 
                    height: height
                },4 );
    },
    placeMeeting: function(object, xOffset, yOffset, objToCollide){
        
        let collisionMask = {
            x: object.pos.x + xOffset,
            y: object.pos.y + yOffset,
            pos: new Point(object.pos.x + xOffset, object.pos.y + yOffset),
            width: object.width,
            height: object.height
        };
        let collidedObjects = physics.quadTree.retrieve({collisionMask})

        for(let i = 0; i < collidedObjects.length; i++){        
            if(collidedObjects[i].instanceOf(objToCollide)){   
                if(!collidedObjects[i].disable && object.depth == collidedObjects[i].depth && physics.intersect(collisionMask,collidedObjects[i])){
                    return true;
                }
            }
        }
        return false;
    },
    instancePlace: function(object, xOffset, yOffset, objToCollide){
        
        let collisionMask = physics.getCollisionMask(object,xOffset,yOffset);
        
        let collidedObjects = physics.quadTree.retrieve({collisionMask})

        for(let i = 0; i < collidedObjects.length; i++){        
            if(collidedObjects[i].instanceOf(objToCollide)){
                if(!collidedObjects[i].disable && physics.intersect(collisionMask,collidedObjects[i])){
                    return collidedObjects[i];
                }
            }
        }
        return null;
    
    },
    getCollisionMask : function(object,xOffset,yOffset){
        let collisionMask = null;
        
        if(object){
            collisionMask = {
                x: object.pos.x + xOffset,
                y: object.pos.y + yOffset,
                pos: new Point(object.pos.x + xOffset, object.pos.y + yOffset),
                width: object.width,
                height: object.height
            };
        }else{
            collisionMask = {
                x: xOffset,
                y: yOffset,
                pos: new Point(xOffset, yOffset),
                width: Game.TILE_SIZE,
                height: Game.TILE_SIZE
            };
        }

        return collisionMask;
    },
    intersect: function(objectA, objectB){

        let aMinPos = new Point(objectA.pos.x, objectA.pos.y);
        let aMaxPos = new Point(objectA.pos.x + objectA.width, objectA.pos.y + objectA.height);

        let bMinPos = new Point(objectB.pos.x, objectB.pos.y);
        let bMaxPos = new Point(objectB.pos.x + objectB.width, objectB.pos.y + objectB.height);

        return aMaxPos.x > bMinPos.x && aMinPos.x < bMaxPos.x 
                && aMaxPos.y > bMinPos.y && aMinPos.y < bMaxPos.y;

    }
}