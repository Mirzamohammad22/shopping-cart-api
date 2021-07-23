const examples = require("./examples");
const parameters = require("./parameters");
const responses = require("./responses");
const schemas = require("./schemas");
const securitySchemes = require("./securitySchemes");

module.exports = {
  components: {
    ...examples,
    ...parameters,
    ...responses,
    ...schemas,
    ...securitySchemes,
  },
};
