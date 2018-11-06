import React from 'react';
import { View } from 'react-native';

class Obstacle extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            styles: {
                height: 30,
                width: 30,
                position: 'absolute',
                backgroundColor: '#000',
                top: props.pos
            }
        };
    }

    getStyles() {
        return {
            height: 30,
            width: 30,
            position: 'absolute',
            backgroundColor: '#000',
            top: this.props.pos * 30,
            left: 25
        }
    }

    render() {
        return (<View style={this.getStyles()} />);
    }
}

export default Obstacle;