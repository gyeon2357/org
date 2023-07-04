import { preloadImages } from './utils.js';
import { Content } from './content.js';



// .content elements
const contentElems = [...document.querySelectorAll('main')];
contentElems.forEach(el => new Content(el));

// smooth scrolling with Lenis
initSmoothScrolling();

// Preload images then remove loader (loading class) from body
preloadImages('.canvas-wrap').then(() => document.body.classList.remove('loading'));