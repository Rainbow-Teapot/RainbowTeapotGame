function DamageBlock(scene, x, y, depth, facingColor){
    GameObject.call(this,scene,x,y,depth);
    this.currentFacing = setFacingByColor(facingColor)
    this.collider = this.prepareCollider(facing);
    this.facings = {
        UP = 0,
        RIGHT = 1,
        DOWN = 2,
        LEFT = 3,
        NORMAL = 4,
    }
    this.OFFSET_X = 20;
    this.OFFSET_Y = 20;
}

DamageBlock.prototype = Object.create(GameObject.prototype);
DamageBlock.prototype.constructor = DamageBlock;

DamageBlock.prototype.setFacingByColor = function(color){
    switch(color){
        case 0:
            return this.facings.UP;
        case 128:
            return this.facings.RIGHT;
        case 64:
            return this.facings.DOWN;
        case 255:
            return this.facings.LEFT;
        default:
            return this.facings.NORMAL;
    }
}

DamageBlock.prototype.prepareCollider = function(currentFacing){

    let xOffset = 0;
    let yOffset = 0;
    let width = this.width;
    let height = this.height;

    switch(currentFacing){
        case this.facings.UP:
            yOffset = this.OFFSET_Y;
            break;
        case this.facings.RIGHT:
            width -= this.OFFSET_X;
            break;
        case this.facings.DOWN:
            this.height -= this.OFFSET_Y;
            break;
        case this.facings.LEFT:
            xOffset = this.OFFSET_X;
            break;
        case this.facings.NORMAL:
            break;
        default:
            return new Error(`No valid facing for ObjDamage`);
            
    }
    return new Collider(this,this.pos.x,this.pos.y,width,height, xOffset, yOffset);
}