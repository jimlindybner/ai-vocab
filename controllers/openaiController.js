const openai = require("../config/openaiConfig");

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

module.exports = { generateVocab };
