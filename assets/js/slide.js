class SlideStories {
  constructor(id) {
    this.slide = document.querySelector(`[data-slide="${id}"]`);
    this.active = 0;
    this.init();
  }

  activeSlide(index) {
    this.active = index;
    this.items.forEach(item => item.classList.remove("active"));
    this.items[index].classList.add("active");
    this.thumbItems.forEach(item => item.classList.remove("active"));
    this.thumbItems[index].classList.add("active");
  }

  prev() {
    if (this.active > 0) {
      this.activeSlide(this.active - 1);
      // $(this).find()("<div>Hello</div>");
    } else {
      this.activeSlide(this.items.length - 1);
    }
  }

  next() {
    if (this.active < this.items.length - 1) {
      this.activeSlide(this.active + 1);
      this.autoSlide();
    } else {
      this.activeSlide(0);
      // close blocker
    }
  }

  addNavigation() {
    const nextBtn = this.slide.querySelector(".slide-next");
    const prevBtn = this.slide.querySelector(".slide-prev");
    nextBtn.addEventListener("click", this.next);
    prevBtn.addEventListener("click", this.prev);
  }

  addThumbItems() {
    this.items.forEach(() => (this.thumb.innerHTML += `<span></span>`));
    this.thumbItems = Array.from(this.thumb.children);
  }

  autoSlide() {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(this.next, 5000);
  }

  init() {
    this.next = this.next.bind(this);
    this.prev = this.prev.bind(this);
    this.items = this.slide.querySelectorAll(".slide-items > *");
    this.thumb = this.slide.querySelector(".slide-thumb");
    this.addThumbItems();
    this.activeSlide(0);
    this.addNavigation();
  }
}

new SlideStories("thisisthumb");

new SlideStories("work-1");
new SlideStories("work-2");
new SlideStories("work-3");
new SlideStories("work-4");
new SlideStories("work-5");
new SlideStories("work-6");
new SlideStories("work-7");
new SlideStories("work-8");
new SlideStories("work-9");

new SlideStories("side-project-1");
new SlideStories("side-project-2");
new SlideStories("side-project-3");
new SlideStories("side-project-4");
new SlideStories("side-project-5");
new SlideStories("side-project-6");
new SlideStories("side-project-7");
new SlideStories("side-project-8");
new SlideStories("side-project-9");
