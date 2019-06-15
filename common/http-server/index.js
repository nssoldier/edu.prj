module.exports = {
  name: "http-server",
  description: "handle http server",
  services: {
    app: {
      func(express, cors, jwt, config, bodyParser) {
        const app = express();
        const port = config.port;
        app.use(cors());
        app.use(
          bodyParser.json({
            limit: 1024 * 1024 * 2000,
            type: "application/json"
          })
        );
        app.use(
          bodyParser.urlencoded({
            extended: true,
            limit: 1024 * 1024 * 20,
            type: "application/x-www-form-urlencoding"
          })
        );
        app.get("/", (req, res) => res.send(`It's working!`));
        app.use("/uploads", express.static(__dirname + "/../../uploads"));
        app.use(async (req, res, next) => {
          const token = req.header("x-access-token");
          if (!token) {
            return next();
          }
          try {
            const data = await jwt.verify(token);
            req.userId = data.id;
            return next();
          } catch (e) {
            return next(e);
          }
        });
        app.listen(port, () =>
          console.log(`Example app listening on port ${port}!`)
        );
        return app;
      },
      require: [
        "::express",
        "::cors",
        "jwtService",
        "::./config",
        "::body-parser"
      ]
    },
    api: {
      func(express, app) {
        const router = express.Router();
        app.use("/api", router);
        return router;
      },
      require: ["::express", "app"]
    }
  },
  exports: ["api"]
};
