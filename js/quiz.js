/* 
   QUIZ PAGE - mark the answers
   Lesson 8: variables, functions, strings, numbers
   Lesson 9: expressions (+, /, *), comparison (===, !==),
             logical operators (||), if / else if / else
   */

// Returns the letter the visitor picked for one question,
// or an empty string if they skipped it.
function getAnswer(name) {
  const chosen = document.querySelector('input[name="' + name + '"]:checked');
  if (chosen === null) {
    return "";
  }
  return chosen.value;
}

function checkQuiz() {
  const result = document.getElementById("quiz-result");

  const a1 = getAnswer("q1");
  const a2 = getAnswer("q2");
  const a3 = getAnswer("q3");
  const a4 = getAnswer("q4");
  const a5 = getAnswer("q5");

  // || means OR: if ANY answer is missing, ask them to finish
  if (a1 === "" || a2 === "" || a3 === "" || a4 === "" || a5 === "") {
    result.className = "result error";
    result.textContent = "Answer all five questions first.";
    return;
  }

  let score = 0;
  let review = "";

  if (a1 === "b") { score = score + 1; } else { review = review + " 1"; }
  if (a2 === "c") { score = score + 1; } else { review = review + " 2"; }
  if (a3 === "a") { score = score + 1; } else { review = review + " 3"; }
  if (a4 === "d") { score = score + 1; } else { review = review + " 4"; }
  if (a5 === "b") { score = score + 1; } else { review = review + " 5"; }

  const percent = (score / 5) * 100;

  let message;
  if (percent === 100) {
    message = "Perfect. You could captain a submersible.";
  } else if (percent >= 60) {
    message = "Strong dive. You know your way around the deep.";
  } else if (percent >= 40) {
    message = "Not bad. Read the zones page and try again.";
  } else {
    message = "You have only just left the surface. Try again after a look at the zones page.";
  }

  let text = "You scored " + score + " out of 5 (" + percent + "%). " + message;
  if (review !== "") {
    text = text + " Review question(s):" + review + ".";
  }

  result.className = score >= 3 ? "result success" : "result error";
  result.textContent = text;
}
