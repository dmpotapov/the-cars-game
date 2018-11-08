import React from 'react';
import { View } from 'react-native';

export const obstacleWidth = 30;
export const obstacleHeight = 30;

class Obstacle extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            styles: {
                height: obstacleHeight,
                width: obstacleWidth,
                position: 'absolute',
                backgroundColor: '#000',
                top: props.pos
            }
        };
    }

    getStyles() {
        return {
            height: obstacleHeight,
            width: obstacleWidth,
            position: 'absolute',
            backgroundColor: '#000',
            top: this.props.pos * obstacleHeight,
        }
    }

    render() {
        return (<View style={this.getStyles()} />);
    }
}

export default Obstacle;