const express = require("express");
const bodyParser = require("body-parser");
const quizRoutes = require("./routes/quizRoutes");
const authRoutes = require("./routes/authRoutes");
const logger = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(logger);

app.use("/api", authRoutes);
app.use("/api", quizRoutes);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
