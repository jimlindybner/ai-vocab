const express = require("express");
const path = require("path");
const { generateVocab } = require("./controllers/openaiController");

// app setup
const app = express();
const port = process.env.PORT || "80";

// set up express app to use pug as template engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// set up public folder path
app.use(express.static(path.join(__dirname, "public")));

// view controllers
app.get("/", (request, response) => {
  response.render("index", { title: "Home" });
});

//set up server listening
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});

// middleware
app.use(express.json());
app.use(express.static("public"));

// route
app.post("/openai/vocab", generateVocab);
