/**
 * Created by Roberto on 06/02/16.
 */
var Hub = Hub || {
        livesPosition       : [ 20, 20 ],
        moneyPosition       : [ 20, 50 ],
        monstersLeftPosition: [ 20, 80 ]
    };

Hub.render = function (lives, money, monstersLeft) {

    var livesText = new PIXI.Text("Lives: "+lives, {font:"20px Arial", fill:"black"});
    livesText.x = Hub.livesPosition[0];
    livesText.y = Hub.livesPosition[1];

    var moneyText = new PIXI.Text("Money: "+money, {font:"20px Arial", fill:"black"});
    moneyText.x = Hub.moneyPosition[0];
    moneyText.y = Hub.moneyPosition[1];


    var monstersText = new PIXI.Text("Monsters left: "+monstersLeft, {font:"20px Arial", fill:"black"});
    monstersText.x = Hub.monstersLeftPosition[0];
    monstersText.y = Hub.monstersLeftPosition[1];


    MapUI.stage.addChild(livesText);
    MapUI.stage.addChild(moneyText);
    MapUI.stage.addChild(monstersText);


    requestAnimationFrame(MapUI.animate);
};