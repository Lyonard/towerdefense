/**
 * Created by Roberto on 01/01/16.
 */
function Cannon(){
    Tower.call(this);
    this.shotDamage = 1;
    this.rangeRadius = 3;

}
// inherit Tower
Cannon.prototype = new Tower();

// correct the constructor pointer because it points to Tower
Cannon.prototype.constructor = Cannon;

Cannon.prototype.doMove = function(){
    var enemiesInRange = this.getEnemiesInRadius();
    console.log( enemiesInRange );
    //debugger;
    var target = this.heuristics.closest( enemiesInRange, this.distanceFunction );
    console.log(target);
};