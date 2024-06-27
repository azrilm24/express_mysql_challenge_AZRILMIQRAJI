const express = require("express");
const router = express.Router();
const quizController = require("../controllers/quizController");
const auth = require("../middleware/auth");

router.get("/quizzes", auth, quizController.getAllQuizzes);
router.get("/quizzes/:id", auth, quizController.getQuizById);
router.post("/quizzes", auth, quizController.createQuiz);
router.put("/quizzes/:id", auth, quizController.updateQuiz);
router.delete("/quizzes/:id", auth, quizController.deleteQuiz);

module.exports = router;
