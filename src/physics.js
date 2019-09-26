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
        let collidedObjects = physics.quadTree.retrieve({
            x: object.pos.x + xOffset,
            y: object.pos.y + yOffset,
            width: object.width,
            height: object.height 
        })

        for(let i = 0; i < collidedObjects.length; i++){        
            if(collidedObjects[i].instanceOf(objToCollide)){
                return true;
            }
        }
        return false;
    },
    intersect: function(objectA, objectB){

        //return 

    }
}