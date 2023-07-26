const openai = require("../config/openaiConfig");

const generateVocab = async (req, res) => {
  const description = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "user",
        content: `
          Generate one SAT-level vocabulary term and define it. Return something like the following:
          Ostentatious: Displaying wealth, knowledge, or style in a way that is meant to impress others or attract attention.
        `,
      },
    ],
    max_tokens: 100,
  });

  // response
  res.status(200).json({
    description: description.data.choices[0].message,
  });
};

module.exports = { generateVocab };
