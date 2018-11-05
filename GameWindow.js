import React from 'react';
import { Alert, View, Text, Button } from 'react-native';
import Car from './gameObjects/Car';
import Obstacle from './gameObjects/Obstacle';

const roadsCount = 3;
const obstaclesGenerateStep = 500;

class GameWindow extends React.Component {
  constructor() {
    super(); 
    let roads = [];
    for (let i = 0; i < roadsCount; i++) {
      roads.push({ obstacles: [] });
    }
    this.state = { 
      currentPosition: 0, 
      currentRoad: 0, 
      roads: roads
    };
  }

  componentDidMount() {
    this.positionChangeIntervalId = setInterval(() => { 
      this.setState(prev => {
        if (prev) {
          prev.currentPosition += 1;
          return prev;
        }
        return { currentPosition: 0 };
      })
      this.checkCollision();
    }, 200);
    this.startObstacleAddLoop();
  }

  startObstacleAddLoop() {
    this.addObstacle()
  }

  addObstacle() {
    this.setState(prev => {
      let obstacle = this.generateObstacle(prev.currentPosition);
      prev.roads[obstacle.road].obstacles.push(obstacle);
      if (prev.roads[obstacle.road].obstacles.length > 2) {
        prev.roads[obstacle.road].obstacles.splice(0, 1);
      }
      return prev;
    });
    this.obstacleTimeoutId = setTimeout(this.addObstacle.bind(this), Math.floor(Math.random() * (5000 - 1000)) + 1000);
  }

  generateObstacle(initPos) {
    return {
      road: Math.floor(Math.random() * roadsCount),
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
          if (prev.currentRoad < roadsCount - 1) prev.currentRoad += 1;
          break;
      }

      return prev;
    })
  }

  checkCollision() {
    let r = this.state.roads[this.state.currentRoad];
    r.obstacles.forEach(o => {
      console.log(o.position+15, this.state.currentPosition);
      if (this.state.currentPosition === o.position+15) {
        this.props.navigation.navigate('Home');
      }
    })
  }

  renderRoads() {
    return this.state.roads.map(((r, i) => {
      let obstacles = r.obstacles.map((o, j) => { 
        return <Obstacle pos={this.state.currentPosition - o.position} key={j} />
      });
      return (this.state.currentRoad === i) 
              ? <View style={styles.road} key={i}>
                  {obstacles}
                  <Car />
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
        <View style={styles.gameField}>
            {roads}
        </View>
        <View style={styles.gameParams}>
          <Text>{this.state.currentPosition}</Text>
          <View style={styles.buttonsContainer}>
            <Button style={styles.dirButton} title="&lt;" onPress={(e) => this.onCarPositionChange('left')} />
            <Button style={styles.dirButton} title="&gt;" onPress={(e) => this.onCarPositionChange('right')} />
          </View>
        </View>
      </View>
    );
  }

  componentWillUnmount() {
    clearInterval(this.positionChangeIntervalId);
    clearTimeout(this.obstacleTimeoutId);
  }
}

export default GameWindow;

const styles = {
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  gameField: {
    width: 241,
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderWidth: 1,
    borderRightWidth: 0,
    borderColor: '#000'
  },
  gameParams: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
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
    position: 'relative',
    width: 80,
    height: '100%',
    borderRightColor: "#666",
    borderRightWidth: 1,
  }
}