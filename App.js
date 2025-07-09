import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  StyleSheet,
} from "react-native";

export default function App() {
  const [playerNames, setPlayerNames] = useState(["", "", "", ""]); // 4 jucători
  const [gameStarted, setGameStarted] = useState(false);
  const [currentRoundIndex, setCurrentRoundIndex] = useState(0); // 🆕 runda activă
  const rounds = [1, 1, 1, 1, 2,3,4,5,6,7,8,8,8,8,7,6,5,4,3,2,1,1,1,1]; 
  const [scores, setScores] = useState([]);
  const [licitation, setLicitation] = useState([]);

  const startGame = () => {
    if (playerNames.every((name) => name.trim() !== "")) {
      setScores(rounds.map(() => playerNames.map(() => 0)));
      setLicitation(rounds.map(() => playerNames.map(() => 0)));
      setGameStarted(true);
    } else {
      alert("Introduceți numele pentru toți jucătorii!");
    }
  };

  const updateScore = (playerIndex, value) => {
    const updatedScores = [...scores];
    updatedScores[currentRoundIndex][playerIndex] += value; // ✅ folosește runda activă
    setScores(updatedScores);
  };

  const updateLicitation = (playerIndex, value) => {
    const updatedLicitation = [...licitation];
    updatedLicitation[currentRoundIndex][playerIndex] += value; // ✅ folosește runda activă
    setLicitation(updatedLicitation);
  };

  const resetLicitation = () => {
    setLicitation(rounds.map(() => playerNames.map(() => 0)));
  };

  const resetScores = () => {
    setScores(rounds.map(() => playerNames.map(() => 0)));
  };

  const goToNextRound = () => {
    if (currentRoundIndex < rounds.length - 1) {
      setCurrentRoundIndex(currentRoundIndex + 1);
    }
  };

  const goToPreviousRound = () => {
    if (currentRoundIndex > 0) {
      setCurrentRoundIndex(currentRoundIndex - 1);
    }
  };

  if (!gameStarted) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>🃏 Whist Score Tracker</Text>
        {playerNames.map((name, index) => (
          <TextInput
            key={index}
            style={styles.input}
            placeholder={`Player ${index + 1} name`}
            value={playerNames[index]}
            onChangeText={(text) => {
              const updatedNames = [...playerNames];
              updatedNames[index] = text;
              setPlayerNames(updatedNames);
            }}
          />
        ))}
        <Button title="Start Game" onPress={startGame} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🃏 Whist Score Table</Text>

      <Text style={{ fontWeight: "bold", marginBottom: 10 }}>
        Current Round: {currentRoundIndex + 1} (Value: {rounds[currentRoundIndex]})
      </Text>

      <ScrollView horizontal>
        <ScrollView>
          <View>
            {/* Header */}
            <View style={styles.row}>
              <Text style={styles.headerCell}>Round</Text>
              {playerNames.map((player, pIndex) => (
                <View key={pIndex} style={{ flexDirection: "row" }}>
                  <Text style={[styles.headerCell, { backgroundColor: "#f0f0f0" }]}>
                    {player} (S)
                  </Text>
                  <Text style={[styles.headerCell, { backgroundColor: "#d0f0ff" }]}>
                    {player} (L)
                  </Text>
                </View>
              ))}
            </View>

            {/* Rows */}
            {scores.map((round, rIndex) => (
              <View
                key={rIndex}
                style={[
                  styles.row,
                  currentRoundIndex === rIndex && { backgroundColor: "#ffe0b2" },
                ]}
              >
                <Text style={styles.cell}>{rounds[rIndex]}</Text>
                {round.map((score, pIndex) => (
                  <View key={pIndex} style={{ flexDirection: "row" }}>
                    <Text style={[styles.cell, { backgroundColor: "#f0f0f0" }]}>
                      {score}
                    </Text>
                    <Text style={[styles.cell, { backgroundColor: "#d0f0ff" }]}>
                      {licitation[rIndex][pIndex]}
                    </Text>
                  </View>
                ))}
              </View>
            ))}
          </View>
        </ScrollView>
      </ScrollView>

      {/* Round Navigation */}
      <View style={styles.buttonRow}>
        <Button title="Previous Round" onPress={goToPreviousRound} />
        <Button title="Next Round" onPress={goToNextRound} />
      </View>

      {/* Reset Buttons */}
      <View style={styles.buttonRow}>
        <Button title="Reset Licitation" onPress={resetLicitation} color="red" />
        <Button title="Reset Scores" onPress={resetScores} color="red" />
      </View>

      {/* Increment Points */}
      {scores.length > 0 && (
        <View>
          <Text style={{ marginTop: 10, fontWeight: "bold" }}>
            Add Points (Round {currentRoundIndex + 1})
          </Text>
          {playerNames.map((player, pIndex) => (
            <View key={pIndex} style={styles.buttonRow}>
              <Text>{player}</Text>
              <Button title="+5 Score" onPress={() => updateScore(pIndex, 5)} />
              <Button title="+1 Licitation" onPress={() => updateLicitation(pIndex, 1)} />
            </View>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  row: { flexDirection: "row" },
  headerCell: {
    width: 80,
    fontWeight: "bold",
    textAlign: "center",
    borderWidth: 1,
    backgroundColor: "#ddd",
  },
  cell: {
    width: 80,
    textAlign: "center",
    borderWidth: 1,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 5,
    alignItems: "center",
  },
});