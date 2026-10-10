/* 
   CONTACT PAGE - form checking
   Lesson 8: reading form values, string length, functions
   Lesson 9: logical operators (&&, ||, !), conditionals
    */

function checkForm() {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const topic = document.getElementById("topic").value;
  const message = document.getElementById("message").value.trim();
  const result = document.getElementById("form-result");

  let problems = "";

  if (name === "") {
    problems = problems + "<li>Enter your name.</li>";
  }

  // && means AND: both conditions must be true. ! flips true to false.
  const looksLikeEmail = email.includes("@") && email.includes(".");
  if (!looksLikeEmail) {
    problems = problems + "<li>Enter an email address like diver@example.com.</li>";
  }

  if (topic === "") {
    problems = problems + "<li>Choose a topic.</li>";
  }

  if (message.length < 10) {
    problems = problems + "<li>Write a message of at least 10 characters.</li>";
  }

  if (problems !== "") {
    result.className = "result error";
    result.innerHTML = "Please fix the following:<ul>" + problems + "</ul>";
  } else {
    result.className = "result success";
    result.textContent = "Thanks, " + name + ". This is a practice form, so nothing was sent.";
  }

  // Returning false stops the browser from reloading the page.
  return false;
}
