/// <reference path="Utils.ts" />
/// <reference path="Manager.ts" />

module Classes {
    //#region Base Classes

    export class Dictionary<T> {
        datastore: Object = {};

        add(key: string, value: T) {
            this.datastore[key] = value;
        }

        find(key: string): TileSet {
            return this.datastore[key];
        }

        remove(key: string) {
            delete this.datastore[key];
        }
    }

    export class Point {
        constructor(
            public x: number,
            public y: number) {
        }
    };

    export class Size {
        constructor(
            public width: number,
            public height: number) {
        }
    };

    export class Position {
        constructor(
            public point: Point,
            public size: Size) {
        }
    };

    export class TileSet {
        firstGid: number;
        image: HTMLImageElement;
        imageHeight: number;
        imageWidth: number;
        margin: number;
        spacing: number;
        tileHeight: number;
        tileWidth: number;

        constructor(
            public name: string,
            public imagePath: string,
            public animationFrames: number) {
        }
    };
    //#endregion Base Classes

    //#region Enums

    export class TileType {
        constructor(
            public movement: number,
            public sight: number,
            public defense: number) {
        }
    };

    export class TileTypes {
        constructor(public value: TileType) {
        }

        static Plain = new TileType(6, 3, 2);
        static Woods = new TileType(4, 3, 2);
        static Mountain = new TileType(2, 3, 3);
        static City = new TileType(6, 3, 3);
        static River = new TileType(4, 3, 0);
        static Sea = new TileType(6, 3, 0);
        static Coral = new TileType(6, 3, 1);
        static Beach = new TileType(6, 3, 1);
    };

    export class AnimationType {
        constructor() {
        }

        static None = new AnimationType();
        static Once = new AnimationType();
        static Loop = new AnimationType();
        static BackAndForth = new AnimationType();
    }
    //#endregion Enums

    //#region GameObjects

    export class GameObject {
        //#region properties

        inUse: boolean;
        //#endregion properties

        //#region constructor
        //#endregion constructor

        //#region methods

        create(): void {
            this.inUse = true;
        }

        update(): void {
        }

        destroy(): void {
            this.inUse = false;
        }
        //#endregion methods
    };

    export class AnimationData extends GameObject {
        //#region properties

        isPlaying: boolean;
        forward: boolean;
        numberOfFrames: number;
        currentFrame: number;
        counter: number;
        //#endregion properties

        //#region constructor

        constructor(
            public frames: Array<number>,
            public speed: number,
            public type: AnimationType) {
            super();
            this.create();
        }
        //#endregion constructor

        //#region super methods

        create() {
            super.create();
            this.numberOfFrames = this.frames.length;
            this.currentFrame = 0;
            this.counter = 0;
            this.forward = true;
            this.isPlaying = true;
        }

        update() {
            if (this.isPlaying && this.type != AnimationType.None) {
                if (this.counter == this.speed) {
                    super.update();

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
                        }
                        else {
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
        }

        destroy() {
            super.destroy();
            this.stop();
        }
        //#endregion super methods

        //#region methods

        getCurrentFrame() {
            return this.frames[this.currentFrame];
        }

        play() {
            this.isPlaying = true;
        }

        stop() {
            this.isPlaying = false;
        }
        //#endregion methods
    }

    export class Sprite extends GameObject {
        //#region properties

        updated: boolean;
        visible: boolean;
        //#endregion properties

        //#region constructor

        constructor(
            public data: number,
            public image: HTMLImageElement,
            public source: Position,
            public destination: Position) {
            super();
            this.create();
        }
        //#endregion constructor

        //#region super methods

        create() {
            super.create();
            this.visible = true;
            this.updated = true;
        }

        update() {
            super.update();
            this.updated = true;
        }

        destroy() {
            super.destroy();
            this.visible = false;
        }
        //#endregion super methods

        //#region methods
        //#endregion methods
    };

    export class AnimatedSprite extends Sprite {
        //#region properties
        //#endregion properties

        //#region constructor
        constructor(
            public data: number,
            public image: HTMLImageElement,
            public source: Position,
            public destination: Position,
            public animationData: AnimationData) {
            super(data, image, source, destination);
            this.create();
        }
        //#endregion constructor

        //#region super methods
        create() {
            super.create();
        }

        update() {
            super.update();
            var point;
            this.data = this.animationData.getCurrentFrame();
            point = Utils.getGridPoint(this.data - jsonMap.tilesets[0].firstgid, Math.round(jsonMap.tilesets[0].imagewidth / (jsonMap.tilesets[0].tilewidth)));
            this.source = new Classes.Position(
                new Classes.Point(
                    point.x * jsonMap.tilewidth + (jsonMap.tilesets[0].spacing * point.x),
                    point.y * jsonMap.tileheight + (jsonMap.tilesets[0].spacing * point.y)),
                new Classes.Size(
                    jsonMap.tilewidth,
                    jsonMap.tileheight)
                );

            this.animationData.update();
        }

        destroy() {
            super.destroy();
        }

        //#endregion super methods

        //#region methods
        //#endregion methods
    };

    export class Tile extends AnimatedSprite {
        //#region properties

        type: TileType;
        //#endregion properties

        //#region constructor

        constructor(
            public data: number,
            public image: HTMLImageElement,
            public source: Position,
            public destination: Position,
            public animationData: AnimationData) {
            super(data, image, source, destination, animationData);
            this.create();
        }
        //#endregion constructor

        //#region super methods

        create(): void {
            super.create();
            switch (this.data) {
                case 70:
                    this.type = TileTypes.Plain;
                    break;
                default:
                    break;
            }
        }

        update(): void {
            super.update();
        }

        destroy(): void {
            super.destroy();
        }
        //#endregion super methods

        //#region methods
        //#endregion methods
    };
    //#endregion GameObjects
}