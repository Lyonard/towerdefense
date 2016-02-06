/**
 * Created by Roberto on 10/01/16.
 */
var MapUI = MapUI || {
        unit       : "px",
        tileWidth  : 64,
        stageWidth : 0,
        stageHeight: 0,
        stage      : null,
        renderer   : null
    };

MapUI.init = function () {
    var numRows       = TD.size[ 0 ];
    var numCols       = TD.size[ 1 ];
    MapUI.stageWidth  = MapUI.tileWidth * numRows;
    MapUI.stageHeight = MapUI.tileWidth * numCols;

    this.loadCanvas();

    this.loadBackground();
    this.renderEntry();
    this.renderExit();
    requestAnimationFrame( MapUI.animate );
};

MapUI.loadCanvas = function () {
    // The renderer will create a canvas element for you that you can then insert into the DOM.
    MapUI.renderer = new PIXI.autoDetectRenderer( MapUI.stageWidth, MapUI.stageHeight );

    document.body.appendChild( MapUI.renderer.view );

    // You need to create a root container that will hold the scene you want to draw.
    MapUI.stage = new PIXI.Container();
};

/**
 * Renders a tile
 * @param imgPath the path to the image based on the project root
 * @param position an array of 2 coords
 * @returns {PIXI.Sprite}
 */
MapUI.renderTile = function ( imgPath, position ) {

    var texture = PIXI.Texture.fromImage( imgPath );
    var tile    = new PIXI.Sprite( texture );

    tile.width = tile.height = MapUI.tileWidth;

    tile.anchor.x = 0;
    tile.anchor.y = 0;

    tile.position.x = position[ 0 ];
    tile.position.y = position[ 1 ];

    MapUI.stage.addChild( tile );
    return tile;
};

MapUI.loadBackground = function () {
    var texture      = PIXI.Texture.fromImage( "img/grass.png" );
    var tilingSprite = new PIXI.extras.TilingSprite( texture, window.innerWidth, window.innerHeight );

    MapUI.stage.addChild( tilingSprite );
    MapUI.renderer.render( MapUI.stage );
};

MapUI.renderEntry = function () {
    MapUI.renderTile(
        "img/entry.png",
        [
            TD.entry[ 0 ] * MapUI.tileWidth,
            TD.entry[ 1 ] * MapUI.tileWidth
        ]
    );
};

MapUI.renderExit = function () {
    MapUI.renderTile(
        "img/exit.png",
        [
            TD.exit[ 0 ] * MapUI.tileWidth,
            TD.exit[ 1 ] * MapUI.tileWidth
        ]
    );
};

/**
 * Renders a monster/tower tile in the map and sets a reference to the tile into the monster itself
 * @param element
 * @param position
 */
MapUI.renderMonsterOrTower = function ( element, position ) {
    element.ui.tile = MapUI.renderTile(
        element.ui.image,
        [
            position[ 0 ] * MapUI.tileWidth,
            position[ 1 ] * MapUI.tileWidth
        ]
    );
};

MapUI.updateMonsterOrTower = function ( element, position ) {
    element.ui.tile.x = position[ 0 ] * MapUI.tileWidth;
    element.ui.tile.y = position[ 1 ] * MapUI.tileWidth;
};

MapUI.removeMonsterOrTower = function ( element ){
    MapUI.stage.removeChild ( element.ui.tile );
};

MapUI.renderMap = function () {
    var enemies = TD.enemies;
    var towers  = TD.towers;

    for ( var i = 0; i < enemies.length; i++ ) {
        var position = [ enemies[ i ].getX(), enemies[ i ].getY() ];
        if ( typeof enemies[ i ].ui.tile == 'undefined' ) {
            this.renderMonsterOrTower( enemies[ i ], position );
        }
        else {
            this.updateMonsterOrTower( enemies[ i ], position );
        }
    }

    for ( i = 0; i < towers.length; i++ ) {
        position = [ towers[ i ].getX(), towers[ i ].getY() ];
        if ( typeof towers[ i ].ui.tile == 'undefined' ) {
            this.renderMonsterOrTower( towers[ i ], position );
        }
        else {
            this.updateMonsterOrTower( towers[ i ], position );
        }
    }

    requestAnimationFrame( MapUI.animate );
};

MapUI.animate = function () {
    requestAnimationFrame( MapUI.animate );
    MapUI.renderer.render( MapUI.stage );
};