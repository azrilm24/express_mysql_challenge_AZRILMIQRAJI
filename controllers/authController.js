const jwt = require("jsonwebtoken");

const login = (req, res) => {
  const { username, password } = req.body;
  const user = {
    id: 1,
    username: "testuser",
    password: "testpassword",
  };

  if (username === user.username && password === user.password) {
    const token = jwt.sign(
      { id: user.id, username: user.username },
      "your_jwt_secret_key",
      { expiresIn: "1m" }
    );
    res.json({ token });
  } else {
    res.status(401).json({ message: "Invalid username or password" });
  }
};

module.exports = { login };
