import { StatusBar } from "expo-status-bar";
import React, { useState, useRef } from "react";
import { Button, TextInput, StyleSheet, Text, View, Alert } from "react-native";
import Timer from "./Timer";

export default function App() {
  const [difficulty, setDifficulty] = useState("easy");
  const [hardLevel, setHardLevel] = useState(1);
  const [numberOne, setNumberOne] = useState(
    generateRandomNumber(difficulty, hardLevel)
  );
  const [numberTwo, setNumberTwo] = useState(
    generateRandomNumber(difficulty, hardLevel)
  );
  const [userInput, setUserInput] = useState("");
  const [key, setKey] = useState(0);

  const expectedRes = numberOne + numberTwo;

  function generateRandomNumber(difficulty, level = 1) {
    if (difficulty === "easy") {
      return Math.floor(Math.random() * 10);
    } else {
      return Math.floor(Math.random() * (100 + level * 10));
    }
  }

  const resetGame = (increaseHardLevel = false) => {
    setNumberOne(generateRandomNumber(difficulty, hardLevel));
    setNumberTwo(generateRandomNumber(difficulty, hardLevel));
    setUserInput("");
    setKey((prevKey) => prevKey + 1);

    if (difficulty === "hard" && increaseHardLevel) {
      setHardLevel((prevLevel) => prevLevel + 1);
    }
  };

  const handleTimerEnd = () => {
    Alert.alert("Temps écoulé", `La bonne réponse était ${expectedRes}`);
    resetGame();
  };

  const compareInput = () => {
    if (parseInt(userInput) === expectedRes) {
      Alert.alert("Bravo !", "Vous avez trouvé la bonne réponse !");
      resetGame(true);
    } else {
      Alert.alert("Dommage", `La bonne réponse était ${expectedRes}`);
      resetGame();
    }
  };

  const changeDifficulty = (newDifficulty) => {
    setDifficulty(newDifficulty);
    setHardLevel(1);
    resetGame();
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text>Mode : {difficulty}</Text>
      <Timer
        key={key}
        initialTime={difficulty === "easy" ? 60 : 30}
        onTimerEnd={handleTimerEnd}
      />
      {difficulty === "hard" && <Text>Niveau : {hardLevel}</Text>}
      <Text>Nombre aléatoire 1 : {numberOne}</Text>
      <Text>Nombre aléatoire 2 : {numberTwo}</Text>
      <TextInput
        placeholder="Entrez un nombre"
        keyboardType="numeric"
        value={userInput}
        onChangeText={setUserInput}
        style={styles.input}
      />

      <View style={styles.buttonContainer}>
        <View style={styles.button}>
          <Button title="Valider" onPress={compareInput} />
        </View>
        <View style={styles.button}>
          <Button title="Recommencer" onPress={resetGame} />
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <View style={styles.button}>
          <Button title="Easy" onPress={() => changeDifficulty("easy")} />
        </View>
        <View style={styles.button}>
          <Button title="Hard" onPress={() => changeDifficulty("hard")} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#000",
    padding: 10,
    width: "80%",
    marginTop: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  button: {
    marginHorizontal: 5,
    borderColor: "#000",
    borderWidth: 1,
    borderRadius: 5,
  },
});
