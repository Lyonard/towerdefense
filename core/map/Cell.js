/**
 * Created by Roberto on 31/12/15.
 */
function Cell(){
    //This has to be overidden in children.
    this.name = "Empty cell";
    this.type = 0;

    this.content = [];
}

Cell.prototype.thereIsAMonster = function(){
    for( var i = 0; i < this.content.length; i++){
        if(this.content[i] instanceof Monster) return true;
    }
    return false;
};

Cell.prototype.thereIsATower = function(){
    for( var i = 0; i < this.content.length; i++){
        if(this.content[i] instanceof Tower) return true;
    }
    return false;
};

Cell.prototype.getEnemies = function(){
    var enemies = [];
    for( var i = 0; i < this.content.length; i++){
        if(this.content[i] instanceof Monster) enemies.push();
    }
    return enemies;
};

Cell.prototype.getTowers = function(){
    var towers = [];
    for( var i = 0; i < this.content.length; i++){
        if(this.content[i] instanceof Tower) towers.push();
    }
    return towers;
};

/**
 * Removes an enemy given its ID
 * @param id
 * @returns {boolean}
 */
Cell.prototype.removeEnemy = function(id){
    var idx = -1;
    for(var i = 0; i < this.content.length; i++){
        if(this.content[i] instanceof Monster && this.content[i].id == id) {
            idx = i;
            break;
        }
    }
    if(idx > -1){
        this.content = this.content.splice(idx,1);
        return true;
    }
    return false;
};

/**
 * Removes a tower given its ID
 * @param id
 * @returns {boolean}
 */
Cell.prototype.removeTower = function( id ){
    var idx = -1;
    for(var i = 0; i < this.content.length; i++){
        if(this.content[i] instanceof Tower && this.content[i].id == id) {
            idx = i;
            break;
        }
    }
    if(idx > -1){
        this.content = this.content.splice(idx,1);
        return true;
    }
    return false;
};

Cell.prototype.addEnemy = function( enemy ){
    if(this.thereIsATower())
        throw "This cell contains a Tower";

    if( !enemy instanceof Monster)
        throw "This is not a Monster";

    this.content.push( enemy );
    return enemy;
};

Cell.prototype.addTower = function( tower ){
    if(this.thereIsAMonster())
        throw "This cell contains a Monster.";

    if( !tower instanceof Tower)
        throw "This is not a Tower";

    this.content.push( tower );
    return tower;
};

Cell.prototype.empty = function() {
    return !this.thereIsAMonster() && !this.thereIsATower();
};
