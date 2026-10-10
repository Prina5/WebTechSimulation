# Fathom: a beginner's guide to the deep ocean

A five-page website built with only what Lessons 1 to 9 teach.
Open `index.html` in your browser to start. No server or install needed.

## Files
index.html, zones.html, creatures.html, quiz.html, contact.html
css/style.css          (one shared stylesheet)
js/                    (one small script per page)
images/                (SVG pictures)

## Where each lesson shows up

Lesson 1  Dynamic web content
  HTML gives structure, CSS gives style, JavaScript makes pages react.
  Every page links one stylesheet and one script, so you can see all three working together.

Lesson 2  Basic HTML syntax, document metadata, headings and paragraphs
  Any page: <!DOCTYPE html>, <html lang>, <head> with charset, viewport,
  author, description, title and icon; h1 and h2 headings; p elements; attributes.

Lesson 4  Links, tables, images
  Links: nav (relative URLs), #top and #planner (fragments), mailto:,
         target="_blank" with rel="noopener" (contact.html, index.html).
  Tables: zones.html uses caption, thead, tbody, tfoot, th scope, rowspan, colspan.
  Images: creatures.html uses img with src, alt, width, height, loading="lazy",
          and figure with figcaption.

Lesson 6  What is CSS and getting started with CSS
  css/style.css: external stylesheet, comments, type and class selectors,
  selector lists, descendant combinator (header .wrap), next-sibling
  combinator (h1 + p), link states (a:link, a:visited, a:hover, a:focus),
  shorthand (font, margin, padding, border), calc(), gradient, transform, @media.

Lesson 7  The box model and responsive web design
  margin, padding, border, border-radius, box-sizing, display block and
  inline-block, flexbox (nav, .cards), media queries with (width >= 40em),
  viewport meta tag, viewport units (100vh), responsive typography.

Lesson 8  JavaScript basics
  Every file in js/: const and let, strings and numbers, functions,
  document.getElementById, reading .value, changing .textContent and .innerHTML.

Lesson 9  Conditionals and expressions
  explorer.js: arithmetic, comparison and logical operators, if / else if / else.
  zones.js:    switch statement and the ternary operator.
  quiz.js:     marking with ===, scoring with + and /, || to catch skipped questions.
  contact.js:  && and ! to validate an email address, string length.


