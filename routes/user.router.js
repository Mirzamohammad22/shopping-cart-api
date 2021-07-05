const { Router } = require("express");
const router = Router();
const userController = require("../controllers/user.controller");
const createUserSchema = require("../middlewares/validators/schemas/user/create-user.schema.js");
const validateSchema = require("../middlewares/validators/schemas/schema-validator");
const errorHandler = require("../middlewares/error-handler.middleware");

router.post("/", createUserSchema, validateSchema, userController.createUser);

router.use(errorHandler);

module.exports = router;
