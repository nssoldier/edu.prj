const Container = require("flat-ioc");

const container = new Container(module, "./plugins.js", {
  loggingLevel: "info"
});
