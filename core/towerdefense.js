/**
 * Created by Roberto on 31/12/15.
 */
var TD = TD || {
        size                : [ 10, 10 ],
        entry               : [ 0, 4 ],
        exit                : [ 9, 4 ],
        monsterAutoIncrement: 1,
        towerAutoIncrement  : 1,
        playerLives         : 10,
        playerCoins         : 10
    };

TD.init = function () {

    TD.map = new Map( TD.size, TD.entry, TD.exit );

    //the enemies
    TD.enemies = [];

    //towers
    TD.towers = [];
    TD.player = new Player();
};

TD.game = {
    startGame: function () {

    },
    gameOver : function () {
        console.log( "gameOver" );
    }
};

TD.globalFunctions = {
    addEnemy: function ( enemy, position ) {
        if ( !enemy instanceof Monster ) {
            throw "Not a monster";
        }

        if ( typeof position == 'undefined' ) {
            position = TD.entry;
        }

        TD.enemies.push( enemy );
        var startX = position[ 0 ];
        var startY = position[ 1 ];
        TD.map.grid[ startX ][ startY ].addEnemy( enemy );
        return enemy;
    },

    addTower: function ( tower, position ) {
        if ( !tower instanceof Tower ) {
            throw "Not a tower";
        }

        TD.towers.push( tower );
        var posX = position[ 0 ];
        var posY = position[ 1 ];
        tower.setPos( position );
        TD.map.grid[ posX ][ posY ].addTower( tower );
        return tower;
    },

    removeEnemy: function ( enemy ) {
        var posX = enemy.getX();
        var posY = enemy.getY();
        var ID   = enemy.id;

        var idx = -1;
        for ( var i = 0; i < TD.enemies.length; i++ ) {
            if ( TD.enemies[ i ] instanceof Monster && TD.enemies[ i ].id == ID ) {
                idx = i;
                break;
            }
        }
        if ( idx < 0 ) {
            console.debug( "Error while deleting enemy from TD.enemies" );
            return false;
        }

        TD.enemies.splice( idx, 1 );
        return TD.map.grid[ posX ][ posY ].removeEnemy( ID );
    },

    removeTower: function ( tower ) {
        var posX = tower.getX();
        var posY = tower.getY();
        var ID   = tower.id;

        var idx = -1;
        for ( var i = 0; i < TD.towers.length; i++ ) {
            if ( TD.towers[ i ] instanceof Tower && TD.towers[ i ].id == ID ) {
                idx = i;
                break;
            }
        }
        if ( idx < 0 ) {
            console.debug( "Error while deleting tower from TD.towers" );
            return false;
        }

        TD.towers.splice( idx, 1 );
        return TD.map.grid[ posX ][ posY ].removeTower( ID );
    }
};

TD.events = {
    exitReached: function ( monster ) {
        //evaluate hearts to be removed to the player.
        var damage = monster.hp;
        TD.player.beDamaged( damage );
        //remove the monster from the map
        TD.globalFunctions.removeEnemy( monster );
        //check if the player is died
        if ( TD.player.isDied() ) {
            TD.game.gameOver();
        }
    },
    monsterDied: function ( monster ) {
        //get monster money value
        var money = monster.getMoneyValue();

        //add this value to players's money
        TD.player.addMoney( money );
    }

};

TD.test = {
    addEnemyAndMove: function () {
        TD.globalFunctions.addEnemy( new Monster1() );
        console.log( TD.enemies[ 0 ] );
        TD.enemies[ 0 ].doMove();
        console.log( TD.enemies[ 0 ] );
    },
    showMap        : function () {
        var map      = TD.map.grid;
        var towers   = TD.towers;
        var monsters = TD.enemies;
        console.group( "MAP" );
        console.log( ">> grid" );
        for ( var i = 0; i < map.length; i++ ) {
            for ( var j = 0; j < map[ i ].length; j++ ) {
                if ( !map[ i ][ j ].empty() ) {
                    console.log( i, j, map[ i ][ j ].content );
                }
            }
        }
        console.log( ">> towers" );
        console.log( towers );

        console.log( ">> monsters" );
        console.log( monsters );
        console.groupEnd();
    }

};