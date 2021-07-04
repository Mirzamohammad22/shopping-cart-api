const express = require("express");
const app = express();

const PORT = process.env.PORT || 7000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(PORT, () => {
  console.log(`Server is running at PORT:${PORT}`);
});

app.get("/", async (req, res) => {
  res.send("Hello world!");
});
