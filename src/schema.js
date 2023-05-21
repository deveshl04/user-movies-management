const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    email: String!
    password: String!
  }

  type Movie {
    id: ID!
    name: String!
    description: String!
    director: String!
    releaseDate: String!
  }

  type Review {
    id: ID!
    movieId: ID!
    userId: ID!
    rating: Int!
    comment: String!
  }

  type Query {
    movies: [Movie!]!
    movie(id: ID!): Movie
    reviews(movieId: ID!): [Review!]!
  }

  type Mutation {
    signUp(username: String!, email: String!, password: String!): User
    login(email: String!, password: String!): String
    changePassword(oldPassword: String!, newPassword: String!): Boolean
    createMovie(name: String!, description: String!, director: String!, releaseDate: String!): Movie
    updateMovie(id: ID!, name: String, description: String, director: String, releaseDate: String): Movie
    deleteMovie(id: ID!): Boolean
    createReview(movieId: ID!, rating: Int!, comment: String!): Review
    updateReview(id: ID!, rating: Int, comment: String): Review
    deleteReview(id: ID!): Boolean
  }
`;

module.exports = typeDefs;
