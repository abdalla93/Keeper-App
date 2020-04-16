const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config({ path: "./config/config.env" });
const notes = require("./routes/notes");
const users = require("./routes/users");
const app = express();
const config = require("config");
const db = config.get("MONGO_URI");
const auth = require("./middleware/auth");
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log(`Connected to Atlas`))
  .catch((error) => console.log(`failed to connect ${error}`));
app.use(express.json());

//Routes
app.use("/api", users);
app.use(auth);
app.use("/notes", notes);

app.use(express.static(path.join(__dirname, "client/build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server running on port ${PORT}`));
