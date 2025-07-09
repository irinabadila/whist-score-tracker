import React, { useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  const [scores, setScores] = useState([0, 0, 0, 0]);

  const addPoint = (playerIndex) => {
    const newScores = [...scores];
    newScores[playerIndex] += 1;
    setScores(newScores);
  };

  const resetScores = () => {
    setScores([0, 0, 0, 0]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎯 Whist Score Tracker</Text>
      {scores.map((score, index) => (
        <View key={index} style={styles.row}>
          <Text style={styles.player}>Player {index + 1}</Text>
          <Text style={styles.score}>{score}</Text>
          <Button title="+1" onPress={() => addPoint(index)} />
        </View>
      ))}
      <View style={{ marginTop: 20 }}>
        <Button title="Reset Scores" onPress={resetScores} color="red" />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  player: { marginRight: 10, fontSize: 18 },
  score: { marginRight: 10, fontSize: 18, fontWeight: "bold" },
});

//registerRootComponent(App);
/*export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}*/

/*const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});*/


