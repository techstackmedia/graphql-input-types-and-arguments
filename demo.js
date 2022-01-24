const gql = require("graphql-tag");
const { ApolloServer } = require("apollo-server");
const debug = require("debug");
const log = debug("app:log");
const port = 4000;

const typeDefs = gql`
  type User {
    email: String
    avatar: String
    friends: [Friend]
  }

  type Friend {
    name: String
    age: Int
  }

  type Shoes {
    brand: String
    size: Int
  }

  input ShoesInput {
    brand: String
    size: Int
  }

  type Query {
    person: User
    shoe(input: ShoesInput): [Shoes]
  }
`;

const resolvers = {
  Query: {
    person() {
      return {
        email: "techstackmedia@gmail.com",
        avatar: "http://techstackmedia.png",
        friends: [
          { name: "Bello", age: 4 },
          { name: "Michael", age: 3 },
        ],
      };
    },
    shoe(_, { input }) {
      return [
        { brand: "nike", size: 34 },
        { brand: "addidas", size: 43 },
      ].filter((shoe) => {
        return shoe.brand === input.brand;
      });
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen(port).then(() => log(`...running on port ${port}`));
