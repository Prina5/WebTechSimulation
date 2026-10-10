/* ==========================================================
   FATHOM - shared data and helpers
   Lesson hooks: arrays, objects, functions
   ========================================================== */

const MAX_DEPTH = 11000;

const ZONES = [
  { id: 'sunlight', name: 'Sunlight zone', short: 'Sunlight', top: 0,    bottom: 200,   color: '#1b7690', accent: '#8fe9e4',
    note: 'Bright enough for algae and plants to grow, so most sea life lives here.' },
  { id: 'twilight', name: 'Twilight zone', short: 'Twilight', top: 200,  bottom: 1000,  color: '#134a64', accent: '#5db7d6',
    note: 'A faint blue glow remains, too weak for photosynthesis. Many animals make their own light.' },
  { id: 'midnight', name: 'Midnight zone', short: 'Midnight', top: 1000, bottom: 4000,  color: '#0b2638', accent: '#9aa8f5',
    note: 'No sunlight at all. The only light is living: flashes, lures and glowing clouds.' },
  { id: 'abyss',    name: 'Abyssal zone',  short: 'Abyss',    top: 4000, bottom: 6000,  color: '#06151f', accent: '#c9a2f2',
    note: 'Cold, still and close to freezing. Food arrives as scraps sinking from far above.' },
  { id: 'hadal',    name: 'Hadal zone',    short: 'Hadal',    top: 6000, bottom: 11000, color: '#02080c', accent: '#ff9aa8',
    note: 'Deep ocean trenches. The pressure in the deepest ones is over 1,000 times that at the surface.' }
];

const CREATURES = [
  { id: 'moon-jelly', name: 'Moon jelly', latin: 'Aurelia aurita', zone: 'sunlight', min: 0, max: 50, size: 'Up to 40 cm wide',
    fact: 'The four pale rings you can see through its bell are its reproductive organs.' },
  { id: 'leatherback', name: 'Leatherback turtle', latin: 'Dermochelys coriacea', zone: 'sunlight', min: 0, max: 1200, size: 'Up to about 2 m long',
    fact: 'It feeds on jellyfish and has been tracked diving below 1,000 metres, deeper than most turtles.' },
  { id: 'lanternfish', name: 'Lanternfish', latin: 'Myctophidae', zone: 'twilight', min: 200, max: 1000, size: 'Mostly under 15 cm',
    fact: 'Rows of light organs line its body. At night, huge numbers rise toward the surface to feed.' },
  { id: 'barreleye', name: 'Barreleye', latin: 'Macropinna microstoma', zone: 'twilight', min: 600, max: 800, size: 'About 15 cm',
    fact: 'Its eyes are tubes under a see-through, fluid-filled head, and they can rotate to look upward.' },
  { id: 'giant-squid', name: 'Giant squid', latin: 'Architeuthis dux', zone: 'twilight', min: 300, max: 1000, size: 'Up to about 13 m long',
    fact: 'It has the largest eyes of any animal, around the size of a dinner plate.' },
  { id: 'vampire-squid', name: 'Vampire squid', latin: 'Vampyroteuthis infernalis', zone: 'twilight', min: 600, max: 1200, size: 'About 30 cm',
    fact: 'Neither a squid nor an octopus. It can flip its webbed arms over its body like a cloak.' },
  { id: 'sperm-whale', name: 'Sperm whale', latin: 'Physeter macrocephalus', zone: 'midnight', min: 0, max: 2000, size: 'Males up to about 16 m',
    fact: 'It hunts in total darkness with echolocation and can hold its breath for over an hour.' },
  { id: 'anglerfish', name: 'Anglerfish', latin: 'Ceratioidei', zone: 'midnight', min: 1000, max: 4000, size: 'Females up to about 1 m; males a few cm',
    fact: 'Its lure glows thanks to bacteria living inside it. In some species the tiny male fuses to the female.' },
  { id: 'gulper-eel', name: 'Gulper eel', latin: 'Eurypharynx pelecanoides', zone: 'midnight', min: 500, max: 3000, size: 'Up to about 1 m',
    fact: 'Its hinged mouth is far larger than its body and opens like a net.' },
  { id: 'yeti-crab', name: 'Yeti crab', latin: 'Kiwa hirsuta', zone: 'midnight', min: 2200, max: 2300, size: 'About 15 cm',
    fact: 'It lives near hot hydrothermal vents, and its hairy claws hold bacteria it may use as food.' },
  { id: 'dumbo-octopus', name: 'Dumbo octopus', latin: 'Grimpoteuthis', zone: 'abyss', min: 400, max: 4800, size: 'About 20 cm, some larger',
    fact: 'It hovers by flapping ear-like fins and steers by pulling its webbed arms like an umbrella.' },
  { id: 'tripod-fish', name: 'Tripod fish', latin: 'Bathypterois grallator', zone: 'abyss', min: 880, max: 4700, size: 'About 35 cm',
    fact: 'It props itself on three long fin rays, faces the current and waits for food to drift by.' },
  { id: 'snailfish', name: 'Mariana snailfish', latin: 'Pseudoliparis swirei', zone: 'hadal', min: 6000, max: 8000, size: 'About 30 cm',
    fact: 'It lives deeper than almost any other known fish, with a soft, scaleless body.' },
  { id: 'amphipod', name: 'Giant amphipod', latin: 'Hirondellea gigas', zone: 'hadal', min: 7000, max: 10900, size: 'A few cm',
    fact: 'This scavenger swarms to food that sinks from above, even in the deepest known trench.' }
];

/* ----- helpers ----- */
const fmt = (n) => n.toLocaleString('en-US');

function zoneById(id) {
  return ZONES.find((z) => z.id === id);
}

function zoneAtDepth(depth) {
  return ZONES.find((z) => depth >= z.top && depth < z.bottom) || ZONES[ZONES.length - 1];
}

/* Slider position (0-1000) <-> depth in metres.
   A curve gives the shallow zones more room on the slider. */
const CURVE = 2.2;
function depthFromSlider(v) {
  return Math.round((MAX_DEPTH * Math.pow(v / 1000, CURVE)) / 10) * 10;
}
function sliderFromDepth(d) {
  return 1000 * Math.pow(d / MAX_DEPTH, 1 / CURVE);
}
