/// <reference path="Utils.ts" />
/// <reference path="Classes.ts" />

class MapRenderer {
    //#region properties

    jsonMap: any;
    canvas: HTMLCanvasElement;
    drawingSurface: CanvasRenderingContext2D;
    //tileset: Classes.TileSet;
    tilesets: Array<Classes.TileSet> = new Array<Classes.TileSet>();

    assetsToLoad: Array<HTMLImageElement> = [];
    assetsLoaded: number = 0;

    //#endregion properties

    //#region constructor

    constructor(canvasId: string, json?: any) {
        this.jsonMap = json;

        Manager.setCanvas(Utils.findCanvas(canvasId), jsonMap.height * jsonMap.tileheight, jsonMap.width * jsonMap.tilewidth);
    }
    //#endregion constructor

    //#region methods

    addTileset(name: string, tileset: Classes.TileSet): void {
        this.tilesets.push(tileset);
    }

    findByGid(gid: number): Classes.TileSet {
        var tileset: Classes.TileSet;
        for (var i = 0; i < this.tilesets.length; i++) {
            if (gid >= this.tilesets[i].firstGid) {
                tileset = this.tilesets[i];
            }
        }
        return tileset;
    }

    addLayer(index: number);
    addLayer(index: string);
    addLayer(index: any) {
        var layer: any;

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
                    var tileset: Classes.TileSet = this.findByGid(layer.data[i]);

                    if (layer.data[i] >= tileset.firstGid) {
                        var point, destination, source;
                        var data: number = layer.data[i] - (tileset.firstGid - 1);

                        point = Utils.getGridPoint(i, this.jsonMap.width);
                        destination = new Classes.Position(
                            new Classes.Point(
                                point.x * this.jsonMap.tilewidth,
                                point.y * this.jsonMap.tileheight),
                            new Classes.Size(
                                this.jsonMap.tilewidth,
                                this.jsonMap.tileheight)
                            )

                        point = Utils.getGridPoint(data, Math.round(tileset.imageWidth / tileset.tileWidth));
                        source = new Classes.Position(
                            new Classes.Point(
                                (point.x - 1) * this.jsonMap.tilewidth + (tileset.spacing * point.x) + 1,
                                //point.y * this.jsonMap.tileheight + (tileset.spacing * point.y)),
                                (point.y - 1) * this.jsonMap.tileheight + (tileset.spacing * point.y) + 1),
                            new Classes.Size(
                                this.jsonMap.tilewidth,
                                this.jsonMap.tileheight)
                            )

                        var frames = [];
                        for (var j = 0; j < tileset.animationFrames; j++) {
                            frames.push(data + (tileset.animationFrames * j));
                        }

                        Manager.sprites.push(
                            new Classes.Tile(
                                layer.data[i],
                                tileset.image,
                                source,
                                destination,
                                new Classes.AnimationData(frames, 10, Classes.AnimationType.BackAndForth)
                                )
                            );
                    }
                }
            }
        }
        else {
            console.log('Layer "' + index + '" not found.')
        }
    }
    //#endregion methods
}