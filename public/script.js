// forms
const vocabForm = document.querySelector(".vocab-form");

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
};

// event listeners
vocabForm.addEventListener("submit", newCard);

// footer - copyright year
const newDate = new Date();
const fullYear = newDate.getFullYear();
const cpyr = document.querySelector("#copy-year");
cpyr.innerHTML = fullYear;
