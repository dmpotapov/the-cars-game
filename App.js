import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import {
  createStackNavigator,
} from 'react-navigation';
import GameWindow from './GameWindow';
import SettingsWindow from './SettingsWindow';

class MainScreen extends React.Component {
  render() {
    return (<View style={styles.container}>
    <Text style={styles.title}>Cars</Text>
    <View style={styles.menuContainer}>
      <TouchableOpacity
        style={styles.menuButton}
        onPress={() => {
          this.props.navigation.navigate('Game');
        }}>
        <Text style={styles.menuButtonText}>New Game</Text>  
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.menuButton}
        onPress={() => {
          this.props.navigation.navigate('Settings');
        }}>
        <Text style={styles.menuButtonText}>Settings</Text>  
      </TouchableOpacity>
    </View>
  </View>);
  }
}

const RootStack = createStackNavigator({
  Home: MainScreen,
  Game: GameWindow,
  Settings: SettingsWindow
},
{
  initialRouteName: 'Home',
});

export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    flex: 1,
    marginTop: 50
  },
  menuContainer: {
    flex: 2
  },
  menuButton: {
    backgroundColor: '#999',
    padding: 10,
    borderRadius: 10,
    marginBottom: 50
  },
  menuButtonText: {
    fontSize: 16,
    textAlign: 'center'
  }
});
