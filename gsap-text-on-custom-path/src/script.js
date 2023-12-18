gsap.to(
    ".fname",
    {
        duration: 3,
        attr: { startOffset: "75%" },
        ease: "expo.out"
    }
)

gsap.from(
    ".lname",
    {
        duration: 3,
        attr: { startOffset: "36%" },
        ease: "expo.out"
    }
)

gsap.to(
    ".title_circle",
    {
        duration: 10,
        rotation: 360,
        repeat: -1,
        ease: "none"
    }
)