// ArtList.js
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useQuery, gql } from "@apollo/client";

const ArtList = () => {
  const GET_GAMES = gql`
    query GetGames {
      db_finished_games {
        idgame
        primary_key
      }
    }
  `;
  const { loading, error, data } = useQuery(GET_GAMES);

  if (loading) return <Text>Chargement...</Text>;
  if (error) return <Text>Erreur: {error.message}</Text>;

  return (
    <View>
      {data.db_finished_games.map((art) => {
        return (
          <View key={art.primary_key}>
            <Text style={styles.text}>Game ID: {art.idgame}</Text>
            <Text style={styles.text}>Primary Key: {art.primary_key}</Text>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // textAlign: "center",
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
  text: {
    backgroundColor: "black",
    color: "yellow",
  },
});
export default ArtList;
