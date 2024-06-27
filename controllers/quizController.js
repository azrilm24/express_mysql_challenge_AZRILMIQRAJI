const { body, validationResult } = require("express-validator");
const Quiz = require("../models/quizModel");

exports.getAllQuizzes = (req, res) => {
  Quiz.getAllQuizzes((err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
};

exports.getQuizById = (req, res) => {
  const { id } = req.params;
  Quiz.getQuizById(id, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (result.length === 0) {
      return res.status(404).json({ message: "Quiz not found" });
    }
    res.json(result[0]);
  });
};

exports.createQuiz = [
  body("question").notEmpty().withMessage("Question is required"),
  body("answer").notEmpty().withMessage("Answer is required"),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const newQuiz = {
      question: req.body.question,
      answer: req.body.answer,
    };

    Quiz.createQuiz(newQuiz, (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(201).json({ id: result.insertId, ...newQuiz });
    });
  },
];

exports.updateQuiz = [
  body("question").optional().notEmpty().withMessage("Question is required"),
  body("answer").optional().notEmpty().withMessage("Answer is required"),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const updatedQuiz = req.body;

    Quiz.updateQuiz(id, updatedQuiz, (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Quiz not found" });
      }
      res.json({ message: "Quiz updated successfully" });
    });
  },
];

exports.deleteQuiz = (req, res) => {
  const { id } = req.params;
  Quiz.deleteQuiz(id, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Quiz not found" });
    }
    res.json({ message: "Quiz deleted successfully" });
  });
};
