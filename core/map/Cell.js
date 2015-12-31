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
    return this.content instanceof Monster;
};

Cell.prototype.thereIsATower = function(){
    return this.content instanceof Tower;
};

Cell.prototype.empty = function() {
    return !this.thereIsAMonster() && !this.thereIsATower();
};
