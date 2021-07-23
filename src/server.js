const express = require("express");
const logger = require("./utils/logger");
const morgan = require("./middlewares/morgan.middleware");
const helmet = require("helmet");
const userRouter = require("./routes/user.router");
const itemRouter = require("./routes/item.router");
const cartRouter = require("./routes/cart.router");
const swaggerUI = require("swagger-ui-express");
const docs = require("../docs");

const swaggerUiOptions = {
  defaultModelsExpandDepth: -1,
};
const options = {
  explorer: false,
  swaggerOptions: swaggerUiOptions,
  customCss: ".swagger-ui .topbar { background-color: black }",
  customSiteTitle: "Documentation - Shopping Cart API",
  operationsSorter: "alpha",
  customCssUrl:
    "https://cdn.jsdelivr.net/npm/swagger-ui-themes@3.0.0/themes/3.x/theme-muted.css",
};

const app = express();

const PORT = process.env.PORT || 3000;

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan);

app.listen(PORT, () => {
  logger.info(`Server is running at PORT:${PORT}`);
});

app.use("/users", userRouter);
app.use("/items", itemRouter);
app.use("/carts", cartRouter);

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(docs, options));
