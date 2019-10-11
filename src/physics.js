var physics = {
    quadTree : null,
    movableList: [],
    initPhysics : function(x,y,width,height){
        physics.quadTree = new Quadtree(
                {   x:x, 
                    y:y , 
                    width: width, 
                    height: height
                },4,20 );
    },
    placeMeeting: function(object, xOffset, yOffset, objToCollide){
        
        let collisionMask = {
            x: object.pos.x  + object.xOffsetColliderMask + xOffset,
            y: object.pos.y + object.yOffsetColliderMask +yOffset,
            width: object.width - object.xOffsetColliderMask,
            height: object.height - object.yOffsetColliderMask
        };

        let collidedObjects = physics.quadTree.retrieve(collisionMask);
        collidedObjects = collidedObjects.concat(physics.movableList);

        for(let i = 0; i < collidedObjects.length; i++){        
            if(collidedObjects[i].object.instanceOf(objToCollide)){   
                if(!collidedObjects[i].object.disable && object.depth == collidedObjects[i].object.depth && physics.intersect(collisionMask,collidedObjects[i])){
                    return true;
                }
            }
        }
        return false;
    },
    instancePlace: function(object, xOffset, yOffset, objToCollide){
        
        let collisionMask = physics.getCollisionMask(object,xOffset,yOffset);
        
        let collidedObjects = physics.quadTree.retrieve(collisionMask);

        //collidedObjects.concat(physics.movableList);

        for(let i = 0; i < collidedObjects.length; i++){        
            if(collidedObjects[i].object.instanceOf(objToCollide)){
                if(!collidedObjects[i].object.disable && physics.intersect(collisionMask,collidedObjects[i])){
                    return collidedObjects[i].object;
                }
            }
        }
        return null;
    
    },
    getCollisionMask : function(object,xOffset,yOffset){
        
        if(object){
            let collisionMask = {
                x: object.pos.x + xOffset,
                y: object.pos.y + yOffset,
                width: object.width,
                height: object.height
            };
            return collisionMask;
        }else{
            
            let collisionMask = {
                x: xOffset,
                y: yOffset,
                width: Game.TILE_SIZE,
                height: Game.TILE_SIZE
            };
            return collisionMask;
        }

    },
    intersect: function(objectA, objectB){

        let aMinPos = new Point(objectA.x, objectA.y);
        let aMaxPos = new Point(objectA.x + objectA.width, objectA.y + objectA.height);

        let bMinPos = new Point(objectB.x, objectB.y);
        let bMaxPos = new Point(objectB.x + objectB.width, objectB.y + objectB.height);

        return aMaxPos.x > bMinPos.x && aMinPos.x < bMaxPos.x 
                && aMaxPos.y > bMinPos.y && aMinPos.y < bMaxPos.y;

    }
}