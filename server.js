const express = require("express");
const logger = require("./utils/logger");
const morgan = require("./middlewares/morgan");
const db = require("./models/index");

const app = express();

const PORT = process.env.PORT || 7000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan);
app.listen(PORT, () => {
  logger.info(`Server is running at PORT:${PORT}`);
});

app.get("/", async (req, res) => {
  try {
    await db.sequelize.authenticate();
    logger.debug("Connection has been established successfully.");
    res.send("Hello world!");
  } catch (error) {
    logger.error("Unable to connect to the database:", error);
  }
});
