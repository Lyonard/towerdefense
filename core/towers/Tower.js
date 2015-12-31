/**
 * Created by Roberto on 31/12/15.
 */
function Tower(){
    this.positionX = 0;
    this.positionY = 0;
}

Tower.prototype.getX = function(){
    return this.positionX;
};

Tower.prototype.getY = function(){
    return this.positionY;
};

Tower.pathfinding = {};
