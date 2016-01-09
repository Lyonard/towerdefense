/**
 * Created by Roberto on 01/01/16.
 */
function Cannon(){
    Tower.call(this);
    this.shotDamage = 10;
    this.rangeRadius = 3;

}
// inherit Tower
Cannon.prototype = new Tower();

// correct the constructor pointer because it points to Tower
Cannon.prototype.constructor = Cannon;