// forms & btns
const vocabForm = document.querySelector(".vocab-form");
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
};

// event listeners
vocabForm.addEventListener("submit", newCard);

// footer - copyright year
const newDate = new Date();
const fullYear = newDate.getFullYear();
const cpyr = document.querySelector("#copy-year");
cpyr.innerHTML = fullYear;
