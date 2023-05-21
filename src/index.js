const express = require('express');
const { jwt } = require('jsonwebtoken');
const { ApolloServer } = require('apollo-server-express');
const { Sequelize, DataTypes } = require('sequelize');
// const { sequelize } = require('./models');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');

const app = express();

const sequelize = new Sequelize('postgres', 'postgres', 'Pass@123', {
  host: 'localhost',
  dialect: 'postgres',
});

const User = sequelize.define('Users', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

const Movie = sequelize.define('Movies', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  movieName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  directorName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  releaseDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

const Review = sequelize.define('Reviews', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  movieId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  comment: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});


async function startServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
      const token = req.headers.authorization || '';
      try {
        const { userId } = jwt.verify(token, process.env.JWT_SECRET);
        return { userId };
      } catch (error) {
        return {};
      }
    },
  });

  await server.start();

  server.applyMiddleware({ app });

  sequelize.sync().then(() => {
    app.listen({ port: 4000 }, () => {
      console.log(`Server ready at http://localhost:4000${server.graphqlPath}`);
    });
  });
}

module.exports = Review;
module.exports = Movie;
module.exports = User;

startServer().then(() => {
  console.log('successful server start!')
});
