/// <reference path="Classes.ts" />
/// <reference path="MapRenderer.ts" />
var Manager = (function () {
    function Manager() {
        this.tileset = new Image();
    }
    Manager.getCanvas = function () {
        if (this.canvas == undefined) {
            this.canvas = Utils.findCanvas();
        }

        return this.canvas;
    };

    Manager.setCanvas = function (canvas, height, width) {
        this.canvas = canvas;
        this.canvas.height = height;
        this.canvas.width = width;
    };

    Manager.canvasSize = function () {
        return new Classes.Size(Manager.getCanvas().width, Manager.getCanvas().height);
    };

    Manager.drawingSurface = function () {
        return this.getCanvas().getContext("2d");
    };

    //#endregion properties
    //#region methods
    Manager.preload = function () {
        //TODO: add left and top position
        Manager.map = new MapRenderer('canvas', jsonMap);

        for (var i = 0; i < jsonMap.tilesets.length; i++) {
            var tileset = new Classes.TileSet(jsonMap.tilesets[i].name, jsonMap.tilesets[i].image.replace('..', 'assets/tilemaps/tiles'), jsonMap.tilesets[i].properties.animationFrames);
            tileset.firstGid = jsonMap.tilesets[i].firstgid;
            tileset.imageHeight = jsonMap.tilesets[i].imageheight;
            tileset.imageWidth = jsonMap.tilesets[i].imagewidth;
            tileset.margin = jsonMap.tilesets[i].margin;
            tileset.spacing = jsonMap.tilesets[i].spacing;
            tileset.tileHeight = jsonMap.tilesets[i].tileheight;
            tileset.tileWidth = jsonMap.tilesets[i].tilewidth;

            tileset.image = new Image();
            tileset.image.src = tileset.imagePath;
            tileset.image.addEventListener("load", imageLoadHandler, false);
            Manager.assetsToLoad++;

            Manager.map.addTileset(tileset.name, tileset);
        }

        function imageLoadHandler() {
            Manager.assetsToLoad--;

            if (Manager.assetsToLoad === 0) {
                Manager.create();
            }
        }
    };

    Manager.create = function () {
        // layers
        Manager.map.addLayer('layer1');
        Manager.map.addLayer('layer2');

        //Manager.map.addLayer('layer3');
        this.getCanvas().addEventListener("mousedown", mousedownHandler, false);

        function mousedownHandler(event) {
            var tile = new Classes.Point(Math.floor(event.x / jsonMap.tilewidth), Math.floor(event.y / jsonMap.tilewidth));

            Manager.sprites.push(new Classes.Tile(0, Manager.map.tilesets[0].image, new Classes.Position(new Classes.Point(4, 5), new Classes.Size(jsonMap.tilewidth, jsonMap.tilewidth)), new Classes.Position(new Classes.Point(tile.x * jsonMap.tilewidth, tile.y * jsonMap.tilewidth), new Classes.Size(jsonMap.tilewidth, jsonMap.tilewidth)), new Classes.AnimationData([56], 60, Classes.AnimationType.None)));
        }
    };

    Manager.update = function () {
        //The animation loop
        window.requestAnimationFrame(Manager.update);

        //Render the animation
        Manager.render();
    };

    Manager.render = function () {
        var canvasSize = this.canvasSize();

        //Clear the previous animation frame
        this.drawingSurface().clearRect(0, 0, canvasSize.width, canvasSize.height);

        // Make sure that the sprites array contains at least 1 sprite
        if (this.sprites.length !== 0) {
            for (var i = 0; i < this.sprites.length; i++) {
                var sprite = this.sprites[i];
                if (sprite.inUse) {
                    sprite.update();
                    if (sprite.updated) {
                        Utils.drawImage(sprite.image, sprite.source, sprite.destination);
                    }
                } else {
                    var index = this.sprites.indexOf(sprite, 0);
                    if (index != undefined) {
                        this.sprites.splice(index, 1);
                    }
                }
            }
        }
    };
    Manager.sprites = [];

    Manager.assetsToLoad = 0;
    return Manager;
})();

//#region jsonMap
var jsonMap = {
    "height": 10,
    "layers": [
        {
            "data": [2, 193, 17, 17, 17, 17, 194, 17, 17, 17, 17, 17, 17, 17, 195, 2, 193, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 195, 2, 2, 193, 66, 1, 1, 1, 1, 4, 1, 1, 1, 1, 1, 1, 1, 18, 2, 33, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 18, 2, 2, 33, 1, 1, 1, 1, 1, 4, 1, 1, 1, 1, 1, 1, 1, 18, 2, 33, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 18, 2, 2, 33, 1, 1, 1, 1, 49, 226, 50, 1, 1, 1, 1, 1, 1, 18, 2, 33, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 18, 2, 2, 33, 1, 1, 1, 1, 18, 193, 66, 1, 1, 1, 1, 1, 1, 18, 2, 33, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 18, 2, 2, 33, 1, 1, 1, 1, 65, 66, 1, 1, 1, 1, 1, 1, 1, 18, 2, 33, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 18, 2, 2, 33, 1, 1, 1, 1, 1, 1, 1, 1, 1, 49, 161, 3, 3, 211, 2, 33, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 18, 2, 2, 225, 50, 1, 1, 1, 1, 1, 1, 1, 1, 115, 66, 1, 1, 18, 2, 33, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 18, 2, 2, 2, 225, 34, 50, 1, 1, 1, 1, 1, 1, 4, 1, 1, 1, 18, 2, 225, 34, 34, 34, 34, 34, 34, 34, 34, 34, 34, 34, 34, 34, 34, 34, 227, 2, 2, 2, 2, 2, 225, 34, 34, 34, 34, 34, 34, 226, 34, 34, 34, 227, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
            "height": 10,
            "name": "layer1",
            "opacity": 1,
            "type": "tilelayer",
            "visible": true,
            "width": 35,
            "x": 0,
            "y": 0
        },
        {
            "data": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 273, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 393, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 369, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 273, 345, 274, 345, 274, 345, 299, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 369, 0, 369, 0, 369, 0, 297, 345, 345, 345, 394, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 369, 0, 297, 345, 298, 345, 299, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 417, 345, 345, 275, 0, 0, 369, 0, 369, 0, 369, 0, 369, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 297, 345, 345, 323, 0, 321, 345, 322, 345, 323, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 369, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 418, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            "height": 10,
            "name": "layer2",
            "opacity": 1,
            "type": "tilelayer",
            "visible": true,
            "width": 35,
            "x": 0,
            "y": 0
        },
        {
            "data": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 98, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 82, 210, 97, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 81, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            "height": 10,
            "name": "layer3",
            "opacity": 1,
            "type": "tilelayer",
            "visible": true,
            "width": 35,
            "x": 0,
            "y": 0
        }],
    "orientation": "orthogonal",
    "properties": {},
    "tileheight": 64,
    "tilesets": [
        {
            "firstgid": 1,
            "image": "..\/tile4.png",
            "imageheight": 1088,
            "imagewidth": 1024,
            "margin": 0,
            "name": "tile4",
            "properties": {
                "animationFrames": "4"
            },
            "spacing": 0,
            "tileheight": 64,
            "tilewidth": 64
        },
        {
            "firstgid": 273,
            "image": "..\/tile6.png",
            "imageheight": 448,
            "imagewidth": 1536,
            "margin": 0,
            "name": "tile6",
            "properties": {
                "animationFrames": "3"
            },
            "spacing": 0,
            "tileheight": 64,
            "tilewidth": 64
        }],
    "tilewidth": 64,
    "version": 1,
    "width": 35
};
//#endregion jsonMap
//# sourceMappingURL=Manager.js.map
