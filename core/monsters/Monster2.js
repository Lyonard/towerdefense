/**
 * Created by Roberto on 20/01/16.
 */
var Monster2 = function () {
    Monster.call( this );
    this.hp          = 5;
    this.currentHp   = 5;
    this.cellPerTurn = 1;

};
// inherit Monster
Monster2.prototype = new Monster();

// correct the constructor pointer because it points to Monster
Monster2.prototype.constructor = Monster2;

