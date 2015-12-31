/**
 * Created by Roberto on 31/12/15.
 */
function Monster() {
    this.hp = 1;
    this.cellPerTurn = 1;
    this.positionX = 0;
    this.positionY = 0;
    this.id = TD.monsterAutoIncrement;

    TD.monsterAutoIncrement++;
}

Monster.prototype.isDead = function () {
    return this.hp <= 0;
};

Monster.prototype.getX = function () {
    return this.positionX;
};

Monster.prototype.getY = function () {
    return this.positionY;
};

Monster.prototype.doMove = function () {
    if (this.isDead()) return null;
debugger;
    var pathToExit = TD.map.findPath([this.positionX, this.positionY]);

    if(pathToExit.length > 1){
        pathToExit.splice(0, 1);
    }

    var movesLeft = this.cellPerTurn;
    while (movesLeft > 0) {
        var nextCell = pathToExit.splice(0, 1);
        this.move(nextCell[0]);
        movesLeft--;
    }
};

Monster.prototype.move = function (cell) {
    if (Math.abs(this.positionX + this.positionY - cell[0] - cell[1]) <= 0) {
        throw "Invalid move: (" + this.positionX + "," + this.positionY + ") -> (" + cell[0] + ", " + cell[1] + ")";
    }
    this.positionX = cell[0];
    this.positionY = cell[1];
};