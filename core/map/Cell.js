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
        if(this.content instanceof Monster) return true;
    }
    return false;
};

Cell.prototype.thereIsATower = function(){
    for( var i = 0; i < this.content.length; i++){
        if(this.content instanceof Tower) return true;
    }
    return false;
};

Cell.prototype.empty = function() {
    return !this.thereIsAMonster() && !this.thereIsATower();
};
