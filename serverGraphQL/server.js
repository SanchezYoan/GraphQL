const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLList,
  GraphQLInt,
  GraphQLString,
} = require("graphql");
const mysql = require("mysql2/promise");

const connection = mysql.createPool({
  host: "127.0.0.1",
  user: "root",
  port: 3306,
  password: "Ardkordu.30",
  database: "tousmesjeuxfr",
});

// const ArtType = new GraphQLObjectType({
//   name: "Art",
//   fields: {
//     db_arts_id_game: { type: GraphQLInt },
//     cover: { type: GraphQLString },
//     artworks: { type: GraphQLString },
//     screenshots: { type: GraphQLString },
//   },
// });
const GameType = new GraphQLObjectType({
  name: "Game",
  fields: {
    primary_key: { type: GraphQLInt },
    idgame: { type: GraphQLInt },
    iduser: { type: GraphQLInt },
    region_name: { type: GraphQLString },
    console_name: { type: GraphQLString },
  },
});

// const RootQueryType = new GraphQLObjectType({
//   name: "Query",
//   fields: {
//     db_arts: {
//       type: new GraphQLList(ArtType),
//       resolve: async () => {
//         const [rows] = await connection.query("SELECT * FROM db_arts");
//         return rows;
//       },
//     },
//   },
// });

const RootQueryType = new GraphQLObjectType({
  name: "Query",
  fields: {
    db_finished_games: {
      type: new GraphQLList(GameType),
      resolve: async () => {
        const [rows] = await connection.query(
          "SELECT * FROM db_finished_games"
        );
        return rows;
      },
    },
  },
});

const schema = new GraphQLSchema({
  query: RootQueryType,
});

const app = express();

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true, // Activez GraphiQL pour tester les requêtes GraphQL via une interface web
  })
);

const port = 4000;
app.listen(port, () => {
  console.log(
    `Serveur GraphQL en cours d'exécution sur http://localhost:${port}/graphql`
  );
});
