var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Classes;
(function (Classes) {
    //#region Base Classes
    var Dictionary = (function () {
        function Dictionary() {
            this.datastore = {};
        }
        Dictionary.prototype.add = function (key, value) {
            this.datastore[key] = value;
        };

        Dictionary.prototype.find = function (key) {
            return this.datastore[key];
        };

        Dictionary.prototype.remove = function (key) {
            delete this.datastore[key];
        };
        return Dictionary;
    })();
    Classes.Dictionary = Dictionary;

    var Point = (function () {
        function Point(x, y) {
            this.x = x;
            this.y = y;
        }
        return Point;
    })();
    Classes.Point = Point;
    ;

    var Size = (function () {
        function Size(width, height) {
            this.width = width;
            this.height = height;
        }
        return Size;
    })();
    Classes.Size = Size;
    ;

    var Position = (function () {
        function Position(point, size) {
            this.point = point;
            this.size = size;
        }
        return Position;
    })();
    Classes.Position = Position;
    ;

    var TileSet = (function () {
        function TileSet(name, imagePath, animationFrames) {
            this.name = name;
            this.imagePath = imagePath;
            this.animationFrames = animationFrames;
        }
        return TileSet;
    })();
    Classes.TileSet = TileSet;
    ;

    //#endregion Base Classes
    //#region Enums
    var TileType = (function () {
        function TileType(movement, sight, defense) {
            this.movement = movement;
            this.sight = sight;
            this.defense = defense;
        }
        return TileType;
    })();
    Classes.TileType = TileType;
    ;

    var TileTypes = (function () {
        function TileTypes(value) {
            this.value = value;
        }
        TileTypes.Plain = new TileType(6, 3, 2);
        TileTypes.Woods = new TileType(4, 3, 2);
        TileTypes.Mountain = new TileType(2, 3, 3);
        TileTypes.City = new TileType(6, 3, 3);
        TileTypes.River = new TileType(4, 3, 0);
        TileTypes.Sea = new TileType(6, 3, 0);
        TileTypes.Coral = new TileType(6, 3, 1);
        TileTypes.Beach = new TileType(6, 3, 1);
        return TileTypes;
    })();
    Classes.TileTypes = TileTypes;
    ;

    var AnimationType = (function () {
        function AnimationType() {
        }
        AnimationType.None = new AnimationType();
        AnimationType.Once = new AnimationType();
        AnimationType.Loop = new AnimationType();
        AnimationType.BackAndForth = new AnimationType();
        return AnimationType;
    })();
    Classes.AnimationType = AnimationType;

    //#endregion Enums
    //#region GameObjects
    var GameObject = (function () {
        function GameObject() {
        }
        //#endregion properties
        //#region constructor
        //#endregion constructor
        //#region methods
        GameObject.prototype.create = function () {
            this.inUse = true;
        };

        GameObject.prototype.update = function () {
        };

        GameObject.prototype.destroy = function () {
            this.inUse = false;
        };
        return GameObject;
    })();
    Classes.GameObject = GameObject;
    ;

    var AnimationData = (function (_super) {
        __extends(AnimationData, _super);
        //#endregion properties
        //#region constructor
        function AnimationData(frames, speed, type) {
            _super.call(this);
            this.frames = frames;
            this.speed = speed;
            this.type = type;
            this.create();
        }
        //#endregion constructor
        //#region super methods
        AnimationData.prototype.create = function () {
            _super.prototype.create.call(this);
            this.numberOfFrames = this.frames.length;
            this.currentFrame = 0;
            this.counter = 0;
            this.forward = true;
            this.isPlaying = true;
        };

        AnimationData.prototype.update = function () {
            if (this.isPlaying && this.type != AnimationType.None) {
                if (this.counter == this.speed) {
                    _super.prototype.update.call(this);

                    switch (this.type) {
                        case AnimationType.Once: {
                            if (this.currentFrame === this.numberOfFrames - 1) {
                                this.stop();
                            }
                            break;
                        }
                        case AnimationType.Loop: {
                            if (this.currentFrame === this.numberOfFrames - 1) {
                                this.currentFrame = -1;
                            }
                            break;
                        }
                        case AnimationType.BackAndForth: {
                            if (this.currentFrame === this.numberOfFrames - 1) {
                                this.forward = false;
                            }
                            if (this.currentFrame === 0 && this.forward === false) {
                                this.forward = true;
                            }
                            break;
                        }
                    }

                    if (this.isPlaying) {
                        if (this.forward) {
                            this.currentFrame++;
                        } else {
                            this.currentFrame--;
                        }

                        if (this.currentFrame >= this.frames.length) {
                            this.currentFrame = 0;
                        }

                        this.counter = 0;
                    }
                }
                this.counter++;
            }
        };

        AnimationData.prototype.destroy = function () {
            _super.prototype.destroy.call(this);
            this.stop();
        };

        //#endregion super methods
        //#region methods
        AnimationData.prototype.getCurrentFrame = function () {
            return this.frames[this.currentFrame];
        };

        AnimationData.prototype.play = function () {
            this.isPlaying = true;
        };

        AnimationData.prototype.stop = function () {
            this.isPlaying = false;
        };
        return AnimationData;
    })(GameObject);
    Classes.AnimationData = AnimationData;

    var Sprite = (function (_super) {
        __extends(Sprite, _super);
        //#endregion properties
        //#region constructor
        function Sprite(data, image, source, destination) {
            _super.call(this);
            this.data = data;
            this.image = image;
            this.source = source;
            this.destination = destination;
            this.create();
        }
        //#endregion constructor
        //#region super methods
        Sprite.prototype.create = function () {
            _super.prototype.create.call(this);
            this.visible = true;
            this.updated = true;
        };

        Sprite.prototype.update = function () {
            _super.prototype.update.call(this);
            this.updated = true;
        };

        Sprite.prototype.destroy = function () {
            _super.prototype.destroy.call(this);
            this.visible = false;
        };
        return Sprite;
    })(GameObject);
    Classes.Sprite = Sprite;
    ;

    var AnimatedSprite = (function (_super) {
        __extends(AnimatedSprite, _super);
        //#region properties
        //#endregion properties
        //#region constructor
        function AnimatedSprite(data, image, source, destination, animationData) {
            _super.call(this, data, image, source, destination);
            this.data = data;
            this.image = image;
            this.source = source;
            this.destination = destination;
            this.animationData = animationData;
            this.create();
        }
        //#endregion constructor
        //#region super methods
        AnimatedSprite.prototype.create = function () {
            _super.prototype.create.call(this);
        };

        AnimatedSprite.prototype.update = function () {
            _super.prototype.update.call(this);
            var point;
            this.data = this.animationData.getCurrentFrame();
            point = Utils.getGridPoint(this.data - jsonMap.tilesets[0].firstgid, Math.round(jsonMap.tilesets[0].imagewidth / (jsonMap.tilesets[0].tilewidth)));
            this.source = new Classes.Position(new Classes.Point(point.x * jsonMap.tilewidth + (jsonMap.tilesets[0].spacing * point.x), point.y * jsonMap.tileheight + (jsonMap.tilesets[0].spacing * point.y)), new Classes.Size(jsonMap.tilewidth, jsonMap.tileheight));

            this.animationData.update();
        };

        AnimatedSprite.prototype.destroy = function () {
            _super.prototype.destroy.call(this);
        };
        return AnimatedSprite;
    })(Sprite);
    Classes.AnimatedSprite = AnimatedSprite;
    ;

    var Tile = (function (_super) {
        __extends(Tile, _super);
        //#endregion properties
        //#region constructor
        function Tile(data, image, source, destination, animationData) {
            _super.call(this, data, image, source, destination, animationData);
            this.data = data;
            this.image = image;
            this.source = source;
            this.destination = destination;
            this.animationData = animationData;
            this.create();
        }
        //#endregion constructor
        //#region super methods
        Tile.prototype.create = function () {
            _super.prototype.create.call(this);
            switch (this.data) {
                case 70:
                    this.type = TileTypes.Plain;
                    break;
                default:
                    break;
            }
        };

        Tile.prototype.update = function () {
            _super.prototype.update.call(this);
        };

        Tile.prototype.destroy = function () {
            _super.prototype.destroy.call(this);
        };
        return Tile;
    })(AnimatedSprite);
    Classes.Tile = Tile;
    ;
})(Classes || (Classes = {}));
/// <reference path="Classes.ts" />
var Utils;
(function (Utils) {
    function center(canvasSize, objectSize) {
        var x = canvasSize.width / 2 - objectSize.width / 2;
        var y = canvasSize.height / 2 - objectSize.height / 2;

        return new Classes.Point(x, y);
    }
    Utils.center = center;

    function getGridPoint(index, width) {
        return new Classes.Point(index % width, Math.floor(index / width));
    }
    Utils.getGridPoint = getGridPoint;
    ;

    function drawImage(image, source, destination) {
        Manager.drawingSurface().drawImage(image, source.point.x, source.point.y, source.size.width, source.size.height, destination.point.x, destination.point.y, destination.size.width, destination.size.height);
    }
    Utils.drawImage = drawImage;

    function findCanvas(canvasId) {
        if (typeof canvasId === "undefined") { canvasId = null; }
        var canvas = document.getElementById(canvasId);

        if (!canvas) {
            canvas = document.getElementsByTagName('canvas')[0];
        }

        if (canvas) {
            return canvas;
        } else {
            console.error("Cannot create MapRenderer! Canvas not found.");
            return;
        }
    }
    Utils.findCanvas = findCanvas;
})(Utils || (Utils = {}));
/// <reference path="Utils.ts" />
/// <reference path="Classes.ts" />
var MapRenderer = (function () {
    //#endregion properties
    //#region constructor
    function MapRenderer(canvasId, json) {
        //tileset: Classes.TileSet;
        this.tilesets = new Array();
        this.assetsToLoad = [];
        this.assetsLoaded = 0;
        this.jsonMap = json;

        Manager.setCanvas(Utils.findCanvas(canvasId), jsonMap.height * jsonMap.tileheight, jsonMap.width * jsonMap.tilewidth);
    }
    //#endregion constructor
    //#region methods
    MapRenderer.prototype.addTileset = function (name, tileset) {
        this.tilesets.push(tileset);
    };

    MapRenderer.prototype.findByGid = function (gid) {
        var tileset;
        for (var i = 0; i < this.tilesets.length; i++) {
            if (gid >= this.tilesets[i].firstGid) {
                tileset = this.tilesets[i];
            }
        }
        return tileset;
    };

    MapRenderer.prototype.addLayer = function (index) {
        var layer;

        // check by index
        if (index && typeof index == "number") {
            layer = this.jsonMap.layers[index];
        }

        // check by layer name
        if (index && typeof index == "string") {
            for (var i = 0; i < this.jsonMap.layers.length; i++) {
                if (this.jsonMap.layers[i].name === index) {
                    layer = this.jsonMap.layers[i];
                    continue;
                }
            }
        }

        if (layer) {
            for (var i = 0; i < layer.data.length; i++) {
                if (layer.data[i] > 0) {
                    var tileset = this.findByGid(layer.data[i]);

                    if (layer.data[i] >= tileset.firstGid) {
                        var point, destination, source;
                        var data = layer.data[i] - (tileset.firstGid - 1);

                        point = Utils.getGridPoint(i, this.jsonMap.width);
                        destination = new Classes.Position(new Classes.Point(point.x * this.jsonMap.tilewidth, point.y * this.jsonMap.tileheight), new Classes.Size(this.jsonMap.tilewidth, this.jsonMap.tileheight));

                        point = Utils.getGridPoint(data, Math.round(tileset.imageWidth / tileset.tileWidth));
                        source = new Classes.Position(new Classes.Point((point.x - 1) * this.jsonMap.tilewidth + (tileset.spacing * point.x) + 1, (point.y - 1) * this.jsonMap.tileheight + (tileset.spacing * point.y) + 1), new Classes.Size(this.jsonMap.tilewidth, this.jsonMap.tileheight));

                        var frames = [];
                        for (var j = 0; j < tileset.animationFrames; j++) {
                            frames.push(data + (tileset.animationFrames * j));
                        }

                        Manager.sprites.push(new Classes.Tile(layer.data[i], tileset.image, source, destination, new Classes.AnimationData(frames, 10, Classes.AnimationType.BackAndForth)));
                    }
                }
            }
        } else {
            console.log('Layer "' + index + '" not found.');
        }
    };
    return MapRenderer;
})();
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
/// <reference path="Manager.ts" />
Manager.preload();
Manager.create();
//Manager.update();
