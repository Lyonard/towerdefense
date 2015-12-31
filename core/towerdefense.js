/**
 * Created by Roberto on 31/12/15.
 */
var TD = TD || {
        size: [10, 10],
        entry: [0, 4],
        exit: [9, 4],
        monsterAutoIncrement: 1,
        towerAutoIncrement: 1
    };

TD.init = function () {

    TD.map = new Map(TD.size, TD.entry, TD.exit);

    //the enemies
    TD.enemies = [];

    //towers
    TD.towers = {};
};

TD.globalFunctions = {
    addEnemy: function (enemy) {
        if (!enemy instanceof Monster) {
            throw "Not a monster";
        }

        TD.enemies.push(enemy);
        var startX = TD.entry[0] ;
        var startY = TD.entry[1] ;
        TD.map.grid[startX][startY].content.push(enemy)
    }
};

TD.events = {
    exitReached: function(monster){
        //evaluate hearts to be removed to the player.
        //remove the monster from the map
        //check if the player is died
    }
};

TD.test = {
    addEnemyAndMove: function(){
        TD.globalFunctions.addEnemy(new Monster());
        console.log(TD.enemies[0]);
        TD.enemies[0].doMove();
        console.log(TD.enemies[0]);
    }
};