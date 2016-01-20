/**
 * Created by Roberto on 10/01/16.
 */
var MapUI = MapUI || {
        unit        : "px",
        tileWidth   : 32,
        canvasWidth : 0,
        canvasHeight: 0,
        canvas      : null
    };

MapUI.init = function () {
    var numRows        = TD.size[ 0 ];
    var numCols        = TD.size[ 1 ];
    MapUI.canvasWidth  = MapUI.tileWidth * numRows;
    MapUI.canvasHeight = MapUI.tileWidth * numCols;

    this.loadCanvas();

    this.loadBackground( MapUI.canvas );
    this.renderEntry( MapUI.canvas );
    this.renderExit( MapUI.canvas );
};

MapUI.loadCanvas = function () {
    var canvas = MapUI.canvas = document.createElement( "canvas" );
    var ctx       = canvas.getContext( "2d" );
    canvas.width  = MapUI.canvasWidth;
    canvas.height = MapUI.canvasHeight;
    document.body.appendChild( canvas );
};

MapUI.renderTile = function(ctx, fillStyle, positionStart){
    ctx.fillStyle = fillStyle;
    ctx.fillRect(positionStart[0], positionStart[1], MapUI.tileWidth, MapUI.tileWidth);
};

MapUI.loadBackground = function ( canvas ) {
    var ctx = canvas.getContext( "2d" );

    var bgImage = new Image();
    bgImage.src = "img/grass.png";

    bgImage.onload = function () {
        ctx.globalCompositeOperation='destination-over';
        var pat       = ctx.createPattern( bgImage, "repeat" );
        ctx.fillStyle = pat;
        ctx.fillRect( 0, 0, canvas.width, canvas.height );
        ctx.globalCompositeOperation='source-over';
    };
};

MapUI.renderEntry = function ( canvas ) {
    var ctx       = canvas.getContext( "2d" );
    ctx.fillStyle = "#0f0";
    MapUI.renderTile(
        ctx,
        "#0f0",
        [
            TD.entry[ 0 ] * MapUI.tileWidth,
            TD.entry[ 1 ] * MapUI.tileWidth
        ]
    );
};

MapUI.renderExit = function ( canvas ) {
    var ctx       = canvas.getContext( "2d" );

    MapUI.renderTile(
        ctx,
        "#f00",
        [
            TD.exit[ 0 ] * MapUI.tileWidth,
            TD.exit[ 1 ] * MapUI.tileWidth
        ]
    );
};

MapUI.renderMonsterOrTower = function (canvas, element, position){
    var ctx       = canvas.getContext( "2d" );

    MapUI.renderTile(
        ctx,
        element.ui.image,
        [
            position[ 0 ] * MapUI.tileWidth,
            position[ 1 ] * MapUI.tileWidth
        ]
    );
};

MapUI.renderMap = function(){
    var enemies = TD.enemies;
    var towers = TD.towers;

    if(typeof MapUI.canvas != 'undefined') {
        document.body.removeChild( MapUI.canvas );
    }

    this.loadCanvas();

    this.loadBackground( MapUI.canvas );
    this.renderEntry( MapUI.canvas );
    this.renderExit( MapUI.canvas );

    for(var i = 0; i < enemies.length; i++){
        var position = [ enemies[i].getX(), enemies[i].getY() ];
        this.renderMonsterOrTower(MapUI.canvas, enemies[i], position);
    }

    for( i = 0; i < towers.length; i++){
        position = [ towers[i].getX(), towers[i].getY() ];
        this.renderMonsterOrTower(MapUI.canvas, towers[i], position);
    }
};