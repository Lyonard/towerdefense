/**
 * Created by Roberto on 01/01/16.
 */

var Monster1 = function () {
    Monster.call( this );
    this.hp          = 5;
    this.currentHp   = 5;
    this.cellPerTurn = 5;

};
// inherit Monster
Monster1.prototype = new Monster();

// correct the constructor pointer because it points to Monster
Monster1.prototype.constructor = Monster1;

