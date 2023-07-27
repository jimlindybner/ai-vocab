const express = require("express");
const { generateVocab } = require("./controllers/openaiController");

// app setup
const app = express();
const port = process.env.PORT || "80";

//set up server listening
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});

// middleware
app.use(express.json());
app.use(express.static("public"));

// route
app.post("/openai/vocab", generateVocab);
