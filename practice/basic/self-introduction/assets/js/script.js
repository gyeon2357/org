// 1
function setTheme(darkSchemeMediaQueryList) {
  const theme = darkSchemeMediaQueryList.matches ? "dark" : "light"
  document.body.dataset.theme = theme
}

// 2
const mediaQuery = "(prefers-color-scheme: dark)"
setTheme(window.matchMedia(mediaQuery))

// 3

window.matchMedia(mediaQuery).addEventListener("change", setTheme)