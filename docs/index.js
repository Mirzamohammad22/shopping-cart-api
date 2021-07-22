const basicInfo = require("./basicInfo");
const tags = require("./tags");
const components = require("./components");
const paths = require("./paths");
const servers = require("./servers")
module.exports = {
  ...servers,
  ...basicInfo,
  ...tags,
  ...components,
  ...paths,
};
