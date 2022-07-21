const express = require("express");
const env = require("dotenv");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

// routes

const authRoutes = require("./routes/auth");
const adminAuthRoutes = require("./routes/admin/auth");
const categoryRoutes = require("./routes/category");

//environment variables

env.config({ path: `${__dirname}/../.env` });

//mongodb connection
mongoose
  .connect(
    `mongodb+srv://ashish:${process.env.MONOGO_DB_PASSWORD}@cluster0.nni1rkz.mongodb.net/${process.env.MONOGO_DB_DATABASE}?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Data base connected successfully");
  });

// middleware
app.use(bodyParser.json());

// routes
app.use("/api", authRoutes);
app.use("/api", adminAuthRoutes);
app.use("/api", categoryRoutes);

app.get("/", (req, res) => {
  res.status(200).send("hello from server");
});
app.post("/", (req, res) => {
  res.send({
    data: req.body,
  });
});

app.listen(process.env.PORT, () => {
  console.log("server is running on port " + process.env.PORT);
});
