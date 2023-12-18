// Design inspiration from https://www.zikd.space/en/
gsap.defaults({
    duration: 1,
    ease: 'expo.out'
})

let tl = gsap.timeline()

tl.to(
    "html",
    {
        "--scaleWhite": 1,
    }
)

.to(
    "html",
    {
        "--scaleBlack": 1,
    },
    "-=0.5"
)

.to(
    ".ellipse",
    {
        visibility: 'visible'
    },
    "<"
)