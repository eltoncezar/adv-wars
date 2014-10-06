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
