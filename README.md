# AI-Powered Vocabulary Index Cards

## Overview

AI-Powered Vocabulary Index Cards is a web application designed to assist students preparing for the SATs or learning English as a second language in expanding their vocabulary. The app utilizes artificial intelligence and leverages the power of OpenAI's API to generate SAT-level vocabulary index cards complete with definitions and example sentences. Additionally, it offers a "pronunciation" feature that utilizes the Google Cloud Text-To-Speech API to provide an audio representation of the vocabulary words.

## Features

- **SAT-Level Vocabulary Terms**: The application generates high-level vocabulary terms suitable for SAT preparation and English learning.

- **Definitions and Example Sentences**: Each vocabulary index card includes a definition and a carefully crafted example sentence to illustrate the word's usage.

- **Pronunciation**: The app utilizes the Google Cloud Text-To-Speech API to provide an audio pronunciation of each vocabulary word, helping users learn correct pronunciation.

- **User-Friendly Interface**: The web app offers an intuitive and user-friendly interface, making it easy for students to explore and learn new words.

- **Randomization**: Users can shuffle through a variety of vocabulary cards to enhance the learning experience.

## How It Works

The AI-Powered Vocabulary Index Cards web app communicates with the OpenAI API to generate vocabulary terms, definitions, and example sentences. When a user accesses the app, they can click a button to request a new random vocabulary card. The app then sends a request to the OpenAI API, which responds with the generated vocabulary content.

The pronunciation feature leverages the Google Cloud Text-To-Speech API. When a user wants to hear the pronunciation of a word, the app sends a request to the Google Cloud API, which returns an audio file representing the word's pronunciation. The app plays the audio for the user.

## Technologies Used

- Node.js for the server-side implementation.
- Express.js as the web framework.
- Pug as the templating engine
- OpenAI API for vocabulary generation.
- Google Cloud Text-To-Speech API for pronunciation.
- HTML, CSS, and JavaScript for the frontend.

---

Happy learning and expanding your vocabulary with AI-powered assistance! If you have any questions or need further information, please don't hesitate to contact us.
