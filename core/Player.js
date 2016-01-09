/**
 * Created by Roberto on 09/01/16.
 */
function Player() {
    this.lives = TD.playerLives;
    this.money = TD.playerCoins;
}

Player.prototype.isDied = function(){
    return this.lives <= 0;
};

Player.prototype.beDamaged = function( damage ){
    this.lives -= damage;
};

Player.prototype.addMoney= function (money){
    this.money += money;
};