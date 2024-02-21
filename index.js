const express = require("express");
const dotenv = require("dotenv");
const helmet = require("helmet");
const compression = require("compression");
const cors = require("cors");
const { routes } = require("./routes/index.js");
const { sequelize } = require("./models/index.js");
const app = express();
dotenv.config();

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());
app.use(compression());
app.use(cors());

routes(app);

const main = async () => {
  try {
    await sequelize.sync();
    console.log("Database connected...");

    app.listen(PORT, () => {
      console.log(`App running on port ${PORT}`);
    });
  } catch (error) {
    console.log("Unable to connect to the database.");
    process.exit(1);
  }

  app.use((err, req, res, next) => {
    if (err) return res.status(500).json({ msg: "Something went wrong" });
  });

  app.use("*", (req, res) => {
    return res.status(404).json({ msg: "Route not found" });
  });
};

main();
