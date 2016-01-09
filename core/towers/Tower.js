/**
 * Created by Roberto on 31/12/15.
 */
function Tower(){
    this.positionX = 0;
    this.positionY = 0;
    this.shotDamage = 0;
    this.rangeRadius = 0;
    this.distanceFunction = this.distances.euclidean;

    this.id = TD.towerAutoIncrement;

    TD.towerAutoIncrement++;
}

Tower.prototype.getX = function(){
    return this.positionX;
};

Tower.prototype.getY = function(){
    return this.positionY;
};

/**
 *
 * @param position {Array} An array containing 2 coordinates [x,y]
 */
Tower.prototype.setPos = function(position){
    this.positionX = position[0];
    this.positionY = position[1];
};

/**
 * Returns an array of enemies in the tower's radius
 * @returns {Array}
 */
Tower.prototype.getEnemiesInRadius = function(){
    var enemies = [];
    var cellsInRadius = this.getCellsInRadius( this.rangeRadius, this.distanceFunction);

    for(var i = 0; i < cellsInRadius.length; i++){
        var cellX = cellsInRadius[i][0];
        var cellY = cellsInRadius[i][1];
        var cell = TD.map.grid[cellX][cellY];
        enemies = enemies.concat(cell.getEnemies());
    }
    return enemies;
};

/**
 * Given a radius and a distance function,
 * returns the cells that are contained in the radius
 * according to the distance function
 * @param radius {int}
 * @param distanceFunction {function}
 * @returns {Array}
 */
Tower.prototype.getCellsInRadius = function( radius, distanceFunction ){
    var cells = [];
    var currPos = [this.getX(), this.getY()];

    for(var i = 0; i < TD.map.width; i++){
        for(var j = 0; j < TD.map.height; j++){
            if( distanceFunction( currPos, [i,j] ) <= radius ){
                cells.push( [i,j] );
            }
        }
    }
    return cells;
};

Tower.prototype.distances = {
    euclidean : function(center, cell){
        return Math.sqrt( Math.pow(center[0] - cell[0], 2) + Math.pow(center[1] - cell[1], 2) );
    }
};

Tower.prototype.heuristics = {
    closest : function(enemies, distanceFunction, callerObj){
        var closestEnemy = null;
        var shortestDistance = Number.MAX_VALUE;
        for(var i = 0; i < enemies.length; i++){
            var enemy = enemies[i];
            var enemyCoords = [enemy.getX(), enemy.getY()];
            var enemyDistance = distanceFunction([callerObj.getX(), callerObj.getY()], enemyCoords);
            if( enemyDistance < shortestDistance){
                closestEnemy = enemy;
                shortestDistance = enemyDistance;
            }
        }
        return closestEnemy;
    },
    //il piu vicino all'uscita
    closestToExit : function(enemies, distanceFunction){
        var closestEnemy = null;
        var shortestDistance = Number.MAX_VALUE;
        for(var i = 0; i < enemies.length; i++){
            var enemy = enemies[i];
            var enemyCoords = [enemy.getX(), enemy.getY()];
            var enemyDistance = distanceFunction(TD.exit, enemyCoords);
            if( enemyDistance < shortestDistance){
                closestEnemy = enemy;
                shortestDistance = enemyDistance;
            }
        }
        return closestEnemy;
    },
    //il piu lontano all'uscita
    furthestToExit: function(enemies, distanceFunction){
        var furthestEnemy = null;
        var longestDistance = Number.MAX_VALUE;
        for(var i = 0; i < enemies.length; i++){
            var enemy = enemies[i];
            var enemyCoords = [enemy.getX(), enemy.getY()];
            var enemyDistance = distanceFunction(TD.exit, enemyCoords);
            if( enemyDistance > longestDistance){
                furthestEnemy = enemy;
                longestDistance = enemyDistance;
            }
        }
        return furthestEnemy;
    },
    //quello con meno vita
    lessLife: function(enemies){
        var weakest = null;
        var minHP = Number.MAX_VALUE;
        for(var i = 0; i < enemies.length; i++){
            var enemy = enemies[i];
            var enemyLife = enemy.currentHp;
            if( enemyLife < minHP){
                weakest = enemy;
                minHP = enemyLife;
            }
        }
        return weakest;
    },
    //quello con piu vita
    mostLife: function(enemies){
        var strongest = null;
        var maxHP = Number.MAX_VALUE;
        for(var i = 0; i < enemies.length; i++){
            var enemy = enemies[i];
            var enemyLife = enemy.currentHp;
            if( enemyLife > minHP){
                strongest = enemy;
                maxHP = enemyLife;
            }
        }
        return strongest;
    }
    //TODO: mix vari
};

Tower.prototype.attack = function(enemy){
    enemy.beDamaged(this.shotDamage);
};

Tower.prototype.doMove = function(){
    var enemiesInRange = this.getEnemiesInRadius();
    var target = this.heuristics.closest( enemiesInRange, this.distanceFunction, this );

    this.attack( target );
};