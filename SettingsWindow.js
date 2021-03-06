import React from 'react';
import { StyleSheet, View, Text, Slider, Button, AsyncStorage, Alert } from 'react-native';
import GameStorage from './GameStorage';

class SettingsWindow extends React.Component {
    constructor() {
        super();
        this.gameStorage = new GameStorage();
        this.state = {};
    }

    componentDidMount() {
        this.initSettings();
    }

    changeSpeed(val) {
        this.setState({ speed: val });
    }

    changeRoadsCount(val) {
        this.setState({ roadsCount: val });
    }

    changeObstaclesIntensity(val) {
        this.setState({ obstaclesIntensity: val });
    }

    async initSettings() {
        try {
            this.setState(await this.gameStorage.getSettings());
        }
        catch (e) {
            Alert.alert("Error while getting game settings. Try again later");
            this.props.navigation.navigate('Home');
        }
    }

    async saveSettings() {
        try {
            await this.gameStorage.setSettings(this.state);
            Alert.alert("Successfully saved");
        }
        catch (e) {
            Alert.alert("Error while trying to save settings. Try again later");
        }
        this.props.navigation.navigate('Home');
    }

    async resetSettings() {
        await this.gameStorage.resetAll();
        this.props.navigation.navigate('Home');
    }

    render() {
        return (<View style={styles.container}>
            <Text style={styles.header}>Settings</Text>
            <View style={styles.row}>
                <View style={styles.leftCell}>
                    <Text>Speed</Text>
                </View>
                <View style={styles.rightCell}>
                    <Slider minimumValue={1} maximumValue={100} step={4} 
                            value={this.state.speed}
                            onValueChange={(e) => this.changeSpeed(e)}
                            style={styles.slider}></Slider>
                    <Text>{this.state.speed}</Text>
                </View>
            </View>
            <View style={styles.row}>
                <View style={styles.leftCell}>
                    <Text>Roads Count</Text>
                </View>
                <View style={styles.rightCell}>
                    <Slider minimumValue={2} maximumValue={4} step={1} 
                            value={this.state.roadsCount}
                            onValueChange={(e) => this.changeRoadsCount(e)}
                            style={styles.slider}></Slider>
                    <Text>{this.state.roadsCount}</Text>
                </View>
            </View>
            <View style={styles.row}>
                <View style={styles.leftCell}>
                    <Text>Obstacles Intensity</Text>
                </View>
                <View style={styles.rightCell}>
                    <Slider minimumValue={1} maximumValue={10} step={1} 
                            value={this.state.obstaclesIntensity}
                            onValueChange={(e) => this.changeObstaclesIntensity(e)}
                            style={styles.slider}></Slider>
                    <Text>{this.state.obstaclesIntensity}</Text>
                </View>
            </View>
            <View style={styles.row}>
                <View style={styles.leftCell}>
                    <Button onPress={(e) => this.saveSettings() } title="Save"></Button>
                </View>
            </View>
            <View style={styles.row}>
                <View style={styles.leftCell}>
                    <Button onPress={(e) => this.resetSettings() } title="Reset settings and high score"></Button>
                </View>
            </View>
        </View>);
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: '#ccc'
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        paddingLeft: 10 
    },
    row: {
        flexDirection: 'row'
    },
    leftCell: {
        flex: 2,
        padding: 10
    },
    rightCell: {
        flex: 5,
        flexDirection: 'row',
        padding: 10
    },
    slider: {
        flex: 3
    }
  });

export default SettingsWindow;