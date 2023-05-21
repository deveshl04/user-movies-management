// const { Sequelize, DataTypes } = require('sequelize');
// // const sequelize = require('sequelize');
// // const { Pool } = require('pg');
//
// // const pool = new Pool({
// //   user: 'deveshl',
// //   password: 'Pass@123',
// //   host: 'localhost',
// //   database: 'postgres',
// //   port: 5432,
// // });
//
// // module.exports = {
// //   query: (text, params) => pool.query(text, params),
// // };
//
// const sequelize = new Sequelize('postgres', 'deveshl', 'Pass@123', {
//   host: 'localhost',
//   dialect: 'postgres',
// });
//
// const User = sequelize.define('User', {
//   id: {
//     type: DataTypes.INTEGER,
//     primaryKey: true,
//     autoIncrement: true,
//   },
//   userName: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   email: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   password: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
// });
//
// const Movie = sequelize.define('Movie', {
//   id: {
//     type: DataTypes.INTEGER,
//     primaryKey: true,
//     autoIncrement: true,
//   },
//   movieName: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   description: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   directorName: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   releaseDate: {
//     type: DataTypes.DATE,
//     allowNull: false,
//   },
// });
//
// const Review = sequelize.define('Review', {
//   id: {
//     type: DataTypes.INTEGER,
//     primaryKey: true,
//     autoIncrement: true,
//   },
//   movieId: {
//     type: DataTypes.INTEGER,
//     allowNull: false,
//   },
//   userId: {
//     type: DataTypes.INTEGER,
//     allowNull: false,
//   },
//   rating: {
//     type: DataTypes.INTEGER,
//     allowNull: false,
//   },
//   comment: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
// });
//
// module.exports = Review;
// module.exports = Movie;
// module.exports = User;
// module.exports = sequelize;