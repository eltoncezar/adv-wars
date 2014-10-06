/// <reference path="Classes.ts" />

module Utils {
    export function center(canvasSize: Classes.Size, objectSize: Classes.Size): Classes.Point {
        var x: number = canvasSize.width / 2 - objectSize.width / 2;
        var y: number = canvasSize.height / 2 - objectSize.height / 2;

        return new Classes.Point(x, y);
    }

    export function getGridPoint(index: number, width: number): Classes.Point {
        return new Classes.Point(index % width, Math.floor(index / width));
    };

    export function drawImage(image: HTMLImageElement, source: Classes.Position, destination: Classes.Position) {
        Manager.drawingSurface().drawImage(
            image,
            source.point.x,
            source.point.y,
            source.size.width,
            source.size.height,
            destination.point.x,
            destination.point.y,
            destination.size.width,
            destination.size.height
            );
    }

    export function findCanvas(canvasId: string = null) {
        var canvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById(canvasId);

        if (!canvas) {
            canvas = <HTMLCanvasElement>document.getElementsByTagName('canvas')[0];
        }

        if (canvas) {
            return canvas;
        } else {
            console.error("Cannot create MapRenderer! Canvas not found.");
            return;
        }
    }
} 