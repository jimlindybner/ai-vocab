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

app.get("/pronounce", (request, response) => {
  response.render("pronounce", { title: "Pronunciation" });
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
            At the charity gala, Susan arrived wearing a floor-length, ostentatious gown adorned with glittering diamonds, capturing the attention of everyone in the room.
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

  // regex pattern to extract the vocabulary term, definitoin & example for text-to-speech
  generatedHTML = response.data.choices[0].message.content;
  // console.log(generatedHTML);
  const vocabRegex = /<div id="vocabulary">\s*(\w+)\s*<\/div>/;
  const defRegex = /<div id="definition">\s*(.*?)\s*<\/div>/;
  const exRegex = /<div id="example">\s*(.*?)\s*<\/div>/;
  const vocabMatch = generatedHTML.match(vocabRegex);
  const defMatch = generatedHTML.match(defRegex);
  const exMatch = generatedHTML.match(exRegex);

  // check for match & extract vocabulary term
  let textToSpeech;
  let termVocab;
  let termDef;
  let termEx;
  if (vocabMatch && vocabMatch.length >= 2) {
    termVocab = vocabMatch[1];
  }
  if (defMatch && defMatch.length >= 2) {
    termDef = defMatch[1];
  }
  if (exMatch && exMatch.length >= 2) {
    termEx = exMatch[1];
  }

  textToSpeech = `The vocabulary term "${termVocab}" means ${termDef}. And here is an example sentence: ${termEx}`;

  // call textToMp3 with vocabulary term as argument
  textToMp3(textToSpeech);
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

const textToMp3 = async (text) => {
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

  // console.log("Text to Speech complete: Audio file saved");
};
