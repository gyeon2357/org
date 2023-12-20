const alpha15 = "ijl";
const alpha20 = "frtz";
const alpha30 = "acehknosuvxy";
const alpha35 = "bdgpq";
const alpha50 = "mw";

const ALPHA15 = "I";
const ALPHA30 = "EFLTZ";
const ALPHA35 = "BPRSXY";
const ALPHA40 = "KACDGHNUV";
const ALPHA50 = "MOQ";
const ALPHA55 = "W";

const ALPHABETS_SIZES = [ALPHA35, ALPHA40];

let randomLetter = lett => {
  for (var letters of ALPHABETS_SIZES) {
    if (letters.indexOf(lett) != -1) {
      let res = letters[Math.floor(Math.random() * letters.length)];
      while (res == lett)
        res = letters[Math.floor(Math.random() * letters.length)];
      return [res, true];
    }
  }
  return [".", false];
};

let textWrapper = document.querySelectorAll(".line_text");
// console.log(textWrapper)

for (var selection of textWrapper) {
  var allLetters = selection.textContent.match(/[\S\x20]/g);

  selection.innerHTML = "";
  for (var letter of allLetters) {
    // keep white space between words
    if (letter.match(/\x20/g)) {
      selection.innerHTML += ` `;
    }
    // don't replace special characters
    else if (letter.match(/[\x21-\x40\x5B-\x60\x7B-\x7E]/g)) {
      selection.innerHTML += `<div data-char='.' class='letter'>${letter}</div>`;
    }
    // lowercase -> change font
    else if (letter.match(/[a-z]/g)) {
      selection.innerHTML += `<div data-char='.' class='letter lowercase'>${letter}</div>`;
    }
    // replace each letter with its appropriate size
    else {
      let [newLetter, status] = randomLetter(letter);

      if (status)
        selection.innerHTML += `<div data-char=${newLetter} class='letter'>${letter}</div>`;
      else
        selection.innerHTML += `<div data-char='.' class='letter'>${letter}</div>`;
    }
  }
}

const tl = gsap.timeline({defaults: {ease: "power2.out"}});

var animation = tl

  .to(".line_text .letter", {
    duration: 1,
    yPercent: -100,
    stagger: {
      // amount: total time
      // each: 0.5,
      amount: 0.5,
      // from: 'start'
    },
    ease: "expo.out",
  })

  .to(
    "h1 div:not([data-char='.'])",
    {
      duration: 1.5,
      yPercent: -200,
      stagger: {
        amount: 0.5,
        from: "edges",
      },
      ease: "expo.out",
    },
    "<0.5"
  );

tl.to(".onload", {
  y: "-100%",
  delay: "0.75",

  duration: 0.5,
  display: "none",
});

tl.fromTo("main, footer", {opacity: 0}, {opacity: 1, duration: 0.25});
