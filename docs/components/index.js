const examples = require("./examples");
const parameters = require("./parameters");
const requestBodies = require("./requestBodies");
const responses = require("./responses");
const schemas = require("./schemas");
const securitySchemes = require("./securitySchemes");

module.exports = {
  components: {
    ...examples,
    ...parameters,
    ...requestBodies,
    ...responses,
    ...schemas,
    ...securitySchemes,
  },
};
