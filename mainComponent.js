// MainComponent.js
import React from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import { useQuery, gql } from "@apollo/client";

const GET_EXAMPLE_DATA = gql`
  query GetLocations {
    locations {
      id
      name
      photo
    }
  }
`;

const MainComponent = () => {
  const { loading, error, data } = useQuery(GET_EXAMPLE_DATA);

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  // const renderData = ({ item }) => {
  //   return (
  //     <View style={styles.content} key={item.id}>
  //       <Text style={styles.infoText}>ID: {item.id}</Text>
  //       <Text style={styles.infoText}>Name: {item.name}</Text>

  //       <Image
  //         source={{ uri: item.photo }}
  //         style={{ width: 100, height: 100, margin: 10 }}
  //       />
  //     </View>
  //   );
  // };

  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <ScrollView>
          {data.locations.map((location) => (
            <View style={styles.content} key={location.id}>
              <Text style={styles.infoText}>ID: {location.id}</Text>
              <Text style={styles.infoText}>Name: {location.name}</Text>

              <Image
                source={{ uri: location.photo }}
                style={{ width: 100, height: 100, margin: 10 }}
              />
            </View>
          ))}
        </ScrollView>
        {/* <FlatList
          data={data}
          renderItem={renderData}
          keyExtractor={(item) => item.id}
        /> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  infoContainer: {
    backgroundColor: "skyblue",
  },
  content: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "red",
    margin: 30,
    padding: 20,
  },
  infoText: {
    margin: 5,
  },
});
export default MainComponent;
