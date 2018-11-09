import { AsyncStorage } from 'react-native';

const defaultSettings = {
    speed: 10,
    roadsCount: 3,
    obstaclesIntensity: 5
}

class GameStorage {
    async getSettings() {
        let settings = await AsyncStorage.getItem("game:settings");
        if (settings) {
            return JSON.parse(settings);
        } else {
            return defaultSettings;
        }
    }

    async setSettings(val) {
        return await AsyncStorage.setItem("game:settings", JSON.stringify(val));
    }

    async getHighScore() {
        let highScore = await AsyncStorage.getItem("game:highScore");
        if (highScore) {
            return parseInt(highScore);
        } else {
            return 0;
        } 
    }

    async setHighScore(newScore) {
        return await AsyncStorage.setItem("game:highScore", ""+newScore);
    }

    async resetAll() {
        return await AsyncStorage.clear();
    }
}

export default GameStorage;