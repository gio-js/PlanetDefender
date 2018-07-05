import { Tile } from "./app.core.model.game.tile";
import { ArenaPlayer } from "./app.core.model.game.arenaPlayer";
import { TILES_NUMBER } from "../../consts/app.core.const.game";
import { TerrainType } from "../../enums/app.core.enum.terrainType";
import { IMapMovableElement } from "../../interfaces/app.core.model.mapMovableElement";
import { Point } from "./app.core.model.game.point";
import PathFind from 'pathfinding';
import { IMapElement } from "../../interfaces/app.core.model.mapElement";

export class Map {

    Tiles: {}; //Dictionary<x_y, Tile>;

    constructor(attacker: ArenaPlayer, defender: ArenaPlayer) {
        this.Tiles = {};

        for(let y = 0; y < TILES_NUMBER; y++){
            for(let x = 0; x < TILES_NUMBER; x++){
                const tile = new Tile();
                tile.Location = {
                        X: x,
                        Y: y
                    };
                tile.TerrainType = TerrainType.Grass,
                tile.Element = (() => {
                    return (
                        (attacker ? attacker.getElementAt(x, y) : null) || 
                        defender.getElementAt(x, y) || 
                        null
                    );
                })(),
                this.Tiles[`${x}_${y}`] = tile;
            }
        }
    }

    /**
     * Finds the tile at the specified location
     * @param x x location
     * @param y y location
     */
    public getTileAt(x: number, y: number): Tile {
        return this.Tiles[`${x}_${y}`] || null;
    }

    /**
     * Retrieve the best route path from one location to another
     */
    public FindRoutePoints(sourcePoint: Point, destinationPoint: Point): Array<Point> {
        const grid = new PathFind.Grid(TILES_NUMBER, TILES_NUMBER);
        const finder = new PathFind.AStarFinder();
    
        const destinationTile = this.getTileAt(destinationPoint.X, destinationPoint.Y);
        if (sourcePoint === null || destinationTile.Element !== null) {
          return null;
        }

        for (let y = 0; y < TILES_NUMBER; y++) {
          for (let x = 0; x < TILES_NUMBER; x++) {
            const el = this.getTileAt(x, y).Element;
    
            if (el != null) {
              grid.setWalkableAt(x, y, false);
            }
          }
        }
    
        const paths = finder.findPath(sourcePoint.X, sourcePoint.Y, destinationPoint.X, destinationPoint.Y, grid);
        const points: Array<Point> = [];
        for (const path of paths) {
          points.push({
            X: path[0],
            Y: path[1]
          });
        }
    
        return points;
    }

    /**
     * Retrieve the best route path from one location to another (by reference element as source)
     */
    public FindRoutePointsByElement(relatedElement: IMapElement, destinationPoint: Point): Array<Point> {
        return this.FindRoutePoints(relatedElement.Location, destinationPoint);
    }

    /**
     * Retrieve the best route path from one location to another (by reference element as source)
     */
    public FindRouteForAttack(relatedElement: IMapElement, destinationElement: Point): Array<Point> {
        const 
            westPoint = { X: destinationElement.X - 1, Y: destinationElement.Y },
            eastPoint = { X: destinationElement.X + 1, Y: destinationElement.Y },
            southPoint = { X: destinationElement.X, Y: destinationElement.Y + 1},
            northPoint = { X: destinationElement.X, Y: destinationElement.Y - 1};

        // the element is already in the correct position
        if (
            (relatedElement.Location.X == westPoint.X && relatedElement.Location.Y == westPoint.Y) ||
            (relatedElement.Location.X == eastPoint.X && relatedElement.Location.Y == eastPoint.Y) ||
            (relatedElement.Location.X == southPoint.X && relatedElement.Location.Y == southPoint.Y) ||
            (relatedElement.Location.X == northPoint.X && relatedElement.Location.Y == northPoint.Y)
        ) {
            return []; // no movements
        }

        let routeWest = [];
        if (westPoint.X >= 0 ) {
            routeWest = this.FindRoutePoints(relatedElement.Location, westPoint) || [];
        }

        let routeEast = [];
        if (eastPoint.X < TILES_NUMBER) {
            routeEast = this.FindRoutePoints(relatedElement.Location, eastPoint) || [];
        }

        let routeSouth = [];
        if (southPoint.Y < TILES_NUMBER) {
            routeSouth = this.FindRoutePoints(relatedElement.Location, southPoint) || [];
        }
        
        let routeNorth = [];
        if (northPoint.Y < TILES_NUMBER) {
            routeNorth = this.FindRoutePoints(relatedElement.Location, northPoint) || [];
        }

        let bestPath = routeWest;
        if (routeEast.length != 0 && (bestPath.length > routeEast.length || bestPath.length === 0)) {
            bestPath = routeEast;
        }

        if (routeSouth.length != 0 && (bestPath.length > routeSouth.length || bestPath.length === 0)) {
            bestPath = routeSouth;
        }

        if (routeNorth.length != 0 && (bestPath.length > routeNorth.length || bestPath.length === 0)) {
            bestPath = routeNorth;
        }

        if (bestPath && bestPath.length > 0) {
            return bestPath;
        }

        return [];
    }

}