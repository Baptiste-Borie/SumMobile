import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";

const Timer = ({ initialTime, onTimerEnd }) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);

  useEffect(() => {
    if (timeLeft <= 0) {
      onTimerEnd();
      setTimeLeft(initialTime);
      return;
    }

    const timerId = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, [timeLeft, initialTime]);

  return (
    <View style={styles.container}>
      <Text style={styles.timerText}>Temps restant : {timeLeft}s</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  timerText: {
    fontSize: 24,
    fontWeight: "bold",
  },
});

export default Timer;
