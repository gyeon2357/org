const rotator = document.getElementById('rotator');
const words = document.querySelectorAll('#rotator > span');

let main = gsap.timeline({
  repeat: -1,
});
let wordLength;

// adjust for timeline speed
main.timeScale(1); 
let durVal = 0.5;

for (let i = 0; i < words.length; i++) {
  let delay = i - 1;
  let stay = 1.5; // time for which the word will stay visible
  
  // find 'active' span width and apply to rotator wrap to start each iteration. animate w/css.
  let wordWidth = words[i].offsetWidth;
  let wordTL = gsap.timeline({
    onStart: function() {
      //gsap.to(rotator, { duration: durVal, width: wordWidth, delay: 0.25, ease: 'power4.in'});
      words[i].style.opacity = 1;
    }
  });

  if(i !== 0) {
    wordTL.from(words[i], { duration: durVal, yPercent: -100, ease: 'power4.in' });
  } else {
    // Handle the first one specially
    delay += durVal;
    gsap.set(words[0], { yPercent: 0 });
  }
  if(i !== words.length - 1) {
    wordTL.to(words[i], { duration: durVal, yPercent: 100, ease: 'power4.in', delay: stay });
  }
  
  main.add(wordTL, delay + (stay - durVal) * i);
}