/**
 * Created by Roberto on 01/01/16.
 */

var Monster1 = function(){
    Monster.call(this);
    this.hp = 10;
    this.currentHp = 10;
    this.cellPerTurn = 1;

};
// inherit Monster
Monster1.prototype = new Monster();

// correct the constructor pointer because it points to Monster
Monster1.prototype.constructor = Monster1;

