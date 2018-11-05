import React from 'react';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import {
  createStackNavigator,
} from 'react-navigation';
import GameWindow from './GameWindow';

class MainScreen extends React.Component {
  render() {

    return (<View style={styles.container}>
    <Text style={styles.title}>Cars</Text>
    <View style={styles.menuContainer}>
    <Button
      style={styles.menuButton}
      onPress={() => {
        this.props.navigation.navigate('Game');
      }}
      title="New game"
    />
    </View>
  </View>);
  }
}

const RootStack = createStackNavigator({
  Home: MainScreen,
  Game: GameWindow
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
    padding: 10,
    borderRadius: 10
  }
});
