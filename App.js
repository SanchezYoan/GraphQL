// App.js
import React from "react";
import { Text } from "react-native";
import { ApolloProvider } from "@apollo/client";
import client from "./apollo";
// import MainComponent from "./mainComponent";
import ArtList from "./screens/ArtList";

const App = () => {
  return (
    <ApolloProvider client={client}>
      <ArtList />
    </ApolloProvider>
  );
};

export default App;
