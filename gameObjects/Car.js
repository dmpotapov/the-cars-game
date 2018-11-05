import React from 'react';
import { View, Text,  } from 'react-native';

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
        position: 'absolute',
        bottom: 10,
        left: 20,
        width: 30,
        height: 40,
        flexDirection: 'row',
        flexWrap: 'wrap',
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