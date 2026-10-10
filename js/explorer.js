/* 
   HOME PAGE - Depth explorer
   Lesson 8: variables, numbers, strings, functions, the DOM
   Lesson 9: expressions and conditionals
    */

function exploreDepth() {
  // Lesson 8: get elements from the page and store them in variables
  const input = document.getElementById("depth");
  const result = document.getElementById("result");

  const text = input.value;       // what the visitor typed (a string)
  const depth = Number(text);     // convert the string into a number

  // Lesson 9: conditionals - stop early if the input is not usable
  if (text === "" || isNaN(depth)) {
    result.className = "result error";
    result.textContent = "Type a depth in metres first.";
    return;
  }

  if (depth < 0 || depth > 11000) {
    result.className = "result error";
    result.textContent = "Pick a depth between 0 and 11000 metres. The deepest point in the ocean is about 10900 m.";
    return;
  }

  // Lesson 9: arithmetic expressions
  const feet = Math.round(depth * 3.28084);
  const pressure = Math.round(1 + depth / 10);   // about 1 extra atmosphere per 10 m

  // Lesson 9: if / else if / else chooses ONE of several outcomes
  let zone;
  let description;

  if (depth < 200) {
    zone = "Sunlight zone";
    description = "Bright enough for plants and algae to grow, so most sea life lives here.";
  } else if (depth < 1000) {
    zone = "Twilight zone";
    description = "A faint blue glow remains. Many animals make their own light.";
  } else if (depth < 4000) {
    zone = "Midnight zone";
    description = "No sunlight at all. The only light is living light.";
  } else if (depth < 6000) {
    zone = "Abyssal zone";
    description = "Cold, still and close to freezing.";
  } else {
    zone = "Hadal zone";
    description = "The deep ocean trenches, named after Hades.";
  }

  // Lesson 9: comparison and logical operators
  let extra = "";
  if (depth >= 10900) {
    extra = " That is about as deep as the ocean goes.";
  } else if (depth >= 200 && depth < 1000) {
    extra = " This is where lanternfish and giant squid hunt.";
  } else if (depth === 0) {
    extra = " You are floating at the surface.";
  }

  // Lesson 8: build a string with + and show it on the page
  result.className = "result success";
  result.innerHTML =
    "<strong>" + zone + "</strong><br>" +
    depth + " m is " + feet + " ft. The pressure is about " + pressure +
    " times the pressure at the surface.<br>" +
    description + extra;
}
