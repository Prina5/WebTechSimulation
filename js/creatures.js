/* 
   CREATURES PAGE - show / hide a fact
   Lesson 8: functions with parameters, changing the page
   Lesson 9: if / else and the === operator
   */

function toggleFact(factId, button) {
  const fact = document.getElementById(factId);

  // If the fact is showing, hide it. Otherwise, show it.
  if (fact.style.display === "block") {
    fact.style.display = "none";
    button.textContent = "Show a fact";
  } else {
    fact.style.display = "block";
    button.textContent = "Hide the fact";
  }
}
