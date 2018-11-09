import React from 'react';
import { Alert, View, Text, TouchableOpacity } from 'react-native';
import Car from './gameObjects/Car';
import Obstacle from './gameObjects/Obstacle';
import GameStorage from './GameStorage';
import { CollisionChecker } from './CollisionChecker';

class GameWindow extends React.Component {
  constructor() {
    super();
    this.state = { 
      currentPosition: 0, 
      currentRoad: 0, 
      roads: []
    };
    this.settings = {};
    this.gameStorage = new GameStorage();
    this.timeoutsClean = false;
  }

  componentDidMount() {
    this.initGame();
  }

  async initGame() {
    try {
      this.settings = await this.gameStorage.getSettings();
      this.initRoadsList();
      this.startScoreCount();
      // this.initSpeedUp();
      this.startObstacleAddLoop();
    }
    catch(e) { 
      Alert.alert("Error while trying to start a game. Try again later");
      this.props.navigation.navigate('Home');
    }
  }

  initRoadsList() {
    this.setState(prev => {
      let roads = [];
      for (let i = 0; i < this.settings.roadsCount; i++) {
        roads.push({ obstacles: [] });
      }
      prev.roads = roads;
      return prev;
    });
  }

  startScoreCount() {
    this.positionChangeIntervalId = setInterval(() => { 
      this.setState(prev => {
        if (prev) {
          prev.currentPosition += 1;
          return prev;
        }
        return { currentPosition: 0 };
      })
      this.checkCollision();
    }, Math.round(5000 / this.settings.speed));
  }

  startObstacleAddLoop() {
    this.addObstacle();
  }

  initSpeedUp() {
    this.speedUpIntervalId = setInterval(() => {
      if (this.settings.speed <= 90) {
        this.settings.speed += 10;
      }
      else {
        this.settings.speed = 100;
        clearInterval(this.speedUpIntervalId);
      }
    }, 20000);
  }

  addObstacle() {
    this.setState(prev => {
      let obstacle = this.generateObstacle(prev.currentPosition);
      prev.roads[obstacle.road].obstacles.push(obstacle);
      if (prev.roads[obstacle.road].obstacles.length > 5) {
        prev.roads[obstacle.road].obstacles.splice(0, 1);
      }
      return prev;
    });
    this.obstacleTimeoutId = setTimeout(this.addObstacle.bind(this), 
                                        Math.floor(Math.random() * ((30000 * this.settings.roadsCount) / this.settings.speed / this.settings.obstaclesIntensity )) 
                                                    + (20000 * this.settings.roadsCount) / this.settings.speed / this.settings.obstaclesIntensity );
  }

  generateObstacle(initPos) {
    return {
      road: Math.floor(Math.random() * this.settings.roadsCount),
      position: initPos
    }
  }

  onCarPositionChange(dir) {
    this.setState(prev => {
      switch (dir) {
        case 'left':
          if (prev.currentRoad > 0) prev.currentRoad -= 1;
          break;

        case 'right':
          if (prev.currentRoad < this.settings.roadsCount - 1) prev.currentRoad += 1;
          break;
      }

      return prev;
    })
  }

  checkCollision() {
    let r = this.state.roads[this.state.currentRoad];
    r.obstacles.forEach(o => {
      if (this.collisionChecker.check(this.state.currentPosition, o.position)) {
        this.clearTimeouts();
        this.checkAndResetHighScore(this.state.currentPosition);
        this.endGame();
      }
    })
  }

  async checkAndResetHighScore(newScore) {
    try {
      let highScore = await this.gameStorage.getHighScore();
      if (!highScore || newScore > highScore) {
        await this.gameStorage.setHighScore(newScore);
      }
    }
    catch(e) { }
  }

  endGame() {
    Alert.alert("You lose");
    this.props.navigation.navigate('Home');
  }

  measureField() {
    this.field.measure((ox, oy, width, height, px, py) => this.collisionChecker = new CollisionChecker(height));
  }

  renderRoads() {
    return this.state.roads.map(((r, i) => {
      let obstacles = r.obstacles.map((o, j) => { 
        return <Obstacle pos={this.state.currentPosition - o.position} key={j} />
      });
      return (this.state.currentRoad === i) 
              ? <View style={styles.road} key={i}>
                  {obstacles}
                  <Car ref="car" />
                </View>
              : <View style={styles.road} key={i}>
                  {obstacles}
                </View>
    }).bind(this));
  }

  render() {
    let roads = this.renderRoads();

    return (
      <View style={styles.container}>
        <View style={styles.gameParams}>
          <Text style={styles.currentScore}>Current score: {this.state.currentPosition}</Text>
        </View>
        <View style={styles.gameField} ref={(c) => { this.field = c; }} onLayout={(e) => this.measureField()}>
            {roads}
            <TouchableOpacity
            style={styles.tapZoneLeft}
            onPress={(e) => this.onCarPositionChange('left')}> 
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.tapZoneRight}
            onPress={(e) => this.onCarPositionChange('right')}> 
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  componentWillUnmount() {
    this.clearTimeouts();
  }

  clearTimeouts() {
    if (!this.timeoutsClean) {
      clearInterval(this.positionChangeIntervalId);
      clearInterval(this.speedUpIntervalId);
      clearTimeout(this.obstacleTimeoutId);
      this.timeoutsClean = true;
    }
  }
}

export default GameWindow;

const styles = {
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  gameField: {
    flexDirection: 'row',
    flex: 1,
    flexWrap: 'wrap',
    borderWidth: 1,
    borderRightWidth: 0,
    borderColor: '#000'
  },
  gameParams: {
    height: 20,
    marginTop: 20
  },
  currentScore: {
    fontSize: 14,
    fontWeight: 'bold'
  },
  buttonsContainer: {
    width: 120,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center'
  },
  dirButton: {
    height: 50,
    width: 50
  },
  road: { 
    flex: 1,
    height: '100%',
    borderRightColor: "#666",
    borderRightWidth: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  tapZoneLeft: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: '50%'
  },
  tapZoneRight: {
    position: 'absolute',
    top: 0,
    left: '50%',
    bottom: 0,
    right: 0
  }
}