const db = require("../config/db");

const Quiz = {
  getAllQuizzes: (callback) => {
    const query = "SELECT * FROM quizzes";
    db.query(query, callback);
  },

  getQuizById: (id, callback) => {
    const query = "SELECT * FROM quizzes WHERE id = ?";
    db.query(query, [id], callback);
  },

  createQuiz: (data, callback) => {
    const query = "INSERT INTO quizzes SET ?";
    db.query(query, data, callback);
  },

  updateQuiz: (id, data, callback) => {
    const query = "UPDATE quizzes SET ? WHERE id = ?";
    db.query(query, [data, id], callback);
  },

  deleteQuiz: (id, callback) => {
    const query = "DELETE FROM quizzes WHERE id = ?";
    db.query(query, [id], callback);
  },
};

module.exports = Quiz;
