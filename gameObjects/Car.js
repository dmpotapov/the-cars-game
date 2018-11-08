import React from 'react';
import { View, Text,  } from 'react-native';

export const carWidth = 30;
export const carHeight = 40;

class Car extends React.Component {
    constructor(props) {
        super(props);
        if (this.props.pos) {
            
        }
    }

    render() {
        return (
        <View style={styles.car}>
            <View style={styles.carBlock}></View>
            <View style={styles.carBlockBlack}></View>
            <View style={styles.carBlock}></View>
            <View style={styles.carBlockBlack}></View>
            <View style={styles.carBlockBlack}></View>
            <View style={styles.carBlockBlack}></View>
            <View style={styles.carBlock}></View>
            <View style={styles.carBlockBlack}></View>
            <View style={styles.carBlock}></View>
            <View style={styles.carBlockBlack}></View>
            <View style={styles.carBlock}></View>
            <View style={styles.carBlockBlack}></View>
        </View>
        );
    }
}

const styles = {
    car: {
        width: carWidth,
        height: carHeight,
        flexDirection: 'row',
        flexWrap: 'wrap',
        margin: 10
    },
    carBlock: {
        width: 10,
        height: 10
    },
    carBlockBlack: {
        width: 10,
        height: 10,
        backgroundColor: '#000'
    }
}

export default Car;