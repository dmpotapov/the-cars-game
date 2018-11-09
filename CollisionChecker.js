import { carHeight } from './gameObjects/Car'
import { obstacleHeight } from './gameObjects/Obstacle'

export class CollisionChecker {
    constructor(fieldHeight) {
        this.fieldHeight = fieldHeight;
        this.collisionPosition = Math.round(fieldHeight / obstacleHeight);
    }
    
    check(carPosition, obstaclePosition) {
        return Math.abs(carPosition - (obstaclePosition + this.collisionPosition - 1)) <= 1;
    }
}