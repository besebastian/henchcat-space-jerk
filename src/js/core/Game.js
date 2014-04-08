var Renderer = require('./Renderer');
var Input = require('./Input');
var TestScene = require('../scenes/TestScene');

function Game() {
    'use strict';

    // requestAnimationFrame polyfill
    window.requestAnimFrame = window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        function( callback ){
            window.setTimeout(callback, 1000 / 60);
        };

    // Abstract initialisation of renderer, input
    // and all that kinda stuff so it can be reused
    // to switch between scenes
    this.currentScene = this.initScene(new TestScene());

    this.listeners();
    this.loop();
}

Game.prototype.initScene = function (scene) {
    'use strict';
    this.input = scene.getInput();
    this.renderer = new Renderer(scene.getScene());
    this.entities = scene.getEntities();
    return scene;
};

Game.prototype.listeners = function () {
    'use strict';

    document.addEventListener('keydown', this.input.keyDown.bind(this.input), false);
    document.addEventListener('keyup', this.input.keyUp.bind(this.input), false);
};

Game.prototype.loop = function () {
    'use strict';
    this.update();
    this.render();
    window.requestAnimFrame(this.loop.bind(this));
};

Game.prototype.update = function () {
    'use strict';
    this.renderer.update();
    this.entities.forEach(function (item) {
        item.update();
    });
    this.input.handleInput(this.renderer.camera, this.currentScene.getPlayer());
};

Game.prototype.render = function () {
    'use strict';
    this.renderer.render();
    this.entities.forEach(function (item) {
        item.render();
    });
};

module.exports = Game;
