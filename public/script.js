// forms & btns
const vocabForm = document.querySelector(".vocab-form");
const pornounceForm = document.querySelector("form.pronounce-form");
const pronounceVocab = document.querySelector("#pronounce-vocab");
const btnPronounce = document.querySelector("#pronunciation");

// output elements
const card = document.querySelector(".card p");

// functions

const newCard = async (e) => {
  e.preventDefault();

  const res = await fetch("/openai/vocab", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });

  const data = await res.json();

  card.innerHTML = data.response.content;

  // display pronunciation btn
  btnPronounce.style.display = "block";

  // call isolateVocab fn
  isolateVocab();
};

const isolateVocab = () => {
  // get #vocabulary element
  var vocabElem = document.getElementById("vocabulary");

  // extract text content
  var word = vocabElem.textContent.trim();

  // call generateMp3 fn
  generateMp3(word);
};

const generateMp3 = async (text) => {
  console.log(text);
  // send text to app.js
  // call textToMp3 with text as argument
  // textToMp3(text);
};

// event listeners
vocabForm.addEventListener("submit", newCard);

// footer - copyright year
const newDate = new Date();
const fullYear = newDate.getFullYear();
const cpyr = document.querySelector("#copy-year");
cpyr.innerHTML = fullYear;
