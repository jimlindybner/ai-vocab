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

// OPENAI API
// configuration
const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();

const configuration = new Configuration({
  apiKey: process.env.OPEN_AI_KEY,
});

const openai = new OpenAIApi(configuration);

// generateVocab function
const generateVocab = async (req, res) => {
  const prompt = `
          Generate one SAT-level vocabulary term and provide a definition and example. Return HTML like the following:
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
  console.log(response.data.choices[0].message);

  res.status(200).json({
    response: response.data.choices[0].message,
  });
};

// middleware
app.use(express.json());
app.use(express.static("public"));

// route
app.post("/openai/vocab", generateVocab);

// TEXT-TO-SPEECH
const textToSpeech = require("@google-cloud/text-to-speech");
const fs = require("fs");
const util = require("util");

const client = new textToSpeech.TextToSpeechClient();

async function textToMp3() {
  const text = "Hello world";

  const request = {
    input: { text: text },
    voice: { languageCode: "en-US", ssmlGender: "NEUTRAL" },
    audioConfig: { audioEncoding: "MP3" },
  };

  const [response] = await client.synthesizeSpeech(request);

  const writeFile = util.promisify(fs.writeFile);

  await writeFile("output.mp3", response.audioContent, "binary");

  console.log("Text to Speech complete: Audio file saved");
}

// textToMp3();
