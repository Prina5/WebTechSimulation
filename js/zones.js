/* 
   ZONES PAGE - Dive planner
   Lesson 8: variables and functions
   Lesson 9: switch statement, comparison operators,
             the conditional (ternary) operator
    */

function planDive() {
  const who = document.getElementById("who").value;
  const depthText = document.getElementById("plan-depth").value;
  const depth = Number(depthText);
  const result = document.getElementById("plan-result");

  if (depthText === "" || isNaN(depth) || depth < 0) {
    result.className = "result error";
    result.textContent = "Enter a depth of 0 metres or more.";
    return;
  }

  let name;
  let maxDepth;

  // switch compares ONE value against many possible cases
  switch (who) {
    case "scuba":
      name = "A recreational scuba diver";
      maxDepth = 40;
      break;
    case "whale":
      name = "A sperm whale";
      maxDepth = 2000;
      break;
    case "alvin":
      name = "A research submersible like Alvin";
      maxDepth = 6500;
      break;
    case "full":
      name = "A full-ocean-depth submersible";
      maxDepth = 11000;
      break;
    default:
      result.className = "result error";
      result.textContent = "Choose who is diving.";
      return;
  }

  // The conditional operator:  condition
  const canReach = depth <= maxDepth;
  const verdict = canReach ? "can" : "cannot";

  let message = name + " " + verdict + " reach " + depth + " m (limit: about " + maxDepth + " m).";

  if (!canReach) {
    const shortBy = depth - maxDepth;
    message = message + " It would fall short by " + shortBy + " m.";
  }

  result.className = canReach ? "result success" : "result error";
  result.textContent = message;
}
