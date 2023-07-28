// forms & btns
const vocabForm = document.querySelector(".vocab-form");
const pornounceForm = document.querySelector("form.pronounce-form");
const pronounceVocab = document.querySelector("#pronounce-vocab");
const btnPronounce = document.querySelector("button#pronunciation");

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

  console.log(data);

  card.innerHTML = data.response.content;

  // display pronunciation btn
  btnPronounce.style.display = "block";

  // calll isolateVocab fn
  isolateVocab();
};

const isolateVocab = () => {
  // get #vocabulary element
  var vocabElem = document.getElementById("vocabulary");

  // extract text content
  var word = vocabElem.textContent.trim();

  // call generateMP3 fn
  setPronounceVocab(word);
};

const setPronounceVocab = async (text) => {
  pronounceVocab.value = text;
  console.log(pronounceVocab.value);
};

// event listeners
vocabForm.addEventListener("submit", newCard);

// footer - copyright year
const newDate = new Date();
const fullYear = newDate.getFullYear();
const cpyr = document.querySelector("#copy-year");
cpyr.innerHTML = fullYear;
