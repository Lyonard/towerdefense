/**
 * Created by Roberto on 10/01/16.
 */
var MapUI = MapUI || {
        unit        : "px",
        tileWidth   : 64,
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
    this.loadEntry( MapUI.canvas );
    this.loadExit( MapUI.canvas );
};

MapUI.loadCanvas = function () {
    var canvas = MapUI.canvas = document.createElement( "canvas" );
    var ctx       = canvas.getContext( "2d" );
    canvas.width  = MapUI.canvasWidth;
    canvas.height = MapUI.canvasHeight;
    document.body.appendChild( canvas );
};

MapUI.loadBackground = function ( canvas ) {
    var ctx = canvas.getContext( "2d" );
    ctx.globalCompositeOperation='destination-over';

    var bgImage = new Image();
    bgImage.src = "img/grass.png";

    bgImage.onload = function () {
        var pat       = ctx.createPattern( bgImage, "repeat" );
        ctx.fillStyle = pat;
        ctx.fillRect( 0, 0, canvas.width, canvas.height );
    };
};

MapUI.loadEntry = function ( canvas ) {
    var ctx       = canvas.getContext( "2d" );
    ctx.fillStyle = "#0f0";
    ctx.fillRect(
        TD.entry[ 0 ] * MapUI.tileWidth,
        TD.entry[ 1 ] * MapUI.tileWidth,
        MapUI.tileWidth,
        MapUI.tileWidth
    );
};

MapUI.loadExit = function ( canvas ) {
    var ctx       = canvas.getContext( "2d" );

    ctx.fillStyle = "#f00";
    ctx.fillRect(
        TD.exit[ 0 ] * MapUI.tileWidth,
        TD.exit[ 1 ] * MapUI.tileWidth,
        MapUI.tileWidth,
        MapUI.tileWidth
    );
};
