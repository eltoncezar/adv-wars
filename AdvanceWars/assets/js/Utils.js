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
//# sourceMappingURL=Utils.js.map
