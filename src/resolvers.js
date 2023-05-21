const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');
const { Movie, User, Review } = require('./index');

const resolvers = {
  Query: {
    movies: () => Movie.findAll(),
    movie: (_, { id }) => Movie.findByPk(id),
    reviews: (_, { movieId }) => Review.findAll({ where: { movieId }, order: [['id', 'DESC']] }),
  },
  Mutation: {
    signUp: async (_, { username, email, password }) => {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({ username, email, password: hashedPassword });
      return user;
    },
    login: async (_, { email, password }) => {
      const user = await User.findOne({ where: { email } });
      if (!user) {
        throw new Error('Invalid email or password');
      }
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw new Error('Invalid email or password');
      }
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
      return token;
    },
    changePassword: async (_, { oldPassword, newPassword }, { userId }) => {
      const user = await User.findByPk(userId);
      if (!user) {
        throw new Error('User not found');
      }
      const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
      if (!isPasswordValid) {
        throw new Error('Invalid password');
      }
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      await user.update({ password: hashedPassword });
      return true;
    },
    createMovie: (_, { name, description, director, releaseDate }) =>
      Movie.create({ name, description, director, releaseDate }),
    updateMovie: (_, { id, name, description, director, releaseDate }) =>
      Movie.update({ name, description, director, releaseDate }, { where: { id }, returning: true })
        .then(([_, [updatedMovie]]) => updatedMovie),
    deleteMovie: async (_, { id }) => {
      const movie = await Movie.findByPk(id);
      if (!movie) {
        throw new Error('Movie not found');
      }
      await movie.destroy();
      return true;
    },
    createReview: async (_, { movieId, rating, comment }, { userId }) => {
      const review = await Review.create({ movieId, userId, rating, comment });
      return review;
    },
    updateReview: async (_, { id, rating, comment }, { userId }) => {
      const review = await Review.findByPk(id);
      if (!review) {
        throw new Error('Review not found');
      }
      if (review.userId !== userId) {
        throw new Error('Not authorized to update this review');
      }
      await review.update({ rating, comment });
      return review;
    },
    deleteReview: async (_, { id }, { userId }) => {
      const review = await Review.findByPk(id);
      if (!review) {
        throw new Error('Review not found');
      }
      if (review.userId !== userId) {
        throw new Error('Not authorized to delete this review');
      }
      await review.destroy();
      return true;
    },
  },
};

module.exports = resolvers;
