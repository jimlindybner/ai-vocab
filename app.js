// ****************
// ***APP SETUP***
// ****************
const express = require("express");
const path = require("path");

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

// ****************
// ***OPENAI API***
// ****************
const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();

const configuration = new Configuration({
  apiKey: process.env.OPEN_AI_KEY,
});

const openai = new OpenAIApi(configuration);

// generateVocab function
const generateVocab = async (req, res) => {
  const prompt = `
          Generate one SAT-level vocabulary term other than "Ostentatious" and provide a definition and example. Return HTML like the following:
          <div id="vocabulary">
            Ostentatious
          </div>
          <div id="definition">
            Displaying wealth, knowledge, or style in a way that is meant to impress others or attract attention.
          </div>
          <div id="example">
            &ldquo;At the charity gala, Susan arrived wearing a floor-length, ostentatious gown adorned with glittering diamonds, capturing the attention of everyone in the room.&rdquo;
          </div>
        `;

  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
    max_tokens: 1000,
    temperature: 1.25,
  });

  // response
  res.status(200).json({
    response: response.data.choices[0].message,
  });

  // regex pattern to extract the vocabulary term
  generatedHTML = response.data.choices[0].message.content;
  console.log(generatedHTML);
  const regex = /<div id="vocabulary">\s*(\w+)\s*<\/div>/;
  const match = generatedHTML.match(regex);

  // check for match & extract vocabulary term
  let vocabularyTerm;
  if (match && match.length >= 2) {
    vocabularyTerm = match[1];
  }

  // call textToMp3 with vocabulary term as argument
  textToMp3(vocabularyTerm);
};

// middleware
app.use(express.json());
app.use(express.static("public"));

// route
app.post("/openai/vocab", generateVocab);

// ********************
// ***TEXT-TO-SPEECH***
// ********************
const textToSpeech = require("@google-cloud/text-to-speech");
const fs = require("fs");
const util = require("util");

const client = new textToSpeech.TextToSpeechClient();

async function textToMp3(text) {
  const request = {
    input: { text: text },
    voice: { languageCode: "en-US", ssmlGender: "NEUTRAL" },
    audioConfig: { audioEncoding: "MP3" },
  };

  const [response] = await client.synthesizeSpeech(request);

  const writeFile = util.promisify(fs.writeFile);

  // output output.mp3 to public directory
  const outputPath = path.join(__dirname, "public", "output.mp3");
  await writeFile(outputPath, response.audioContent, "binary");

  console.log("Text to Speech complete: Audio file saved");
}
