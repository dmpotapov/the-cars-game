import { AsyncStorage } from 'react-native';

class GameStorage {
    getSettings() {
        return AsyncStorage.getItem("game:settings");
    }

    setSettings(val) {
        return AsyncStorage.setItem("game:settings", JSON.stringify(val));
    }

    getHighScore() {
        return AsyncStorage.getItem("game:highScore");
    }

    setHighScore(newScore) {
        return AsyncStorage.setItem("game:highScore", newScore);
    }
}

export default GameStorage;