const express = require("express");
const db = require("./models/index");
const app = express();

const PORT = process.env.PORT || 7000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(PORT, () => {
  console.log(`Server is running at PORT:${PORT}`);
});

app.get("/", async (req, res) => {
  try {
    await db.sequelize.authenticate();
    console.log("Connection has been established successfully.");
    res.send("Hello world!");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
});
