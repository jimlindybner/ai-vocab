const openai = require("../config/openaiConfig");

const generateVocab = async (req, res) => {
  const prompt = `
          Generate one SAT-level vocabulary term and provide a definition. Return something like the following:
          Ostentatious - Displaying wealth, knowledge, or style in a way that is meant to impress others or attract attention.
        `;

  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
    max_tokens: 100,
    temperature: 1,
  });

  // response
  console.log(response.data.choices[0].message);

  res.status(200).json({
    description: response.data.choices[0].message,
  });
};

module.exports = { generateVocab };
