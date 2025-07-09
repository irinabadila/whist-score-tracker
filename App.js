import React, { useState } from 'react';
import { View, Text, Button, ScrollView, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  
  const players = ["Alice", "Bob", "Charlie", "Diana"];
  const [scores, setScores] = useState(
    players.map(() => []) // array gol pentru fiecare jucător
  );

  const addScore = (playerIndex, value) => {
    const newScores = [...scores];
    newScores[playerIndex].push(value);
    setScores(newScores);
  };

  const totalScore = (playerIndex) =>
    scores[playerIndex].reduce((a, b) => a + b, 0);
  const resetScores = () => {
  setScores(players.map(() => [])); // resets all 4 players to 0
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🃏 Whist Score Table</Text>
      <ScrollView horizontal>
        <View>
          {/* Header cu runde */}
          <View style={styles.row}>
            <Text style={styles.headerCell}>Player</Text>
            {[...Array(10).keys()].map((round) => (
              <Text key={round} style={styles.headerCell}>
                R{round + 1}
              </Text>
            ))}
            <Text style={styles.headerCell}>Total</Text>
          </View>

          {/* Rândurile cu jucători */}
          {players.map((player, pIndex) => (
            <View key={pIndex} style={styles.row}>
              <Text style={styles.cell}>{player}</Text>
              {[...Array(10).keys()].map((round) => (
                <Text key={round} style={styles.cell}>
                  {scores[pIndex][round] ?? "-"}
                </Text>
              ))}
              <Text style={styles.cell}>{totalScore(pIndex)}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
<View style={{ marginTop: 20 }}>
  <Button
    title="Reset Scores"
    onPress={resetScores}
    color="red" // optional: make it red to stand out
  />
</View>
      {/* Adaugă puncte */}
      {players.map((player, pIndex) => (
        <View key={pIndex} style={styles.buttonRow}>
          <Text>{player}</Text>
          <Button title="+1" onPress={() => addScore(pIndex, 1)} />
          <Button title="+2" onPress={() => addScore(pIndex, 2)} />
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  row: { flexDirection: "row" },
  headerCell: {
    width: 60,
    fontWeight: "bold",
    textAlign: "center",
    borderWidth: 1,
  },
  cell: {
    width: 60,
    textAlign: "center",
    borderWidth: 1,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 5,
  },
});



