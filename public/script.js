// forms
const vocabForm = document.querySelector(".vocab-form");

// output elements
const description = document.querySelector(".description p");

// description and tags
vocabForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const res = await fetch("/openai/vocab", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title: vocabForm.title.value }),
  });

  const data = await res.json();

  console.log(data);

  description.textContent = data.description.content;
});
